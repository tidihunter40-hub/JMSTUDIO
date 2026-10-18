import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/PwaRegister";
import { site } from "@/content/site";
import "./globals.css";
import "./portfolio.css";
import "./whatsapp.css";
import "./mobile-fix.css";
import "./animation.css";
import "./neon-experience.css";
import "./portfolio-premium.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: { default: "JMSTUDIO | Sua música no próximo nível", template: "%s | JMSTUDIO" },
  description: "Estúdio de gravação e produção musical em João do Alto, Ribeira do Pombal, Bahia. Gravação multitrack e LR, produção musical, mixagem, masterização e ensaios.",
  keywords: ["JMSTUDIO", "JMSTUDIO Ribeira do Pombal", "estúdio de gravação Ribeira do Pombal", "produção musical Ribeira do Pombal", "mixagem e masterização Ribeira do Pombal", "estúdio musical Bahia"],
  applicationName: "JMSTUDIO",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "JMSTUDIO" },
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }], apple: "/icons/icon-192.png" },
  openGraph: { title: "JMSTUDIO | Sua música no próximo nível", description: "Gravação, produção musical, mixagem, masterização e ensaios em Ribeira do Pombal, BA.", type: "website", locale: "pt_BR", images: [{ url: "/images/studio-hero-neon.webp", width: 2051, height: 767, alt: "Imagem ilustrativa de um estúdio de produção musical" }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050507", width: "device-width", initialScale: 1 };

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: "Estúdio de gravação e produção musical em Ribeira do Pombal, Bahia.",
  telephone: `+${site.phoneInternational}`,
  areaServed: { "@type": "Place", name: "Ribeira do Pombal, Bahia, Brasil" },
  sameAs: [site.youtube],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{document.addEventListener('click',function(e){var t=e.target;if(!window.__jmIntroReady&&t&&t.closest&&t.closest('.jm-intro__skip')){window.__jmIntroSkipped=true;document.documentElement.removeAttribute('data-jm-intro')}},true);var seen=false;try{seen=sessionStorage.getItem('jmstudio:intro-seen:v4')==='1'}catch(e){}var replay=new URLSearchParams(location.search).get('ver-intro')==='1';if(location.pathname==='/'&&(!seen||replay)){document.documentElement.setAttribute('data-jm-intro','show');window.__jmIntroFallback=setTimeout(function(){document.documentElement.removeAttribute('data-jm-intro')},30000)}}catch(e){}` }} /></head><body>{children}<PwaRegister /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
