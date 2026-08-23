"use client";

import React from "react";
import Image from "next/image";
import { Sun, Moon, Calendar, Wrench, Share2, History, Download } from "lucide-react";
import { PlanId } from "@/types/calculator";

interface HeaderProps {
  currentPlan: PlanId;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenHistory: () => void;
  onOpenTools: () => void;
  onOpenDeadlines: () => void;
  onOpenShare: () => void;
  onOpenInstall?: () => void;
  canInstall?: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenHistory,
  onOpenTools,
  onOpenDeadlines,
  onOpenShare,
  onOpenInstall,
  canInstall,
  historyCount,
}) => {
  return (
    <header>
      {/* Controles de Topo (Tema e Ações Rápidas Desktop) */}
      <div className="header-controls">
        {canInstall && onOpenInstall && (
          <button
            type="button"
            onClick={onOpenInstall}
            className="icon-btn text-(--primary) border-(--primary) animate-pulse"
            title="Instalar Aplicativo (PWA)"
          >
            <Download className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onOpenDeadlines}
          className="icon-btn hidden sm:flex"
          title="Prazos de Liberação"
        >
          <Calendar className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenTools}
          className="icon-btn hidden sm:flex"
          title="Ferramentas (Split & Saque)"
        >
          <Wrench className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenShare}
          className="icon-btn hidden sm:flex"
          title="Compartilhar / Exportar"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onOpenHistory}
          className="icon-btn hidden sm:flex relative"
          title="Histórico de Cálculos"
        >
          <History className="w-4 h-4" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-(--primary) text-white text-[9px] font-bold flex items-center justify-center">
              {historyCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          className="icon-btn group"
          title={theme === "dark" ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 group-hover:rotate-90 group-active:scale-75" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400 transition-transform duration-500 group-hover:-rotate-45 group-active:scale-75" />
          )}
        </button>
      </div>

      {/* Logo Redonda Centralizada com borda */}
      <Image
        src="/images/logo.png"
        alt="GGMAX"
        width={80}
        height={80}
        className="app-logo"
        priority
      />

      {/* Título Principal */}
      <h1 className="app-title">CALCULADORA DE TAXAS GGMAX</h1>
      <p className="text-xs text-(--text-muted) mt-1">
        Simulador de Lucro Líquido &amp; Comissão
      </p>
    </header>
  );
};
