"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  PlanId,
  CalculationResult,
  PlanComparisonItem,
  HistoryItem,
} from "@/types/calculator";
import { calculateDirect, calculateAllPlans } from "@/lib/calculations";
import { GGMAX_PLANS } from "@/lib/constants";

export function useCalculator() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("ouro");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [unitCost, setUnitCost] = useState<number>(0);
  const [withdrawFee, setWithdrawFee] = useState<number>(0);

  // Efeito de tintagem dinâmica no tema do app ao trocar de plano
  useEffect(() => {
    const root = document.documentElement;
    const plan = GGMAX_PLANS[selectedPlan];
    if (!plan) return;

    if (selectedPlan === "prata") {
      root.style.setProperty("--accent-color", "#94A3B8");
      root.style.setProperty("--accent-color-rgb", "148, 163, 184");
      root.style.setProperty("--accent-glow", "rgba(148, 163, 184, 0.25)");
    } else if (selectedPlan === "ouro") {
      root.style.setProperty("--accent-color", "#F59E0B");
      root.style.setProperty("--accent-color-rgb", "245, 158, 11");
      root.style.setProperty("--accent-glow", "rgba(245, 158, 11, 0.25)");
    } else if (selectedPlan === "diamante") {
      root.style.setProperty("--accent-color", "#06B6D4");
      root.style.setProperty("--accent-color-rgb", "6, 182, 212");
      root.style.setProperty("--accent-glow", "rgba(6, 182, 212, 0.25)");
    }
  }, [selectedPlan]);

  // Cálculo principal do resultado
  const result: CalculationResult = useMemo(() => {
    return calculateDirect({
      unitPrice,
      quantity,
      unitCost,
      selectedPlan,
      withdrawFee,
    });
  }, [unitPrice, quantity, unitCost, selectedPlan, withdrawFee]);

  // Comparativo de todos os planos
  const comparisons: PlanComparisonItem[] = useMemo(() => {
    return calculateAllPlans(
      unitPrice,
      quantity,
      unitCost,
      withdrawFee,
      selectedPlan
    );
  }, [unitPrice, quantity, unitCost, withdrawFee, selectedPlan]);

  // Disparar confetti de celebração em lucros altos (uma vez por cálculo alto)
  const triggerCelebration = useCallback(async () => {
    try {
      if (typeof window === "undefined") return;
      const confettiModule = (await import("canvas-confetti")).default;
      const p = confettiModule({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#F59E0B", "#10B981", "#06B6D4", "#FBBF24"],
      });
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    } catch {
      // Ignorar caso indisponível
    }
  }, []);

  const resetForm = useCallback(() => {
    setUnitPrice(0);
    setQuantity(1);
    setUnitCost(0);
  }, []);

  const restoreFromHistory = useCallback((item: HistoryItem) => {
    setSelectedPlan(item.planId);
    setQuantity(item.quantity);
    setUnitPrice(item.unitPrice);
    setUnitCost(item.totalCost > 0 && item.quantity > 0 ? item.totalCost / item.quantity : 0);
  }, []);

  return {
    selectedPlan,
    setSelectedPlan,
    unitPrice,
    setUnitPrice,
    quantity,
    setQuantity,
    unitCost,
    setUnitCost,
    withdrawFee,
    setWithdrawFee,
    result,
    comparisons,
    resetForm,
    restoreFromHistory,
    triggerCelebration,
  };
}
