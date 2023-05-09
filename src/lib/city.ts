import { pool } from "@/utils/pg"

export async function getCities() {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM cities')
  return { message: 'success', result: result.rows }

  // if (!res.ok) {
  //   throw new Error('Failed to fetch data')
  // }
 
  // return res.json()
  // // return { result : 'true' }
}