export async function getCityForClient(cityId?: number) {
  if (cityId) return
  const res = await fetch(`/api/city?cityId=${cityId}`);
  const { result } = await res.json()
  return result[0];
}