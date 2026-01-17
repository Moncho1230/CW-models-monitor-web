export function parseCredits(value: string): number {
  return Number(value.replace(/[.,]/g, '')) || 0
}
