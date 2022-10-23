import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import next from 'next'

const Nav = () => {
  return (
    <>
    <nav className={navStyles.nav}>
      <h1 className={navStyles.logo}>cS</h1>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/create'>Create</Link>
        </li>
        <li>
          <Link href='/snippets'>Snippets</Link>
        </li>
      </ul>
    </nav>
    
    </>
  )
}

export default Nav