import styles from './page.module.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/city'
import { CityType } from '@/types/city'


export default async function Home() {
  const { result } = await getCities()
  
  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <div>
          <video src="/images/banner_video_1.mp4" autoPlay loop muted></video>
          <div className={styles.searchLayer}>
            <label htmlFor="searchInput"><h2>어디로 여행을 떠나시나요?</h2></label>
            <div>
              <input id="searchInput" type="text" placeholder='여행지를 입력해주세요.'/>
              <Link href={'map'}>
                <Image src="/images/icon/search.svg" alt="" width={30} height={30}/>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>전체</div>
          <div>국내</div>
          <div>해외</div>
        </div>
        <ul>
          { result.map((city: CityType) => (
          <li key={city.id}>{city.name}</li>
          ))}
        </ul>
      </main>
      <Footer></Footer>
    </>
  )
}