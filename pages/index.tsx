import 'bulma/css/bulma.css'
import Head from 'next/head'
import Game from '../components/game'

export default function Home() {
  return (
    <>
      <Head>
        <title>PLU Code Hero</title>
      </Head>

      <Game />
    </>
  )
}

