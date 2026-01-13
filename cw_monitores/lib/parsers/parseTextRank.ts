import { RankRow } from '@/types/model'
import { parseCredits } from '@/lib/utils/credits'

export function parseTextRank(text: string): RankRow[] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      // separa por tabs o múltiples espacios
      const parts = line.split(/\t+|\s{2,}/)

      const name = parts[0]
      const creditsRaw = parts[2]

      if (!name || !creditsRaw) return null

      return {
        name,
        credits: parseCredits(creditsRaw)
      }
    })
    .filter((row): row is RankRow => row !== null)
}
