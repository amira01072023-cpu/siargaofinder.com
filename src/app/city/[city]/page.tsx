import { permanentRedirect } from "next/navigation";

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  permanentRedirect(`/municipality/${city}`);
}
