// middleware.ts (project root)
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const hostname = (req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.hostname)
    .split(":")[0]
    .toLowerCase();

  if (hostname === "siargaofinder.com") {
    const url = req.nextUrl.clone();
    url.hostname = "www.siargaofinder.com";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" && req.nextUrl.searchParams.has("code")) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/callback";
    if (!url.searchParams.has("redirectedFrom")) {
      url.searchParams.set("redirectedFrom", "/");
    }
    return NextResponse.redirect(url);
  }

  if (!pathname.startsWith("/admin")) {
    return res;
  }

  if (pathname.startsWith("/admin/login")) {
    return res;
  }

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

  if (!user || !isAdminEmail(user.email)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
