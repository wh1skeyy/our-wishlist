import { Button } from '@/components/ui/button'
import { Trash2, ExternalLink } from 'lucide-react'

interface GiftCardProps {
  gift: {
    id: string
    item_name: string
    link?: string
    image_url?: string
    priority?: string
    note?: string
  }
  onDelete: () => void
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  someday: 'bg-gray-100 text-gray-800',
}

const priorityEmojis: Record<string, string> = {
  high: '🔥',
  medium: '⭐',
  someday: '💭',
}

export default function GiftCard({ gift, onDelete }: GiftCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border">
      {/* Image */}
      {gift.image_url && (
        <div className="relative h-40 bg-gradient-to-br from-muted to-muted-foreground/10 overflow-hidden">
          <img
            src={gift.image_url}
            alt={gift.item_name}
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
              {gift.item_name}
            </h3>
          </div>
          {gift.priority && (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                priorityColors[gift.priority] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {priorityEmojis[gift.priority] || '•'} {gift.priority}
            </span>
          )}
        </div>

        {/* Note */}
        {gift.note && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {gift.note}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          {gift.link && (
            <a href={gift.link} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                variant="outline"
                className="gap-1 flex-1"
              >
                <ExternalLink size={16} />
                View Link
              </Button>
            </a>
          )}
          <Button
            size="sm"
            variant="outline"
            className="text-destructive hover:bg-destructive/10 gap-1"
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
