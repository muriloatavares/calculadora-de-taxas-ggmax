# 📱 Calculadora de taxas da GGMAX

Uma **calculadora de taxas** de elite, projetada especificamente para vendedores da plataforma GGMAX. Esta ferramenta não é apenas funcional; ela oferece uma experiência visual premium através de **Glassmorphism**, animações fluidas e suporte total a hardware Apple moderno.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-2.2.0-blue)
![PWA](https://img.shields.io/badge/PWA-Online/Offline-orange)

---

## ✨ Diferenciais de Elite

### 💰 Matemática de Precisão
- **Modo Vendedor Otimizado**: Foco total no lucro líquido real.
- **3 Planos GGMAX Atualizados**: Prata (9,99%), Ouro (11,99% - Popular), Diamante (12,99%).
- **Custo & Taxa de Saque**: Dedução automática de custos de aquisição e taxas fixas de saque bancário.
- **Efeito Odometer**: Valores de lucro e taxas aumentam e diminuem suavemente em tempo real.

### 🎨 Design & UI/UX "WOW"
- **Glassmorphism Moderno**: Interface translúcida com `backdrop-filter` de 20px.
- **Tintagem Dinâmica**: O aplicativo muda sua cor de destaque (Prata, Ouro, Ciano) instantaneamente de acordo com o plano selecionado.
- **Easter Egg de Celebração**: Alcance lucros altos e seja surpreendido com uma explosão de confetes coloridos! 🎉
- **Feedback Háptico Visual**: Notificações *Toast* modernas, flutuantes e animações de clique realista (`scale`).

### 🍎 Otimização Apple (iPhone 16/17 Pro Max)
- **Suporte a Dynamic Island & Notch**: Margens de segurança dinâmicas (`safe-area-inset`) para ocupar 100% da tela sem cobrir botões.
- **Navegação Inferior Fixa**: Barra de atalhos móvel para uso confortável com uma mão.
- **Prevenção de Bugs do Safari**: Zoom forçado em inputs desativado e altura real de tela (`100dvh`).

---

## 🔄 Novidades & Melhorias Reais (v2.2.0)

### 💡 Tooltips de Ajuda Inteligentes
- **Explicação em Tempo Real**: Adição de ícones de ajuda `(?)` em cada campo da calculadora.
- **Micro-interações**: Tooltips animados que explicam a lógica por trás das taxas fixas e variáveis da GGMAX.
- **Acessibilidade**: Suporte total para visualização em dispositivos móveis via toque longo.

### 📉 Taxas Dinâmicas de Alta Precisão
- **Sincronização com Planos**: A "Taxa de Plataforma" agora é calculada dinamicamente com base no plano selecionado:
    - **Prata**: 9.99%
    - **Ouro**: 11.99%
    - **Diamante**: 12.99%
- **Correção de Bugs**: Corrigido o erro onde a taxa permanecia estática em 11.99%, garantindo que o lucro líquido seja 100% preciso para todos os níveis de vendedor.

---

## 🛠️ Arquitetura & Manutenção

O projeto é 100% **Vanilla JS (ES6+)**, sem frameworks pesados, garantindo carregamento instantâneo.

- **100% Comentado em PT-BR**: Todo o código-fonte (`.js`, `.css`, `.html`) possui documentação detalhada em português brasileiro, facilitando futuras modificações.
- **Estrutura Modular**:
    - `utils.js`: Formatação de moeda e máscaras de input.
    - `calculator.js`: O "motor" matemático das taxas GGMAX.
    - `ui.js`: Gerenciador de DOM, Temas, Tooltips e Animações de Elite.
    - `events.js`: Centralizador de interações e listeners.
    - `app.js`: Orquestrador de estado global e inicialização.

---

## 🚀 Como Instalar (PWA)

Esta ferramenta funciona como um aplicativo nativo no seu celular:

### iOS (iPhone)
1. Abra o site no **Safari**.
2. Clique no ícone de **Compartilhar** (quadrado com seta pra cima).
3. Role e escolha **"Adicionar à Tela de Início"**.

### Android
1. Abra no **Chrome**.
2. Clique nos três pontinhos e selecione **"Instalar Aplicativo"**.

---

## 📊 Exemplo de Fluxo Operacional

| Etapa | Valor |
|-------|-------|
| Meta de Venda | R$ 1.500,00 |
| Taxa GGMAX (Plano Ouro) | -R$ 179,85 |
| Custo de Aquisição | -R$ 300,00 |
| Taxa de Saque | -R$ 2,00 |
| **Lucro Líquido Final** | **R$ 1.018,15** |

---

## 📝 Licença

Publicado sob a Licença MIT. Sinta-se à vontade para fork e melhorar!

---

**Desenvolvido para a comunidade de vendedores GGMAX. ⭐ Deixe sua Star se te ajudou!**


