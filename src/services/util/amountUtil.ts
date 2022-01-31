/**
 * Util function to parse a string to a number.
 */
export function parseAmount(amount: string): number {
  return parseFloat(amount.replace(/\./g, '').replace(',', '.'));
}

/**
 * Util function to format a number to a string.
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(amount)
    .slice(0, -1)
    .trim();
}
