/**
 * events.js — Centralizador de Eventos e Interações
 * Este arquivo "ouve" tudo o que o usuário faz (cliques, digitação, seleção)
 * e chama as funções corretas do App ou da UI para responder.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Events = {

    /**
     * bindAll — Registra todos os ouvintes de eventos de uma só vez.
     * 
     * @param {Object} app — Referência ao objeto principal (GGMax.App).
     */
    bindAll(app) {
        var UI = window.GGMax.UI;
        var Utils = window.GGMax.Utils;

        // --- Inputs principais (Valor, Quantidade e Custo) ---
        // Sempre que o usuário digita, o app lê o valor e recalcula tudo.
        
        if (UI.els.val) {
            UI.els.val.addEventListener('input', function(e) {
                app.state.value = Utils.parseInput(e.target.value);
                app.recalc();
            });
        }

        if (UI.els.qty) {
            UI.els.qty.addEventListener('input', function(e) {
                app.state.qty = parseInt(e.target.value) || 1;
                app.recalc();
            });
        }

        if (UI.els.cost) {
            UI.els.cost.addEventListener('input', function(e) {
                app.state.cost = Utils.parseInput(e.target.value);
                app.recalc();
            });
        }

        // --- Taxa de Saque (Modal de Ferramentas) ---
        if (UI.els.tools.withdraw) {
            UI.els.tools.withdraw.addEventListener('input', function(e) {
                app.state.withdrawFee = Utils.parseInput(e.target.value);
                app.recalc();
            });
        }

        // --- Divisão de Sócios (Split) ---
        // Quando muda a porcentagem de um sócio, o app ajusta a do outro automaticamente.
        if (UI.els.tools.splitUser) {
            UI.els.tools.splitUser.addEventListener('input', function(e) {
                var val = parseInt(e.target.value) || 0;
                if (val > 100) val = 100; // Impede passar de 100%
                if (UI.els.tools.splitPartner) {
                    UI.els.tools.splitPartner.value = 100 - val;
                }
                app.recalc();
            });
        }

        // --- Seleção de Plano (Prata, Ouro, Diamante) ---
        document.querySelectorAll('input[name="plan"]').forEach(function(radio) {
            radio.addEventListener('change', function(e) {
                app.state.rate = parseFloat(e.target.value);
                // Busca o nome do plano (data-plan) para mudar a cor do app
                var plan = e.target.closest('.plan-option').getAttribute('data-plan');
                UI.updateThemeColor(plan);
                app.recalc();
            });
        });

        // --- Copiar para Link ---
        if (UI.els.btnCopy) {
            UI.els.btnCopy.addEventListener('click', function() {
                UI.copyToClipboard();
            });
        }

        // --- Efeito "Tilt" 3D nos cards de plano ---
        document.querySelectorAll('.plan-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                UI.tiltCard(e);
            });
            card.addEventListener('mouseleave', function() {
                UI.resetTilt(card);
            });
        });

        // --- Modal: Atualização de Prazos ---
        if (UI.els.modal.cat) {
            UI.els.modal.cat.addEventListener('change', function() {
                app.updateDeadline();
            });
        }

        if (UI.els.modal.acc) {
            UI.els.modal.acc.addEventListener('change', function() {
                app.updateDeadline();
            });
        }

        // --- Botões de Limpeza ---
        if (UI.els.btnClear) {
            UI.els.btnClear.addEventListener('click', function() {
                app.resetForm();
            });
        }

        // --- Histórico ---
        if (UI.els.btnSaveHistory) {
            UI.els.btnSaveHistory.addEventListener('click', function() {
                app.addToHistory();
            });
        }

        if (UI.els.btnClearHistory) {
            UI.els.btnClearHistory.addEventListener('click', function() {
                app.clearHistory();
            });
        }

        // --- Abrir Modais (Prazos e Ferramentas) ---
        if (UI.els.btnOpenDeadlines) {
            UI.els.btnOpenDeadlines.addEventListener('click', function() {
                if (UI.els.modal.deadlines) UI.els.modal.deadlines.showModal();
            });
        }

        if (UI.els.btnOpenTools) {
            UI.els.btnOpenTools.addEventListener('click', function() {
                if (UI.els.modal.tools) UI.els.modal.tools.showModal();
            });
        }

        // --- Navegação Fixa Inferior (Versão Mobile) ---
        if (UI.els.btnOpenDeadlinesMobile) {
            UI.els.btnOpenDeadlinesMobile.addEventListener('click', function() {
                if (UI.els.modal.deadlines) UI.els.modal.deadlines.showModal();
            });
        }

        if (UI.els.btnOpenToolsMobile) {
            UI.els.btnOpenToolsMobile.addEventListener('click', function() {
                if (UI.els.modal.tools) UI.els.modal.tools.showModal();
            });
        }

        // --- Fechamento de Modais ---
        document.querySelectorAll('.modal-close').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var dialog = e.target.closest('dialog');
                if (dialog) dialog.close();
            });
        });

        // --- Máscara de Real nos inputs monetários ---
        ['inpValue', 'inpCost', 'inpWithdrawFee'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', Utils.formatMoneyInput);
            }
        });

        // --- Alternador de Tema (Dark/Light) ---
        if (UI.els.btnTheme) {
            UI.els.btnTheme.addEventListener('click', function() {
                UI.toggleTheme(app.state.profit);
            });
        }
    }
};
