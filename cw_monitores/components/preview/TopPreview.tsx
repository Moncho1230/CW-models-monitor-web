'use client'

export default function TopPreview({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      <pre className="whitespace-pre-wrap border p-3 rounded bg-gray-50">
        {text}
      </pre>

      <button
        onClick={() => navigator.clipboard.writeText(text)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Copiar para WhatsApp
      </button>
    </div>
  )
}
