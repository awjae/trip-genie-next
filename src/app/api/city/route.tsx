import { NextResponse } from 'next/server';
import { Pool } from 'pg'

const pool = new Pool({
  user: 'admin',
  host: 'svc.sel3.cloudtype.app',
  database: 'trip_genie',
  password: 'admin',
  port: 30641,
});

export async function GET(request: Request) {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM cities')
    if (result.rowCount >= 1) {
      return NextResponse.json({ message: 'success', result: result.rows })
    } else {
      return NextResponse.json({ message: 'fail' })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' })
  } finally {
    client.release()
  }
}

export async function HEAD(request: Request) {}
 
export async function POST(request: Request) {}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}