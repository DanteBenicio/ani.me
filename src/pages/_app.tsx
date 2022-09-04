import type { AppProps } from 'next/app'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="md:max-w-5xl md:w-full m-auto py-2">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
