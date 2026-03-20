'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Plus, ExternalLink, Trash2, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

type WishlistItem = {
  id: string
  user_id: string
  category: string
  item_name: string
  link?: string
  image_url?: string
  priority?: string
  note?: string
  status?: string
  date_to_go?: string
  estimated_budget?: string
  activity_tags?: string
  locations?: { name: string; image_url?: string }[]
}

type ModalType = 'bunny' | 'fox' | 'cat' | 'golden' | 'travels' | null

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [expandedNote, setExpandedNote] = useState<string | null>(null)
  const [hoveredChar, setHoveredChar] = useState<string | null>(null)

  const supabase = useMemo<ReturnType<typeof createClient> | null>(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (typeof url !== 'string' || !url || typeof anonKey !== 'string' || !anonKey) return null
    return createClient()
  }, [])

  const supabaseMissing = !supabase

  const characters = [
    { id: 'bunny', name: 'Bunny', image: 'https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Bunny.png', top: '22%', left: '22%', scale: 0.9 },
    { id: 'fox', name: 'Fox', image: 'https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Fox.png', top: '22%', left: '78%', scale: 1.1 },
    { id: 'cat', name: 'Cat', image: 'https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Cat.png', top: '72%', left: '25%', scale: 1 },
    { id: 'golden', name: 'Golden', image: 'https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Golden.png', top: '72%', left: '75%', scale: 1 },
  ]

  useEffect(() => {
    if (activeModal) {
      fetchItems()
    }
  }, [activeModal])

  async function fetchItems() {
    if (!supabase) return
    setLoading(true)
    try {
      let query = supabase.from('wishlists').select('*')

      if (activeModal === 'travels') {
        query = query.eq('category', 'location')
      } else if (activeModal) {
        query = query.eq('user_id', activeModal).eq('category', 'gift')
      }

      const { data, error } = await query.order('created_at', { ascending: false })
      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  async function addItem(formData: FormData) {
    if (!supabase) return
    const isTravel = activeModal === 'travels'

    const newItem = {
      user_id: isTravel ? 'shared' : activeModal,
      category: isTravel ? 'location' : 'gift',
      item_name: formData.get('item_name') as string,
      link: formData.get('link') as string || null,
      image_url: formData.get('image_url') as string || null,
      priority: isTravel ? null : formData.get('priority') as string,
      note: formData.get('note') as string || null,
      status: isTravel ? (formData.get('status') as string || 'dreaming') : null,
      date_to_go: isTravel ? (formData.get('date_to_go') as string || null) : null,
      estimated_budget: isTravel ? (formData.get('estimated_budget') as string || null) : null,
      activity_tags: isTravel ? (formData.get('activity_tags') as string || null) : null,
    }

    try {
      const { error } = await supabase.from('wishlists').insert(newItem)
      if (error) throw error
      setShowAddForm(false)
      fetchItems()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  async function deleteItem(id: string) {
    if (!supabase) return
    try {
      const { error } = await supabase.from('wishlists').delete().eq('id', id)
      if (error) throw error
      fetchItems()
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  function closeModal() {
    setActiveModal(null)
    setShowAddForm(false)
    setItems([])
  }

  const isTravel = activeModal === 'travels'
  const modalTitle = isTravel ? 'Travel Plans' : activeModal ? `${activeModal.charAt(0).toUpperCase() + activeModal.slice(1)}'s Wishlist` : ''

  return (
    <div className="min-h-screen w-full relative overflow-hidden select-none">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Background.png')" }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-center p-6">
          <h1 className="text-4xl md:text-5xl tracking-wide" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
            4 OF A KIND
          </h1>
        </header>

        {supabaseMissing && (
          <div className="px-4 text-center mx-auto max-w-xl" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
            <p className="text-lg font-bold">Supabase is not configured.</p>
            <p className="text-sm mt-1" style={{ color: '#8a7a6a' }}>
              Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your environment.
            </p>
          </div>
        )}

        {/* Characters Canvas */}
        <div className="relative flex-grow">
          {/* Central Car */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onMouseEnter={() => setHoveredChar('car')}
            onMouseLeave={() => setHoveredChar(null)}
            onClick={() => setActiveModal('travels')}
          >
            {hoveredChar === 'car' && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in">
                <span className="text-xl font-bold whitespace-nowrap" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                  Travel Plans
                </span>
              </div>
            )}
            <img
              src="https://grp-wishlist.s3.ap-southeast-2.amazonaws.com/Car.png"
              alt="Travel Plans"
              className="char-size"
              style={{ transform: 'scale(1.5)' }}
            />
          </div>

          {/* Characters */}
          {characters.map((char) => (
            <div
              key={char.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ top: char.top, left: char.left }}
              onMouseEnter={() => setHoveredChar(char.id)}
              onMouseLeave={() => setHoveredChar(null)}
              onClick={() => setActiveModal(char.id as ModalType)}
            >
              {hoveredChar === char.id && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fade-in">
                  <span className="text-xl font-bold whitespace-nowrap" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                    {char.name}
                  </span>
                </div>
              )}
              <img
                src={char.image}
                alt={char.name}
                className="char-size"
                style={{ transform: `scale(${char.scale ?? 1})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden"
            style={{ backgroundColor: '#f5f0e8' }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b" style={{ backgroundColor: '#f5f0e8', borderColor: '#d4c9b8' }}>
              <button
                onClick={closeModal}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors hover:bg-white/50"
                style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}
              >
                <ArrowLeft size={20} />
                Back
              </button>
              <h2 className="text-2xl" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                {modalTitle}
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-colors"
                style={{ backgroundColor: '#7c9a6e', fontFamily: 'var(--font-darumadrop)' }}
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 80px)' }}>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#7c9a6e', borderTopColor: 'transparent' }} />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-12" style={{ color: '#8a7a6a', fontFamily: 'var(--font-darumadrop)' }}>
                  <p className="text-xl mb-2">Nothing here yet!</p>
                  <p className="text-sm">Click "Add" to add your first {isTravel ? 'destination' : 'wish'}.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl p-4"
                      style={{ backgroundColor: '#fff' }}
                    >
                      <div className="flex gap-4">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.item_name}
                            className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                          />
                        )}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-bold truncate" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                              {item.item_name}
                            </h3>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-1 rounded-lg text-red-400 hover:bg-red-50 transition-colors flex-shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Priority/Status Badge */}
                          {(item.priority || item.status) && (
                            <span
                              className="inline-block px-3 py-1 rounded-full text-xs mt-2"
                              style={{
                                backgroundColor: item.priority === 'high' || item.status === 'booked' ? '#e8a87c' :
                                  item.priority === 'medium' || item.status === 'visited' ? '#7c9a6e' : '#a8c5b5',
                                color: '#fff',
                                fontFamily: 'var(--font-darumadrop)'
                              }}
                            >
                              {item.priority || item.status}
                            </span>
                          )}

                          {/* Travel specific info */}
                          {isTravel && (
                            <div className="mt-2 text-sm" style={{ color: '#8a7a6a' }}>
                              {item.date_to_go && <p>Date: {new Date(item.date_to_go).toLocaleDateString()}</p>}
                              {item.estimated_budget && <p>Budget: {item.estimated_budget}</p>}
                              {item.activity_tags && <p>Activities: {item.activity_tags}</p>}
                            </div>
                          )}

                          {/* Note expandable */}
                          {item.note && (
                            <div className="mt-2">
                              <button
                                onClick={() => setExpandedNote(expandedNote === item.id ? null : item.id)}
                                className="flex items-center gap-1 text-sm"
                                style={{ color: '#7c9a6e', fontFamily: 'var(--font-darumadrop)' }}
                              >
                                {expandedNote === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                {isTravel ? 'Notes' : 'Why I want this'}
                              </button>
                              {expandedNote === item.id && (
                                <p className="mt-2 text-sm p-3 rounded-xl" style={{ backgroundColor: '#f5f0e8', color: '#5a4a3a' }}>
                                  {item.note}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Link button */}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl text-white text-sm transition-opacity hover:opacity-80"
                              style={{ backgroundColor: '#7c9a6e', fontFamily: 'var(--font-darumadrop)' }}
                            >
                              <ExternalLink size={14} />
                              View Link
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      )}

      {/* Add Item Form Modal */}
      {
        showAddForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
            <div
              className="relative w-full max-w-md rounded-3xl p-6"
              style={{ backgroundColor: '#f5f0e8' }}
            >
              <button
                onClick={() => setShowAddForm(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 transition-colors"
                style={{ color: '#5a4a3a' }}
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl mb-6" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                Add {isTravel ? 'Destination' : 'Wish'}
              </h3>

              <form action={addItem} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                    {isTravel ? 'Place Name' : 'Item Name'} *
                  </label>
                  <input
                    name="item_name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                    style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                    Image URL
                  </label>
                  <input
                    name="image_url"
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                    style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                    Link
                  </label>
                  <input
                    name="link"
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                    style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                    placeholder="https://..."
                  />
                </div>

                {isTravel ? (
                  <>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                        Status
                      </label>
                      <select
                        name="status"
                        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                        style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                      >
                        <option value="dreaming">Dreaming</option>
                        <option value="booked">Booked</option>
                        <option value="visited">Visited</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                        Date to Go
                      </label>
                      <input
                        name="date_to_go"
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                        style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                        Estimated Budget
                      </label>
                      <input
                        name="estimated_budget"
                        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                        style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                        placeholder="e.g. $500-1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                        Activities
                      </label>
                      <input
                        name="activity_tags"
                        className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                        style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                        placeholder="Foodie, Nature, Adventure..."
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                      Priority
                    </label>
                    <select
                      name="priority"
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors"
                      style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium</option>
                      <option value="someday">Someday</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-1" style={{ color: '#5a4a3a', fontFamily: 'var(--font-darumadrop)' }}>
                    {isTravel ? 'Notes' : 'Why I want this'}
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#7c9a6e] transition-colors resize-none"
                    style={{ borderColor: '#d4c9b8', backgroundColor: '#fff' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white text-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#7c9a6e', fontFamily: 'var(--font-darumadrop)' }}
                >
                  Add {isTravel ? 'Destination' : 'to Wishlist'}
                </button>
              </form>
            </div>
          </div>
        )
      }

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        /* Landscape: 12vw, Portrait: 12vh */
        .char-size {
          width: 12vw;
          height: auto;
        }
        @media (orientation: portrait) {
          .char-size {
            width: auto;
            height: 12vh;
          }
        }
      `}</style>
    </div >
  )
}