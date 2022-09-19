import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SidebarMenu from '../components/SidebarMenu'
import { AppContextProvider } from '../context/AppContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [showSidebarMenu, setShowSidebarMenu] = useState(false)

  function handleToggleMenu() {
    setShowSidebarMenu(prevState => !prevState)
  }

  useEffect(() => {
    const body = document.documentElement

    if (showSidebarMenu) {
      body.style.cssText = `
        overflow-y: hidden;
      `
    } else {
      body.style.cssText = `
        overflow-y: auto;
      `
    }
  }, [showSidebarMenu])

  return (
    <div className="md:max-w-6xl md:w-full m-auto py-2">
      <AppContextProvider>
        <Header 
          handleToggleMenu={handleToggleMenu}
          showSidebarMenu={showSidebarMenu}
        />
        {showSidebarMenu && <SidebarMenu 
          showSidebarMenu={showSidebarMenu}
          handleToggleMenu={handleToggleMenu}
        />}
        <Component {...pageProps} />
        <Footer />
      </AppContextProvider>
    </div>
  )
}

export default MyApp
