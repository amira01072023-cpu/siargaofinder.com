import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
const url = new URL(request.url);
const code = url.searchParams.get("code");
const authError = url.searchParams.get("error_description") || url.searchParams.get("error");

const redirectedFrom = url.searchParams.get("redirectedFrom") || "/";
const safeRedirect = redirectedFrom.startsWith("/") && !redirectedFrom.startsWith("//") ? redirectedFrom : "/";

if (authError) {
  const authUrl = new URL("/auth", url.origin);
  authUrl.searchParams.set("redirectedFrom", safeRedirect);
  authUrl.searchParams.set("message", authError);
  return NextResponse.redirect(authUrl);
}

if (code) {
const supabase = await createClient();
const { error } = await supabase.auth.exchangeCodeForSession(code);
if (error) {
  const authUrl = new URL("/auth", url.origin);
  authUrl.searchParams.set("redirectedFrom", safeRedirect);
  authUrl.searchParams.set("message", error.message);
  return NextResponse.redirect(authUrl);
}
}

return NextResponse.redirect(new URL(safeRedirect, url.origin));
}
