import { NextResponse } from "next/server";
import crypto from "crypto";
import { addSubmission } from "../../../lib/store";
import { parseUA, geoFromHeaders } from "../../../lib/ua";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || "").toString().trim().slice(0, 100);
    const email = (body.email || "").toString().trim().slice(0, 150);
    const service = (body.service || "").toString().trim().slice(0, 100);
    const message = (body.message || "").toString().trim().slice(0, 2000);

    if (!name || !message) {
      return NextResponse.json({ ok: false, error: "Name and message required" }, { status: 400 });
    }

    const geo = geoFromHeaders(request.headers);
    const ua = parseUA(request.headers.get("user-agent") || "");

    await addSubmission({
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      name,
      email,
      service,
      message,
      ...geo,
      ...ua,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
