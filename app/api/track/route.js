import { NextResponse } from "next/server";
import { trackView } from "../../../lib/store";
import { parseUA, geoFromHeaders } from "../../../lib/ua";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { path } = await request.json();
    if (typeof path === "string" && path.startsWith("/") && !path.startsWith("/admin")) {
      const geo = geoFromHeaders(request.headers);
      const ua = parseUA(request.headers.get("user-agent") || "");
      await trackView({ path: path.slice(0, 100), ...geo, ...ua });
    }
  } catch (e) {}
  return NextResponse.json({ ok: true });
}
