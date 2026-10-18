import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Headphones, Mic2, Play, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/content/site";
import "./services-page.css";

export const metadata: Metadata = {
  title: "Serviços de gravação e produção musical",
  description: "Conheça os serviços do JMSTUDIO em Ribeira do Pombal: gravação profissional, mixagem, masterização, produção musical, vinhetas, spots e audiovisual.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Serviços de gravação e produção musical | JMSTUDIO",
    description: "Seu som em outro nível. Gravação, mixagem, masterização, produção musical, vinhetas e audiovisual no JMSTUDIO.",
    images: [{ url: "/images/services-studio.webp", width: 1665, height: 940, alt: "Estúdio musical com equipamentos e iluminação neon" }],
  },
};

const highlights = [
  { title: "Gravação", description: "Qualidade profissional em cada detalhe.", href: "#gravacao-profissional", icon: Mic2, color: "orange" },
  { title: "Mixagem", description: "Som limpo, potente e equilibrado.", href: "#mixagem-profissional", icon: SlidersHorizontal, color: "pink" },
  { title: "Masterização", description: "Seu som pronto para todas as plataformas.", href: "#masterizacao", icon: Headphones, color: "blue" },
  { title: "Produção", description: "Do zero à faixa final.", href: "#producao-musical", icon: Play, color: "gold" },
] as const;

const serviceDetails = [
  {
    id: "gravacao-profissional", title: "Gravação Profissional", description: "Gravação de vozes e instrumentos com qualidade, clareza e atenção aos detalhes.", image: "/images/service-recording.webp", imageAlt: "Microfone profissional em cabine de gravação iluminada em laranja",
    button: "Solicitar gravação", message: "Gravação Profissional", color: "orange",
  },
  {
    id: "mixagem-profissional", title: "Mixagem Profissional", description: "Tratamento, equilíbrio e definição dos elementos musicais para alcançar um resultado de alta qualidade.", image: "/images/service-mixing.webp", imageAlt: "Mesa de mixagem profissional iluminada em rosa",
    button: "Solicitar mixagem", message: "Mixagem Profissional", color: "pink",
  },
  {
    id: "masterizacao", title: "Masterização", description: "Finalização profissional do áudio, preparando sua música para distribuição e reprodução em diferentes plataformas.", image: "/images/service-mastering.webp", imageAlt: "Estação de masterização com onda sonora azul",
    button: "Solicitar masterização", message: "Masterização", color: "blue",
  },
  {
    id: "producao-musical", title: "Produção Musical", description: "Desenvolvimento musical desde a ideia inicial até a produção completa, de acordo com o estilo do artista.", image: "/images/service-production.webp", imageAlt: "Estação de produção musical com monitores e teclado",
    button: "Solicitar produção", message: "Produção Musical", color: "gold",
  },
  {
    id: "vinhetas-e-spots", title: "Vinhetas e Spots", description: "Produção de vinhetas, chamadas e materiais sonoros personalizados para divulgação.", image: "/images/service-spots.webp", imageAlt: "Microfone de estúdio com ondas de áudio vermelhas",
    button: "Solicitar vinheta", message: "Vinhetas e Spots", color: "red",
  },
  {
    id: "audiovisual", title: "Audiovisual", description: "Serviços de gravação e edição de vídeo, conteúdos musicais e materiais promocionais.", image: "/images/service-audiovisual.webp", imageAlt: "Câmera de cinema profissional em estúdio roxo",
    button: "Solicitar audiovisual", message: "Audiovisual", color: "violet",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="services-page" id="top">
      <Header />
      <main>
        <section className="services-page-hero" aria-labelledby="services-page-title">
          <div className="services-page-scene" role="img" aria-label="Estúdio musical com equipamentos e iluminação neon" />
          <Image className="services-mascot" src="/images/services-mascot.png" alt="Mascote do JMSTUDIO tocando trombone" width={900} height={1076} priority />
          <div className="services-hero-inner">
            <div className="services-hero-copy">
              <div className="services-hero-brand">
                <img src="/images/simbolo-jmstudio.png" alt="Símbolo oficial do JMSTUDIO" width="116" height="116" />
                <span><strong>JM</strong>STUDIO</span>
              </div>
              <p className="services-hero-script">Seu som em</p>
              <h1 id="services-page-title">OUTRO NÍVEL</h1>
              <p className="services-hero-description">Gravação, produção, mixagem e masterização<br className="services-desktop-break" /> com qualidade profissional.</p>
              <a className="services-hero-cta" href={whatsappUrl("Olá! Conheci os serviços do JMSTUDIO pelo site e gostaria de solicitar um orçamento.")} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden="true" /> <span>Fazer orçamento</span> <ArrowRight aria-hidden="true" size={24} />
              </a>
              <div className="services-highlights" aria-label="Ir para os serviços em destaque">
                {highlights.map(({ title, description, href, icon: Icon, color }) => (
                  <a className={`services-highlight tone-${color}`} href={href} key={title}>
                    <span className="services-highlight-icon"><Icon aria-hidden="true" size={32} strokeWidth={1.8} /></span>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="services-catalog" aria-labelledby="services-catalog-title">
          <div className="services-catalog-heading">
            <p className="services-kicker">Nossos serviços</p>
            <h2 id="services-catalog-title">Tudo o que sua música precisa, <em>em um só lugar.</em></h2>
            <p>Qualidade, tecnologia e experiência para levar o seu som mais longe.</p>
          </div>
          <div className="services-detail-grid">
            {serviceDetails.map(({ id, title, description, button, message, color, image, imageAlt }) => (
              <article className={`services-detail-card tone-${color}`} id={id} key={id}>
                <div className="services-card-art"><Image src={image} alt={imageAlt} fill sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw" /></div>
                <div className="services-card-body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href={whatsappUrl(`Olá! Gostaria de solicitar um orçamento para ${message} no JMSTUDIO.`)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon aria-hidden="true" /> <span>{button}</span> <ArrowRight aria-hidden="true" size={19} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
