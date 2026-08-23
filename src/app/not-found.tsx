"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calculator, ArrowLeft, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      {/* Luz Ambiente de Fundo */}
      <div className="ambient-glow-bg top-1/3!" />

      {/* Card Principal com Glassmorphism e Espaçamento Dedicado */}
      <div className="not-found-card">
        {/* Linha de Destaque Superior Neon */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-indigo-500 to-cyan-400" />

        {/* Logo & Selo de Alerta */}
        <div className="not-found-logo-box">
          <div className="install-logo-glow" />
          <Image
            src="/images/logo.png"
            alt="Logo GGMAX"
            width={72}
            height={72}
            className="install-logo-img mx-auto"
            priority
          />
          <div className="install-verified-badge bg-red-500!" title="Página Não Encontrada">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 404 Heading com Gradiente Neon */}
        <div>
          <span className="not-found-code-text">
            404
          </span>
        </div>

        {/* Badge Informativo */}
        <div>
          <span className="not-found-badge-tag">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Página ou Anúncio Não Encontrado</span>
          </span>
        </div>

        {/* Descrição com Espaçamento Confortável */}
        <p className="not-found-description">
          Parece que o link que você acessou foi deslistado, movido ou o endereço digitado está incorreto.
        </p>

        {/* Dica para Vendedores */}
        <div className="not-found-tip-box">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-(--text-muted) leading-relaxed">
              <strong className="text-(--text-main) block mb-1">Dica para Vendedores:</strong>
              As taxas oficiais da GGMAX são <strong>9,99% (Prata)</strong>, <strong>11,99% (Ouro)</strong> e <strong>12,99% (Diamante)</strong>.
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="not-found-actions-grid">
          <Link
            href="/"
            className="btn btn-primary h-12! text-xs! font-bold! flex-1 tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            IR PARA A CALCULADORA
          </Link>

          <Link
            href="/"
            className="btn btn-outline h-12! text-xs! font-bold! flex-1 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            VOLTAR AO INÍCIO
          </Link>
        </div>

        {/* Rodapé sutil */}
        <div className="not-found-footer-copy">
          Calculadora de Taxas GGMAX • v1.0.0
        </div>
      </div>
    </div>
  );
}
