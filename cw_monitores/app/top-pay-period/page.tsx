'use client'

import { useState } from 'react'
import TopInput from '@/components/ui/TopInput'
import TopPreview from '@/components/preview/TopPreview'
import { parseTextRank } from '@/lib/parsers/parseTextRank'
import { generatePayPeriodTop } from '@/lib/tops/topPayPeriod'
import { formatPayPeriodTop } from '@/lib/formatters/whatsappPayPeriod'
import { formatDateRange } from '@/lib/utils/date'

export default function TopPayPeriodPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const [gender, setGender] = useState<'men' | 'women'>('men')
  const [day, setDay] = useState('DÍA 1')
  const [champion, setChampion] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const generate = () => {
    const rows = parseTextRank(text)

    if (!rows.length) {
      setFeedback('❌ No se detectaron datos válidos')
      return
    }

    if (!champion) {
      setFeedback('⚠️ Debes ingresar el campeón')
      return
    }

    if (!startDate || !endDate) {
      setFeedback('⚠️ Debes seleccionar el rango de fechas')
      return
    }

    if (new Date(startDate) > new Date(endDate)) {
      setFeedback('❌ La fecha inicial no puede ser mayor que la final')
      return
    }

    const ranking = generatePayPeriodTop(rows)
    const dateRange = formatDateRange(startDate, endDate)

    const formatted = formatPayPeriodTop(
      ranking,
      gender === 'men' ? 'Guys Master' : 'Girls Master',
      day,
      champion,
      dateRange
    )

    setResult(formatted)
    setFeedback(null)
  }

  const clearAll = () => {
    setText('')
    setResult('')
    setChampion('')
    setStartDate('')
    setEndDate('')
    setDay('DÍA 1')
    setFeedback(null)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Top Pay Period</h1>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Día (Ej: DÍA 2)"
          value={day}
          onChange={e => setDay(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Campeón"
          value={champion}
          onChange={e => setChampion(e.target.value)}
          className="border p-2 rounded"
        />

        <div>
          <label className="text-sm font-medium">Fecha inicio</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Fecha fin</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <TopInput
        currentText={text}
        setCurrentText={setText}
        onAddTop={generate}
        feedback={feedback}
        gender={gender}
        setGender={setGender}
        buttonLabel="🏆 Generar Top Pay Period"
      />

      {result && (
        <>
          <TopPreview text={result} />

          <button
            onClick={clearAll}
            className="bg-gray-800 text-white px-4 py-2 rounded w-full"
          >
            🧹 Limpiar
          </button>
        </>
      )}
    </div>
  )
}
