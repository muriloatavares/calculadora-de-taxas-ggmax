# 📱 Calculadora GGMAX

Uma **calculadora de taxas e lucro** profissional para vendedores da plataforma GGMAX. Ferramenta web progressiva (PWA) que funciona online e offline.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## ✨ Funcionalidades

### 💰 Cálculos Avançados
- **Modo Único Otimizado**: Calcula taxa e lucro líquido sobre o valor de venda (foco total em quem vende).
- **3 Planos GGMAX**: Prata (9,99%), Ouro (11,99% - Popular), Diamante (12,99%)
- **Custo Unitário**: Deduz custos de aquisição do seu lucro final
- **Visualização Dinâmica em Barras**: Mostra a proporção gráfica de taxa, custo e lucro

### 🛠️ Ferramentas Extras
- **Split de Sócios**: Divida o lucro entre você e seu sócio (%)
- **Taxa de Saque**: Deduza automaticamente taxas bancárias do lucro
- **Prazos de Liberação**: Veja a data exata de recebimento (4 ou 7 dias, com aceleração)
- **Histórico**: Últimos 5 cálculos salvos automaticamente

### 🎨 Interface UI/UX Premium
- **Novo Design em Gradiente Azul**: Um visual moderno e agradável, adaptado perfeitamente para Dark/Light modes.
- **Modais Nativos `<dialog>`**: Prazos e ferramentas abrem com efeito de blur e são 100% centralizados (com correções avançadas para o Safari).
- **Animações e UX Smooth**: Fade-ins em cascata (slide-up), _glow_ dinâmico ao focar no formulário e botões com clique realista (`scale`).
- **Sincronização com o Sistema**: Auto-detecta se o seu dispositivo está no modo claro/escuro (`prefers-color-scheme`) e aplica o tema perfeitamente logo ao abrir.
- **Notificações Toast**: Alertas modernos, flutuantes e não-bloqueantes (`Copiado com sucesso!`, etc.) que não travam a sua tela.
- **Responsividade Absoluta**: Mobile-first, otimizado para celulares (360px+), tablets e desktops.
- **Tilt 3D**: Cards dos planos com efeito parallax responsivo.
- **Cópia Rápida**: Copie o total líquido com um clique.

### 📲 PWA (Progressive Web App)
- Instale na tela inicial do celular (Android/iOS)
- Funciona 100% offline
- Ícone dinâmico que muda com o tema

---

## 🚀 Como Usar

### Online
```bash
git clone https://github.com/muriloatavares/calculadora-de-taxas-ggmax.git
cd calculadora-ggmax
# Abra index.html no navegador
```

### Instalar como App (Celular)
1. Abra a calculadora no navegador
2. Clique em "Compartilhar" → "Adicionar à tela inicial"
3. Pronto! Acesse como um app nativo

---

## 📁 Arquitetura Modular (Refatorada)

O projeto foi refatorado para garantir máxima manutenibilidade, separando as responsabilidades sem a necessidade de bundlers (Vanilla JS):

```
calculadora-ggmax/
├── index.html
├── manifest.json
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── utils.js       # Funções auxiliares (formatação, conversão)
    │   ├── calculator.js  # Regras de negócio e matemática
    │   ├── ui.js          # Manipulação do DOM e renderização
    │   ├── events.js      # Listeners e interações com o usuário
    │   └── app.js         # Orquestrador principal (State/Init)
    └── img/
        ├── favicon.ico
        ├── favicon.png
        └── logo.png
```

---

## 🛠️ Stack Técnico

- **HTML5** Semântico
- **CSS3** Design tokens
- **JavaScript ES6+** (sem dependências)
- **localStorage** (histórico + preferências)
- **PWA** Web Manifest

---

## 📊 Exemplo de Cálculo

| Item | Valor |
|------|-------|
| Valor Anúncio | R$ 100,00 |
| Taxa GGMAX 11,99% | -R$ 11,99 |
| **Receber Total** | **R$ 88,01** |
| Custo (opcional) | -R$ 20,00 |
| Taxa Saque (opcional) | -R$ 2,00 |
| **Lucro Líquido** | **R$ 66,01** |

---

## 🎨 Customização

### Mudar Cores
Edite em `assets/css/style.css`:

```css
:root {
    --primary: #007bff;
    --secondary: #28a745;
    --danger: #dc3545;
}
```

---

## 📱 Compatibilidade

| Browser | Status |
|---------|--------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |


## 📝 Licença

MIT License © 2026

---

## ⭐ Créditos

Desenvolvido para vendedores GGMAX

**Se ajudou, deixe uma star!** ⭐


