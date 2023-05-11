'use client'

import React from 'react'
import styles from '@/styles/login.module.css'

function loginContainer() {
  return (
    <article className={styles.loginWrapper}>
      <label htmlFor="">
        <input type="text" placeholder='아이디(이메일)'/>
      </label>
      <label htmlFor="">
        <input type="password" placeholder='비밀번호'/>
      </label>
      <button className={styles.loginBtn}>로그인</button>
      <button>회원가입</button>
    </article>
  )
}

export default loginContainer