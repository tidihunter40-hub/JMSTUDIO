"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site, whatsappUrl } from "@/content/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const links = [
  { label: "Início", id: "inicio", href: "/" },
  { label: "Serviços", id: "servicos", href: "/servicos" },
  { label: "Portfólio", id: "portfolio", href: "/#portfolio" },
  { label: "Contato", id: "contato", href: "/contato" },
] as const;

type NavId = (typeof links)[number]["id"];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavId>(pathname === "/contato" ? "contato" : pathname === "/servicos" ? "servicos" : "inicio");
  const [scrolled, setScrolled] = useState(false);
  const selectionLockUntil = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        if (!isHome) {
          setActive(pathname === "/contato" ? "contato" : "servicos");
          return;
        }
        if (Date.now() < selectionLockUntil.current) return;

        const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 80;
        const activationLine = Math.min(window.innerHeight - 1, headerHeight + Math.min(window.innerHeight * 0.28, 250));
        let current: NavId = "inicio";
        for (const [selector, id] of [["#servicos", "servicos"], ["#portfolio", "portfolio"]] as const) {
          if ((document.querySelector(selector)?.getBoundingClientRect().top ?? Infinity) <= activationLine) current = id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [isHome, pathname]);

  const selectLink = (id: NavId) => {
    selectionLockUntil.current = Date.now() + 700;
    setActive(id);
    setOpen(false);
  };

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="header-inner container-wide">
        <a className="brand" href={isHome ? "#inicio" : "/"} aria-label="JMSTUDIO, voltar ao início" onClick={() => selectLink("inicio")}>
          <img src="/images/simbolo-jmstudio.png" alt="" width="56" height="56" />
          <span className="brand-word"><strong>JM</strong>STUDIO</span>
        </a>
        <nav id="mobile-menu" className={open ? "nav-links nav-open" : "nav-links"} aria-label="Navegação principal">
          {links.map(({ label, id, href }) => (
            <a key={id} href={isHome && id === "inicio" ? "#inicio" : isHome && id === "portfolio" ? "#portfolio" : href} aria-current={active === id ? "location" : undefined} onClick={() => selectLink(id)}>{label}</a>
          ))}
        </nav>
        <a className="header-cta neon-outline" href={whatsappUrl(site.introMessage)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="header-whatsapp" /> Fazer orçamento <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>
    </header>
  );
}
