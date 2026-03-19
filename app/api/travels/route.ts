import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const userId = request.nextUrl.searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('user_id', userId)
      .eq('category', 'location')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const {
      user_id,
      item_name,
      date_to_go,
      estimated_budget,
      activity_tags,
      status,
    } = body

    if (!user_id || !item_name) {
      return NextResponse.json(
        { error: 'user_id and item_name are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('wishlists')
      .insert([
        {
          user_id,
          category: 'location',
          item_name,
          date_to_go: date_to_go || null,
          estimated_budget: estimated_budget || null,
          activity_tags: activity_tags || null,
          status: status || 'dreaming',
        },
      ])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
