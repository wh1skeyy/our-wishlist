-- Create wishlists table with JSONB for flexible data storage
-- No RLS required - publicly readable and writable

CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- 'bunny', 'fox', 'golden', 'cat' for characters, or 'location' for travel
  category TEXT NOT NULL DEFAULT 'gift', -- 'gift' or 'location'
  item_name TEXT NOT NULL,
  link TEXT,
  image_url TEXT,
  priority TEXT, -- 'high', 'medium', 'someday' for gifts
  note TEXT, -- "Why I want this" for gifts
  status TEXT, -- 'dreaming', 'booked', 'visited' for locations
  date_to_go DATE, -- For travel plans
  estimated_budget TEXT, -- For travel plans
  activity_tags TEXT[], -- For locations (e.g., 'foodie', 'nature', 'travel')
  locations JSONB, -- Sub-locations for travel plans
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_category ON wishlists(category);

-- Disable RLS for public access
ALTER TABLE wishlists DISABLE ROW LEVEL SECURITY;
