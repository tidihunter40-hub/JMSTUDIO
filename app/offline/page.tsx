import { ArrowLeft } from "lucide-react";

export default function OfflinePage() {
  return <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 30, background: "radial-gradient(circle at 50% 35%, #2a1022, #050507 65%)", color: "#fff", fontFamily: "Arial, sans-serif" }}><img src="/images/simbolo-jmstudio.png" alt="JMSTUDIO" width="100" height="100" /><h1 style={{ fontSize: "clamp(34px, 7vw, 62px)", margin: "20px 0 6px" }}>Você está offline</h1><p style={{ color: "#d3c8d0", maxWidth: 390, lineHeight: 1.5 }}>Confira sua conexão e tente novamente. O JMSTUDIO espera por você.</p><a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 20, border: "1px solid #ff9142", borderRadius: 100, padding: "12px 18px", color: "#fff", textDecoration: "none" }}><ArrowLeft size={18} aria-hidden="true" /> Voltar ao início</a></main>;
}
