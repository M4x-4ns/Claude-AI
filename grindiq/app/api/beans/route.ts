import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM beans
      WHERE is_active = TRUE
      ORDER BY sort_order, name
    `
    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, origin, agtron_score, roast_label, notes, sort_order = 0 } = await req.json()

    const { rows } = await sql`
      INSERT INTO beans (name, origin, agtron_score, roast_label, notes, sort_order)
      VALUES (${name}, ${origin ?? null}, ${agtron_score}, ${roast_label ?? null}, ${notes ?? null}, ${sort_order})
      RETURNING *
    `
    return NextResponse.json(rows[0], { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
