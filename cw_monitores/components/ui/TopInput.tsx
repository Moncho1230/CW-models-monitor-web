'use client'

type Props = {
  currentText: string
  setCurrentText: React.Dispatch<React.SetStateAction<string>>
  onAddTop: () => void
  feedback?: string | null
  gender: 'men' | 'women'
  setGender: React.Dispatch<React.SetStateAction<'men' | 'women'>>
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
    <div className="space-y-3">
      {/* Selector de género */}
      <div className="flex gap-2">
        <button
          onClick={() => setGender('men')}
          className={`px-3 py-1 rounded ${
            gender === 'men' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          👨 Hombres
        </button>

        <button
          onClick={() => setGender('women')}
          className={`px-3 py-1 rounded ${
            gender === 'women' ? 'bg-pink-600 text-white' : 'bg-gray-200'
          }`}
        >
          👩 Mujeres
        </button>
      </div>

      {/* Área de texto */}
      <textarea
        value={currentText}
        onChange={e => setCurrentText(e.target.value)}
        placeholder="Pega aquí el ranking..."
        className="w-full h-40 border rounded p-2"
      />

      {/* Feedback */}
      {feedback && (
        <p className="text-sm text-red-600 font-medium">{feedback}</p>
      )}

      {/* Botón */}
      <button
        onClick={onAddTop}
        className="w-full bg-green-600 text-white py-2 rounded font-semibold"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
