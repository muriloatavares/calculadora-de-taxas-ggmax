# ⚡ Calculadora de Taxas GGMAX (v1.0.0)

> A ferramenta definitiva para vendedores e anunciantes da **GGMAX**. Desenvolvida com a última versão do **Next.js 16 (App Router)**, **React 19**, **TypeScript** e **Tailwind CSS v4**. Calcule taxas exatas, descubra o lucro líquido real, compare planos e estime prazos de liberação de saldo com precisão cirúrgica.

<div align="center">

![Versão](https://img.shields.io/badge/Versão-1.0.0-007bff?style=for-the-badge&logo=semver)
![Next.js](https://img.shields.io/badge/Next.js-16.3+-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Licença](https://img.shields.io/badge/Licença-MIT-10b981?style=for-the-badge)

</div>

---

## 🎯 Sobre o Projeto

A **Calculadora de Taxas GGMAX** foi criada para simplificar a precificação e o gerenciamento de lucros no maior marketplace de jogos do Brasil. Esqueça contas manuais e surpresas com comissões: descubra exatamente quanto cai no seu bolso antes de publicar seu anúncio.

---

## ✨ Principais Funcionalidades

### 💰 1. Cálculo de Venda Direta
- **Precificação Instantânea**: Insira o preço de venda unitário e a quantidade do lote para calcular automaticamente:
  - Valor Bruto Total do Anúncio
  - Comissão e Taxa da GGMAX
  - Dedução do Custo de Aquisição (Opcional)
  - Taxa de Saque Bancário/PIX
  - **Lucro Líquido Real no Bolso**
- **Métricas Avançadas**: Exibição em tempo real da **Margem Líquida (%)** e **ROI / Markup (%)**.

### 📊 2. Comparativo de Planos GGMAX
- Alternância rápida com preview de impacto no lucro:
  - 🛡️ **Plano Prata**: 9,99% (Taxa básica)
  - 🏆 **Plano Ouro**: 11,99% (Mais Popular / Destaque)
  - 💎 **Plano Diamante**: 12,99% (Máxima Visibilidade na Home)
- Tema visual adaptativo: a interface assume a paleta de cor e iluminação do plano selecionado.

### ⚡ 3. Animações e Micro-Interações Fluídas (Estilo Fintech)
- **Contagem Numérica Suave (`useAnimatedNumber`)**: Os valores rolam dinamicamente com interpolação `easeOutCubic`.
- **Luz Ambiente Flutuante (`ambient-glow-bg`)**: Efeito de aura luminosa de fundo que acompanha a cor do plano ativo.
- **Barra de Progresso com Shimmer**: Visualização gráfica proporcional entre Lucro, Taxa GGMAX e Custos.
- **Controle de Quantidade Customizado**: Botões `−` e `+` integrados com compatibilidade total ao Dark/Light Mode.

### 🤝 4. Divisão de Lucros (Split) & Taxa de Saque
- **Divisão entre Sócios**: Defina a porcentagem da sua parte via slider interativo e veja a divisão exata em Reais.
- **Simulador de Saque**: Configuração de taxa fixa de transferência/PIX da carteira (R$ 2,00 PIX ou R$ 0,00 padrão).

### 📅 5. Simulador de Prazos de Liberação
- Categorias oficiais da GGMAX:
  - *Itens, Moedas, Skins e Cursos* (4 dias padrão)
  - *Contas e Serviços* (7 dias padrão)
- **Modo Acelerado**: Cálculo com redução de 50% do prazo mediante avaliação positiva do comprador.
- Exibição da data exata de liberação no calendário.

### 📤 6. Exportação & Compartilhamento
- **Copiar Resumo Formatado**: Texto pronto com emojis e markdown para envio rápido no Discord ou WhatsApp.
- **Exportar Comprovante em Imagem (PNG)**: Gera um card visual de alta resolução pronto para download.

### 📱 7. Modo PWA & Suporte Mobile 100%
- **Instalação em 1 Toque**: Suporte a PWA nativo no Android, Windows, Mac e iOS (Safari).
- **100% Funcional Offline**: Service Worker integrado (`sw.js`) que armazena os recursos essenciais em cache.
- **Experiência Nativa de App**: Barra de navegação inferior estilo app móvel, suporte a entalhes de tela (`safe-area-inset`) e ausência de barras de navegação do browser.

### 💾 8. Histórico Local Persistente
- Armazenamento no navegador (`localStorage`) dos seus cálculos recentes com opção de restauração instantânea.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Finalidade |
| :--- | :--- |
| **[Next.js 16](https://nextjs.org/)** | Framework React de última geração com App Router |
| **[React 19](https://react.dev/)** | Biblioteca de interface reativa |
| **[TypeScript](https://www.typescriptlang.org/)** | Tipagem estática e segurança de código |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Estilização moderna e utilitária |
| **[Lucide React](https://lucide.dev/)** | Pacote de ícones SVG leves e consistentes |
| **[html-to-image](https://github.com/bubkoo/html-to-image)** | Geração de imagem PNG do comprovante |
| **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** | Efeito de celebração em lucros altos |

---

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── globals.css                # Design system, tokens, temas e animações
│   ├── layout.tsx                 # Layout raiz com fontes e metadados SEO
│   ├── manifest.ts                # Configuração PWA (Web App Manifest)
│   └── page.tsx                   # Página principal da aplicação
├── components/
│   ├── Header.tsx                 # Cabeçalho com logo, alternador de tema e atalhos
│   ├── PlanSelector.tsx           # Seletor interativo dos planos GGMAX
│   ├── CalculatorForm.tsx         # Formulário com máscaras de moeda e controle de quantidade
│   ├── ResultsDisplay.tsx         # Card principal de resultados e métricas financeiras
│   ├── ToolsModal.tsx             # Modal de Split de Sócios e Taxa de Saque
│   ├── DeadlinesModal.tsx         # Modal de simulação de prazos de liberação
│   ├── ShareModal.tsx             # Modal de exportação de texto e geração de PNG
│   ├── HistoryDrawer.tsx          # Drawer com histórico de cálculos salvos
│   ├── ToastNotification.tsx      # Sistema de toasts de notificação
│   └── Footer.tsx                 # Rodapé com créditos e links
├── hooks/
│   ├── useAnimatedNumber.ts       # Hook de animação e interpolação numérica
│   ├── useCalculator.ts           # Hook de estado e regras de cálculo
│   ├── useHistory.ts              # Hook de persistência em LocalStorage
│   └── useToast.ts                # Hook de gerenciamento de notificações
├── lib/
│   ├── calculations.ts            # Motor matemático de taxas, lucros e prazos
│   ├── constants.ts               # Taxas oficiais dos planos e configurações
│   └── formatters.ts              # Formatadores de moeda (BRL), percentual e datas
└── types/
    └── calculator.ts              # Definições de tipos e interfaces TypeScript
```

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/muriloatavares/calculadora-de-taxas-ggmax.git
cd calculadora-de-taxas-ggmax
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📋 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento na porta 3000 |
| `npm run build` | Cria a compilação de produção otimizada |
| `npm run start` | Inicia o servidor em modo de produção |
| `npm run typecheck` | Executa a validação de tipos TypeScript (`tsc --noEmit`) |
| `npm run lint` | Executa o linter do Next.js |

---

## 📄 Licença

Distribuído sob a Licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Desenvolvido por **[Murilo de Almeida Tavares](https://github.com/muriloatavares)**.
