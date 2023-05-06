import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'
import Link from 'next/link'

export default function Home() {
  return (
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
  )
}