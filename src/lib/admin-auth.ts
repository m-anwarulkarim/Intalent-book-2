import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";

function getAdminSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing");
  }

  return secret;
}

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return session === getAdminSecret();
}
