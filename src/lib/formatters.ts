
/**
 * Format number as currency
 */
export function formatCurrency(
  amount: number, 
  currency: string = "USD", 
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits
  }).format(amount);
}

/**
 * Format number as percentage
 */
export function formatPercentage(
  value: number, 
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits
  }).format(value / 100);
}

/**
 * Format large numbers with k, M, B suffixes
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

/**
 * Format number with specified decimal places
 */
export function formatNumber(
  value: number, 
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits
  }).format(value);
}
