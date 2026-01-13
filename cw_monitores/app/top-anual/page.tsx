'use client'

import { useState } from 'react'
import TopInput from '@/components/ui/TopInput'
import TopPreview from '@/components/preview/TopPreview'
import { parseTextRank } from '@/lib/parsers/parseTextRank'
import { generateTopAnual } from '@/lib/tops/topAnual'
import { formatTopAnual } from '@/lib/formatters/whatsappFormatter'

export default function TopAnualPage() {
  const [text, setText] = useState('')
  const [gender, setGender] = useState<'men' | 'women'>('men')
  const [result, setResult] = useState('')

  const generate = () => {
    const rows = parseTextRank(text)
    const ranking = generateTopAnual(rows)
    const formatted = formatTopAnual(ranking, 2025, gender === 'men' ? 'Men Master' : 'Women Master')
    setResult(formatted)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Top Anual</h1>

      <TopInput
        text={text}
        onChange={setText}
        gender={gender}
        setGender={setGender}
      />

      <button
        onClick={generate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Generar Top
      </button>

      {result && <TopPreview text={result} />}
    </div>
  )
}
