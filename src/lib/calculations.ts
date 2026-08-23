import {
  CalculationResult,
  CalculatorState,
  PlanComparisonItem,
  PlanId,
  SplitResult,
  DeadlineResult,
  DeadlineCategory,
} from "@/types/calculator";
import { GGMAX_PLANS, DEADLINE_CATEGORIES } from "./constants";
import { formatCurrency, formatPercent, formatDate } from "./formatters";

/**
 * Cálculo de Taxas e Lucro Líquido para Anúncios GGMAX
 */
export function calculateDirect(state: CalculatorState): CalculationResult {
  const plan = GGMAX_PLANS[state.selectedPlan] || GGMAX_PLANS.ouro;
  const unitPrice = Math.max(0, state.unitPrice || 0);
  const quantity = Math.max(1, state.quantity || 1);
  const unitCost = Math.max(0, state.unitCost || 0);
  const withdrawFee = Math.max(0, state.withdrawFee || 0);

  const grossTotal = unitPrice * quantity;
  const platformFee = grossTotal * (plan.rate / 100);
  const netPlatform = grossTotal - platformFee;
  const totalCost = unitCost * quantity;
  const netProfit = netPlatform - totalCost - withdrawFee;

  const profitMargin = grossTotal > 0 ? (netProfit / grossTotal) * 100 : 0;
  const markupPercent = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  // Distribuição percentual da receita bruta
  const feePercent = grossTotal > 0 ? (platformFee / grossTotal) * 100 : 0;
  const costPercent = grossTotal > 0 ? ((totalCost + withdrawFee) / grossTotal) * 100 : 0;
  const profitPercent = grossTotal > 0 ? (Math.max(0, netProfit) / grossTotal) * 100 : 0;

  return {
    planId: plan.id,
    planRate: plan.rate,
    unitPrice,
    quantity,
    grossTotal,
    platformFee,
    netPlatform,
    totalCost,
    withdrawFee,
    netProfit,
    profitMargin,
    markupPercent,
    feePercent,
    costPercent,
    profitPercent,
  };
}

/**
 * Compara o resultado nos 3 planos GGMAX (Prata, Ouro e Diamante)
 */
export function calculateAllPlans(
  unitPrice: number,
  quantity: number,
  unitCost: number,
  withdrawFee: number,
  currentPlanId: PlanId
): PlanComparisonItem[] {
  const planKeys: PlanId[] = ["prata", "ouro", "diamante"];
  const results: PlanComparisonItem[] = [];

  let bestProfit = -Infinity;

  for (const pid of planKeys) {
    const res = calculateDirect({
      unitPrice,
      quantity,
      unitCost,
      selectedPlan: pid,
      withdrawFee,
    });

    if (res.netProfit > bestProfit) {
      bestProfit = res.netProfit;
    }
  }

  const currentResult = calculateDirect({
    unitPrice,
    quantity,
    unitCost,
    selectedPlan: currentPlanId,
    withdrawFee,
  });

  for (const pid of planKeys) {
    const plan = GGMAX_PLANS[pid];
    const res = calculateDirect({
      unitPrice,
      quantity,
      unitCost,
      selectedPlan: pid,
      withdrawFee,
    });

    results.push({
      plan,
      result: res,
      isBestProfit: res.netProfit === bestProfit && bestProfit > 0,
      profitDifference: res.netProfit - currentResult.netProfit,
    });
  }

  return results;
}

/**
 * Divide o lucro entre dois sócios/parceiros
 */
export function calculateSplit(netProfit: number, userPercent: number): SplitResult {
  const safeUser = Math.min(100, Math.max(0, userPercent || 50));
  const partnerPercent = 100 - safeUser;
  const userAmount = netProfit * (safeUser / 100);
  const partnerAmount = netProfit * (partnerPercent / 100);

  return {
    userPercent: safeUser,
    partnerPercent,
    userAmount,
    partnerAmount,
  };
}

/**
 * Calcula a data estimada de liberação do saldo pela GGMAX
 */
export function calculateDeadline(categoryId: string, isAccelerated: boolean): DeadlineResult {
  const category =
    DEADLINE_CATEGORIES.find((c) => c.id === categoryId) || DEADLINE_CATEGORIES[0];
  const days = isAccelerated ? Math.ceil(category.standardDays / 2) : category.standardDays;

  const releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() + days);

  return {
    category,
    isAccelerated,
    days,
    releaseDate,
    formattedDate: formatDate(releaseDate),
  };
}

/**
 * Gera texto formatado para cópia rápida no WhatsApp / Discord
 */
export function generateShareText(result: CalculationResult): string {
  const plan = GGMAX_PLANS[result.planId];
  return `📊 *Resumo de Venda GGMAX — Plano ${plan.name} (${plan.rate}%)*
━━━━━━━━━━━━━━━━━━━━
💰 *Valor Total do Anúncio:* ${formatCurrency(result.grossTotal)} (${result.quantity}x de ${formatCurrency(result.unitPrice)})
🔻 *Taxa GGMAX (${plan.rate}%):* ${formatCurrency(result.platformFee)}
📦 *Custo de Aquisição:* ${formatCurrency(result.totalCost)}
🏦 *Taxa de Saque:* ${formatCurrency(result.withdrawFee)}
━━━━━━━━━━━━━━━━━━━━
✨ *LUCRO LÍQUIDO:* ${formatCurrency(result.netProfit)}
📈 *Margem de Lucro:* ${formatPercent(result.profitMargin)}
━━━━━━━━━━━━━━━━━━━━
🚀 _Calculado via Calculadora de Taxas GGMAX_`;
}
