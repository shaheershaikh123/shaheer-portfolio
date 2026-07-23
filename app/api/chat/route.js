import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, ruleBasedReply } from "../../../lib/bot";
import { getProjects } from "../../../lib/store";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request) {
  let message = "";
  let history = [];
  try {
    const body = await request.json();
    message = (body.message || "").toString().slice(0, 1000).trim();
    history = Array.isArray(body.history) ? body.history.slice(-10) : [];
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ ok: false, error: "Empty message" }, { status: 400 });
  }

  // AI mode when an API key is configured; otherwise rule-based answers
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic();
      const projects = await getProjects().catch(() => []);
      const messages = [
        ...history
          .filter((h) => h && (h.role === "user" || h.role === "assistant") && h.text)
          .map((h) => ({ role: h.role, content: h.text.toString().slice(0, 1000) })),
        { role: "user", content: message },
      ];
      const response = await client.messages.create({
        model: "claude-opus-4-8",
        max_tokens: 512,
        system: buildSystemPrompt(projects.length),
        messages,
      });
      if (response.stop_reason === "refusal") {
        return NextResponse.json({ ok: true, reply: ruleBasedReply(message), mode: "rules" });
      }
      const text = response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      if (text) return NextResponse.json({ ok: true, reply: text, mode: "ai" });
    } catch (e) {
      // fall through to rule-based on any API error
    }
  }

  return NextResponse.json({ ok: true, reply: ruleBasedReply(message), mode: "rules" });
}
