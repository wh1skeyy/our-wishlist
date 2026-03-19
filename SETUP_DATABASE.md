# Database Setup Instructions

## 4 of a Kind - Group Wishlist

To run this application, you need to set up the database table in your Supabase project.

### Steps to Set Up:

1. **Go to your Supabase project dashboard** at https://app.supabase.com/

2. **Navigate to the SQL Editor** (left sidebar > SQL Editor)

3. **Create a new query** and paste the SQL from `scripts/001_create_wishlists.sql`

4. **Execute the query** (click the "Run" button or press Ctrl+Enter)

### What Gets Created:

The SQL script creates:
- **wishlists table**: Stores all gift items and travel destinations for the 4 characters
- **Indexes**: For fast lookups by user_id and category

### Table Structure:

```
wishlists
├── id (UUID) - Unique identifier
├── user_id (TEXT) - Character name: 'bunny', 'fox', 'golden', 'cat'
├── category (TEXT) - 'gift' or 'location'
├── item_name (TEXT) - Gift name or destination
├── link (TEXT) - Product/travel link
├── image_url (TEXT) - Image URL
├── priority (TEXT) - For gifts: 'high', 'medium', 'someday'
├── note (TEXT) - Why they want it
├── status (TEXT) - For travel: 'dreaming', 'booked', 'visited'
├── date_to_go (DATE) - Travel date
├── estimated_budget (TEXT) - Budget amount
├── activity_tags (TEXT) - Activity interests
├── locations (JSONB) - Sub-locations data
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Environment Variables:

The app requires these Supabase environment variables (should be automatically set):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for admin operations)

### Troubleshooting:

If you get an error about the table already existing:
- The table might already be created - that's fine!
- The app will work normally

If you get permission errors:
- Make sure you're using your Supabase project's credentials
- Check that you have admin access to the database

### How to Deploy:

1. Ensure the SQL script has been run in your Supabase project
2. Deploy to Vercel with: `vercel deploy`
3. The app will be live at your Vercel URL

Enjoy using 4 of a Kind! 🎁✈️
