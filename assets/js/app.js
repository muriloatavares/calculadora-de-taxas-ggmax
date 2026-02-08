  (() => {
    const app = {
        state: {
            value: 0,
            qty: 1,
            cost: 0,
            rate: 11.99,
            mode: 'normal',
            withdrawFee: 0,
            profit: 0
        },
        els: {},

        init() {
            setTimeout(() => {
                const sk = document.getElementById('skeleton');
                if (sk) {
                    sk.classList.add('hidden');
                    setTimeout(() => sk.remove(), 500);
                }
            }, 800);

            this.cacheDOM();
            this.bindEvents();
            this.loadHistory();
            this.loadTheme();
            this.updateDeadline();
        },

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
                btnModeSell: document.getElementById('btnModeSell'),
                btnModeReceive: document.getElementById('btnModeReceive'),
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

        bindEvents() {
            const recalc = () => this.calc();

            if (this.els.val) {
                this.els.val.addEventListener('input', (e) => {
                    this.state.value = this.parseInput(e.target.value);
                    recalc();
                });
            }

            if (this.els.qty) {
                this.els.qty.addEventListener('input', (e) => {
                    this.state.qty = parseInt(e.target.value) || 1;
                    recalc();
                });
            }

            if (this.els.cost) {
                this.els.cost.addEventListener('input', (e) => {
                    this.state.cost = this.parseInput(e.target.value);
                    recalc();
                });
            }

            if (this.els.tools.withdraw) {
                this.els.tools.withdraw.addEventListener('input', (e) => {
                    this.state.withdrawFee = this.parseInput(e.target.value);
                    recalc();
                });
            }

            if (this.els.tools.splitUser) {
                this.els.tools.splitUser.addEventListener('input', (e) => {
                    let val = parseInt(e.target.value) || 0;
                    if (val > 100) val = 100;
                    if (this.els.tools.splitPartner) {
                        this.els.tools.splitPartner.value = 100 - val;
                    }
                    recalc();
                });
            }

            document.querySelectorAll('input[name="plan"]').forEach((radio) => {
                radio.addEventListener('change', (e) => {
                    this.state.rate = parseFloat(e.target.value);
                    recalc();
                });
            });

            if (this.els.btnCopy) {
                this.els.btnCopy.addEventListener('click', () => this.copyToClipboard());
            }

            document.querySelectorAll('.plan-card').forEach((card) => {
                card.addEventListener('mousemove', (e) => this.tiltCard(e));
                card.addEventListener('mouseleave', () => this.resetTilt(card));
            });

            if (this.els.modal.cat) {
                this.els.modal.cat.addEventListener('change', () => this.updateDeadline());
            }

            if (this.els.modal.acc) {
                this.els.modal.acc.addEventListener('change', () => this.updateDeadline());
            }

            if (this.els.btnClear) {
                this.els.btnClear.addEventListener('click', () => this.resetForm());
            }

            if (this.els.btnSaveHistory) {
                this.els.btnSaveHistory.addEventListener('click', () => this.addToHistory());
            }

            if (this.els.btnClearHistory) {
                this.els.btnClearHistory.addEventListener('click', () => this.clearHistory());
            }

            if (this.els.btnOpenDeadlines) {
                this.els.btnOpenDeadlines.addEventListener('click', () => {
                    if (this.els.modal.deadlines) {
                        this.els.modal.deadlines.showModal();
                    }
                });
            }

            if (this.els.btnOpenTools) {
                this.els.btnOpenTools.addEventListener('click', () => {
                    if (this.els.modal.tools) {
                        this.els.modal.tools.showModal();
                    }
                });
            }

            document.querySelectorAll('.modal-close').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.target.closest('dialog')?.close();
                });
            });

            ['inpValue', 'inpCost', 'inpWithdrawFee'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    el.addEventListener('input', (e) => {
                        const cleaned = e.target.value.replace(/\D/g, '');
                        if (cleaned) {
                            e.target.value = (parseInt(cleaned) / 100).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2
                            });
                        }
                    });
                }
            });
        },

        parseInput(val) {
            return parseFloat(val.replace(/\D/g, '')) / 100 || 0;
        },

        formatCurrency(val) {
            return val.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        },

        calc() {
            const s = this.state;
            let gross = 0, fee = 0, net = 0;

            if (s.value === 0) {
                this.resetDisplays();
                this.updateFavicon(false);
                return;
            }

            if (s.mode === 'normal') {
                gross = s.value * s.qty;
                fee = gross * (s.rate / 100);
                net = gross - fee;
            } else {
                const unitGross = s.value / (1 - (s.rate / 100));
                gross = unitGross * s.qty;
                net = s.value * s.qty;
                fee = gross - net;
            }

            const totalCost = s.cost * s.qty;
            const profit = net - totalCost - s.withdrawFee;
            this.state.profit = profit;

            if (this.els.resFee) {
                this.els.resFee.textContent = this.formatCurrency(fee);
            }

            if (this.els.resTotal) {
                this.els.resTotal.textContent = this.formatCurrency(net);
            }

            if (this.els.resProfit) {
                this.els.resProfit.textContent = this.formatCurrency(profit);
                this.els.resProfit.style.color = profit < 0 ? 'var(--danger)' : 'var(--secondary)';
            }

            if (this.els.resTaxPerc) {
                this.els.resTaxPerc.textContent = s.rate.toLocaleString('pt-BR') + '%';
            }

            if (gross > 0 && this.els.bars.fee) {
                this.els.bars.fee.style.width = ((fee / gross) * 100) + '%';
                this.els.bars.cost.style.width = ((totalCost / gross) * 100) + '%';
                this.els.bars.profit.style.width = ((Math.max(0, profit) / gross) * 100) + '%';
            }

            if (this.els.tools.resUser) {
                const userPerc = (parseInt(this.els.tools.splitUser.value) || 0) / 100;
                this.els.tools.resUser.textContent = this.formatCurrency(Math.max(0, profit * userPerc));
                this.els.tools.resPartner.textContent = this.formatCurrency(Math.max(0, profit * (1 - userPerc)));
            }

            this.updateFavicon(profit > 0);
        },

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

        setMode(mode) {
            this.state.mode = mode;
            const isSell = mode === 'normal';

            if (this.els.btnModeSell) {
                this.els.btnModeSell.classList.toggle('active', isSell);
                this.els.btnModeSell.style.backgroundColor = isSell ? 'var(--primary)' : 'transparent';
                this.els.btnModeSell.style.color = isSell ? 'white' : 'var(--text-muted)';
            }

            if (this.els.btnModeReceive) {
                this.els.btnModeReceive.classList.toggle('active', !isSell);
                this.els.btnModeReceive.style.backgroundColor = !isSell ? 'var(--primary)' : 'transparent';
                this.els.btnModeReceive.style.color = !isSell ? 'white' : 'var(--text-muted)';
            }

            this.calc();
        },

        copyToClipboard() {
            const text = this.els.resTotal?.textContent || '';
            navigator.clipboard.writeText(text).then(() => {
                if (this.els.btnCopy) {
                    this.els.btnCopy.style.color = 'var(--secondary)';
                    setTimeout(() => {
                        this.els.btnCopy.style.color = '';
                    }, 1000);
                }
            });
        },

        tiltCard(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotX = (-(y - rect.height / 2) / 10);
            const rotY = ((x - rect.width / 2) / 10);
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        },

        resetTilt(card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        },

        toggleTheme() {
            const isDark = document.body.classList.contains('dark');
            
            if (isDark) {
                // Mudar para light
                document.body.classList.remove('dark');
                document.body.classList.add('light');
                localStorage.setItem('ggmaxTheme', 'light');
            } else {
                // Mudar para dark
                document.body.classList.remove('light');
                document.body.classList.add('dark');
                localStorage.setItem('ggmaxTheme', 'dark');
            }
            
            // Força repaint
            document.body.style.opacity = '0.99';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 10);
            
            this.updateFavicon(this.state.profit > 0);
        },

        loadTheme() {
            const savedTheme = localStorage.getItem('ggmaxTheme');
            
            // Remove ambas as classes
            document.body.classList.remove('dark', 'light');
            
            // Adiciona a tema salvo (padrão 'dark')
            document.body.classList.add(savedTheme || 'dark');
        },

        updateFavicon(isPositive) {
            const favicon = document.getElementById('dynamic-favicon');
            if (favicon) {
                favicon.href = './assets/img/favicon.png';
            }
        },

        updateDeadline() {
            if (!this.els.modal.cat || !this.els.modal.acc) return;

            const catValue = parseInt(this.els.modal.cat.value);
            const isAccelerated = this.els.modal.acc.checked;
            const days = isAccelerated ? Math.ceil(catValue / 2) : catValue;

            const date = new Date();
            date.setDate(date.getDate() + days);

            if (this.els.modal.date) {
                this.els.modal.date.textContent = date.toLocaleDateString('pt-BR');
            }

            if (this.els.modal.days) {
                this.els.modal.days.textContent = `Daqui a ${days} dias`;
            }
        },

        resetForm() {
            this.state.value = 0;
            this.state.cost = 0;
            this.state.qty = 1;

            if (this.els.val) this.els.val.value = '';
            if (this.els.qty) this.els.qty.value = 1;
            if (this.els.cost) this.els.cost.value = '';

            this.calc();
        },

        addToHistory() {
            if (this.state.value === 0) return;

            const item = {
                date: new Date().toLocaleString('pt-BR'),
                val: this.els.resTotal?.textContent || 'R$ 0,00',
                profit: this.els.resProfit?.textContent || 'R$ 0,00'
            };

            const hist = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            hist.unshift(item);

            if (hist.length > 5) {
                hist.pop();
            }

            localStorage.setItem('ggmaxhist', JSON.stringify(hist));
            this.loadHistory();
        },

        loadHistory() {
            if (!this.els.historyList) return;

            const hist = JSON.parse(localStorage.getItem('ggmaxhist') || '[]');
            this.els.historyList.innerHTML = '';

            if (hist.length === 0) {
                this.els.historyList.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:10px;">Sem histórico recente.</div>';
                return;
            }

            hist.forEach((item) => {
                const div = document.createElement('div');
                div.style.cssText = 'display:flex; justify-content:space-between; padding:8px; background:var(--bg-input); border-radius:4px; font-size:0.8rem;';
                div.innerHTML = `<span>${item.date}</span> <span>${item.profit}</span>`;
                this.els.historyList.appendChild(div);
            });
        },

        clearHistory() {
            localStorage.removeItem('ggmaxhist');
            this.loadHistory();
        }
    };

    document.getElementById('btnModeSell')?.addEventListener('click', () => app.setMode('normal'));
    document.getElementById('btnModeReceive')?.addEventListener('click', () => app.setMode('reverse'));

    window.addEventListener('DOMContentLoaded', () => app.init());

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
})();
