import { pool } from "@/utils/pg"

// export async function templete() {
//   const res = await fetch('/api/city')

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }

export async function getCities() {
  const client = await pool.connect()
  const result = await client.query('SELECT * FROM cities')
  client.release()
  return { message: 'success', result: result.rows }
}

