"use client";

import React from "react";
import { PieChart } from "lucide-react";
import { CalculationResult } from "@/types/calculator";
import { formatPercent, formatCurrency } from "@/lib/formatters";

interface RevenueBreakdownProps {
  result: CalculationResult;
}

export const RevenueBreakdown: React.FC<RevenueBreakdownProps> = ({ result }) => {
  if (result.grossTotal <= 0) return null;

  const profitPct = Math.max(0, result.profitPercent);
  const feePct = Math.max(0, result.feePercent);
  const costPct = Math.max(0, result.costPercent);

  return (
    <div className="p-4 rounded-xl bg-[#111622] border border-[#232d42] space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5 text-[#00e676]" />
          Distribuição da Venda
        </h4>
        <span className="text-[11px] text-gray-400 font-medium">
          Total: <strong className="text-white">{formatCurrency(result.grossTotal)}</strong> (100%)
        </span>
      </div>

      {/* Barra de Distribuição Segmentada */}
      <div className="w-full h-3 bg-[#0d121c] rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-[#232d42]">
        {profitPct > 0 && (
          <div
            style={{ width: `${profitPct}%` }}
            className="h-full bg-[#00e676] rounded-l-full transition-all duration-200"
            title={`Seu Lucro: ${formatPercent(profitPct)}`}
          />
        )}
        {feePct > 0 && (
          <div
            style={{ width: `${feePct}%` }}
            className="h-full bg-[#f59e0b] transition-all duration-200"
            title={`Taxa GGMAX: ${formatPercent(feePct)}`}
          />
        )}
        {costPct > 0 && (
          <div
            style={{ width: `${costPct}%` }}
            className="h-full bg-[#a855f7] rounded-r-full transition-all duration-200"
            title={`Custos e Saque: ${formatPercent(costPct)}`}
          />
        )}
      </div>

      {/* Legenda com Cores Oficiais */}
      <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#00e676] shrink-0" />
          <div>
            <span className="text-gray-400 block text-[10px]">Seu Lucro</span>
            <strong className="text-white">{formatPercent(profitPct)}</strong>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b] shrink-0" />
          <div>
            <span className="text-gray-400 block text-[10px]">Taxa GGMAX</span>
            <strong className="text-[#f59e0b]">{formatPercent(feePct)}</strong>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#a855f7] shrink-0" />
          <div>
            <span className="text-gray-400 block text-[10px]">Custos/Saque</span>
            <strong className="text-gray-300">{formatPercent(costPct)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
