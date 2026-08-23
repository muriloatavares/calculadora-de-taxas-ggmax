"use client";

import React from "react";
import { Copy, Check, BookmarkPlus, Share2 } from "lucide-react";
import { CalculationResult } from "@/types/calculator";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { GGMAX_PLANS } from "@/lib/constants";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ResultsDisplayProps {
  result: CalculationResult;
  onSaveHistory: () => void;
  onCopySummary: () => void;
  onOpenShare?: () => void;
  isCopied: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  onSaveHistory,
  onCopySummary,
  onOpenShare,
  isCopied,
}) => {
  const plan = GGMAX_PLANS[result.planId];

  // Animação de contagem fluida para valores financeiros
  const animatedNetProfit = useAnimatedNumber(result.netProfit, 350);
  const animatedGrossTotal = useAnimatedNumber(result.grossTotal, 350);
  const animatedFee = useAnimatedNumber(result.platformFee, 350);
  const animatedCost = useAnimatedNumber(result.totalCost, 350);
  const animatedWithdraw = useAnimatedNumber(result.withdrawFee, 350);

  const profitPct = Math.max(0, result.profitPercent);
  const feePct = Math.max(0, result.feePercent);
  const costPct = Math.max(0, result.costPercent);

  return (
    <div className="results-box space-y-3">
      {/* Linha: Total Bruto */}
      <div className="result-row">
        <span className="text-muted">Total do Anúncio:</span>
        <strong className="text-(--text-main) font-bold">
          {formatCurrency(animatedGrossTotal)}
        </strong>
      </div>

      {/* Linha: Taxa GGMAX */}
      <div className="result-row">
        <span className="text-muted">Taxa GGMAX ({plan.rate}%):</span>
        <strong className="text-fee">
          -{formatCurrency(animatedFee)}
        </strong>
      </div>

      {/* Linha: Custo de Aquisição (se houver) */}
      {result.totalCost > 0 && (
        <div className="result-row">
          <span className="text-muted">Custo de Aquisição:</span>
          <strong className="text-muted">
            -{formatCurrency(animatedCost)}
          </strong>
        </div>
      )}

      {/* Linha: Taxa de Saque (se houver) */}
      {result.withdrawFee > 0 && (
        <div className="result-row">
          <span className="text-muted">Taxa de Saque (PIX):</span>
          <strong className="text-muted">
            -{formatCurrency(animatedWithdraw)}
          </strong>
        </div>
      )}

      {/* Linha Destaque: Você Recebe */}
      <div className="result-row total">
        <span className="text-total-label">
          Você Recebe:
        </span>

        <div className="text-total-val">
          <span key={result.netProfit > 0 ? "has-profit" : "zero"} className="value-pop inline-block">
            {formatCurrency(animatedNetProfit)}
          </span>

          <button
            type="button"
            onClick={onCopySummary}
            className="icon-btn icon-btn--copy"
            title="Copiar Resumo"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-(--secondary) animate-[scaleIn_0.2s_ease]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Sub-informações: Margem e ROI */}
      {result.grossTotal > 0 && (
        <div className="flex items-center justify-between text-xs text-(--text-muted) pt-1">
          <span>
            Margem Líquida: <strong className="text-(--text-main)">{formatPercent(result.profitMargin)}</strong>
          </span>
          {result.markupPercent > 0 && (
            <span>
              ROI: <strong className="text-(--secondary)">+{formatPercent(result.markupPercent)}</strong>
            </span>
          )}
        </div>
      )}

      {/* Barramento Visual Proporcional */}
      {result.grossTotal > 0 && (
        <div className="progress-bar">
          {profitPct > 0 && (
            <div
              style={{ width: `${profitPct}%`, background: "var(--secondary)" }}
              className="bar-fill"
              title={`Lucro: ${formatPercent(profitPct)}`}
            />
          )}
          {feePct > 0 && (
            <div
              style={{ width: `${feePct}%`, background: "var(--warning)" }}
              className="bar-fill"
              title={`Taxa: ${formatPercent(feePct)}`}
            />
          )}
          {costPct > 0 && (
            <div
              style={{ width: `${costPct}%`, background: "var(--cost-color)" }}
              className="bar-fill"
              title={`Custos e Saque: ${formatPercent(costPct)}`}
            />
          )}
        </div>
      )}

      {/* Grid de Botões de Ação */}
      <div className="actions-grid">
        <button
          type="button"
          onClick={onSaveHistory}
          className="btn btn-primary btn-primary--save"
        >
          <BookmarkPlus className="w-4 h-4" />
          Salvar
        </button>

        <button
          type="button"
          onClick={onOpenShare || onCopySummary}
          className="btn btn-outline"
        >
          <Share2 className="w-4 h-4" />
          Exportar
        </button>
      </div>
    </div>
  );
};
