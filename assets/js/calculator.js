/**
 * calculator.js — Regras de negócio e cálculos
 * Funções puras sem dependência de DOM.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Calculator = {

    /**
     * Calcula taxas, valor líquido e lucro.
     * @param {Object} state — estado da aplicação
     * @param {number} state.value — valor unitário
     * @param {number} state.qty — quantidade
     * @param {number} state.cost — custo unitário
     * @param {number} state.rate — taxa do plano (%)
     * @param {string} state.mode — 'normal' ou 'reverse'
     * @param {number} state.withdrawFee — taxa de saque
     * @returns {Object} { gross, fee, net, totalCost, profit }
     */
    calculate(state) {
        var gross = state.value * state.qty;
        var fee = gross * (state.rate / 100);
        var net = gross - fee;

        const totalCost = state.cost * state.qty;
        const profit = net - totalCost - state.withdrawFee;

        return { gross, fee, net, totalCost, profit };
    },

    /**
     * Calcula a data estimada de liberação.
     * @param {number} categoryDays — dias base da categoria
     * @param {boolean} isAccelerated — liberação acelerada?
     * @returns {Object} { date: Date, days: number }
     */
    calculateDeadline(categoryDays, isAccelerated) {
        const days = isAccelerated ? Math.ceil(categoryDays / 2) : categoryDays;
        const date = new Date();
        date.setDate(date.getDate() + days);
        return { date, days };
    },

    /**
     * Calcula a divisão de lucro entre sócios.
     * @param {number} profit — lucro líquido total
     * @param {number} userPercentage — porcentagem do usuário (0-100)
     * @returns {Object} { userAmount, partnerAmount }
     */
    calculateSplit(profit, userPercentage) {
        const userFraction = (userPercentage || 0) / 100;
        return {
            userAmount: Math.max(0, profit * userFraction),
            partnerAmount: Math.max(0, profit * (1 - userFraction))
        };
    }
};
