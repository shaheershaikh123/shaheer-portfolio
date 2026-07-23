import { NextResponse } from "next/server";
import { isAdminRequest } from "../../../../lib/admin-auth";
import { getProjects, saveProjects, getTrash, saveTrash } from "../../../../lib/store";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
}

export async function GET(request) {
  if (!isAdminRequest(request)) return unauthorized();
  return NextResponse.json(await getTrash(), {
    headers: { "Cache-Control": "no-store" },
  });
}

// Restore a trashed project back to the live list
export async function POST(request) {
  if (!isAdminRequest(request)) return unauthorized();
  const { id } = await request.json().catch(() => ({}));
  const trash = await getTrash();
  const item = trash.find((p) => p.id === id);
  if (!item) {
    return NextResponse.json({ ok: false, error: "Not found in trash" }, { status: 404 });
  }
  const { deletedAt, ...project } = item;
  const projects = await getProjects();
  projects.unshift(project);
  await saveProjects(projects);
  await saveTrash(trash.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true, project });
}

// Permanently delete one item (?id=...) or empty the whole trash (?all=1)
export async function DELETE(request) {
  if (!isAdminRequest(request)) return unauthorized();
  const url = new URL(request.url);
  if (url.searchParams.get("all") === "1") {
    await saveTrash([]);
    return NextResponse.json({ ok: true });
  }
  const id = url.searchParams.get("id");
  const trash = await getTrash();
  const next = trash.filter((p) => p.id !== id);
  if (next.length === trash.length) {
    return NextResponse.json({ ok: false, error: "Not found in trash" }, { status: 404 });
  }
  await saveTrash(next);
  return NextResponse.json({ ok: true });
}
