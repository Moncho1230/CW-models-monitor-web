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
    } else {
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
    <div className="min-h-screen bg-black text-white px-6 py-14">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            🏆 <span className="text-white">TOP</span>{' '}
            <span className="text-red-600">
              {topType === 'payPeriod' ? 'PAY PERIOD' : 'STUDIOS'}
            </span>
          </h1>
          <p className="text-gray-400 mt-2">
            Generador oficial de rankings CW Models
          </p>
        </div>

        {/* CARD */}
        <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl space-y-6">

          {/* METADATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Día (Ej: DÍA 3)"
              value={day}
              onChange={e => setDay(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
            />

            <input
              placeholder="Campeón"
              value={champion}
              onChange={e => setChampion(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
            />

            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600"
            />

            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600"
            />
          </div>

          {/* TIPO TOP */}
          <div className="flex gap-3">
            <button
              onClick={() => setTopType('payPeriod')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${topType === 'payPeriod'
                  ? 'bg-red-600 text-white'
                  : 'bg-black border border-zinc-700 text-gray-300'
                }`}
            >
              👤 PAY PERIOD
            </button>

            <button
              onClick={() => setTopType('studios')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${topType === 'studios'
                  ? 'bg-red-600 text-white'
                  : 'bg-black border border-zinc-700 text-gray-300'
                }`}
            >
              🏢 STUDIOS
            </button>
          </div>

          {/* GÉNERO SOLO PAY PERIOD */}
          {topType === 'payPeriod' && (
            <div className="flex gap-3">
              <button
                onClick={() => setGender('men')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${gender === 'men'
                    ? 'bg-red-600 text-white'
                    : 'bg-black border border-zinc-700 text-gray-300'
                  }`}
              >
                👦 HOMBRES
              </button>

              <button
                onClick={() => setGender('women')}
                className={`flex-1 py-3 rounded-lg font-semibold transition ${gender === 'women'
                    ? 'bg-red-600 text-white'
                    : 'bg-black border border-zinc-700 text-gray-300'
                  }`}
              >
                👩 MUJERES
              </button>
            </div>
          )}

          {/* INPUT */}
          <TopInput
            currentText={text}
            setCurrentText={setText}
            onAddTop={generate}
            feedback={feedback}
            buttonLabel={
              topType === 'payPeriod'
                ? '🏆 GENERAR TOP PAY PERIOD'
                : '🏆 GENERAR TOP STUDIOS'
            }
            
          />


          {/* LIMPIAR */}
          <button
            onClick={clearAll}
            className="w-full bg-black border border-zinc-700 hover:border-red-600 transition py-3 rounded-lg text-gray-300"
          >
            LIMPIAR TODO
          </button>
        </div>

        {/* RESULTADO */}
        {result && (
          <div className="mt-10">
            <TopPreview text={result} />
          </div>
        )}
      </div>
    </div>
  )
}
