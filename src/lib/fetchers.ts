export async function getCityForClient(cityId?: number) {
  if (!cityId) return
  const res = await fetch(`/api/city?cityId=${cityId}`);
  const { result } = await res.json()
  return result[0];
}
export async function postCityForClient(name: string, id: number, data: any) {
  const res = await fetch(`/api/city`, { 
    method: "POST",
    body: JSON.stringify({ name, id })
  });
  const { result } = await res.json()
  return result[0];
}