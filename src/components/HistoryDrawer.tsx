"use client";

import React from "react";
import { X, Trash2, RotateCcw, History } from "lucide-react";
import { HistoryItem } from "@/types/calculator";
import { formatCurrency } from "@/lib/formatters";
import { GGMAX_PLANS } from "@/lib/constants";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onRestore,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

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

        <div className="history-header">
          <span className="history-title flex items-center gap-1.5">
            <History className="w-4 h-4 text-(--primary)" />
            Histórico ({history.length})
          </span>

          {history.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="history-clear-btn"
            >
              Limpar Tudo
            </button>
          )}
        </div>

        {/* Lista de Cálculos Salvos */}
        <div className="history-list max-h-[60vh] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <div className="history-empty">
              Nenhum cálculo salvo ainda.
            </div>
          ) : (
            history.map((item) => {
              const plan = GGMAX_PLANS[item.planId] || GGMAX_PLANS.ouro;
              return (
                <div key={item.id} className="history-item flex-col gap-1.5 p-3!">
                  <div className="flex items-center justify-between text-xs text-(--text-muted)">
                    <span>{item.formattedDate}</span>
                    <span className="font-bold">Plano {plan.name}</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-(--text-muted) uppercase block">Lucro</span>
                      <strong className="text-sm font-bold text-(--secondary)">
                        {formatCurrency(item.netProfit)}
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-(--text-muted) uppercase block">Total</span>
                      <span className="text-xs font-semibold text-(--text-main)">
                        {formatCurrency(item.grossTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-(--border-color) mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onRestore(item);
                        onClose();
                      }}
                      className="text-xs font-bold text-(--primary) hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Carregar
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-(--text-muted) hover:text-(--danger) cursor-pointer"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
