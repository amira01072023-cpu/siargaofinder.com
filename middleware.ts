// middleware.ts (project root)
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
const res = NextResponse.next();

const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
get(name: string) {
return req.cookies.get(name)?.value;
},
set(name: string, value: string, options: Record<string, unknown>) {
res.cookies.set({ name, value, ...options });
},
remove(name: string, options: Record<string, unknown>) {
res.cookies.set({ name, value: "", ...options });
},
},
}
);

const {
data: { user },
} = await supabase.auth.getUser();

if (!user) {
const url = req.nextUrl.clone();
url.pathname = "/auth";
url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
return NextResponse.redirect(url);
}

return res;
}

export const config = {
matcher: ["/vendors/:path*"],
};