import React from 'react'
import footerStyles from '../styles/Footer.module.css'
import CopyrightIcon from '@mui/icons-material/Copyright';const Footer = () => {
  const x = 3
  return (
    <div className={footerStyles.container}>
    <p className={footerStyles.description} > type. save. search.</p>
      <h1 className={footerStyles.title}>
       cS
      </h1>
      
      <p className={footerStyles.description} >Made with love by <a className={footerStyles.btn_shine} href="https://andrelacke.com">Andre.</a> <CopyrightIcon sx={{ fontSize: ".6rem", alignSelf: "center",}} />2022.</p>
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

export default Footer