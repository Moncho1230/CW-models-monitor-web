import { RankRow } from '@/types/model'

export function generateTopAnual(rows: RankRow[]): RankRow[] {
  const map = new Map<string, number>()

  rows.forEach(({ name, credits }) => {
    map.set(name, (map.get(name) || 0) + credits)
  })

  return Array.from(map.entries())
    .map(([name, credits]) => ({ name, credits }))
    .sort((a, b) => b.credits - a.credits)
}
