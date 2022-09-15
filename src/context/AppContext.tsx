import React, { createContext, useEffect, useRef, useState } from "react";
import { api } from "../services/axios";

interface ContextProps {
  recentAnimes: AnimeData[]
  animes: AnimeData[]
  trendingAnimes: AnimeData[]
  setRecentAnimes: React.Dispatch<React.SetStateAction<AnimeData[]>>
  setAnimes: React.Dispatch<React.SetStateAction<AnimeData[]>>
}

const initialValue = {
  recentAnimes: [],
  animes: [],
  trendingAnimes: [],
  setAnimes: () => {},
  setRecentAnimes: () => {},
}

export const AppContext = createContext<ContextProps>(initialValue)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [recentAnimes, setRecentAnimes] = useState<AnimeData[]>([])
  const [animes, setAnimes] = useState<AnimeData[]>([])
  const [trendingAnimes, setTrendingAnimes] = useState<AnimeData[]>([])


  useEffect(() => {
    (async () => {
      const { data: animesData } = await api.get('/anime')
      const { data: trendingAnimesData } = await api.get('/trending/anime')

      setAnimes(animesData.data)
      setTrendingAnimes(trendingAnimesData.data.filter((_:unknown, index: number) => index < 4))
    })()
  }, [])


  return (
    <AppContext.Provider value={{ 
      animes, 
      recentAnimes, 
      trendingAnimes, 
      setRecentAnimes, 
      setAnimes, 
    }}>
      {children}
    </AppContext.Provider>
  )
}