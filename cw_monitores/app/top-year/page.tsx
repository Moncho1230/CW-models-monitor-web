'use client'

import Link from 'next/link'
import { useState } from 'react'
import TopInput from '@/components/ui/TopInput'
import TopPreview from '@/components/preview/TopPreview'
import { parseTextRank } from '@/lib/parsers/parseTextRank'
import { generateTopAnual } from '@/lib/tops/topAnual'
import { formatTopAnual } from '@/lib/formatters/whatsappFormatter'

export default function TopAnualPage() {
  const [currentText, setCurrentText] = useState('')
  const [tops, setTops] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [gender, setGender] = useState<'men' | 'women'>('men')
  const [previousWinner, setPreviousWinner] = useState('')
  const [result, setResult] = useState('')

  const addTop = () => {
    const rows = parseTextRank(currentText)

    if (rows.length === 0) {
      setFeedback('❌ No se detectaron modelos válidos')
      return
    }

    setTops(prev => [...prev, currentText])
    setCurrentText('')
    setFeedback(`✅ Top agregado (${rows.length} modelos)`)
  }

  const removeLastTop = () => {
    if (!tops.length) return
    setTops(prev => prev.slice(0, -1))
  }

  const generateTop = () => {
    const allText = tops.join('\n')
    const rows = parseTextRank(allText)
    const ranking = generateTopAnual(rows)

    const formatted = formatTopAnual(
      ranking,
      2025,
      gender === 'men' ? 'Men Master' : 'Women Master',
      previousWinner
    )

    setResult(formatted)
  }

  const clearAll = () => {
    setCurrentText('')
    setTops([])
    setResult('')
    setFeedback(null)
    setPreviousWinner('')
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-14">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="
    inline-flex items-center gap-2
    mb-6
    px-4 py-2
    rounded-xl
    bg-black border border-zinc-700
    text-gray-300 font-medium
    hover:border-red-600 hover:text-white
    transition
  "
        >
          ← Volver al inicio
        </Link>


        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            🏆 <span className="text-white">TOP</span>{' '}
            <span className="text-red-600">ANUAL</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Generador oficial de ranking anual CW Models
          </p>
        </div>

        {/* CARD */}
        <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl space-y-6">

          {/* META */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>Tops agregados: <strong className="text-white">{tops.length}</strong></span>
          </div>

          {/* GANADOR */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Ganador año anterior
            </label>
            <input
              value={previousWinner}
              onChange={e => setPreviousWinner(e.target.value)}
              placeholder="Ej: Frank Dwayne"
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* INPUT TOP */}
          <TopInput
            currentText={currentText}
            setCurrentText={setCurrentText}
            onAddTop={addTop}
            feedback={feedback}
            gender={gender}
            setGender={setGender}

          />

          {/* BOTONES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">


            <button
              onClick={generateTop}
              disabled={!tops.length}
              className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 transition text-white py-3 rounded-lg"
            >
              🏆 GENERAR TOP FINAL
            </button>

            <button
              onClick={removeLastTop}
              disabled={!tops.length}
              className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 transition text-white py-3 rounded-lg"
            >
              🗑️ ELIMINAR ÚLTIMO
            </button>

            <button
              onClick={clearAll}
              className="bg-black border border-zinc-700 hover:border-red-600 transition text-gray-300 py-3 rounded-lg"
            >
              LIMPIAR TODO
            </button>
          </div>
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
