/**
 * Formata um número no padrão monetário Brasileiro (R$ 1.234,56)
 */
export function formatCurrency(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata percentual com 1 ou 2 casas decimais (ex: 11,99% ou 35,0%)
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (isNaN(value) || !isFinite(value)) return "0,0%";
  return `${value.toFixed(decimals).replace(".", ",")}%`;
}

/**
 * Converte string digitada pelo usuário em número float (ex: "1.250,50" -> 1250.50)
 */
export function parseCurrencyInput(value: string): number {
  if (!value) return 0;
  // Remove tudo que não for dígito e vírgula/ponto
  const cleaned = value.replace(/[^\d.,]/g, "");
  // Trata formato BR (vírgula como decimal)
  const normalized = cleaned.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(normalized);
  return isNaN(num) || num < 0 ? 0 : num;
}

/**
 * Formata valor enquanto o usuário digita no input monetário
 */
export function formatCurrencyInputValue(value: number): string {
  if (!value || value === 0) return "";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Formata data em pt-BR
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Formata data e hora para histórico
 */
export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
