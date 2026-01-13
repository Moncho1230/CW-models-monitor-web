import { RankRow } from '@/types/model'

export function formatTopAnual(
  ranking: RankRow[],
  year: number,
  genderLabel: string
): string {
  const prizes: Record<number, number> = {
    1: 2_000_000,
    2: 1_500_000,
    3: 1_250_000,
    4: 1_000_000,
    5: 900_000,
    6: 750_000,
    7: 500_000,
    8: 400_000,
    9: 350_000,
    10: 300_000
  }

  const lines: string[] = [
    `FLIRT OF THE YEAR ${year} 🏆🔥`,
    `*${genderLabel.toUpperCase()}*`,
    ''
  ]

  ranking.forEach((row, index) => {
    const pos = index + 1
    lines.push(`#${pos} ${row.name.toUpperCase()} (${row.credits.toLocaleString()})`)

    if (prizes[pos]) {
      lines.push(`💰 $${prizes[pos].toLocaleString()}`)
    } else if (pos <= 15) {
      lines.push(`💰 $200.000`)
    }
  })

  return lines.join('\n')
}
