'use client'

type Props = {
  text: string
  onChange: (v: string) => void
  gender: string
  setGender: (v: 'men' | 'women') => void
}

export default function TopInput({ text, onChange, gender, setGender }: Props) {
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
        value={text}
        onChange={e => onChange(e.target.value)}
        placeholder="Pega aquí los datos..."
        className="w-full h-64 border p-3 rounded font-mono"
      />
    </div>
  )
}
