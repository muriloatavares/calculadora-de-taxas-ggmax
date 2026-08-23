export type PlanId = "prata" | "ouro" | "diamante";

export interface PlanConfig {
  id: PlanId;
  name: string;
  rate: number; // e.g. 9.99, 11.99, 12.99
  description: string;
  badgeText?: string;
  colorHex: string;
  accentClass: string;
  bgGlowClass: string;
}

export interface CalculatorState {
  unitPrice: number; // Valor Unitário
  quantity: number; // Quantidade
  unitCost: number; // Custo Unitário de Aquisição (opcional)
  selectedPlan: PlanId; // Plano GGMAX
  withdrawFee: number; // Taxa de Saque (opcional)
}

export interface CalculationResult {
  planId: PlanId;
  planRate: number;
  unitPrice: number;
  quantity: number;
  grossTotal: number; // Valor Bruto (Total Anúncio)
  platformFee: number; // Taxa GGMAX
  netPlatform: number; // Valor após taxa GGMAX
  totalCost: number; // Custo total de compra
  withdrawFee: number; // Taxa de saque
  netProfit: number; // Lucro Líquido Final
  profitMargin: number; // Margem de Lucro (% do bruto)
  markupPercent: number; // Markup sobre o custo (%)
  feePercent: number; // % da taxa real
  costPercent: number; // % do custo
  profitPercent: number; // % do lucro
}

export interface PlanComparisonItem {
  plan: PlanConfig;
  result: CalculationResult;
  isBestProfit: boolean;
  profitDifference: number; // Diferença em relação ao plano selecionado
}

export interface SplitResult {
  userPercent: number;
  partnerPercent: number;
  userAmount: number;
  partnerAmount: number;
}

export interface DeadlineCategory {
  id: string;
  name: string;
  standardDays: number;
  description: string;
}

export interface DeadlineResult {
  category: DeadlineCategory;
  isAccelerated: boolean;
  days: number;
  releaseDate: Date;
  formattedDate: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  formattedDate: string;
  planId: PlanId;
  grossTotal: number;
  netProfit: number;
  platformFee: number;
  totalCost: number;
  quantity: number;
  unitPrice: number;
}
