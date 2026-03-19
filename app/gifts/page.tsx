'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import GiftCard from '@/components/gift-card'
import AddGiftModal from '@/components/add-gift-modal'

export default function GiftsPage() {
  const [gifts, setGifts] = useState<any[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>('bunny')
  const [isAddingGift, setIsAddingGift] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const characters = ['bunny', 'fox', 'golden', 'cat']
  const characterEmojis: Record<string, string> = {
    bunny: '🐰',
    fox: '🦊',
    golden: '🐕',
    cat: '🐱',
  }
  const characterColors: Record<string, string> = {
    bunny: 'from-pink-200 to-pink-100',
    fox: 'from-orange-200 to-amber-100',
    golden: 'from-yellow-200 to-amber-100',
    cat: 'from-purple-200 to-pink-100',
  }

  useEffect(() => {
    loadGifts()
  }, [selectedCharacter])

  const loadGifts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', selectedCharacter)
        .eq('category', 'gift')
        .order('created_at', { ascending: false })

      if (err) throw err
      setGifts(data || [])
    } catch (err) {
      console.error('Error loading gifts:', err)
      setError('Failed to load gifts')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGift = async (giftData: any) => {
    try {
      const { error: err } = await supabase.from('wishlists').insert({
        user_id: selectedCharacter,
        category: 'gift',
        item_name: giftData.itemName,
        link: giftData.link,
        image_url: giftData.imageUrl,
        priority: giftData.priority,
        note: giftData.note,
      })

      if (err) throw err
      setIsAddingGift(false)
      await loadGifts()
    } catch (err) {
      console.error('Error adding gift:', err)
      setError('Failed to add gift')
    }
  }

  const handleDeleteGift = async (id: string) => {
    try {
      const { error: err } = await supabase.from('wishlists').delete().eq('id', id)
      if (err) throw err
      await loadGifts()
    } catch (err) {
      console.error('Error deleting gift:', err)
      setError('Failed to delete gift')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              ← Back
            </Button>
          </Link>
          <h1 className="text-4xl font-handwriting font-bold text-primary">
            🎁 Gift Wishlist
          </h1>
          <Button onClick={() => setIsAddingGift(true)} className="bg-primary hover:bg-primary/90">
            + Add Gift
          </Button>
        </div>

        {/* Character Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {characters.map((char) => (
            <button
              key={char}
              onClick={() => setSelectedCharacter(char)}
              className={`
                flex-shrink-0 px-6 py-3 rounded-full font-semibold transition-all
                ${
                  selectedCharacter === char
                    ? 'bg-gradient-to-r ' + characterColors[char] + ' text-foreground shadow-md'
                    : 'bg-white text-foreground hover:bg-muted border border-border'
                }
              `}
            >
              <span className="text-xl mr-2">{characterEmojis[char]}</span>
              {char.charAt(0).toUpperCase() + char.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading gifts...</p>
            </div>
          ) : gifts.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-2xl mb-4">📝</p>
                <p className="text-lg text-foreground font-semibold mb-2">No gifts yet</p>
                <p className="text-muted-foreground mb-6">
                  Add some wishes for {selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)}!
                </p>
                <Button onClick={() => setIsAddingGift(true)} className="bg-primary hover:bg-primary/90">
                  + Add First Gift
                </Button>
              </div>
            </div>
          ) : (
            gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={gift}
                onDelete={() => handleDeleteGift(gift.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Gift Modal */}
      {isAddingGift && (
        <AddGiftModal
          character={selectedCharacter}
          onAdd={handleAddGift}
          onClose={() => setIsAddingGift(false)}
        />
      )}
    </main>
  )
}
