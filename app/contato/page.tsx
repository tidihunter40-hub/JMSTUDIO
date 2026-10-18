import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, AudioLines, Clock3, Headphones, MapPin, Mic2, Navigation, SlidersHorizontal, Youtube, Instagram } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExternalServicesStatus } from "@/components/ExternalServicesStatus";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { contactDetails, site, whatsappUrl } from "@/content/site";
import "./contact-page.css";
import "./contact-lower.css";

export const metadata: Metadata = {
  title: "Contato e Localização",
  description: "Entre em contato com o JMSTUDIO. Conheça nossos serviços de gravação, produção musical, mixagem e masterização. Solicite seu orçamento e saiba como chegar ao estúdio.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato e Localização | JMSTUDIO",
    description: "Entre em contato com o JMSTUDIO e converse sobre seu próximo projeto musical.",
    images: [{ url: "/images/contact-hero-studio.webp", alt: "Estúdio de gravação profissional com iluminação neon" }],
  },
};

const contactMessage = "Olá! Conheci o JMSTUDIO pelo site e gostaria de saber mais sobre os serviços do estúdio.";

type ChannelCardProps = {
  tone: "whatsapp" | "instagram" | "youtube";
  icon: React.ReactNode;
  title: React.ReactNode;
  handle?: string;
  description: string;
  action: string;
  href: string;
};

function ChannelCard({ tone, icon, title, handle, description, action, href }: ChannelCardProps) {
  return <article className={`contact-channel contact-channel-${tone}`}>
    <div className="contact-channel-icon">{icon}</div>
    <div className="contact-channel-body"><h3>{title}</h3>{handle && <span className="contact-channel-handle">{handle}</span>}<p>{description}</p></div>
    <a href={href} target="_blank" rel="noopener noreferrer">{action}<ArrowUpRight size={19} aria-hidden="true" /></a>
  </article>;
}

export default function ContactPage() {
  const regionLabel = "Bairro João do Alto — Ribeira do Pombal — BA";
  const address = contactDetails.address && [contactDetails.address.street, contactDetails.address.number, contactDetails.address.neighborhood, contactDetails.address.city, contactDetails.address.state].every(value => value.trim().length > 0) ? contactDetails.address : null;
  const addressText = address ? [address.street, address.number, address.neighborhood, address.city, address.state, address.postalCode].filter(Boolean).join(", ") : null;
  const mapQuery = addressText || "João do Alto, Ribeira do Pombal - BA, Brasil";
  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`;

  return <div className="contact-page" id="top">
    <Header />
    <ExternalServicesStatus />
    <main>
      <section className="contact-hero" aria-labelledby="contact-hero-title">
        <div className="contact-hero-scene" role="img" aria-label="Estúdio de gravação com microfone, mesa de som e iluminação neon" />
        <div className="contact-hero-inner container-wide">
          <div className="contact-hero-copy">
            <p className="contact-kicker contact-hero-kicker"><img src="/images/simbolo-jmstudio.png" alt="" width="38" height="38" /> Contato JMSTUDIO</p>
            <h1 id="contact-hero-title"><span>Sua próxima música</span><strong>começa aqui!</strong></h1>
            <AudioLines className="contact-title-wave" size={96} strokeWidth={1.5} aria-hidden="true" />
            <p className="contact-hero-description">Tem uma ideia, um projeto ou uma música esperando para ganhar vida? Entre em contato com o JMSTUDIO e vamos transformar seu talento em um som profissional.</p>
            <a className="contact-primary-cta" href={whatsappUrl(contactMessage)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>Falar com o JMSTUDIO</span><ArrowRight size={21} aria-hidden="true" /></a>
            <div className="contact-hero-services" aria-label="Serviços do JMSTUDIO"><span><Mic2 size={17} aria-hidden="true" /> Gravação</span><span><SlidersHorizontal size={17} aria-hidden="true" /> Produção</span><span><Headphones size={17} aria-hidden="true" /> Mixagem</span><span><AudioLines size={18} aria-hidden="true" /> Masterização</span></div>
          </div>
        </div>
      </section>

      <section className="contact-channels" aria-labelledby="contact-channels-title">
        <div className="container-wide">
          <div className="contact-section-heading"><AudioLines className="contact-heading-wave contact-heading-wave-left" aria-hidden="true" /><p className="contact-kicker">Contato JMSTUDIO</p><h2 id="contact-channels-title">Vamos <strong>conversar?</strong></h2><p>Escolha a melhor maneira de entrar em contato com o JMSTUDIO.</p><AudioLines className="contact-heading-wave contact-heading-wave-right" aria-hidden="true" /></div>
          <div className="contact-channel-grid">
            <ChannelCard tone="whatsapp" icon={<WhatsAppIcon />} title={<>Fale pelo <em>WhatsApp</em></>} description="Solicite orçamentos, tire dúvidas e converse sobre seu próximo projeto musical." action="Iniciar conversa" href={whatsappUrl(contactMessage)} />
            {contactDetails.instagramUrl && <ChannelCard tone="instagram" icon={<Instagram size={36} strokeWidth={1.8} aria-hidden="true" />} title={<>Siga nosso <em>Instagram</em></>} handle={contactDetails.instagramHandle || undefined} description="Acompanhe nossos trabalhos, novidades e bastidores musicais." action="Acessar Instagram" href={contactDetails.instagramUrl} />}
            <ChannelCard tone="youtube" icon={<Youtube size={38} strokeWidth={1.8} aria-hidden="true" />} title={<>Conheça nossos <em>trabalhos</em></>} description="Assista nossos vídeos, produções e projetos musicais no canal." action="Acessar YouTube" href={site.youtube} />
          </div>
        </div>
      </section>

      <section className="contact-location" aria-labelledby="contact-location-title">
        <div className="container-wide">
          <div className="contact-location-grid">
            <div className="contact-location-left">
              <div className="contact-section-heading"><p className="contact-kicker"><MapPin size={17} aria-hidden="true" /> Onde estamos</p><h2 id="contact-location-title">Venha conhecer <strong>o JMSTUDIO!</strong></h2><p>Estamos prontos para receber você e transformar suas ideias em grandes produções musicais. Confira nossa localização e descubra como chegar até o estúdio.</p></div>
              <div className="contact-location-info">
              <div className="contact-info-row"><span className="contact-info-icon"><MapPin aria-hidden="true" /></span><div><h3>{address ? "Endereço do estúdio" : "Região do estúdio"}</h3>{address ? <address>{address.street}, {address.number}<br />{address.neighborhood}<br />{address.city} — {address.state}{address.postalCode && <><br />CEP {address.postalCode}</>}</address> : <p>{regionLabel}</p>}</div></div>
              <div className="contact-info-row"><span className="contact-info-icon"><Clock3 aria-hidden="true" /></span><div><h3>Horário de atendimento</h3><p>{contactDetails.openingHours || "Consulte os horários pelo WhatsApp."}</p></div></div>
              <div className="contact-info-row"><span className="contact-info-icon"><WhatsAppIcon /></span><div><h3>Agendamentos</h3><a className="contact-inline-link" href={whatsappUrl("Olá! Gostaria de agendar uma visita ao JMSTUDIO.")} target="_blank" rel="noopener noreferrer">Agendar pelo WhatsApp <ArrowUpRight size={17} aria-hidden="true" /></a></div></div>
              <a className="contact-directions" href={mapsDirections} target="_blank" rel="noopener noreferrer"><Navigation size={19} aria-hidden="true" /> {address ? "Como chegar ao estúdio" : "Como chegar à região"} <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="contact-map">
              <iframe title={address ? "Localização do JMSTUDIO no Google Maps" : "Mapa interativo da região de João do Alto em Ribeira do Pombal"} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              <div className="contact-map-label"><strong>{address ? "JMSTUDIO" : "REGIÃO DO JMSTUDIO"}</strong><span>{addressText || regionLabel}</span>{!address && <small>Ponto exato sob confirmação</small>}<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noopener noreferrer">Ver no Google Maps <ArrowUpRight size={14} aria-hidden="true" /></a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-final" aria-labelledby="contact-final-title"><div className="container-wide"><p className="contact-kicker"><AudioLines size={23} aria-hidden="true" /> Vamos fazer música?</p><h2 id="contact-final-title">Pronto para <strong>dar vida à sua música?</strong></h2><p>O JMSTUDIO tem a estrutura e a dedicação para ajudar você a transformar seu projeto em realidade. Entre em contato e vamos começar!</p><a className="contact-primary-cta" href={whatsappUrl(site.introMessage)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /><span>Solicitar meu orçamento</span><ArrowUpRight size={20} aria-hidden="true" /></a></div></section>
    </main>
    <Footer />
  </div>;
}
