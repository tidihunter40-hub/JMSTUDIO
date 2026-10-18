import { ArrowRight, ArrowUp, AudioLines, ChevronRight, House, Instagram, MapPin, Navigation, SlidersHorizontal, Youtube } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { FooterYear } from "@/components/FooterYear";
import { contactDetails, site, whatsappUrl } from "@/content/site";
import "./footer.css";

const footerServices = [
  { title: "Gravação Profissional", href: "/servicos#gravacao-profissional" },
  { title: "Mixagem Profissional", href: "/servicos#mixagem-profissional" },
  { title: "Masterização", href: "/servicos#masterizacao" },
  { title: "Produção Musical", href: "/servicos#producao-musical" },
  { title: "Vinhetas e Spots", href: "/servicos#vinhetas-e-spots" },
  { title: "Audiovisual", href: "/servicos#audiovisual" },
] as const;

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("João do Alto, Ribeira do Pombal - BA, Brasil")}`;

export function Footer({ topHref = "#top" }: { topHref?: string }) {
  const whatsapp = whatsappUrl(site.introMessage);

  return (
    <footer className="site-footer" aria-label="Rodapé do JMSTUDIO">
      <div className="site-footer-shell">
        <div className="site-footer-grid">
          <div className="site-footer-about">
            <a className="site-footer-logo" href="/" aria-label="JMSTUDIO, ir para o início">
              <img src="/images/logo-jmstudio.webp" alt="JMSTUDIO" width="1550" height="340" loading="lazy" />
            </a>
            <p className="site-footer-slogan">Sua música no próximo nível.</p>
            <span className="site-footer-accent" aria-hidden="true" />
            <p className="site-footer-description">Gravação, produção, mixagem e masterização com qualidade profissional para transformar suas ideias em grandes músicas.</p>
            <div className="site-footer-socials" aria-label="Redes sociais e WhatsApp">
              {contactDetails.instagramUrl && <a className="site-footer-social site-footer-social-instagram" href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${contactDetails.instagramHandle || "do JMSTUDIO"}`}>
                <span className="site-footer-social-icon"><Instagram aria-hidden="true" size={31} strokeWidth={2} /></span><span>Instagram</span>
              </a>}
              <a className="site-footer-social site-footer-social-youtube" href={site.youtube} target="_blank" rel="noopener noreferrer" aria-label="Canal do JMSTUDIO no YouTube">
                <span className="site-footer-social-icon"><Youtube aria-hidden="true" size={32} fill="currentColor" strokeWidth={1.6} /></span><span>YouTube</span>
              </a>
              <a className="site-footer-social site-footer-social-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar com o JMSTUDIO pelo WhatsApp">
                <span className="site-footer-social-icon"><WhatsAppIcon /></span><span>WhatsApp</span>
              </a>
            </div>
          </div>

          <nav className="site-footer-column" aria-label="Navegação do rodapé">
            <h2><House aria-hidden="true" size={26} /> Navegação</h2><span className="site-footer-accent" aria-hidden="true" />
            <ul className="site-footer-nav-list">
              <li><a href="/"><ChevronRight aria-hidden="true" size={19} /> Início</a></li>
              <li><a href="/servicos"><ChevronRight aria-hidden="true" size={19} /> Serviços</a></li>
              <li><a href="/#portfolio"><ChevronRight aria-hidden="true" size={19} /> Portfólio</a></li>
              <li><a href="/contato"><ChevronRight aria-hidden="true" size={19} /> Contato</a></li>
            </ul>
          </nav>

          <nav className="site-footer-column" aria-label="Serviços do JMSTUDIO">
            <h2><SlidersHorizontal aria-hidden="true" size={27} /> Nossos serviços</h2><span className="site-footer-accent" aria-hidden="true" />
            <ul className="site-footer-services-list">{footerServices.map(item => <li key={item.href}><a href={item.href}>{item.title}</a></li>)}</ul>
          </nav>

          <div className="site-footer-column site-footer-contact">
            <h2><MapPin aria-hidden="true" size={27} /> Contato</h2><span className="site-footer-accent" aria-hidden="true" />
            <ul className="site-footer-contact-list">
              <li><span className="site-footer-contact-icon"><MapPin aria-hidden="true" size={21} /></span><span>{site.location}<small>Região aproximada</small></span></li>
              <li><span className="site-footer-contact-icon site-footer-contact-whatsapp"><WhatsAppIcon /></span><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp: {site.phoneDisplay}</a></li>
              {contactDetails.instagramUrl && <li><span className="site-footer-contact-icon site-footer-contact-instagram"><Instagram aria-hidden="true" size={20} /></span><a href={contactDetails.instagramUrl} target="_blank" rel="noopener noreferrer">{contactDetails.instagramHandle}</a></li>}
              <li><span className="site-footer-contact-icon site-footer-contact-youtube"><Youtube aria-hidden="true" size={20} fill="currentColor" /></span><a href={site.youtube} target="_blank" rel="noopener noreferrer">Canal no YouTube</a></li>
            </ul>
            <a className="site-footer-directions" href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Como chegar à região de João do Alto no Google Maps">
              <Navigation aria-hidden="true" size={21} /><span>Como chegar</span><ArrowRight aria-hidden="true" size={21} />
            </a>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <div className="site-footer-bottom-inner">
          <AudioLines className="site-footer-bottom-wave" aria-hidden="true" size={43} strokeWidth={1.4} />
          <span>© <FooterYear initialYear={new Date().getFullYear()} /> <strong>JMSTUDIO.</strong> Todos os direitos reservados.</span>
          <a href={topHref}>Voltar ao topo <ArrowUp aria-hidden="true" size={22} /></a>
          <AudioLines className="site-footer-bottom-wave" aria-hidden="true" size={43} strokeWidth={1.4} />
        </div>
      </div>
    </footer>
  );
}
