import Image from 'next/image'
import styles from './page.module.css'
import AppButton from '@/shared/AppButton'

export default function Home() {
  return (
    <main className={styles.main}>
      <AppButton></AppButton>
    </main>
  )
}
