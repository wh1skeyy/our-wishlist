-- Create wishlists table
CREATE TABLE wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  category text not null default 'gift',
  item_name text not null,
  link text,
  image_url text,
  priority text,
  note text,
  status text,
  date_to_go date,
  estimated_budget text,
  activity_tags text,
  locations jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes
create index wishlists_user_id_idx on wishlists(user_id);
create index wishlists_category_idx on wishlists(category);
