/**
 * calculator.js — Núcleo de Cálculos Matemáticos
 * Este arquivo isola toda a lógica de negócio do app. Ele não mexe no visual (DOM),
 * apenas processa números e retorna resultados.
 */

window.GGMax = window.GGMax || {};

window.GGMax.Calculator = {

    /**
     * calculate — O motor principal de cálculos da calculadora.
     * Processa o valor bruto, subtrai as taxas do site e os custos do vendedor.
     * 
     * @param {Object} state — O estado atual com todos os valores de entrada.
     * @param {number} state.value — Valor de venda de cada unidade.
     * @param {number} state.qty — Quantidade de itens sendo vendidos.
     * @param {number} state.cost — Quanto o vendedor pagou pelo item (custo).
     * @param {number} state.rate — A porcentagem da taxa (Prata, Ouro ou Diamante).
     * @param {number} state.withdrawFee — Taxa de saque cobrada pela plataforma.
     * @returns {Object} — Um objeto contendo o Valor Bruto, Taxa Paga, Valor Líquido e Lucro.
     */
    calculate(state) {
        var gross = state.value * state.qty; // Valor Total da Venda
        var fee = gross * (state.rate / 100); // Valor em Reais da Taxa do Site
        var net = gross - fee; // Quanto sobra após a taxa do site

        const totalCost = state.cost * state.qty; // Custo total de aquisição
        const profit = net - totalCost - state.withdrawFee; // Lucro Final Limpo

        return { gross, fee, net, totalCost, profit };
    },

    /**
     * calculateDeadline — Calcula quando o dinheiro estará disponível.
     * 
     * @param {number} categoryDays — Quantos dias a categoria do produto demora por padrão.
     * @param {boolean} isAccelerated — Se o vendedor ativou a liberação rápida (corta o tempo pela metade).
     * @returns {Object} — Objeto com a data futura (Date) e o número de dias (number).
     */
    calculateDeadline(categoryDays, isAccelerated) {
        const days = isAccelerated ? Math.ceil(categoryDays / 2) : categoryDays;
        const date = new Date();
        date.setDate(date.getDate() + days); // Soma os dias à data atual.
        return { date, days };
    },

    /**
     * calculateSplit — Divide o lucro entre duas pessoas (parceiros/sócios).
     * 
     * @param {number} profit — O lucro líquido total que será dividido.
     * @param {number} userPercentage — A porcentagem que fica com o Usuário A (0 a 100).
     * @returns {Object} — Quanto cada um recebe em Reais.
     */
    calculateSplit(profit, userPercentage) {
        const userFraction = (userPercentage || 0) / 100;
        return {
            userAmount: Math.max(0, profit * userFraction),
            partnerAmount: Math.max(0, profit * (1 - userFraction))
        };
    }
};
