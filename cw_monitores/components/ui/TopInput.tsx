'use client'

type Props = {
  currentText: string
  setCurrentText: (value: string) => void
  onAddTop: () => void
  feedback: string | null
  buttonLabel: string
}

export default function TopInput({
  currentText,
  setCurrentText,
  onAddTop,
  feedback,
  buttonLabel
}: Props) {
  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-48 border rounded p-3"
        placeholder="Pega aquí el ranking..."
        value={currentText}
        onChange={e => setCurrentText(e.target.value)}
      />

      {feedback && (
        <div className="text-red-600 text-sm font-medium">
          {feedback}
        </div>
      )}

      <button
        onClick={onAddTop}
        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded w-full text-lg font-semibold"
      >
        {buttonLabel}
      </button>
    </div>
  )
}
