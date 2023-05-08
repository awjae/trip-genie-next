"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import Link from 'next/link'

async function getData() {
  const res = await fetch('https://www.myro.co.kr/getCityListForFirstPage');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Home() {
  const preData = await getData();
  let text = '';
  //@ts-ignore
  let templete = ({id, name, enName, nation, continental, description, lat, lng}) => {
    return `INSERT INTO public.city(
      name, "enName", nation, continental, description, lat, lng)
      VALUES ('${name}', '${enName}', '${nation}', '${continental}', '${description}', ${lat}, ${lng}); `;
  }
  const getCities = preData.korCityName.map((name: string, idx: number) => ({
    name,
    enName: preData.engCityName[idx],
    lat: preData.coordinate[idx].lat,
    lng: preData.coordinate[idx].lng,
    nation: preData.nation[idx],
    continental: preData.continental[idx].replaceAll("'", "\""),
    description: preData.cityIntroductionTxt[idx].replaceAll("'", "\""),
  })).forEach((element: any) => {
    text += templete(element)
  });
  console.log(text)

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <div>
          <h2>어디로 여행을 떠나시나요?</h2>
          <div>
            <input type="text" placeholder='여행지를 입력해주세요.'/>
            <Link href={'map'}></Link>
          </div>
        </div>
        <div>
          <div>전체</div>
          <div>국내</div>
          <div>해외</div>
        </div>
        <ul>
          <li></li>
        </ul>
      </main>
      <Footer></Footer>
    </>
  )
}