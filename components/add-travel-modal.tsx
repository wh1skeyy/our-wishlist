'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface AddTravelModalProps {
  character: string
  onAdd: (travelData: any) => void
  onClose: () => void
}

export default function AddTravelModal({
  character,
  onAdd,
  onClose,
}: AddTravelModalProps) {
  const [formData, setFormData] = useState({
    destination: '',
    status: 'dreaming',
    dateToGo: '',
    budget: '',
    activities: '',
    note: '',
    imageUrl: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.destination.trim()) {
      alert('Please enter a destination')
      return
    }

    setIsSubmitting(true)
    try {
      await onAdd(formData)
      setFormData({
        destination: '',
        status: 'dreaming',
        dateToGo: '',
        budget: '',
        activities: '',
        note: '',
        imageUrl: '',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-handwriting font-bold text-primary">
            Add a Destination
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Destination */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Destination *
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Tokyo, Japan"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="dreaming">💭 Still Dreaming</option>
              <option value="booked">✅ Booked</option>
              <option value="visited">✨ Already Visited</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              When would you like to go?
            </label>
            <input
              type="date"
              name="dateToGo"
              value={formData.dateToGo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Estimated Budget (USD)
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., 2000"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Activities & Interests
            </label>
            <input
              type="text"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              placeholder="e.g., hiking, food, museums"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Notes
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Share what you'd like to do there..."
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Destination'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
