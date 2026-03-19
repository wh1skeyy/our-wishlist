'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface AddGiftModalProps {
  character: string
  onAdd: (giftData: any) => void
  onClose: () => void
}

export default function AddGiftModal({
  character,
  onAdd,
  onClose,
}: AddGiftModalProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    link: '',
    imageUrl: '',
    priority: 'medium',
    note: '',
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
    if (!formData.itemName.trim()) {
      alert('Please enter a gift name')
      return
    }

    setIsSubmitting(true)
    try {
      await onAdd(formData)
      setFormData({
        itemName: '',
        link: '',
        imageUrl: '',
        priority: 'medium',
        note: '',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-handwriting font-bold text-primary">
            Add a Gift
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
          {/* Gift Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Gift Name *
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="e.g., Blue Wireless Headphones"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="someday">💭 Someday</option>
              <option value="medium">⭐ Medium</option>
              <option value="high">🔥 High</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Product Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
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
              Why I want this
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Share why this gift would mean a lot to you..."
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
              {isSubmitting ? 'Adding...' : 'Add Gift'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
