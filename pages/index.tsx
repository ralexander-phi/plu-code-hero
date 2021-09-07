import 'bulma/css/bulma.css'
import Head from 'next/head'
import Game from '../components/game'

export default function Home() {
  return (
    <>
      <Head>
        <title>PLU Code Hero</title>
      </Head>

      <section className="hero is-small">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">
            PLU Code Hero
            </p>
            <p className="subtitle is-6">
            Champion of the Checkout Lane
            </p>
          </div>
        </div>
      </section>

      <Game />
    </>
  )
}

