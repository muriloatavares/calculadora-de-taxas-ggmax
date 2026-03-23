/**
 * utils.js — Funções utilitárias da aplicação
 * Parsing, formatação e helpers reutilizáveis.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Utils = {

    /**
     * Converte string formatada (ex: "1.234,56") para número.
     * @param {string} val — valor do input
     * @returns {number}
     */
    parseInput(val) {
        return parseFloat(val.replace(/\D/g, '')) / 100 || 0;
    },

    /**
     * Formata número como moeda BRL (ex: R$ 1.234,56).
     * @param {number} val
     * @returns {string}
     */
    formatCurrency(val) {
        return val.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Handler de formatação em tempo real para inputs monetários.
     * Remove caracteres não numéricos e formata como decimal.
     * @param {Event} e — evento de input
     */
    formatMoneyInput(e) {
        const cleaned = e.target.value.replace(/\D/g, '');
        if (cleaned) {
            e.target.value = (parseInt(cleaned) / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            });
        }
    }
};
