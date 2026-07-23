import crypto from "crypto";

export function adminToken() {
  const secret = process.env.ADMIN_PASSWORD || "dev-only";
  return crypto.createHmac("sha256", secret).update("shaheer-admin-ok").digest("hex");
}

export function isAdminRequest(request) {
  const cookie = request.cookies.get("admin_auth");
  return Boolean(cookie && cookie.value === adminToken());
}

export const AUTH_COOKIE = {
  name: "admin_auth",
  options: {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  },
};
