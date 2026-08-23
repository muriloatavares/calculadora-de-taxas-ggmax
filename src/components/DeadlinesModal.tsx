"use client";

import React, { useState } from "react";
import { X, Check, Calendar } from "lucide-react";
import { DEADLINE_CATEGORIES } from "@/lib/constants";
import { calculateDeadline } from "@/lib/calculations";

interface DeadlinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeadlinesModal: React.FC<DeadlinesModalProps> = ({ isOpen, onClose }) => {
  const [categoryId, setCategoryId] = useState<string>("items_skins");
  const [isAccelerated, setIsAccelerated] = useState<boolean>(true);

  if (!isOpen) return null;

  const result = calculateDeadline(categoryId, isAccelerated);

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
          <Calendar className="w-5 h-5 text-(--primary)" />
          Prazos de Liberação de Saldo (GGMAX)
        </h3>

        {/* Seleção de Categoria */}
        <div className="modal-field">
          <label>Categoria do Anúncio</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {DEADLINE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.standardDays} dias)
              </option>
            ))}
          </select>
        </div>

        {/* Checkbox Acelerada */}
        <div
          onClick={() => setIsAccelerated((prev) => !prev)}
          className="checkbox-label cursor-pointer select-none"
        >
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="accelerated-check"
              checked={isAccelerated}
              onChange={() => {}}
              className="custom-checkbox-input"
            />
            <div className="custom-checkbox-design">
              {isAccelerated && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>
          <div>
            <span className="checkbox-title font-semibold text-xs">
              Liberação Acelerada (Avaliação Positiva)
            </span>
            <span className="text-[11px] text-(--text-muted) block">
              Reduz o prazo pela metade quando o comprador avalia positivamente.
            </span>
          </div>
        </div>

        {/* Resultado do Prazo */}
        <div className="deadline-result mb-5">
          <span className="text-[11px] uppercase font-bold text-(--text-muted) block mb-1">
            Data Prevista de Liberação na Carteira:
          </span>
          <div className="deadline-date">{result.formattedDate}</div>
          <span className="text-xs text-(--text-muted) mt-1 block">
            Tempo de espera: <strong>{result.days} {result.days === 1 ? "dia" : "dias"}</strong>
          </span>
        </div>

        {/* Botão Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-primary"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
