// const getSpots = async (name: string, id: number) => {
//   const response = await fetch(`https://www.myro.co.kr/searchMostSelectedSpots?cityName=${name}`)
//   const result = await response.json()
//   // mutate({ name, id, options: result })
//   let str = "";
//   result.forEach((el: any) => {
//     str += insertText({
//       showingName: el.showingName,
//       googleSearchedName: el.googleSearchedName,
//       address: el.address,
//       lat: el.lat,
//       lng: el.lng,
//       openTime: el.openTime,
//       id: cityId
//     })
//   })
//   console.log(str)
// }

// const insertText = (obj: any) => {
//   let text = `INSERT INTO public.spots(
//     name, "subName", address, lat, lng, "openTime", "cityId")
//     VALUES ('${obj.showingName.replaceAll('\'','\'\'')}', '${obj.googleSearchedName.replaceAll('\'','\'\'')}', '${obj.address.replaceAll('\'','\'\'')}', ${obj.lat}, ${obj.lng}, '${obj.openTime}', ${obj.id}); `;
//   return text 
// }