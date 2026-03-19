# 4 of a Kind - Group Wishlist App

A cozy, hand-drawn inspired group wishlist app for tracking gifts and travel dreams with your 4 closest friends!

## Features

✨ **Share Gift Wishlists**
- Create and manage gift wishlists for each character (Bunny, Fox, Golden, Cat)
- Set priority levels (High, Medium, Someday)
- Add product links and images
- Share notes about why you want each gift

🌍 **Plan Group Travel**
- Keep track of dream destinations for each character
- Mark travel plans as Dreaming, Booked, or Visited
- Set budgets and activity preferences
- Plan dates for your adventures

🎨 **Charming Design**
- Hand-drawn, cozy aesthetic
- Character-specific color palettes
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm
- Supabase account (free tier works great!)

### 1. Setup Supabase

1. Create a new Supabase project at https://supabase.com
2. Follow the instructions in `SETUP_DATABASE.md` to create the database table
3. Get your Supabase URL and Anonymous Key from Project Settings

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page with characters
│   ├── gifts/page.tsx        # Gift wishlist page
│   ├── travels/page.tsx      # Travel plans page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── gift-card.tsx         # Gift item card
│   ├── travel-card.tsx       # Travel destination card
│   ├── add-gift-modal.tsx    # Modal to add gifts
│   ├── add-travel-modal.tsx  # Modal to add destinations
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client
│   │   └── proxy.ts          # Session proxy
│   └── utils.ts              # Utility functions
└── scripts/
    └── 001_create_wishlists.sql  # Database schema
```

## Characters

- 🐰 **Bunny** - Sweet & curious
- 🦊 **Fox** - Clever & playful
- 🐕 **Golden** - Loyal & cheerful
- 🐱 **Cat** - Wise & mysterious

## Database Schema

The app uses a single `wishlists` table to store both gifts and travel destinations:

- **Gifts**: category='gift', with priority and notes
- **Locations**: category='location', with status, dates, and budget

## Technology Stack

- **Framework**: Next.js 16
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Comfortaa (body), Caveat (headings)

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Make sure to add your Supabase credentials in Vercel's Environment Variables.

## License

MIT

## Contributing

Feel free to customize and extend this app! Some ideas:
- Add wish completion tracking
- Create sharing links for the group
- Add reminder notifications
- Implement user accounts
- Add photo galleries per item

Enjoy your group wishlist! 🎁✨
