import { RankRow } from '@/types/model'

export function formatStudiosTop(
  rows: RankRow[],
  day: string,
  champion: string,
  dateRange: string
) {
  const header = [
    '*TOP STUDIOS FOR PAY PERIOD* 🏆 ✅ 🥇🎊💎🤩🥳',
    '',
    `*CAMPEON: ${champion.toUpperCase()}*`,
    '',
    `(${dateRange})`,
    '',
    `*${day}*`,
    ''
  ]

  const body = rows.map((row, index) => {
    const position = index + 1

    if (position === 1) {
      return `🥇 ${row.name.toUpperCase()} (${row.credits})`
    }

    if (position === 2) {
      return `🥈 ${row.name.toUpperCase()} (${row.credits})`
    }

    if (position === 3) {
      return `🥉 ${row.name.toUpperCase()} (${row.credits})`
    }

    return `#${position} ${row.name.toUpperCase()} (${row.credits})`
  })

  return [...header, ...body].join('\n')
}
