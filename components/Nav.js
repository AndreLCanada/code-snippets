import React from 'react'
import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'
import next from 'next'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/snippets'>Snippets</Link>
        </li>
        <li>
          <Link href='/create'>Create</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav