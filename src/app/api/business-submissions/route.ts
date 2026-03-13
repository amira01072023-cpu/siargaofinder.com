import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

function clean(v: unknown) {
  return String(v ?? "").trim();
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const business_name = clean(body?.business_name);
    const category = clean(body?.category);
    const city = clean(body?.city);
    const phone = clean(body?.phone);
    const email = clean(body?.email).toLowerCase() || user.email || null;
    const website_url = clean(body?.website_url) || null;
    const address = clean(body?.address);
    const services = clean(body?.services);

    const socials = {
      facebook: clean(body?.facebook),
      instagram: clean(body?.instagram),
      tiktok: clean(body?.tiktok),
      youtube: clean(body?.youtube),
    };

    if (!business_name || !category || !city || !phone || !address || !services) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const socialsPayload = Object.values(socials).some(Boolean)
      ? `\n[SOCIALS] ${JSON.stringify(socials)}`
      : "";

    const { error } = await supabase.from("business_submissions").insert({
      business_name,
      category,
      city,
      phone,
      email,
      website_url,
      address,
      services: `${services}${socialsPayload}`,
      status: "pending",
      submitted_by: user.id,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, status: "pending" });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unexpected error while submitting listing." },
      { status: 500 }
    );
  }
}
