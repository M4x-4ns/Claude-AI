import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM grinders ORDER BY id
    `
    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const {
      id,
      baseline_grind,
      baseline_temp,
      baseline_humidity,
    } = await req.json()

    const { rows } = await sql`
      UPDATE grinders
      SET
        baseline_grind    = ${baseline_grind},
        baseline_temp     = ${baseline_temp},
        baseline_humidity = ${baseline_humidity},
        updated_at        = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(rows[0])
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
