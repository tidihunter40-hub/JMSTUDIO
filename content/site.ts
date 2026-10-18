export const site = {
  name: "JMSTUDIO",
  phoneDisplay: "(75) 99947-7852",
  phoneInternational: "5575999477852",
  youtube: "https://www.youtube.com/channel/UChFzf0w7lNKUcXfJUqj4QTA",
  location: "João do Alto — Ribeira do Pombal — BA",
  introMessage: "Olá! Conheci o JMSTUDIO pelo site e gostaria de solicitar um orçamento.",
};

// Fill these fields only with confirmed official details. The map and directions
// are enabled automatically when a complete street address is supplied.
export const contactDetails: {
  instagramUrl: string | null;
  instagramHandle: string | null;
  address: { street: string; number: string; neighborhood: string; city: string; state: string; postalCode?: string } | null;
  openingHours: string | null;
} = {
  instagramUrl: "https://www.instagram.com/juditrombone/",
  instagramHandle: "@juditrombone",
  address: null,
  openingHours: null,
};

export const services = [
  { title: "Gravação Multitrack", description: "Gravação profissional com múltiplas pistas.", icon: "mic", color: "pink" },
  { title: "Gravação LR", description: "Soluções de gravação LR para projetos musicais.", icon: "radio", color: "amber" },
  { title: "Produção Musical", description: "Produção de CDs, EPs e singles.", icon: "disc", color: "violet" },
  { title: "Mixagem", description: "Equilíbrio, definição e qualidade para suas músicas.", icon: "sliders", color: "coral" },
  { title: "Masterização", description: "Finalização profissional para suas produções.", icon: "headphones", color: "blue" },
  { title: "Ensaios", description: "Espaço para preparação e desenvolvimento musical.", icon: "music", color: "green" },
] as const;

export const portfolioVideos: Array<{ id: string; title: string; artist?: string }> = [
  { id: "iZP1rKlXEY0", title: "BRENNDON RIBEIRO JUNHO 2026", artist: "Brenndon Ribeiro" },
  { id: "uqyu4oLu1kc", title: "ADELMO PEGAÇAO SERESTA DO VAQUEIRO", artist: "Adelmo Pegação" },
  { id: "W5Gu9eFGrys", title: "VITINHO SANTOS SWING DE VERAO 3 0", artist: "Vitinho Santos" },
];
export const studioPhotos: Array<{ src: string; alt: string }> = [];
export const testimonials: Array<{ name: string; quote: string; project?: string; rating: number }> = [];

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.phoneInternational}?text=${encodeURIComponent(message)}`;
}
