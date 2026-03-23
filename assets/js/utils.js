/**
 * utils.js — Funções Utilitárias Globais
 * Este módulo contém funções auxiliares para manipulação de strings, 
 * conversão de dados e formatação visual, garantindo a consistência em todo o app.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Utils = {

    /**
     * parseInput — Converte texto formatado em número calculável.
     * Pega uma string vinda de um input (ex: "R$ 1.234,56") e a transforma em um float.
     * 
     * @param {string} val — A string bruta do campo de entrada.
     * @returns {number} — O valor numérico pronto para cálculos matemáticos.
     */
    parseInput(val) {
        // Remove tudo que não é dígito, divide por 100 para converter centavos em decimais.
        return parseFloat(val.replace(/\D/g, '')) / 100 || 0;
    },

    /**
     * formatCurrency — Transforma números no padrão de moeda Brasileira (BRL).
     * Exemplo: 1234.56 vira "R$ 1.234,56".
     * 
     * @param {number} val — O número puro.
     * @returns {string} — A string formatada com símbolo de Real e separadores de milhar.
     */
    formatCurrency(val) {
        return val.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * formatMoneyInput — Mascaramento de input em tempo real.
     * Garante que o usuário veja a formatação de moeda enquanto digita no campo.
     * 
     * @param {Event} e — O evento de digitação (input).
     */
    formatMoneyInput(e) {
        const cleaned = e.target.value.replace(/\D/g, '');
        if (cleaned) {
            // Converte os dígitos digitados em um formato visual de Real (com 2 casas decimais).
            e.target.value = (parseInt(cleaned) / 100).toLocaleString('pt-BR', {
                minimumFractionDigits: 2
            });
        } else {
            e.target.value = '';
        }
    }
};
