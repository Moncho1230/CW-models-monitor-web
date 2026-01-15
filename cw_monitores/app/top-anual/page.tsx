'use client'

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
      setFeedback('❌ No se detectaron modelos válidos en este top')
      return
    }

    setTops(prev => [...prev, currentText])
    setCurrentText('')
    setFeedback(`✅ Top agregado correctamente (${rows.length} modelos)`)
  }

  const removeLastTop = () => {
    if (tops.length === 0) return

    setTops(prev => prev.slice(0, -1))
    setFeedback('🗑️ Último top eliminado')
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Top Anual</h1>

      {/* CONTADOR DE TOPS */}
      <div className="text-sm text-gray-600">
        Tops agregados: <strong>{tops.length}</strong>
      </div>

      {/* GANADOR AÑO ANTERIOR */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Ganador año anterior
        </label>

        <input
          type="text"
          value={previousWinner}
          onChange={e => setPreviousWinner(e.target.value)}
          placeholder="Ej: Frank Dwayne"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* INPUT DE TOP */}
      <TopInput
        currentText={currentText}
        setCurrentText={setCurrentText}
        onAddTop={addTop}
        feedback={feedback}
        gender={gender}
        setGender={setGender}
      />

      {/* BOTONES PRINCIPALES */}
      <div className="flex gap-3">
        <button
          onClick={generateTop}
          disabled={tops.length === 0}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          🏆 Generar Top Final
        </button>

        <button
          onClick={removeLastTop}
          disabled={tops.length === 0}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          🗑️ Eliminar último
        </button>
      </div>

      {/* RESULTADO */}
      {result && (
        <>
          <TopPreview text={result} />

          <button
            onClick={clearAll}
            className="bg-gray-800 text-white px-4 py-2 rounded w-full"
          >
            🧹 Limpiar todo y empezar nuevo top
          </button>
        </>
      )}
    </div>
  )
}
