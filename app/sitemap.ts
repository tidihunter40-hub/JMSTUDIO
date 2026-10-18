import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") || "https";
  const base = process.env.NEXT_PUBLIC_SITE_URL || (host ? `${protocol}://${host}` : null);
  return base ? [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base.replace(/\/$/, "")}/servicos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base.replace(/\/$/, "")}/contato`, changeFrequency: "monthly", priority: 0.7 },
  ] : [];
}
