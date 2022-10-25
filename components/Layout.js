import styles from '../styles/Layout.module.css';
import Nav from './Nav'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
    <Nav />
    <div className={styles.container}>
      <main className={styles.main}>
        <Header className={styles.header}/>
        {children}
        <Footer className={styles.footer}/>
      </main>
    </div>
    </>
  )
}

export default Layout
