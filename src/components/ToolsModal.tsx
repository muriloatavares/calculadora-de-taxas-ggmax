"use client";

import React, { useState, useEffect } from "react";
import { X, Users, DollarSign, Percent, Check, Zap, Clock } from "lucide-react";
import { formatCurrency, formatCurrencyInputValue, parseCurrencyInput } from "@/lib/formatters";
import { calculateSplit } from "@/lib/calculations";

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  netProfit: number;
  withdrawFee: number;
  onWithdrawFeeChange: (val: number) => void;
}

export const ToolsModal: React.FC<ToolsModalProps> = ({
  isOpen,
  onClose,
  netProfit,
  withdrawFee,
  onWithdrawFeeChange,
}) => {
  const [userPercent, setUserPercent] = useState<number>(50);
  const [withdrawStr, setWithdrawStr] = useState<string>(
    withdrawFee > 0 ? formatCurrencyInputValue(withdrawFee) : ""
  );

  useEffect(() => {
    if (withdrawFee > 0 && parseCurrencyInput(withdrawStr) !== withdrawFee) {
      setWithdrawStr(formatCurrencyInputValue(withdrawFee));
    } else if (withdrawFee === 0 && withdrawStr !== "" && withdrawStr !== "0,00") {
      setWithdrawStr("");
    }
  }, [withdrawFee]);

  if (!isOpen) return null;

  const split = calculateSplit(Math.max(0, netProfit), userPercent);

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.,]/g, "");
    setWithdrawStr(raw);
    const parsed = parseCurrencyInput(raw);
    onWithdrawFeeChange(parsed);
  };

  const handleWithdrawBlur = () => {
    const parsed = parseCurrencyInput(withdrawStr);
    if (parsed > 0) {
      setWithdrawStr(formatCurrencyInputValue(parsed));
    } else {
      setWithdrawStr("");
    }
  };

  const setFeePreset = (fee: number) => {
    if (fee > 0) {
      setWithdrawStr(formatCurrencyInputValue(fee));
    } else {
      setWithdrawStr("");
    }
    onWithdrawFeeChange(fee);
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

        {/* Ferramenta 1: Split de Sócios */}
        <div className="tool-section">
          <h3 className="tool-title">
            <Percent className="w-4 h-4 text-(--primary)" />
            Divisão de Lucro (Split)
          </h3>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-(--text-muted) font-semibold">
              <span>Sua Parte: {userPercent}%</span>
              <span>Sócio: {100 - userPercent}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={userPercent}
              onChange={(e) => setUserPercent(parseInt(e.target.value, 10))}
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${userPercent}%, var(--border-color) ${userPercent}%, var(--border-color) 100%)`,
              }}
            />
          </div>

          {/* Placar do Split */}
          <div className="split-result">
            <div>
              <span className="text-[10px] text-(--text-muted) uppercase block">Você ({userPercent}%)</span>
              <strong className="text-(--secondary)">{formatCurrency(split.userAmount)}</strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-(--text-muted) uppercase block">Sócio ({100 - userPercent}%)</span>
              <strong className="text-(--text-main)">{formatCurrency(split.partnerAmount)}</strong>
            </div>
          </div>
        </div>

        {/* Ferramenta 2: Taxa de Saque / Retirada GGMAX */}
        <div className="tool-section">
          <div className="flex items-center justify-between mb-2">
            <h3 className="tool-title mb-0!">
              <DollarSign className="w-4 h-4 text-(--primary)" />
              Taxa de Saque GGMAX (PIX)
            </h3>
          </div>

          {/* Botões Rápidos com as regras oficiais */}
          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <button
              type="button"
              onClick={() => setFeePreset(2)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                withdrawFee === 2
                  ? "bg-(--primary) text-white border-(--primary) shadow-sm"
                  : "bg-(--bg-input) border-(--border-color) text-(--text-main) hover:border-(--primary)"
              }`}
            >
              {withdrawFee === 2 && <Check className="w-3.5 h-3.5" />}
              R$ 2,00 (Saque PIX)
            </button>

            <button
              type="button"
              onClick={() => setFeePreset(0)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                withdrawFee === 0
                  ? "bg-(--primary) text-white border-(--primary) shadow-sm"
                  : "bg-(--bg-input) border-(--border-color) text-(--text-main) hover:border-(--primary)"
              }`}
            >
              {withdrawFee === 0 && <Check className="w-3.5 h-3.5" />}
              R$ 0,00 (Grátis / 2 dias)
            </button>
          </div>

          <div className="input-wrapper money">
            <span className="currency-symbol">R$</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={withdrawStr}
              onChange={handleWithdrawChange}
              onBlur={handleWithdrawBlur}
            />
          </div>
          <span className="withdraw-hint text-xs">
            Taxa fixa de retirada do saldo da carteira para sua conta.
          </span>
        </div>

        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary"
        >
          Salvar e Fechar
        </button>
      </div>
    </div>
  );
};
