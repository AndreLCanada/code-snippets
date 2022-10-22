import React from 'react'
import headerStyles from '../styles/Header.module.css'

const Header = () => {
  const x = 3
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Test</span> Header
      </h1>
      <p className={headerStyles.description} > Test Subheader</p>
      <style jsx>
        {`
          .title {
          color: ${x > 3 ? 'red' : 'blue'}
        }
        `}
      </style>
    </div>
  )
}

export default Header