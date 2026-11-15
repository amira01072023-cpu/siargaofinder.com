import { NextResponse } from "next/server";

export const revalidate = 1800;

export async function GET() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=PHP", {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    const data = await res.json();
    const rate = data?.rates?.PHP;
    const date = data?.date;

    if (!rate) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      base: "USD",
      quote: "PHP",
      rate: Number(rate),
      date: date ?? null,
      source: "Frankfurter",
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
