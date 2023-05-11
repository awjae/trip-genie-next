import Link from 'next/link'

function headerContents() {
  return (
    <>
      <Link href={''}><h1>트립지니</h1></Link>
      <nav>
        <div>이용방법</div>
        <div><Link href={'/login'}>로그인</Link></div>
      </nav>
    </>
  )
}

export default headerContents