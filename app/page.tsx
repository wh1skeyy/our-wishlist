'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

interface CharacterCardProps {
  name: string
  imageUrl: string
  onClick: () => void
  isLarge?: boolean
}

function CharacterCard({ name, imageUrl, onClick, isLarge = false }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative cursor-pointer flex flex-col items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: isLarge ? 'clamp(120px, 15vw, 280px)' : 'clamp(90px, 12vw, 220px)',
        height: 'auto',
      }}
    >
      {/* Name tag on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span
            className="text-2xl font-bold whitespace-nowrap px-4 py-2 drop-shadow-sm"
            style={{ color: '#5a4a3a' }}
          >
            {name}
          </span>
          <img
            src="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/SquiggleLine.png"
            alt=""
            className="w-24 -mt-2 opacity-80"
            style={{ filter: 'blur(0.3px)' }}
          />
        </motion.div>
      )}

      {/* Character image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)]"
        style={{ filter: 'contrast(0.98) brightness(1.02)', imageRendering: 'auto' }}
      />
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden select-none"
      style={{ fontFamily: 'var(--font-darumadrop)' }}
    >
      {/* Full-screen grass background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Background.png')",
          backgroundSize: 'cover',
        }}
      />

      {/* UI Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-center p-6">
          <h1
            className="text-4xl md:text-6xl tracking-tight drop-shadow-sm"
            style={{ color: '#5a4a3a' }}
          >
            4 OF A KIND
          </h1>
        </header>

        {/* Canvas area */}
        <div className="relative flex-grow w-full overflow-hidden">

          {/* Central Car — shared travels */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <CharacterCard
              isLarge
              name="Shared Location"
              imageUrl="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Car.png"
              onClick={() => router.push('/travels')}
            />
          </div>

          {/* Bunny — Top Left */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: '25%', left: '25%' }}
          >
            <CharacterCard
              name="Bunny"
              imageUrl="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Bunny.png"
              onClick={() => router.push('/gifts?character=bunny')}
            />
          </div>

          {/* Fox — Top Right */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: '25%', left: '75%' }}
          >
            <CharacterCard
              name="Fox"
              imageUrl="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Fox.png"
              onClick={() => router.push('/gifts?character=fox')}
            />
          </div>

          {/* Cat — Bottom Left */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: '75%', left: '25%' }}
          >
            <CharacterCard
              name="Cat"
              imageUrl="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Cat.png"
              onClick={() => router.push('/gifts?character=cat')}
            />
          </div>

          {/* Golden — Bottom Right */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: '75%', left: '75%' }}
          >
            <CharacterCard
              name="Golden"
              imageUrl="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Golden.png"
              onClick={() => router.push('/gifts?character=golden')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
