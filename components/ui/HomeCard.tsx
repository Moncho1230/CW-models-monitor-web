'use client'

import Link from 'next/link'

type Props = {
  title: string
  description: string
  href: string
}

export default function HomeCard({ title, description, href }: Props) {
  return (
    <Link href={href}>
      <div className="
        bg-neutral-900
        border border-neutral-800
        rounded-xl
        p-6
        h-full
        cursor-pointer
        transition
        hover:border-red-600
        hover:scale-[1.02]
        hover:shadow-lg
        hover:shadow-red-600/20
      ">
        <h2 className="text-2xl font-bold mb-2">
          {title}
        </h2>

        <p className="text-gray-400">
          {description}
        </p>

        <div className="mt-6 text-red-600 font-semibold">
          Entrar →
        </div>
      </div>
    </Link>
  )
}
