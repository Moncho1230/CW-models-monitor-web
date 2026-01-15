import { RankRow } from '@/types/model'

export function generatePayPeriodTop(rows: RankRow[]): RankRow[] {
  return [...rows].sort((a, b) => b.credits - a.credits)
}
