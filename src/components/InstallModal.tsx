"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Download,
  Share,
  PlusSquare,
  CheckCircle2,
  Wifi,
  Zap,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  onInstall,
}) => {
  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    const success = await onInstall();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content install-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-400" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="modal-close top-4! right-4!"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero App Showcase com espaçamento adequado */}
        <div className="flex flex-col items-center text-center">
          <div className="install-logo-wrapper">
            <div className="install-logo-glow" />
            <Image
              src="/images/logo.png"
              alt="Logo GGMAX"
              width={70}
              height={70}
              className="install-logo-img"
            />
            <div className="install-verified-badge" title="Aplicativo Verificado">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <span className="install-pill-tag">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aplicativo Web Oficial</span>
            </span>
          </div>

          <h2 className="install-title">
            Instalar Calculadora GGMAX
          </h2>
          <p className="install-subtitle">
            Acesse direto da sua tela de início com carregamento ultra-rápido
          </p>
        </div>

        {/* Benefícios com layout espaçado e legível */}
        <div className="install-features-list">
          <div className="install-feature-item">
            <div className="install-feature-icon bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="install-feature-title">Acesso em 1 Toque</div>
              <div className="install-feature-desc">Ícone dedicado na sua tela inicial</div>
            </div>
          </div>

          <div className="install-feature-item">
            <div className="install-feature-icon bg-emerald-500/10 text-emerald-400">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="install-feature-title">100% Funcional Offline</div>
              <div className="install-feature-desc">Calcule taxas mesmo sem internet</div>
            </div>
          </div>

          <div className="install-feature-item">
            <div className="install-feature-icon bg-cyan-500/10 text-cyan-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="install-feature-title">Tela Cheia Imersiva</div>
              <div className="install-feature-desc">Sem barras ou poluição do navegador</div>
            </div>
          </div>
        </div>

        {/* Instruções para iOS ou Botão Direto para Android / Desktop */}
        {isIOS ? (
          <div className="p-4 rounded-xl bg-(--bg-input) border border-(--border-color) mb-4 text-left">
            <div className="text-xs font-bold text-(--text-main) mb-3 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-(--primary)" />
              Como instalar no iPhone / iPad (Safari):
            </div>

            <ol className="space-y-2.5 text-[11px] text-(--text-muted)">
              <li className="flex items-center gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-(--primary) text-white font-bold text-[9px] flex items-center justify-center">
                  1
                </span>
                <span>
                  Toque em <strong>Compartilhar</strong>{" "}
                  <Share className="w-3 h-3 inline text-(--primary) mx-0.5" /> no Safari.
                </span>
              </li>

              <li className="flex items-center gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-(--primary) text-white font-bold text-[9px] flex items-center justify-center">
                  2
                </span>
                <span>
                  Selecione <strong>&quot;Adicionar à Tela de Início&quot;</strong>{" "}
                  <PlusSquare className="w-3 h-3 inline text-(--primary) mx-0.5" />.
                </span>
              </li>

              <li className="flex items-center gap-2">
                <span className="shrink-0 w-4 h-4 rounded-full bg-(--primary) text-white font-bold text-[9px] flex items-center justify-center">
                  3
                </span>
                <span>
                  Toque em <strong>&quot;Adicionar&quot;</strong> no canto superior.
                </span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="install-actions-box">
            <button
              type="button"
              onClick={handleNativeInstall}
              className="btn btn-primary install-btn-submit"
            >
              <Download className="w-4 h-4" />
              INSTALAR APLICATIVO AGORA
            </button>
            <button
              type="button"
              onClick={onClose}
              className="install-btn-dismiss"
            >
              Continuar no navegador
            </button>
          </div>
        )}

        {/* Rodapé do Modal */}
        <div className="install-footer-guarantee">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Leve (menos de 1MB), seguro e 100% gratuito</span>
        </div>
      </div>
    </div>
  );
};
