import { pool } from "@/utils/pg"

// export async function templete() {
//   const res = await fetch('/api/city')

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }

export async function getCities(cityId?: number) {
  let sql = 'SELECT * FROM cities';
  if (cityId) sql += ` WHERE id = ${cityId}`
  const client = await pool.connect()
  const result = await client.query(sql)
  client.release()
  return { message: 'success', result: result.rows }
}

