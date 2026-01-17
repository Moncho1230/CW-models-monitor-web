import { RankRow } from '@/types/model'

export function formatPayPeriodTop(
  ranking: RankRow[],
  genderLabel: string,
  day: string,
  champion: string,
  dateRange: string
): string {
  const premios: Record<number, string> = {
    1: '$500.000',
    2: '$300.000',
    3: '$250.000',
    4: '$200.000',
    5: '$150.000',
    6: '$125.000',
    7: '$125.000',
    8: '$100.000',
    9: '$100.000',
    10: '$100.000',
    11: '$75.000',
    12: '$75.000',
    13: '$50.000',
    14: '$50.000',
    15: '$50.000'
  }

  const medals: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
  }

  const lines: string[] = [
    '*TOP MODELS FOR PAY PERIOD*',
    '🏆💎🔥',
    '',
    `*${day.toUpperCase()}*`,
    '',
    `*${genderLabel.toUpperCase()}*`,
    '',
    `*CAMPEÓN: ${champion.toUpperCase()}*`,
    '',
    dateRange,
    ''
  ]

  ranking.forEach((row, index) => {
    const pos = index + 1
    const medal = medals[pos] || `#${pos}`

    lines.push(`${medal} ${row.name.toUpperCase()} (${row.credits.toLocaleString()})`)

    if (premios[pos]) {
      lines.push(`🏅💰 ${premios[pos]}`)
    }
  })

  return lines.join('\n')
}
