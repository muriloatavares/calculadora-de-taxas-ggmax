/**
 * ui.js — Módulo de Interface e Renderização (DOM)
 * Este arquivo é o "maestro" visual da aplicação. Ele traduz os números 
 * do Calculator.js em elementos visuais, animações e interações para o usuário.
 */

window.GGMax = window.GGMax || {};

window.GGMax.UI = {

    /** 
     * els — Cache de Referências do DOM
     * Armazenamos aqui todos os "IDs" do HTML para não precisar buscá-los 
     * toda hora (o que deixaria o app lento).
     */
    els: {},

    /**
     * cacheDOM — Busca e guarda os elementos do HTML na memória.
     */
    cacheDOM() {
        this.els = {
            // Campos de entrada (inputs)
            val: document.getElementById('inpValue'),
            qty: document.getElementById('inpQty'),
            cost: document.getElementById('inpCost'),
            
            // Campos de resultados
            resFee: document.getElementById('resFee'),
            resTotal: document.getElementById('resTotal'),
            resProfit: document.getElementById('resProfit'),
            resTaxPerc: document.getElementById('resTaxPerc'),
            
            // Barras de progresso visual
            bars: {
                fee: document.getElementById('barFee'),
                cost: document.getElementById('barCost'),
                profit: document.getElementById('barProfit')
            },
            
            // Modais e seus controles internos
            modal: {
                deadlines: document.getElementById('modalDeadlines'),
                tools: document.getElementById('modalTools'),
                cat: document.getElementById('selCategory'),
                acc: document.getElementById('chkAccelerated'),
                date: document.getElementById('txtDeadlineDate'),
                days: document.getElementById('txtDeadlineDays')
            },
            
            // Ferramentas extras (Split e Saque)
            tools: {
                splitUser: document.getElementById('inpSplitUser'),
                splitPartner: document.getElementById('inpSplitPartner'),
                resUser: document.getElementById('resSplitUser'),
                resPartner: document.getElementById('resSplitPartner'),
                withdraw: document.getElementById('inpWithdrawFee')
            },
            
            // Botões e utilitários
            canvas: document.getElementById('shareCanvas'),
            btnCopy: document.getElementById('btnCopy'),
            btnSaveHistory: document.getElementById('btnSaveHistory'),
            btnClear: document.getElementById('btnClear'),
            btnClearHistory: document.getElementById('btnClearHistory'),
            btnOpenDeadlines: document.getElementById('btnOpenDeadlines'),
            btnOpenTools: document.getElementById('btnOpenTools'),
            btnTheme: document.getElementById('themeToggle'),
            btnDiscordCopy: document.getElementById('btnDiscordCopy'),
            historyList: document.getElementById('historyList'),
            
            // Navegação de rodapé (Mobile)
            btnOpenDeadlinesMobile: document.getElementById('btnOpenDeadlinesMobile'),
            btnOpenToolsMobile: document.getElementById('btnOpenToolsMobile')
        };
    },

    /**
     * updateResults — Atualiza os números principais na tela.
     * 
     * @param {Object} results — O objeto vindo do Calculator.calculate().
     * @param {number} rate — A porcentagem atual da taxa.
     */
    updateResults(results, rate) {
        var fmt = window.GGMax.Utils.formatCurrency;

        // Atualiza a Taxa com animação suave
        if (this.els.resFee) {
            this.animateValue(this.els.resFee, results.fee, 400);
        }
        
        // Atualiza o Valor Total (Receber) com animação e pulso
        if (this.els.resTotal) {
            this.animateValue(this.els.resTotal, results.net, 500, true);
        }
        
        // Atualiza o Lucro Líquido e muda a cor para vermelho se for prejuízo
        if (this.els.resProfit) {
            this.animateValue(this.els.resProfit, results.profit, 600);
            this.els.resProfit.style.color = results.profit < 0 ? 'var(--danger)' : 'var(--secondary)';
            
            // Easter Egg: Solta "confetes" visuais se o lucro for alto (>= 500)
            if (results.profit >= 500) {
                this.triggerConfetti();
            }
        }
        
        // Exibe a porcentagem do plano selecionado
        if (this.els.resTaxPerc) {
            this.els.resTaxPerc.textContent = rate.toLocaleString('pt-BR') + '%';
        }
    },

    /**
     * animateValue — Efeito de Odômetro (Contagem Progressiva).
     * Faz os números subirem ou descerem suavemente em vez de mudar de uma vez.
     * 
     * @param {HTMLElement} el — O elemento de texto que será animado.
     * @param {number} end — O valor final desejado.
     * @param {number} duration — Quanto tempo a animação dura (em milissegundos).
     * @param {boolean} pulse — Se deve disparar um efeito de brilho ao terminar.
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
                    void el.offsetWidth; // Força o navegador a reiniciar a animação CSS
                    el.classList.add('pulse-anim');
                }
            }
        };
        window.requestAnimationFrame(step);
    },

    /**
     * updateThemeColor — Sincroniza a cor do sotaque (accent color).
     * Muda a variável CSS --active-color baseado no plano (Prata, Ouro, Diamante).
     * 
     * @param {string} plan — O tipo do plano.
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
     * triggerConfetti — Easter Egg de cores vibrantes.
     * Pisca a barra superior do app quando o lucro é excelente.
     */
    triggerConfetti() {
        if (this._confettiActive) return;
        this._confettiActive = true;
        this.showToast('🎉 Lucro épico detectado!', 'success');
        
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
     * updateBars — Atualiza o preenchimento das barras coloridas de progresso.
     */
    updateBars(results) {
        if (results.gross > 0 && this.els.bars.fee) {
            this.els.bars.fee.style.width = ((results.fee / results.gross) * 100) + '%';
            this.els.bars.cost.style.width = ((results.totalCost / results.gross) * 100) + '%';
            this.els.bars.profit.style.width = ((Math.max(0, results.profit) / results.gross) * 100) + '%';
        }
    },

    /**
     * updateSplit — Exibe a divisão de lucro entre sócios no modal.
     */
    updateSplit(splitResult) {
        var fmt = window.GGMax.Utils.formatCurrency;
        if (this.els.tools.resUser) {
            this.els.tools.resUser.textContent = fmt(splitResult.userAmount);
            this.els.tools.resPartner.textContent = fmt(splitResult.partnerAmount);
        }
    },

    /**
     * updateDeadlineDisplay — Exibe a data de liberação do dinheiro.
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
     * resetDisplays — Volta os textos de resultados para o zero (R$ 0,00).
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
     * resetForm — Limpa os campos de digitação.
     */
    resetForm() {
        if (this.els.val) this.els.val.value = '';
        if (this.els.qty) this.els.qty.value = 1;
        if (this.els.cost) this.els.cost.value = '';
    },

    /**
     * tiltCard — Efeito visual de inclinação 3D nos cards.
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
     * resetTilt — Remove o efeito 3D quando o mouse sai do card.
     */
    resetTilt(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    },

    /**
     * updateFavicon — Atualiza o ícone da aba do navegador.
     */
    updateFavicon() {
        var favicon = document.getElementById('dynamic-favicon');
        if (favicon) {
            favicon.href = './assets/img/favicon.png';
        }
    },

    /**
     * copyToClipboard — Copia o valor final para o CTRL+C.
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
            self.showToast('Valor copiado!', 'success');
        });
    },

    /**
     * toggleTheme — Troca entre Modo Escuro e Modo Claro.
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

        // Truque visual para garantir que as cores mudem sem falhas no browser
        document.body.style.opacity = '0.99';
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 10);

        this.updateFavicon();
    },

    /**
     * loadTheme — Recupera o tema que o usuário escolheu na última visita.
     */
    loadTheme() {
        var savedTheme = localStorage.getItem('ggmaxTheme');
        var root = document.documentElement;
        // Se for a primeira vez, tenta ler a preferência do Sistema Operacional
        if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            savedTheme = 'light';
        }
        root.classList.remove('dark', 'light');
        root.classList.add(savedTheme || 'dark');
    },

    /**
     * hideSkeleton — Esconde a tela de carregamento inicial.
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
     * showToast — Exibe uma notificação flutuante e temporária.
     * 
     * @param {string} message — O texto que aparece na mensagem.
     * @param {string} type — 'success', 'warning' ou 'error' (muda a cor da bolinha).
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
        
        void toast.offsetWidth; // Reflow for animation
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
    },

    /**
     * renderHistory — Desenha a lista de últimos cálculos na tela.
     */
    renderHistory(items) {
        if (!this.els.historyList) return;

        this.els.historyList.innerHTML = '';

        if (items.length === 0) {
            this.els.historyList.innerHTML = '<div class="history-empty">Nenhum cálculo salvo ainda.</div>';
            return;
        }

        items.forEach(function(item) {
            var div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = '<span>' + item.date + '</span> <strong>' + item.profit + '</strong>';
            this.els.historyList.appendChild(div);
        }.bind(this));
    }
};
