/**
 * ui.js — Manipulação de DOM e renderização
 * Responsável por atualizar a interface com dados calculados.
 */

window.GGMax = window.GGMax || {};

window.GGMax.UI = {

    /** Cache de referências de elementos DOM */
    els: {},

    /**
     * Coleta e armazena referências de elementos DOM.
     */
    cacheDOM() {
        this.els = {
            val: document.getElementById('inpValue'),
            qty: document.getElementById('inpQty'),
            cost: document.getElementById('inpCost'),
            resFee: document.getElementById('resFee'),
            resTotal: document.getElementById('resTotal'),
            resProfit: document.getElementById('resProfit'),
            resTaxPerc: document.getElementById('resTaxPerc'),
            bars: {
                fee: document.getElementById('barFee'),
                cost: document.getElementById('barCost'),
                profit: document.getElementById('barProfit')
            },
            modal: {
                deadlines: document.getElementById('modalDeadlines'),
                tools: document.getElementById('modalTools'),
                cat: document.getElementById('selCategory'),
                acc: document.getElementById('chkAccelerated'),
                date: document.getElementById('txtDeadlineDate'),
                days: document.getElementById('txtDeadlineDays')
            },
            tools: {
                splitUser: document.getElementById('inpSplitUser'),
                splitPartner: document.getElementById('inpSplitPartner'),
                resUser: document.getElementById('resSplitUser'),
                resPartner: document.getElementById('resSplitPartner'),
                withdraw: document.getElementById('inpWithdrawFee')
            },
            canvas: document.getElementById('shareCanvas'),
            btnCopy: document.getElementById('btnCopy'),
            btnSaveHistory: document.getElementById('btnSaveHistory'),
            btnClear: document.getElementById('btnClear'),
            btnClearHistory: document.getElementById('btnClearHistory'),
            btnOpenDeadlines: document.getElementById('btnOpenDeadlines'),
            btnOpenTools: document.getElementById('btnOpenTools'),
            btnTheme: document.getElementById('themeToggle'),
            historyList: document.getElementById('historyList')
        };
    },

    /**
     * Atualiza os displays de resultados na interface.
     * @param {Object} results — resultado do Calculator.calculate()
     * @param {number} rate — taxa atual do plano
     */
    updateResults(results, rate) {
        var fmt = window.GGMax.Utils.formatCurrency;

        if (this.els.resFee) {
            this.els.resFee.textContent = fmt(results.fee);
        }
        if (this.els.resTotal) {
            this.els.resTotal.textContent = fmt(results.net);
            this.els.resTotal.classList.remove('pulse-anim');
            void this.els.resTotal.offsetWidth;
            this.els.resTotal.classList.add('pulse-anim');
        }
        if (this.els.resProfit) {
            this.els.resProfit.textContent = fmt(results.profit);
            this.els.resProfit.style.color = results.profit < 0 ? 'var(--danger)' : 'var(--secondary)';
            this.els.resProfit.classList.remove('pulse-anim');
            void this.els.resProfit.offsetWidth;
            this.els.resProfit.classList.add('pulse-anim');
        }
        if (this.els.resTaxPerc) {
            this.els.resTaxPerc.textContent = rate.toLocaleString('pt-BR') + '%';
        }
    },

    /**
     * Atualiza as barras de progresso visual.
     * @param {Object} results — resultado do Calculator.calculate()
     */
    updateBars(results) {
        if (results.gross > 0 && this.els.bars.fee) {
            this.els.bars.fee.style.width = ((results.fee / results.gross) * 100) + '%';
            this.els.bars.cost.style.width = ((results.totalCost / results.gross) * 100) + '%';
            this.els.bars.profit.style.width = ((Math.max(0, results.profit) / results.gross) * 100) + '%';
        }
    },

    /**
     * Atualiza display de split de sócios.
     * @param {Object} splitResult — resultado do Calculator.calculateSplit()
     */
    updateSplit(splitResult) {
        var fmt = window.GGMax.Utils.formatCurrency;
        if (this.els.tools.resUser) {
            this.els.tools.resUser.textContent = fmt(splitResult.userAmount);
            this.els.tools.resPartner.textContent = fmt(splitResult.partnerAmount);
        }
    },

    /**
     * Atualiza display de prazo de liberação.
     * @param {Object} deadlineResult — resultado do Calculator.calculateDeadline()
     */
    updateDeadlineDisplay(deadlineResult) {
        if (this.els.modal.date) {
            this.els.modal.date.textContent = deadlineResult.date.toLocaleDateString('pt-BR');
        }
        if (this.els.modal.days) {
            this.els.modal.days.textContent = 'Daqui a ' + deadlineResult.days + ' dias';
        }
    },

    /**
     * Reseta todos os displays para valores iniciais.
     */
    resetDisplays() {
        if (this.els.resFee) this.els.resFee.textContent = 'R$ 0,00';
        if (this.els.resTotal) this.els.resTotal.textContent = 'R$ 0,00';
        if (this.els.resProfit) this.els.resProfit.textContent = 'R$ 0,00';
        if (this.els.bars.fee) {
            this.els.bars.fee.style.width = '0';
            this.els.bars.cost.style.width = '0';
            this.els.bars.profit.style.width = '0';
        }
    },

    /**
     * Limpa o formulário e reseta os inputs.
     */
    resetForm() {
        if (this.els.val) this.els.val.value = '';
        if (this.els.qty) this.els.qty.value = 1;
        if (this.els.cost) this.els.cost.value = '';
    },

    /**
     * Efeito 3D de tilt nos plan-cards.
     * @param {MouseEvent} e
     */
    tiltCard(e) {
        var card = e.currentTarget;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotX = (-(y - rect.height / 2) / 10);
        var rotY = ((x - rect.width / 2) / 10);
        card.style.transform = 'perspective(1000px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    },

    /**
     * Remove efeito tilt de um card.
     * @param {HTMLElement} card
     */
    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    },

    /**
     * Atualiza favicon dinâmico.
     */
    updateFavicon() {
        var favicon = document.getElementById('dynamic-favicon');
        if (favicon) {
            favicon.href = './assets/img/favicon.png';
        }
    },

    /**
     * Copia valor total para a área de transferência.
     */
    copyToClipboard() {
        var self = this;
        var text = this.els.resTotal ? this.els.resTotal.textContent : '';
        navigator.clipboard.writeText(text).then(function() {
            if (self.els.btnCopy) {
                self.els.btnCopy.style.color = 'var(--secondary)';
                setTimeout(function() {
                    self.els.btnCopy.style.color = '';
                }, 1000);
            }
        });
    },

    /**
     * Alterna entre temas dark/light.
     * @param {number} profit — lucro atual para atualizar favicon
     */
    toggleTheme(profit) {
        var root = document.documentElement;
        var isDark = root.classList.contains('dark');

        if (isDark) {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('ggmaxTheme', 'light');
        } else {
            root.classList.remove('light');
            root.classList.add('dark');
            localStorage.setItem('ggmaxTheme', 'dark');
        }

        // Força repaint caso necessário
        document.body.style.opacity = '0.99';
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 10);

        this.updateFavicon();
    },

    /**
     * Carrega tema salvo do localStorage.
     */
    loadTheme() {
        var savedTheme = localStorage.getItem('ggmaxTheme');
        var root = document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(savedTheme || 'dark');
    },

    /**
     * Esconde o skeleton loader com animação.
     */
    hideSkeleton() {
        setTimeout(function() {
            var sk = document.getElementById('skeleton');
            if (sk) {
                sk.style.transition = 'opacity 0.4s ease';
                sk.style.opacity = '0';
                setTimeout(function() { sk.remove(); }, 400);
            }
        }, 500);
    },

    /**
     * Renderiza a lista de histórico.
     * @param {Array} items — itens do histórico
     */
    renderHistory(items) {
        if (!this.els.historyList) return;

        this.els.historyList.innerHTML = '';

        if (items.length === 0) {
            this.els.historyList.innerHTML = '<div class="history-empty">Sem histórico recente.</div>';
            return;
        }

        items.forEach(function(item) {
            var div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = '<span>' + item.date + '</span> <span>' + item.profit + '</span>';
            this.els.historyList.appendChild(div);
        }.bind(this));
    }
};
