import { RankRow } from '@/types/model'

export function formatStudiosTop(
  rows: RankRow[],
  day: string,
  champion: string,
  dateRange: string
): string {

  // 💰 Premios por posición
  const premios: Record<number, string> = {
    1: '$300.000',
    2: '$250.000',
    3: '$200.000',
    4: '$150.000',
    5: '$100.000'
  }

  // 🏅 Medallas
  const medals: Record<number, string> = {
    1: '🥇',
    2: '🥈',
    3: '🥉'
  }

  // 🚀 Emojis especiales para premios TOP
  const prizeIcons: Record<number, string> = {
    1: '🚀💰',
    2: '🛸💰',
    3: '🚁💰',
    4: '🚢💰'
  }

  const lines: string[] = [
    '*TOP STUDIOS FOR PAY PERIOD* 🏆 ✅ 🥇🎊💎🤩🥳 💪🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊🎊',
    '',
    `*CAMPEON: ${champion.toUpperCase()}*`,
    '',
    `(${dateRange})`,
    '',
    `*${day.toUpperCase()}*`,
    ''
  ]

  rows.forEach((row, index) => {
    const pos = index + 1
    const medal = medals[pos] ?? `#${pos}`

    // 📊 Créditos formateados con separador
    const creditsFormatted = Number(row.credits).toLocaleString('en-US')

    lines.push(
      `${medal} ${row.name.toUpperCase()} (${creditsFormatted})`
    )

    // 💰 Línea de premio
    if (premios[pos]) {
      const icon = prizeIcons[pos] ?? '🏅💰'
      lines.push(`${icon} ${premios[pos]}`)
    }
  })

  return lines.join('\n')
}

