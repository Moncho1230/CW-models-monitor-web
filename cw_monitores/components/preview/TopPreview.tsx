'use client'

export default function TopPreview({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {/* PREVIEW OSCURO – ESTILO CW */}
      <pre
        className="
          whitespace-pre-wrap
          rounded-xl p-4
          bg-black/80
          text-white
          border border-gray-700
          text-sm
          leading-relaxed
        "
      >
        {text}
      </pre>

      {/* BOTÓN COPIAR */}
      <button
        onClick={() => navigator.clipboard.writeText(text)}
        className="
          w-full py-3 rounded-xl
          bg-red-600 hover:bg-red-700
          text-white font-bold
          transition
        "
      >
        📋 Copiar para WhatsApp
      </button>
    </div>
  )
}
