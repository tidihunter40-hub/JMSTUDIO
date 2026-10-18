import {
  ArrowDown, ArrowRight, AudioLines, BadgeCheck,
  Disc3, Headphones, Mic2, Music2, Radio, SlidersHorizontal, Zap
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { IntroVideo } from "@/components/IntroVideo";
import { PortfolioSection } from "@/components/PortfolioSection";
import { services, site, whatsappUrl } from "@/content/site";

const icons = { mic: Mic2, radio: Radio, disc: Disc3, sliders: SlidersHorizontal, headphones: Headphones, music: Music2 };

export default function Home() {
  return (
    <>
      <IntroVideo portraitSrc="/videos/jmstudio-intro-portrait-optimized.mp4" />
      <Header />
      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-photo" role="img" aria-label="Imagem ilustrativa de uma sala de produção musical com iluminação azul e laranja" />
          <div className="hero-shade" />
          <div className="hero-inner container-wide">
            <div className="hero-copy">
              <img className="hero-symbol" src="/images/simbolo-jmstudio.png" alt="Símbolo JMSTUDIO" width="170" height="170" />
              <p className="hero-brand"><strong>JM</strong>STUDIO</p>
              <p className="hero-script">Sua música no</p>
              <h1 id="hero-title"><AudioLines className="wave wave-left" aria-hidden="true" /><span>PRÓXIMO NÍVEL</span><AudioLines className="wave wave-right" aria-hidden="true" /></h1>
              <p className="hero-services">GRAVAÇÃO <i>•</i> PRODUÇÃO <i>•</i> MIXAGEM <i>•</i> MASTERIZAÇÃO</p>
              <p className="hero-description">Transformamos suas ideias em músicas reais.<br />Qualidade profissional, estrutura completa e um som<br className="desktop-break" /> que leva seu talento mais longe.</p>
              <a className="button-primary hero-button" href={whatsappUrl(site.introMessage)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="whatsapp-icon" /> Solicitar orçamento <ArrowRight size={22} aria-hidden="true" /></a>
            </div>
            <a className="scroll-cue" href="#servicos" aria-label="Ver serviços"><ArrowDown size={17} aria-hidden="true" /> Explore o estúdio</a>
          </div>
        </section>

        <section className="services-section" id="servicos" aria-labelledby="services-title">
          <div className="container-wide">
            <div className="section-intro services-intro"><span className="eyebrow">O que fazemos</span><h2 id="services-title">Seu som, do primeiro take à versão final.</h2></div>
            <div className="services-grid">
              {services.map((item) => {
                const Icon = icons[item.icon];
                return <article className={`service-card accent-${item.color}`} key={item.title}>
                  <Icon className="service-icon" size={43} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{item.title}</h3><p>{item.description}</p>
                </article>;
              })}
            </div>
          </div>
        </section>

        <div className="benefits-strip"><div className="benefits-inner container-wide">
          <div><BadgeCheck aria-hidden="true" /><span>Equipamentos<br />profissionais</span></div>
          <div><Headphones aria-hidden="true" /><span>Atendimento<br />personalizado</span></div>
          <div><AudioLines aria-hidden="true" /><span>Qualidade em<br />cada detalhe</span></div>
          <div><Zap aria-hidden="true" /><span>Do seu jeito,<br />ao seu estilo</span></div>
        </div></div>

        <PortfolioSection />

      </main>
      <Footer topHref="#inicio" />
      <ScrollReveal />
    </>
  );
}
