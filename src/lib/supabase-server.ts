import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
const cookieStore = await cookies();

return createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() {
return cookieStore.getAll();
},
setAll(cookiesToSet) {
cookiesToSet.forEach(({ name, value, options }) => {
try {
cookieStore.set(name, value, options);
} catch {
// Next.js only allows cookie mutation in Server Actions or Route Handlers.
// During Server Component rendering, Supabase may attempt a refresh write;
// safely ignore it and let middleware/route actions handle persistence.
}
});
},
},
}
);
}
