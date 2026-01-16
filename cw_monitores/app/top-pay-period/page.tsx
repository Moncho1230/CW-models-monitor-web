'use client'

import { useState } from 'react'
import TopInput from '@/components/ui/TopInput'
import TopPreview from '@/components/preview/TopPreview'
import { parseTextRank } from '@/lib/parsers/parseTextRank'
import { generatePayPeriodTop } from '@/lib/tops/topPayPeriod'
import { formatPayPeriodTop } from '@/lib/formatters/whatsappPayPeriod'
import { formatStudiosTop } from '@/lib/formatters/whatsappStudios'
import { formatDateRange } from '@/lib/utils/date'

export default function TopPayPeriodPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const [topType, setTopType] = useState<'payPeriod' | 'studios'>('payPeriod')
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

    const dateRange = formatDateRange(startDate, endDate)

    if (topType === 'payPeriod') {
      const ranking = generatePayPeriodTop(rows)

      setResult(
        formatPayPeriodTop(
          ranking,
          gender === 'men' ? 'Guys Master' : 'Girls Master',
          day,
          champion,
          dateRange
        )
      )
    }

    if (topType === 'studios') {
      setResult(
        formatStudiosTop(
          rows,
          day,
          champion,
          dateRange
        )
      )
    }

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
      <h1 className="text-2xl font-bold">Top Generator</h1>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Día (Ej: DÍA 3)"
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

        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Tipo de Top */}
      <div className="flex gap-2">
        <button
          onClick={() => setTopType('payPeriod')}
          className={`px-4 py-2 rounded ${
            topType === 'payPeriod'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
        >
          👤 Pay Period
        </button>

        <button
          onClick={() => setTopType('studios')}
          className={`px-4 py-2 rounded ${
            topType === 'studios'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'
          }`}
        >
          🏢 Studios
        </button>
      </div>

      {/* Género SOLO Pay Period */}
      {topType === 'payPeriod' && (
        <div className="flex gap-2">
          <button
            onClick={() => setGender('men')}
            className={`px-4 py-2 rounded ${
              gender === 'men'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            👦 Hombres
          </button>

          <button
            onClick={() => setGender('women')}
            className={`px-4 py-2 rounded ${
              gender === 'women'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            👩 Mujeres
          </button>
        </div>
      )}

      <TopInput
        currentText={text}
        setCurrentText={setText}
        onAddTop={generate}
        feedback={feedback}
        buttonLabel={
          topType === 'payPeriod'
            ? '🏆 Generar Top Pay Period'
            : '🏆 Generar Top Studios'
        }
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
