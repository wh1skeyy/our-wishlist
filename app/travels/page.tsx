'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import TravelCard from '@/components/travel-card'
import AddTravelModal from '@/components/add-travel-modal'

export default function TravelsPage() {
  const [travels, setTravels] = useState<any[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<string>('bunny')
  const [isAddingTravel, setIsAddingTravel] = useState(false)
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
    loadTravels()
  }, [selectedCharacter])

  const loadTravels = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', selectedCharacter)
        .eq('category', 'location')
        .order('created_at', { ascending: false })

      if (err) throw err
      setTravels(data || [])
    } catch (err) {
      console.error('Error loading travels:', err)
      setError('Failed to load travels')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTravel = async (travelData: any) => {
    try {
      const { error: err } = await supabase.from('wishlists').insert({
        user_id: selectedCharacter,
        category: 'location',
        item_name: travelData.destination,
        status: travelData.status,
        date_to_go: travelData.dateToGo,
        estimated_budget: travelData.budget,
        activity_tags: travelData.activities,
        note: travelData.note,
        image_url: travelData.imageUrl,
      })

      if (err) throw err
      setIsAddingTravel(false)
      await loadTravels()
    } catch (err) {
      console.error('Error adding travel:', err)
      setError('Failed to add travel destination')
    }
  }

  const handleDeleteTravel = async (id: string) => {
    try {
      const { error: err } = await supabase.from('wishlists').delete().eq('id', id)
      if (err) throw err
      await loadTravels()
    } catch (err) {
      console.error('Error deleting travel:', err)
      setError('Failed to delete travel destination')
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
            ✈️ Travel Plans
          </h1>
          <Button
            onClick={() => setIsAddingTravel(true)}
            className="bg-primary hover:bg-primary/90"
          >
            + Add Destination
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

        {/* Travels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading destinations...</p>
            </div>
          ) : travels.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="text-2xl mb-4">🗺️</p>
                <p className="text-lg text-foreground font-semibold mb-2">No destinations yet</p>
                <p className="text-muted-foreground mb-6">
                  Add some dream destinations for {selectedCharacter.charAt(0).toUpperCase() + selectedCharacter.slice(1)}!
                </p>
                <Button
                  onClick={() => setIsAddingTravel(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  + Add First Destination
                </Button>
              </div>
            </div>
          ) : (
            travels.map((travel) => (
              <TravelCard
                key={travel.id}
                travel={travel}
                onDelete={() => handleDeleteTravel(travel.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Travel Modal */}
      {isAddingTravel && (
        <AddTravelModal
          character={selectedCharacter}
          onAdd={handleAddTravel}
          onClose={() => setIsAddingTravel(false)}
        />
      )}
    </main>
  )
}
