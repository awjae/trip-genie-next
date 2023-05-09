'use client'

import Link from 'next/link'

function headerContents() {
  return (
    <>
      <Link href={''}><h1>트립지니</h1></Link>
      <nav>
        <div>이용방법</div>
        <div>로그인</div>
      </nav>
    </>
  )
}

export default headerContents