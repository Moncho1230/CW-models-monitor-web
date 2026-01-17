'use client'

import { Dispatch, SetStateAction } from 'react'

type Props = {
  currentText: string
  setCurrentText: Dispatch<SetStateAction<string>>
  onAddTop: () => void
  feedback?: string | null

  /** OPCIONALES */
  gender?: 'men' | 'women'
  setGender?: Dispatch<SetStateAction<'men' | 'women'>>
  buttonLabel?: string
}

export default function TopInput({
  currentText,
  setCurrentText,
  onAddTop,
  feedback,
  gender,
  setGender,
  buttonLabel = '＋ AGREGAR TOP',
}: Props) {
  return (
    <div className="space-y-5">

      {/* SELECTOR DE GÉNERO (SOLO SI EXISTE) */}
      {gender && setGender && (
        <div className="flex gap-3">
          <button
            onClick={() => setGender('men')}
            className={`flex-1 py-2 rounded-lg font-semibold transition border
              ${
                gender === 'men'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-black text-white border-gray-700 hover:border-red-500'
              }`}
          >
            👨 HOMBRES
          </button>

          <button
            onClick={() => setGender('women')}
            className={`flex-1 py-2 rounded-lg font-semibold transition border
              ${
                gender === 'women'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-black text-white border-gray-700 hover:border-red-500'
              }`}
          >
            👩 MUJERES
          </button>
        </div>
      )}

      {/* TEXTAREA */}
      <textarea
        value={currentText}
        onChange={e => setCurrentText(e.target.value)}
        placeholder="Pega aquí el ranking..."
        rows={7}
        className="
          w-full rounded-xl p-4 text-white
          bg-black/80 border border-gray-700
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-red-600
        "
      />

      {feedback && (
        <div className="text-sm font-medium text-gray-300">
          {feedback}
        </div>
      )}

      {/* BOTÓN */}
      <button
        onClick={onAddTop}
        className="
          w-full py-3 rounded-xl
          bg-red-600 hover:bg-red-700
          text-white font-bold tracking-wide
          transition
        "
      >
        {buttonLabel}
      </button>
    </div>
  )
}
