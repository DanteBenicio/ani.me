import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/axios";

interface ContextProps {
  recentAnimes: AnimeData[]
  setRecentAnimes: React.Dispatch<React.SetStateAction<AnimeData[]>>
  animes: AnimeData[]
  setAnimes: React.Dispatch<React.SetStateAction<AnimeData[]>>
}

const initialValue = {
  recentAnimes: [],
  animes: [],
  setAnimes: () => {},
  setRecentAnimes: () => {},
}

export const AppContext = createContext<ContextProps>(initialValue)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [recentAnimes, setRecentAnimes] = useState<AnimeData[]>([])
  const [animes, setAnimes] = useState<AnimeData[]>([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/anime')

      setAnimes(data.data)
    })()
  }, [])

  return (
    <AppContext.Provider value={{ animes, setAnimes, recentAnimes, setRecentAnimes }}>
      {children}
    </AppContext.Provider>
  )
}