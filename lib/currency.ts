/**
 * Format a number as Vietnamese Dong (VND) currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫'
}

/**
 * Parse a VND amount string back to a number
 * @param vndString - The VND string to parse
 * @returns The numeric value
 */
export function parseVND(vndString: string): number {
  return parseFloat(vndString.replace(/[^\d.-]/g, '')) || 0
} 