import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const grinder = searchParams.get('grinder')
  const limit   = parseInt(searchParams.get('limit') ?? '50')

  let query = supabase
    .from('shots')
    .select('*, bean:beans(name, origin, agtron_score)')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (grinder) query = query.eq('grinder_id', grinder)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from('shots')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
