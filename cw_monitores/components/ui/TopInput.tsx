'use client'

type Props = {
  currentText: string
  setCurrentText: (v: string) => void
  onAddTop: () => void
  feedback: string | null
  gender: 'men' | 'women'
  setGender: (v: 'men' | 'women') => void
}

export default function TopInput({
  currentText,
  setCurrentText,
  onAddTop,
  feedback,
  gender,
  setGender
}: Props) {
  return (
    <div className="space-y-4">
      <select
        value={gender}
        onChange={e => setGender(e.target.value as any)}
        className="border p-2 rounded w-full"
      >
        <option value="men">Hombres</option>
        <option value="women">Mujeres</option>
      </select>

      <textarea
        value={currentText}
        onChange={e => setCurrentText(e.target.value)}
        placeholder="Pega aquí UN top completo..."
        className="w-full h-56 border p-3 rounded font-mono"
      />

      <button
        onClick={onAddTop}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        ➕ Agregar Top
      </button>

      {feedback && (
        <p className="text-sm bg-green-100 text-green-700 p-2 rounded">
          {feedback}
        </p>
      )}
    </div>
  )
}
