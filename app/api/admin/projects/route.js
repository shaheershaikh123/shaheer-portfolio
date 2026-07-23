import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";
import { isAdminRequest } from "../../../../lib/admin-auth";
import { getProjects, saveProjects, getTrash, saveTrash } from "../../../../lib/store";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
}

async function uploadImage(file) {
  const ext = (file.name || "image").split(".").pop().toLowerCase() || "webp";
  const key = `uploads/${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${ext}`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
}

export async function POST(request) {
  if (!isAdminRequest(request)) return unauthorized();
  const form = await request.formData();
  const name = (form.get("name") || "").toString().trim();
  const url = (form.get("url") || "").toString().trim();
  const category = (form.get("category") || "Other").toString().trim() || "Other";
  const platform = (form.get("platform") || "WordPress").toString().trim();
  const description = (form.get("description") || "").toString().trim();
  const image = form.get("image");

  if (!name || !url) {
    return NextResponse.json({ ok: false, error: "Name and URL are required" }, { status: 400 });
  }

  let imageUrl = "";
  if (image && typeof image === "object" && image.size > 0) {
    imageUrl = await uploadImage(image);
  }

  const projects = await getProjects();
  const project = {
    id: crypto.randomUUID(),
    name,
    url,
    image: imageUrl || "/shots/placeholder.webp",
    category,
    platform,
    description,
  };
  projects.unshift(project);
  await saveProjects(projects);
  return NextResponse.json({ ok: true, project });
}

export async function PUT(request) {
  if (!isAdminRequest(request)) return unauthorized();
  const form = await request.formData();
  const id = (form.get("id") || "").toString();
  const projects = await getProjects();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
  }
  const fields = ["name", "url", "category", "platform", "description"];
  for (const f of fields) {
    const v = form.get(f);
    if (v !== null && v.toString().trim() !== "") projects[idx][f] = v.toString().trim();
  }
  const image = form.get("image");
  if (image && typeof image === "object" && image.size > 0) {
    projects[idx].image = await uploadImage(image);
  }
  await saveProjects(projects);
  return NextResponse.json({ ok: true, project: projects[idx] });
}

// Delete = move to trash. The project disappears from the live site but can
// be restored (or permanently removed) from /api/admin/trash.
export async function DELETE(request) {
  if (!isAdminRequest(request)) return unauthorized();
  const id = new URL(request.url).searchParams.get("id");
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return NextResponse.json({ ok: false, error: "Project not found" }, { status: 404 });
  }
  const trash = await getTrash();
  trash.unshift({ ...project, deletedAt: new Date().toISOString() });
  await saveTrash(trash.slice(0, 200));
  await saveProjects(projects.filter((p) => p.id !== id));
  return NextResponse.json({ ok: true, trashed: true });
}
