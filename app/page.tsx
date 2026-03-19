'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)

  const characters = [
    {
      id: 'bunny',
      name: 'Bunny',
      emoji: '🐰',
      color: 'from-pink-200 to-pink-100',
      description: 'Sweet & curious',
      image: '/bunny.jpg',
    },
    {
      id: 'fox',
      name: 'Fox',
      emoji: '🦊',
      color: 'from-orange-200 to-amber-100',
      description: 'Clever & playful',
      image: '/fox.jpg',
    },
    {
      id: 'golden',
      name: 'Golden',
      emoji: '🐕',
      color: 'from-yellow-200 to-amber-100',
      description: 'Loyal & cheerful',
      image: '/golden.jpg',
    },
    {
      id: 'cat',
      name: 'Cat',
      emoji: '🐱',
      color: 'from-purple-200 to-pink-100',
      description: 'Wise & mysterious',
      image: '/cat.jpg',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-handwriting font-bold text-primary mb-4">
            4 of a Kind
          </h1>
          <p className="text-xl text-muted-foreground font-comfortaa">
            Group wishlist for gifts and travels
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center mb-16 flex-wrap">
          <Link href="/gifts">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              🎁 Gift Wishlist
            </Button>
          </Link>
          <Link href="/travels">
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              ✈️ Travel Plans
            </Button>
          </Link>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {characters.map((char) => (
            <div
              key={char.id}
              className={`
                relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300
                bg-gradient-to-br ${char.color} border-4 border-white shadow-lg
                hover:shadow-xl hover:scale-105 transform
                ${selectedCharacter === char.id ? 'ring-4 ring-primary' : ''}
              `}
              onClick={() => setSelectedCharacter(selectedCharacter === char.id ? null : char.id)}
            >
              <div className="relative h-40 bg-gradient-to-br from-muted to-muted-foreground/10">
                <Image
                  src={char.image}
                  alt={char.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-1">{char.name}</h2>
                <p className="text-sm text-muted-foreground">{char.description}</p>
                {selectedCharacter === char.id && (
                  <div className="mt-4 pt-4 border-t border-white/50">
                    <p className="text-xs text-foreground font-semibold">
                      Click to explore wishes
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-handwriting font-bold text-primary mb-4">
            How it works
          </h2>
          <ul className="space-y-3 text-foreground text-sm md:text-base">
            <li className="flex gap-3">
              <span className="text-xl">🎯</span>
              <span>Pick a character to view or add gift wishes and travel dreams</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">💝</span>
              <span>Share gifts you'd love to receive with your group</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🗺️</span>
              <span>Plan group adventures and bucket list destinations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">✨</span>
              <span>Keep track of what everyone wants and where to go</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
