import styles from './page.module.css'
import Header from '@/components/common/header/header'
import Footer from '@/components/common/footer'
import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/serverQueries'
import { CityType } from '@/types/city'
import SearchInput from '@/components/home/searchInput'
import CityList from '@/components/home/cityList'


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
            <SearchInput></SearchInput>
          </div>
        </div>
        <CityList result={result}></CityList>
      </main>
      <Footer></Footer>
    </>
  )
}