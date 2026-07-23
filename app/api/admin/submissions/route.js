import { NextResponse } from "next/server";
import { isAdminRequest } from "../../../../lib/admin-auth";
import { getSubmissions } from "../../../../lib/store";

export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  }
  const submissions = await getSubmissions();
  return NextResponse.json(submissions, { headers: { "Cache-Control": "no-store" } });
}
