import { Button } from '@/components/ui/button'
import { Trash2, Calendar, Wallet, Sparkles } from 'lucide-react'

interface TravelCardProps {
  travel: {
    id: string
    item_name: string
    status?: string
    date_to_go?: string
    estimated_budget?: string
    activity_tags?: string
    note?: string
    image_url?: string
  }
  onDelete: () => void
}

const statusColors: Record<string, string> = {
  dreaming: 'bg-blue-100 text-blue-800',
  booked: 'bg-green-100 text-green-800',
  visited: 'bg-purple-100 text-purple-800',
}

const statusEmojis: Record<string, string> = {
  dreaming: '💭',
  booked: '✅',
  visited: '✨',
}

export default function TravelCard({ travel, onDelete }: TravelCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return null
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border">
      {/* Image */}
      {travel.image_url && (
        <div className="relative h-40 bg-gradient-to-br from-muted to-muted-foreground/10 overflow-hidden">
          <img
            src={travel.image_url}
            alt={travel.item_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {travel.item_name}
            </h3>
          </div>
          {travel.status && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                statusColors[travel.status] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {statusEmojis[travel.status] || '•'} {travel.status}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-4 text-sm">
          {travel.date_to_go && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={16} />
              <span>{formatDate(travel.date_to_go)}</span>
            </div>
          )}
          {travel.estimated_budget && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet size={16} />
              <span>${travel.estimated_budget}</span>
            </div>
          )}
          {travel.activity_tags && (
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="mt-0.5" />
              <span className="text-muted-foreground">{travel.activity_tags}</span>
            </div>
          )}
        </div>

        {/* Note */}
        {travel.note && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {travel.note}
          </p>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="w-full text-destructive hover:bg-destructive/10 gap-1"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
