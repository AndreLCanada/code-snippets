import React, { useState } from 'react'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { usePostHog } from 'next-use-posthog'
function MyApp({ Component, pageProps }) {
  usePostHog(process.env.NEXT_PUBLIC_PH_KEY, { api_host: 'https://app.posthog.com', loaded: (posthog) => {
    if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
  }, })
  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
