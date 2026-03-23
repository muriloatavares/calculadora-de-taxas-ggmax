/**
 * app.js — Arquivo Maestro (Orquestrador)
 * Este é o ponto de entrada da aplicação. Ele mantém o "Estado Global"
 * (os valores atuais) e coordena as chamadas entre Cálculos, UI e Eventos.
 */

(function() {
    'use strict';

    // Importamos os submódulos para facilitar o acesso
    var Calculator = window.GGMax.Calculator;
    var UI = window.GGMax.UI;
    var Events = window.GGMax.Events;

    var App = {
        /** 
         * state — O "Cérebro" do App
         * Aqui ficam guardados todos os números que o usuário digitou.
         */
        state: {
            value: 0,        // Valor unitário do item
            qty: 1,          // Quantidade de itens
            cost: 0,         // Custo de compra (gasto do vendedor)
            rate: 11.99,     // % da taxa do plano escolhido
            withdrawFee: 0,  // Valor fixo de saque (R$)
            profit: 0        // Lucro final calculado
        },

        /**
         * init — A função que "liga" o aplicativo quando a página carrega.
         */
        init: function() {
            UI.hideSkeleton();      // Remove a tela de carregamento
            UI.cacheDOM();          // Busca os IDs do HTML
            Events.bindAll(this);   // Registra os cliques e digitações
            this.loadHistory();     // Carrega os últimos cálculos salvos no celular
            UI.loadTheme();         // Aplica Dark Mode se o usuário preferir
            this.updateDeadline();  // Inicializa o cálculo de datas

            // Sincroniza a cor visual baseada no plano que já começa marcado
            var checkedPlan = document.querySelector('input[name="plan"]:checked');
            if (checkedPlan) {
                var plan = checkedPlan.closest('.plan-option').getAttribute('data-plan');
                UI.updateThemeColor(plan);
            }
        },

        /**
         * recalc — Função que refaz toda a matemática e atualiza a tela.
         * É chamada sempre que qualquer número muda.
         */
        recalc: function() {
            // Chama o motor de cálculos matemático
            var results = Calculator.calculate(this.state);

            // Se o valor for zero, limpa as barras visuais
            if (this.state.value === 0) {
                UI.resetDisplays();
                UI.updateFavicon();
                return;
            }

            this.state.profit = results.profit;

            // Atualiza os textos e as barras de progresso na interface
            UI.updateResults(results, this.state.rate);
            UI.updateBars(results);

            // Se o usuário estiver com o modal de ferramentas aberto, atualiza a divisão de sócios
            var userPerc = parseInt(UI.els.tools.splitUser ? UI.els.tools.splitUser.value : 50) || 0;
            var splitResult = Calculator.calculateSplit(results.profit, userPerc);
            UI.updateSplit(splitResult);

            UI.updateFavicon();
        },

        /**
         * updateDeadline — Atualiza o cálculo de data de liberação do dinheiro.
         */
        updateDeadline: function() {
            if (!UI.els.modal.cat || !UI.els.modal.acc) return;
            var categoryDays = parseInt(UI.els.modal.cat.value);
            var isAccelerated = UI.els.modal.acc.checked;
            var result = Calculator.calculateDeadline(categoryDays, isAccelerated);
            UI.updateDeadlineDisplay(result);
        },

        /**
         * resetForm — Limpa tudo e volta ao estado inicial.
         */
        resetForm: function() {
            this.state.value = 0;
            this.state.cost = 0;
            this.state.qty = 1;
            UI.resetForm();
            this.recalc();
        },

        /**
         * addToHistory — Salva o cálculo atual no LocalStorage do navegador.
         */
        addToHistory: function() {
            if (this.state.value === 0) return;

            var item = {
                date: new Date().toLocaleString('pt-BR'),
                val: UI.els.resTotal ? UI.els.resTotal.textContent : 'R$ 0,00',
                profit: UI.els.resProfit ? UI.els.resProfit.textContent : 'R$ 0,00'
            };

            var hist = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            hist.unshift(item); // Adiciona no início da lista
            if (hist.length > 5) hist.pop(); // Mantém apenas os 5 últimos
            localStorage.setItem('ggmaxhist', JSON.stringify(hist));
            this.loadHistory();
            
            if (window.GGMax && window.GGMax.UI) {
                window.GGMax.UI.showToast('Cálculo salvo!', 'success');
            }
        },

        /**
         * loadHistory — Lê o histórico salvo e manda a UI desenhar na tela.
         */
        loadHistory: function() {
            var items = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            UI.renderHistory(items);
        },

        /**
         * clearHistory — Apaga todos os cálculos salvos.
         */
        clearHistory: function() {
            localStorage.removeItem('ggmaxhist');
            this.loadHistory();
            
            if (window.GGMax && window.GGMax.UI) {
                window.GGMax.UI.showToast('Histórico removido.', 'warning');
            }
        }
    };

    // Ponto de Partida: Garante que o App só inicie quando o HTML estiver pronto.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            App.init();
        });
    } else {
        App.init();
    }
})();
