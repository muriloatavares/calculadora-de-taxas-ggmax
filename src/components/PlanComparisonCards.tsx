"use client";

import React from "react";
import { Scale, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";
import { PlanComparisonItem, PlanId } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";

interface PlanComparisonCardsProps {
  comparisons: PlanComparisonItem[];
  selectedPlan: PlanId;
  onSelectPlan: (planId: PlanId) => void;
}

export const PlanComparisonCards: React.FC<PlanComparisonCardsProps> = ({
  comparisons,
  selectedPlan,
  onSelectPlan,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-[#06b6d4]" />
          Comparativo de Lucro entre os Planos
        </h4>
        <span className="text-[11px] text-gray-400">Clique para selecionar</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {comparisons.map(({ plan, result, isBestProfit, profitDifference }) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelectPlan(plan.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 relative overflow-hidden group ${
                isSelected
                  ? "bg-[#182030] border-[#00e676] shadow-md ring-1 ring-[#00e676]/40"
                  : "bg-[#111622] border-[#232d42] hover:bg-[#161c2b] hover:border-[#32405d]"
              }`}
            >
              {isBestProfit && (
                <span className="absolute top-0 right-0 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-bl-md bg-[#00e676] text-black">
                  Maior Lucro
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  {plan.name} ({plan.rate}%)
                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00e676]" />
                  )}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] text-gray-400 block">Lucro Líquido:</span>
                <span
                  className={`text-sm sm:text-base font-extrabold ${
                    result.netProfit >= 0 ? "text-[#00e676]" : "text-rose-400"
                  }`}
                >
                  {formatCurrency(result.netProfit)}
                </span>
              </div>

              {/* Diferença e Taxa */}
              <div className="mt-2.5 pt-2 border-t border-[#232d42] flex items-center justify-between text-[11px] text-gray-400">
                <span>Taxa: {formatCurrency(result.platformFee)}</span>
                {!isSelected && profitDifference !== 0 && (
                  <span
                    className={`font-bold flex items-center ${
                      profitDifference > 0 ? "text-[#00e676]" : "text-rose-400"
                    }`}
                  >
                    {profitDifference > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {profitDifference > 0 ? "+" : ""}
                    {formatCurrency(profitDifference)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
