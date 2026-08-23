"use client";

import React, { useRef, useState } from "react";
import { X, Download, Copy, Check, Share2, MessageSquare } from "lucide-react";
import { CalculationResult } from "@/types/calculator";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { GGMAX_PLANS } from "@/lib/constants";
import { generateShareText } from "@/lib/calculations";
import { toPng } from "html-to-image";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult;
  onShowToast: (msg: string, type: "success" | "info" | "warning" | "error") => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  result,
  onShowToast,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const plan = GGMAX_PLANS[result.planId];

  const handleCopyText = async () => {
    try {
      const text = generateShareText(result);
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      onShowToast("Texto copiado para a área de transferência!", "success");
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      onShowToast("Falha ao copiar texto.", "error");
    }
  };

  const handleExportImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        backgroundColor: "#0a1628",
      });

      const link = document.createElement("a");
      link.download = `calculo-ggmax-${result.planId}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      onShowToast("Imagem exportada com sucesso!", "success");
    } catch (err) {
      console.error(err);
      onShowToast("Erro ao exportar imagem.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="modal-close"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="tool-title mb-4">
          <Share2 className="w-5 h-5 text-(--primary)" />
          Exportar Comprovante
        </h3>

        {/* Card Visual para Print/Imagem */}
        <div
          ref={cardRef}
          className="p-4 rounded-xl bg-(--bg-input) border border-(--border-color) space-y-3 mb-4 text-left"
        >
          <div className="flex items-center justify-between border-b border-(--border-color) pb-2">
            <span className="text-xs font-bold text-(--text-main)">
              GGMAX CALCULADORA
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-(--bg-card) text-(--text-muted) font-bold border border-(--border-color)">
              Plano {plan.name} ({plan.rate}%)
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-(--text-muted) block">
              Você Recebe:
            </span>
            <div className="text-2xl font-black text-(--secondary)">
              {formatCurrency(result.netProfit)}
            </div>
            <span className="text-[11px] text-(--text-muted)">
              Margem Líquida: {formatPercent(result.profitMargin)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-(--border-color)">
            <div>
              <span className="text-[10px] text-(--text-muted) block">Total Anúncio</span>
              <strong className="text-(--text-main)">{formatCurrency(result.grossTotal)}</strong>
            </div>
            <div>
              <span className="text-[10px] text-(--text-muted) block">Taxa GGMAX</span>
              <strong className="text-(--danger)">-{formatCurrency(result.platformFee)}</strong>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="actions-grid mt-0!">
          <button
            type="button"
            onClick={handleCopyText}
            className="btn btn-outline"
          >
            {isCopied ? <Check className="w-4 h-4 text-(--secondary)" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Copiado!" : "Copiar Texto"}
          </button>

          <button
            type="button"
            onClick={handleExportImage}
            disabled={isExporting}
            className="btn btn-primary"
          >
            <Download className="w-4 h-4" />
            {isExporting ? "Gerando..." : "Baixar PNG"}
          </button>
        </div>
      </div>
    </div>
  );
};
