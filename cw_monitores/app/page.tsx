'use client'

import HomeCard from '@/components/ui/HomeCard'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full text-center space-y-10">
        
        {/* Título */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
            TOPS <span className="text-red-600">CW MODELS</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Generador rápido de rankings oficiales
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HomeCard
            title="Top Year"
            description="Ranking anual de modelos o estudios"
            href="/top-year"
          />

          <HomeCard
            title="Top Pay Period"
            description="Ranking por periodo de pago"
            href="/top-pay-period"
          />

          <HomeCard
            title="Top Studios"
            description="Ranking general por estudios"
            href="/top-pay-period?type=studios"
          />
        </div>
      </div>
    </main>
  )
}
