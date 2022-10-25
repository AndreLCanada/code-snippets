import React from 'react'
import headerStyles from '../styles/Header.module.css'

const Header = () => {
  const x = 3
  return (
    <div className={headerStyles.container}>
    <p className={headerStyles.description} > type. save. search.</p>
      <h1 className={headerStyles.title}>
        codeSnippets
      </h1>
      
      <p className={headerStyles.description} > every line you need, all-in-one place</p>
      {/* <style jsx>
        {`
          .title {
          color: ${x > 3 ? 'red' : 'blue'}
        }
        `}
      </style> */}
    </div>
  )
}

export default Header