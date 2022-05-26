import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Feed from '../components/Feed'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className="bg-gray-100">
    <Head>
      <title>Christiangram</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

      {/* Header */ }
      <Modal />
      <Header />
      
      {/* Feed */ }
      <Feed />
      
      {/* Modal */ }
  </div>
  )
}
