/**
 * events.js — Centralização de eventos e interações
 * Registra todos os event listeners da aplicação.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Events = {

    /**
     * Registra todos os event listeners da aplicação.
     * @param {Object} app — referência ao orquestrador (GGMax.App)
     */
    bindAll(app) {
        var UI = window.GGMax.UI;
        var Utils = window.GGMax.Utils;

        // --- Inputs de valor, quantidade e custo ---
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

        // --- Taxa de saque ---
        if (UI.els.tools.withdraw) {
            UI.els.tools.withdraw.addEventListener('input', function(e) {
                app.state.withdrawFee = Utils.parseInput(e.target.value);
                app.recalc();
            });
        }

        // --- Split de sócios ---
        if (UI.els.tools.splitUser) {
            UI.els.tools.splitUser.addEventListener('input', function(e) {
                var val = parseInt(e.target.value) || 0;
                if (val > 100) val = 100;
                if (UI.els.tools.splitPartner) {
                    UI.els.tools.splitPartner.value = 100 - val;
                }
                app.recalc();
            });
        }

        // --- Seleção de plano ---
        document.querySelectorAll('input[name="plan"]').forEach(function(radio) {
            radio.addEventListener('change', function(e) {
                app.state.rate = parseFloat(e.target.value);
                var plan = e.target.closest('.plan-option').getAttribute('data-plan');
                UI.updateThemeColor(plan);
                app.recalc();
            });
        });

        // --- Botão Copiar ---
        if (UI.els.btnCopy) {
            UI.els.btnCopy.addEventListener('click', function() {
                UI.copyToClipboard();
            });
        }

        // --- Efeito tilt nos cards ---
        document.querySelectorAll('.plan-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                UI.tiltCard(e);
            });
            card.addEventListener('mouseleave', function() {
                UI.resetTilt(card);
            });
        });

        // --- Modal: Prazos ---
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

        // --- Botão limpar formulário ---
        if (UI.els.btnClear) {
            UI.els.btnClear.addEventListener('click', function() {
                app.resetForm();
            });
        }

        // --- Botão salvar no histórico ---
        if (UI.els.btnSaveHistory) {
            UI.els.btnSaveHistory.addEventListener('click', function() {
                app.addToHistory();
            });
        }

        // --- Botão limpar histórico ---
        if (UI.els.btnClearHistory) {
            UI.els.btnClearHistory.addEventListener('click', function() {
                app.clearHistory();
            });
        }

        // --- Abrir modal Prazos ---
        if (UI.els.btnOpenDeadlines) {
            UI.els.btnOpenDeadlines.addEventListener('click', function() {
                if (UI.els.modal.deadlines) {
                    UI.els.modal.deadlines.showModal();
                }
            });
        }

        // --- Abrir modal Ferramentas ---
        if (UI.els.btnOpenTools) {
            UI.els.btnOpenTools.addEventListener('click', function() {
                if (UI.els.modal.tools) {
                    UI.els.modal.tools.showModal();
                }
            });
        }

        // --- Mobile Nav: Prazos ---
        if (UI.els.btnOpenDeadlinesMobile) {
            UI.els.btnOpenDeadlinesMobile.addEventListener('click', function() {
                if (UI.els.modal.deadlines) {
                    UI.els.modal.deadlines.showModal();
                }
            });
        }

        // --- Mobile Nav: Extras ---
        if (UI.els.btnOpenToolsMobile) {
            UI.els.btnOpenToolsMobile.addEventListener('click', function() {
                if (UI.els.modal.tools) {
                    UI.els.modal.tools.showModal();
                }
            });
        }

        // --- Fechar modais ---
        document.querySelectorAll('.modal-close').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var dialog = e.target.closest('dialog');
                if (dialog) dialog.close();
            });
        });

        // --- Formatação monetária em tempo real ---
        ['inpValue', 'inpCost', 'inpWithdrawFee'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', Utils.formatMoneyInput);
            }
        });


        // --- Botão tema ---
        if (UI.els.btnTheme) {
            UI.els.btnTheme.addEventListener('click', function() {
                UI.toggleTheme(app.state.profit);
            });
        }
    }
};
