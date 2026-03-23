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
            historyList: document.getElementById('historyList'),
            // Mobile Nav
            btnOpenDeadlinesMobile: document.getElementById('btnOpenDeadlinesMobile'),
            btnOpenToolsMobile: document.getElementById('btnOpenToolsMobile')
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
            this.animateValue(this.els.resFee, results.fee, 400);
        }
        if (this.els.resTotal) {
            this.animateValue(this.els.resTotal, results.net, 500, true);
        }
        if (this.els.resProfit) {
            this.animateValue(this.els.resProfit, results.profit, 600);
            this.els.resProfit.style.color = results.profit < 0 ? 'var(--danger)' : 'var(--secondary)';
            
            // Easter Egg: Confetti for high profit
            if (results.profit >= 500) {
                this.triggerConfetti();
            }
        }
        if (this.els.resTaxPerc) {
            this.els.resTaxPerc.textContent = rate.toLocaleString('pt-BR') + '%';
        }
    },

    /**
     * Animação de números (Odômetro)
     */
    animateValue(el, end, duration, pulse) {
        var start = parseFloat(el.getAttribute('data-val') || 0);
        if (start === end) {
            el.textContent = window.GGMax.Utils.formatCurrency(end);
            return;
        }

        var range = end - start;
        var startTime = null;

        var step = function(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = start + (range * progress);
            el.textContent = window.GGMax.Utils.formatCurrency(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.setAttribute('data-val', end);
                if (pulse) {
                    el.classList.remove('pulse-anim');
                    void el.offsetWidth;
                    el.classList.add('pulse-anim');
                }
            }
        };
        window.requestAnimationFrame(step);
    },

    /**
     * Altera a cor principal baseada no plano
     */
    updateThemeColor(plan) {
        var colors = {
            'prata': '#adb5bd',
            'ouro': '#f19304',
            'diamante': '#06b6d4'
        };
        var color = colors[plan] || '#007bff';
        document.documentElement.style.setProperty('--active-color', color);
    },

    /**
     * Micro-interação de Confetes
     */
    triggerConfetti() {
        if (this._confettiActive) return;
        this._confettiActive = true;
        this.showToast('🎉 Lucro épico detectado!', 'success');
        
        // Simples efeito de cores piscando no topo
        var bar = document.querySelector('.container::before');
        if (bar) {
            var originalColor = getComputedStyle(document.documentElement).getPropertyValue('--active-color');
            var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', originalColor];
            var i = 0;
            var interval = setInterval(function() {
                document.documentElement.style.setProperty('--active-color', colors[i]);
                i++;
                if (i >= colors.length) {
                    clearInterval(interval);
                    this._confettiActive = false;
                }
            }.bind(this), 100);
        } else {
            this._confettiActive = false;
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
            self.showToast('Copiado com sucesso!', 'success');
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
     * Carrega tema salvo do localStorage ou preferências do usuário.
     */
    loadTheme() {
        var savedTheme = localStorage.getItem('ggmaxTheme');
        var root = document.documentElement;
        if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            savedTheme = 'light';
        }
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
     * Exibe notificação no estilo Toast.
     * @param {string} message - Mensagem do toast
     * @param {string} type - 'success', 'warning' ou 'error'
     */
    showToast(message, type) {
        if (!type) type = 'success';
        var container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        var toast = document.createElement('div');
        toast.className = 'toast toast-' + type;
        
        var iconStr = type === 'success' ? '✓' : (type === 'error' ? '!' : '⚠️');
        
        toast.innerHTML = '<span class="toast-icon">' + iconStr + '</span><span class="toast-text">' + message + '</span>';
        
        container.appendChild(toast);
        
        // Reflow for transition
        void toast.offsetWidth;
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
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
