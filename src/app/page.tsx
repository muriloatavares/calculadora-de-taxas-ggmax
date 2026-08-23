"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PlanSelector } from "@/components/PlanSelector";
import { CalculatorForm } from "@/components/CalculatorForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ToolsModal } from "@/components/ToolsModal";
import { DeadlinesModal } from "@/components/DeadlinesModal";
import { ShareModal } from "@/components/ShareModal";
import { HistoryDrawer } from "@/components/HistoryDrawer";
import { InstallModal } from "@/components/InstallModal";
import { ToastNotification } from "@/components/ToastNotification";
import { Footer } from "@/components/Footer";
import { useCalculator } from "@/hooks/useCalculator";
import { useHistory } from "@/hooks/useHistory";
import { useToast } from "@/hooks/useToast";
import { usePwa } from "@/hooks/usePwa";
import { generateShareText } from "@/lib/calculations";
import { Calendar, Wrench, Share2, History, Download } from "lucide-react";

export default function Home() {
  const {
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
    resetForm,
    restoreFromHistory,
    triggerCelebration,
  } = useCalculator();

  const { history, saveToHistory, removeItem, clearHistory } = useHistory();
  const { toasts, showToast, removeToast } = useToast();
  const { isStandalone, canInstall, isIOS, promptInstall } = usePwa();

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isDeadlinesOpen, setIsDeadlinesOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Sincronizar tema no html class
  useEffect(() => {
    const savedTheme = localStorage.getItem("ggmax_theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("ggmax_theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const handleSaveHistory = () => {
    if (result.grossTotal <= 0 && result.netProfit <= 0) {
      showToast("Insira um valor para salvar o cálculo.", "warning");
      return;
    }
    saveToHistory(result);
    showToast("Cálculo salvo com sucesso!", "success");
    if (result.netProfit >= 250) {
      triggerCelebration();
    }
  };

  const handleCopySummary = async () => {
    if (result.grossTotal <= 0) {
      showToast("Insira um valor antes de copiar.", "warning");
      return;
    }
    try {
      const text = generateShareText(result);
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast("Resumo copiado com sucesso!", "success");
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      showToast("Falha ao copiar resumo.", "error");
    }
  };

  const activeColorMap: Record<string, string> = {
    prata: "#adb5bd",
    ouro: "#f19304",
    diamante: "#06b6d4",
  };

  const activeColor = activeColorMap[selectedPlan] || "var(--primary)";

  return (
    <>
      {/* Luz Ambiente Dinâmica de Fundo */}
      <div
        className="ambient-glow-bg"
        style={{ "--active-color": activeColor } as React.CSSProperties}
      />

      <div
        className="container"
        style={{ "--active-color": activeColor } as React.CSSProperties}
      >
        {/* Cabeçalho */}
        <Header
          currentPlan={selectedPlan}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenTools={() => setIsToolsOpen(true)}
          onOpenDeadlines={() => setIsDeadlinesOpen(true)}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenInstall={() => setIsInstallOpen(true)}
          canInstall={canInstall && !isStandalone}
          historyCount={history.length}
        />

        {/* Seleção de Planos */}
        <PlanSelector
          selectedPlan={selectedPlan}
          onSelectPlan={setSelectedPlan}
        />

        {/* Formulário de Valores */}
        <CalculatorForm
          unitPrice={unitPrice}
          quantity={quantity}
          unitCost={unitCost}
          onUnitPriceChange={setUnitPrice}
          onQuantityChange={setQuantity}
          onUnitCostChange={setUnitCost}
          onReset={resetForm}
        />

        {/* Caixa de Resultados */}
        <div className="mt-4">
          <ResultsDisplay
            result={result}
            onSaveHistory={handleSaveHistory}
            onCopySummary={handleCopySummary}
            onOpenShare={() => setIsShareOpen(true)}
            isCopied={isCopied}
          />
        </div>

        {/* Rodapé */}
        <Footer onShowToast={showToast} />
      </div>

      {/* Barra de Navegação Inferior Fixa para Mobile */}
      <nav className="bottom-nav">
        <button
          type="button"
          onClick={() => setIsDeadlinesOpen(true)}
          className="nav-btn"
        >
          <Calendar className="w-5 h-5" />
          <span>Prazos</span>
        </button>

        <button
          type="button"
          onClick={() => setIsToolsOpen(true)}
          className="nav-btn"
        >
          <Wrench className="w-5 h-5" />
          <span>Ferramentas</span>
        </button>

        <button
          type="button"
          onClick={() => setIsShareOpen(true)}
          className="nav-btn"
        >
          <Share2 className="w-5 h-5" />
          <span>Exportar</span>
        </button>

        {canInstall && !isStandalone && (
          <button
            type="button"
            onClick={() => setIsInstallOpen(true)}
            className="nav-btn text-(--primary)! font-bold"
          >
            <Download className="w-5 h-5 animate-bounce" />
            <span>Instalar</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsHistoryOpen(true)}
          className="nav-btn relative"
        >
          <History className="w-5 h-5" />
          <span>Histórico</span>
          {history.length > 0 && (
            <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-(--primary)" />
          )}
        </button>
      </nav>

      {/* Modais e Gaveta */}
      <ToolsModal
        isOpen={isToolsOpen}
        onClose={() => setIsToolsOpen(false)}
        netProfit={result.netProfit}
        withdrawFee={withdrawFee}
        onWithdrawFeeChange={setWithdrawFee}
      />

      <DeadlinesModal
        isOpen={isDeadlinesOpen}
        onClose={() => setIsDeadlinesOpen(false)}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        result={result}
        onShowToast={showToast}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestore={restoreFromHistory}
        onRemoveItem={removeItem}
        onClearAll={clearHistory}
      />

      <InstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        isIOS={isIOS}
        onInstall={promptInstall}
      />

      {/* Notificações Toasts */}
      <ToastNotification toasts={toasts} onRemove={removeToast} />
    </>
  );
}
