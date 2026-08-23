import { PlanConfig, DeadlineCategory, PlanId } from "@/types/calculator";

export const GGMAX_PLANS: Record<PlanId, PlanConfig> = {
  prata: {
    id: "prata",
    name: "Prata",
    rate: 9.99,
    description: "Taxa básica reduzida de 9,99% sobre a venda",
    colorHex: "#94A3B8",
    accentClass: "from-slate-400 to-zinc-300 border-slate-400/30 text-slate-200",
    bgGlowClass: "shadow-[0_0_25px_rgba(148,163,184,0.15)]",
  },
  ouro: {
    id: "ouro",
    name: "Ouro",
    rate: 11.99,
    description: "Plano mais popular (11,99%) com destaque na página principal",
    badgeText: "Popular",
    colorHex: "#F59E0B",
    accentClass: "from-amber-400 to-yellow-500 border-amber-400/40 text-amber-300",
    bgGlowClass: "shadow-[0_0_30px_rgba(245,158,11,0.25)]",
  },
  diamante: {
    id: "diamante",
    name: "Diamante",
    rate: 12.99,
    description: "Máxima visibilidade (12,99%) com destaque na home e buscas",
    colorHex: "#06B6D4",
    accentClass: "from-cyan-400 to-blue-500 border-cyan-400/40 text-cyan-300",
    bgGlowClass: "shadow-[0_0_30px_rgba(6,182,212,0.25)]",
  },
};

export const DEADLINE_CATEGORIES: DeadlineCategory[] = [
  {
    id: "items_skins",
    name: "Moedas Virtuais, Itens, Cursos & Ebooks",
    standardDays: 4,
    description: "Prazo padrão: 4 dias (2 dias com avaliação positiva)",
  },
  {
    id: "accounts_services",
    name: "Contas de Jogos, Powerlevel & Serviços",
    standardDays: 7,
    description: "Prazo padrão: 7 dias (4 dias com avaliação positiva)",
  },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/muriloatavares/calculadora-de-taxas-ggmax",
  instagram: "https://www.instagram.com/muriloatavares/",
  discordUsername: "murilotavares",
};

export const DEFAULT_STATE = {
  unitPrice: 0,
  quantity: 1,
  unitCost: 0,
  selectedPlan: "ouro" as PlanId,
  withdrawFee: 0,
};
