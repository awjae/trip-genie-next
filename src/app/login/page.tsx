import Footer from '@/components/common/footer'
import Header from '@/components/common/header/header'
import HeaderContents from '@/components/common/header/headerContents'
import React from 'react'
import headerStyles from '@/styles/header.module.css'
import styles from '@/styles/login.module.css'
import classNames from 'classnames'
import LoginContainer from '@/components/loginContainer'

function Page() {
  return (
    <>
      <header className={classNames(headerStyles.header, headerStyles.invert)}>
        <HeaderContents></HeaderContents>
      </header>
      <main className={styles.loginMain}>
        <LoginContainer></LoginContainer>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Page