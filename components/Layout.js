import styles from '../styles/Layout.module.css';
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'
import React, { createContext, useState } from "react"


export const Context = createContext({})


const Layout = ({ children }) => {


  const [typeOfCode, setTypeOfCode] = useState("Function")

  return (
    <>
    <Context.Provider
      value={{
        typeOfCode,
        loadCode: currentValue => {
          setTypeOfCode(currentValue)
        },
      }}
    >
        <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          <Header className={styles.header}/>
          {children}
          <Footer className={styles.footer}/>
        </main>
      </div>
    </Context.Provider>
    </>
  )
}

export default Layout
