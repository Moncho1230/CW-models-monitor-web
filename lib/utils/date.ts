export function formatDateRange(start: string, end: string): string {
  if (!start || !end) return ''

  const formatLocalDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  const startDate = formatLocalDate(start)
  const endDate = formatLocalDate(end)

  const startFormatted = startDate.toLocaleDateString('es-ES', options)
  const endFormatted = endDate.toLocaleDateString('es-ES', options)

  return `(${startFormatted} - ${endFormatted})`
}
