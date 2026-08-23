"use client";

import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { formatCurrencyInputValue, parseCurrencyInput } from "@/lib/formatters";

interface CalculatorFormProps {
  unitPrice: number;
  quantity: number;
  unitCost: number;
  onUnitPriceChange: (val: number) => void;
  onQuantityChange: (val: number) => void;
  onUnitCostChange: (val: number) => void;
  onReset: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  unitPrice,
  quantity,
  unitCost,
  onUnitPriceChange,
  onQuantityChange,
  onUnitCostChange,
  onReset,
}) => {
  const [showCost, setShowCost] = useState(unitCost > 0);

  // Estados locais de string para evitar travar a digitação do usuário
  const [priceStr, setPriceStr] = useState<string>("");
  const [costStr, setCostStr] = useState<string>("");

  // Sincronizar estado local quando o valor externo mudar (ex: reset ou histórico)
  useEffect(() => {
    if (unitPrice === 0 && priceStr === "") {
      // Já está sincronizado
    } else if (unitPrice > 0 && parseCurrencyInput(priceStr) !== unitPrice) {
      setPriceStr(formatCurrencyInputValue(unitPrice));
    } else if (unitPrice === 0 && priceStr !== "") {
      setPriceStr("");
    }
  }, [unitPrice]);

  useEffect(() => {
    if (unitCost === 0 && costStr === "") {
      // Sincronizado
    } else if (unitCost > 0 && parseCurrencyInput(costStr) !== unitCost) {
      setCostStr(formatCurrencyInputValue(unitCost));
      setShowCost(true);
    } else if (unitCost === 0 && costStr !== "") {
      setCostStr("");
    }
  }, [unitCost]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Permite apenas números, vírgula e ponto
    const cleaned = raw.replace(/[^\d.,]/g, "");
    setPriceStr(cleaned);

    const parsed = parseCurrencyInput(cleaned);
    onUnitPriceChange(parsed);
  };

  const handlePriceBlur = () => {
    const parsed = parseCurrencyInput(priceStr);
    if (parsed > 0) {
      setPriceStr(formatCurrencyInputValue(parsed));
    } else {
      setPriceStr("");
    }
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d.,]/g, "");
    setCostStr(cleaned);

    const parsed = parseCurrencyInput(cleaned);
    onUnitCostChange(parsed);
  };

  const handleCostBlur = () => {
    const parsed = parseCurrencyInput(costStr);
    if (parsed > 0) {
      setCostStr(formatCurrencyInputValue(parsed));
    } else {
      setCostStr("");
    }
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    onQuantityChange(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleResetClick = () => {
    setPriceStr("");
    setCostStr("");
    setShowCost(false);
    onReset();
  };

  return (
    <div className="space-y-3.5">
      {/* Grid de Preço e Quantidade */}
      <div className="input-row">
        <div>
          <label>
            Preço de Venda
            <span
              className="info-tooltip"
              title="Preço de venda cobrado no anúncio da GGMAX"
            >
              ?
            </span>
          </label>

          <div className="input-wrapper money">
            <span className="currency-symbol">R$</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={priceStr}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
          </div>
        </div>

        <div>
          <label>
            Qtd.
            <span
              className="info-tooltip"
              title="Quantidade de unidades anunciadas no lote"
            >
              ?
            </span>
          </label>

          <div className="qty-control">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="qty-btn"
              disabled={quantity <= 1}
              title="Diminuir"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max="9999"
              value={quantity}
              onChange={handleQuantityInput}
              className="qty-input"
            />
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(9999, quantity + 1))}
              className="qty-btn"
              title="Aumentar"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Custo de Aquisição (Opcional) */}
      <div className="pt-2 border-t border-(--border-color)">
        {!showCost && unitCost === 0 ? (
          <button
            type="button"
            onClick={() => setShowCost(true)}
            className="text-xs text-(--primary) font-semibold hover:underline cursor-pointer"
          >
            + Adicionar Custo de Compra (Opcional)
          </button>
        ) : (
          <div className="input-row input-row--full mb-0! cost-accordion">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="mb-0!">
                  Custo de Aquisição (Unitário)
                  <span
                    className="info-tooltip"
                    title="Quanto você pagou pelo item/conta para calcular seu Lucro Real e ROI"
                  >
                    ?
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCostStr("");
                    onUnitCostChange(0);
                    setShowCost(false);
                  }}
                  className="text-[11px] text-(--danger) hover:underline cursor-pointer"
                >
                  Remover
                </button>
              </div>

              <div className="input-wrapper money">
                <span className="currency-symbol">R$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={costStr}
                  onChange={handleCostChange}
                  onBlur={handleCostBlur}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botão de Limpar */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleResetClick}
          className="btn-ghost group flex items-center gap-1.5 cursor-pointer mt-0!"
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-90" />
          Limpar dados
        </button>
      </div>
    </div>
  );
};
