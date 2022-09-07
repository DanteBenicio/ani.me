import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { AppContextProvider } from '../context/AppContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="md:max-w-6xl md:w-full m-auto py-2">
      <AppContextProvider>
        <Header />
        <Component {...pageProps} />
      </AppContextProvider>
    </div>
  )
}

export default MyApp
