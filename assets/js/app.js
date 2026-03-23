/**
 * app.js — Ponto de entrada e orquestrador da aplicação
 * Mantém o estado global e coordena os módulos.
 */

(function() {
    'use strict';

    var Calculator = window.GGMax.Calculator;
    var UI = window.GGMax.UI;
    var Events = window.GGMax.Events;

    var App = {
        /** Estado global da aplicação */
        state: {
            value: 0,
            qty: 1,
            cost: 0,
            rate: 11.99,
            withdrawFee: 0,
            profit: 0
        },

        /**
         * Inicializa a aplicação.
         */
        init: function() {
            UI.hideSkeleton();
            UI.cacheDOM();
            Events.bindAll(this);
            this.loadHistory();
            UI.loadTheme();
            this.updateDeadline();

            // Sincroniza cor inicial do plano
            var checkedPlan = document.querySelector('input[name="plan"]:checked');
            if (checkedPlan) {
                var plan = checkedPlan.closest('.plan-option').getAttribute('data-plan');
                UI.updateThemeColor(plan);
            }
        },

        /**
         * Recalcula e atualiza a interface.
         */
        recalc: function() {
            var results = Calculator.calculate(this.state);

            if (this.state.value === 0) {
                UI.resetDisplays();
                UI.updateFavicon();
                return;
            }

            this.state.profit = results.profit;

            UI.updateResults(results, this.state.rate);
            UI.updateBars(results);

            // Atualiza split se o modal de ferramentas estiver ativo
            var userPerc = parseInt(UI.els.tools.splitUser ? UI.els.tools.splitUser.value : 50) || 0;
            var splitResult = Calculator.calculateSplit(results.profit, userPerc);
            UI.updateSplit(splitResult);

            UI.updateFavicon();
        },

        /**
         * Atualiza exibição de prazos de liberação.
         */
        updateDeadline: function() {
            if (!UI.els.modal.cat || !UI.els.modal.acc) return;
            var categoryDays = parseInt(UI.els.modal.cat.value);
            var isAccelerated = UI.els.modal.acc.checked;
            var result = Calculator.calculateDeadline(categoryDays, isAccelerated);
            UI.updateDeadlineDisplay(result);
        },

        /**
         * Limpa formulário e recalcula.
         */
        resetForm: function() {
            this.state.value = 0;
            this.state.cost = 0;
            this.state.qty = 1;
            UI.resetForm();
            this.recalc();
        },

        /**
         * Salva cálculo atual no histórico.
         */
        addToHistory: function() {
            if (this.state.value === 0) return;

            var item = {
                date: new Date().toLocaleString('pt-BR'),
                val: UI.els.resTotal ? UI.els.resTotal.textContent : 'R$ 0,00',
                profit: UI.els.resProfit ? UI.els.resProfit.textContent : 'R$ 0,00'
            };

            var hist = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            hist.unshift(item);
            if (hist.length > 5) hist.pop();
            localStorage.setItem('ggmaxhist', JSON.stringify(hist));
            this.loadHistory();
            
            if (window.GGMax && window.GGMax.UI) {
                window.GGMax.UI.showToast('Cálculo salvo no histórico!', 'success');
            }
        },

        /**
         * Carrega histórico do localStorage e renderiza.
         */
        loadHistory: function() {
            var items = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            UI.renderHistory(items);
        },

        /**
         * Limpa todo o histórico.
         */
        clearHistory: function() {
            localStorage.removeItem('ggmaxhist');
            this.loadHistory();
            
            if (window.GGMax && window.GGMax.UI) {
                window.GGMax.UI.showToast('Histórico apagado.', 'warning');
            }
        }
    };

    // Inicialização
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            App.init();
        });
    } else {
        App.init();
    }
})();
