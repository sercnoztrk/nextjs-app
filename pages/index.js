// import React, { useEffect, useState } from "react"
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import fetcher from '../lib/fetch'
import Layout, { siteTitle } from '../components/layout'
import CardUploader from '../components/cardUploader'
import CardViewer from "../components/cardViewer"


function Index() {
  // const [card, setCard] = useState(null)
  // useEffect(() => {
  //   fetch('/api/card').then(res => res.json()).then(data => setCard(data))
  // }, [])
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <CardUploader/>
        <br></br>
        <CardViewer/>
      </section>
    </Layout>
  )
}

// export async function getStaticProps() {
//   const data = JSON.stringify(fetch("/api/card"))
//   return {
//     props: {
//       data,
//     },
//     revalidate: 1, // In seconds
//   }
// }

export default Index