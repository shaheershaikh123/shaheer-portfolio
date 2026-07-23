import { NextResponse } from "next/server";
import { adminToken, AUTH_COOKIE } from "../../../../lib/admin-auth";

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE.name, adminToken(), AUTH_COOKIE.options);
  return res;
}
