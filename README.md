# 📱 Calculadora GGMAX

Uma **calculadora de taxas e lucro** profissional para vendedores da plataforma GGMAX. Ferramenta web progressiva (PWA) que funciona online e offline.

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## ✨ Funcionalidades

### 💰 Cálculos Avançados
- **Modo Normal**: Calcula taxa e lucro sobre valor de venda
- **Modo Reverso** ("Quero Receber"): Calcula valor bruto necessário para receber um valor líquido específico
- **3 Planos**: Prata (9,99%), Ouro (11,99% - Popular), Diamante (12,99%)
- **Custo Unitário**: Deduz custos do lucro final
- **Visualização em Barras**: Mostra proporção de taxa, custo e lucro

### 🛠️ Ferramentas Extras
- **Split de Sócios**: Divida o lucro entre você e seu sócio (%)
- **Taxa de Saque**: Deduza automaticamente taxas bancárias do lucro
- **Prazos de Liberação**: Veja a data exata de recebimento (4 ou 7 dias, com aceleração)
- **Histórico**: Últimos 5 cálculos salvos automaticamente

### 🎨 Interface
- **Dark/Light Mode**: Tema escuro por padrão, totalmente customizável
- **Responsivo**: Mobile-first, otimizado para celular
- **Tilt 3D**: Cards dos planos com efeito parallax
- **Cópia Rápida**: Copie o total com um clique

### 📲 PWA (Progressive Web App)
- Instale na tela inicial do celular
- Funciona offline
- Ícone customizado
- Splash screen personalizada

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

## 📁 Estrutura

```
calculadora-ggmax/
├── index.html
├── manifest.json
├── README.md
└── assets/
    ├── css/style.css
    ├── js/app.js
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


