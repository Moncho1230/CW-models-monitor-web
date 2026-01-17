'use client'

type Props = {
  currentText: string
  setCurrentText: (value: string) => void
  onAddTop: () => void
  feedback?: string | null

  /** OPCIONAL */
  gender?: 'men' | 'women'
  setGender?: (value: 'men' | 'women') => void

  buttonLabel?: string
}

export default function TopInput({
  currentText,
  setCurrentText,
  onAddTop,
  feedback,
  gender,
  setGender,
  buttonLabel = '➕ Agregar Top'
}: Props) {
  return (
    <div className="space-y-4">

      {/* SELECTOR DE GÉNERO (SOLO SI SE ENVÍA) */}
      {gender && setGender && (
        <div className="flex gap-2">
          <button
            onClick={() => setGender('men')}
            className={`px-4 py-2 rounded ${
              gender === 'men'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            👨 Hombres
          </button>

          <button
            onClick={() => setGender('women')}
            className={`px-4 py-2 rounded ${
              gender === 'women'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200'
            }`}
          >
            👩 Mujeres
          </button>
        </div>
      )}

      {/* TEXTAREA */}
      <textarea
        value={currentText}
        onChange={e => setCurrentText(e.target.value)}
        placeholder="Pega aquí el ranking..."
        rows={8}
        className="w-full border p-3 rounded"
      />

      {/* FEEDBACK */}
      {feedback && (
        <div className="text-sm text-gray-700">
          {feedback}
        </div>
      )}

      {/* BOTÓN */}
      <button
        onClick={onAddTop}
        className="w-full bg-green-600 text-white px-4 py-2 rounded"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
