import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

function safeRedirect(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectedFrom = safeRedirect(url.searchParams.get("redirectedFrom"));
  const supabase = await createClient();
  await supabase.auth.signOut();
  const target = new URL(redirectedFrom, url.origin);
  target.searchParams.set("message", "Signed out. You can now safely sign in with another account.");
  return NextResponse.redirect(target);
}

export async function POST(request: Request) {
  return GET(request);
}
