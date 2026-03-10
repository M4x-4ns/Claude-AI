import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const grinder = searchParams.get('grinder')
    const limit   = parseInt(searchParams.get('limit') ?? '50')

    const { rows } = grinder
      ? await sql`
          SELECT
            s.*,
            json_build_object('name', b.name, 'origin', b.origin, 'agtron_score', b.agtron_score) AS bean
          FROM shots s
          LEFT JOIN beans b ON b.id = s.bean_id
          WHERE s.grinder_id = ${grinder}
          ORDER BY s.created_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT
            s.*,
            json_build_object('name', b.name, 'origin', b.origin, 'agtron_score', b.agtron_score) AS bean
          FROM shots s
          LEFT JOIN beans b ON b.id = s.bean_id
          ORDER BY s.created_at DESC
          LIMIT ${limit}
        `

    return NextResponse.json(rows)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const {
      grinder_id, bean_id, grind_number,
      temp_at_shot, humidity_at_shot,
      d_temp, d_humidity, d_agtron,
      feedback, notes,
    } = await req.json()

    const { rows } = await sql`
      INSERT INTO shots
        (grinder_id, bean_id, grind_number, temp_at_shot, humidity_at_shot,
         d_temp, d_humidity, d_agtron, feedback, notes)
      VALUES
        (${grinder_id}, ${bean_id}, ${grind_number},
         ${temp_at_shot ?? null}, ${humidity_at_shot ?? null},
         ${d_temp ?? null}, ${d_humidity ?? null}, ${d_agtron ?? null},
         ${feedback ?? null}, ${notes ?? null})
      RETURNING *
    `
    return NextResponse.json(rows[0], { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
