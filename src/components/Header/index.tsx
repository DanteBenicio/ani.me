import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SearchIcon from '../../assets/SearchIcon'
import { localApi } from '../../services/axios'
import Burger from '../Burger'
import SearchAnimeCard from '../SearchAnimeCard'
import styles from './styles.module.css'

interface HeaderProps {
  handleToggleMenu: () => void
  showSidebarMenu: boolean
}

export default function Header({ handleToggleMenu, showSidebarMenu }: HeaderProps) {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [searchAnimeInput, setSearchAnimeInput] = useState('')
  const [findedAnimes, setFindedAnimes] = useState<AnimeData[]>()

  if (!searchAnimeInput && findedAnimes?.length) {
    setFindedAnimes([])
  }

  const handleToggleSearch = () => setShowSearchInput(prevState => !prevState)

  useEffect(() => {
    if (searchAnimeInput) {
      const animeName = searchAnimeInput.toLowerCase();

      (async () => {
        try {
          const { data } = await localApi.get('/getAnimes', {
            params: {
              animeName,
              limit: 5
            }
          })
    
          setFindedAnimes(data)
        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [searchAnimeInput])

  function clearSearchAnime() {
    setSearchAnimeInput('')
    setFindedAnimes([])
  }

  return (
    <header className='w-full py-2 flex flex-col justify-center items-center'>
      <div className='w-full flex items-center gap-2 justify-between'>
        <Link href='/'>
          <h1 onClick={() => {
            clearSearchAnime()
            setShowSearchInput(false)
          }} className='font-rubik font-medium text-blue text-4xl cursor-pointer'>Ani.me</h1>
        </Link>

        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex gap-4 items-center justify-between font-inter font-medium w-full">
            <li className={styles.li}>Início</li>
            <li className={styles.li}>Lista</li>
            <li className={styles.li}>Gêneros</li>
            <li className={styles.li}>Novos Episódios</li>
          </ul>

          <div className="hidden md:block relative w-full max-w-[288px]">
            <div className="relative">
              <input 
                type="text" 
                placeholder='Buscar' 
                className={styles.search_input}
                value={searchAnimeInput}
                onChange={e => setSearchAnimeInput(e.target.value)}
              />

              {searchAnimeInput && (
                <div className="absolute right-4 top-[20%] smx:top-[15%] rounded-full bg-white-100 p-1 group" onClick={clearSearchAnime}>
                  <button className="relative flex flex-col items-center justify-center gap-2 w-4 h-4 smx:w-5 smx:h-5 p-1">
                    <span className="absolute h-[1px] w-full top-[45%] rotate-45 bg-gray group-hover:bg-white-900 duration-300" />
                    <span className="absolute h-[1px] w-full bottom-[50%] bg-gray group-hover:bg-white-900 rotate-[135deg] duration-300" />
                  </button>
                </div>
              )}

              {searchAnimeInput && (
                <div className='flex flex-col absolute z-50 mt-2 w-[400px] right-0 gap-2 bg-dark-300 shadow-2xl'>
                  {findedAnimes?.map(anime => (
                    <SearchAnimeCard
                      desktop
                      createdAt={anime?.attributes?.startDate}
                      imgSrc={anime?.attributes?.posterImage?.small}
                      score={anime?.attributes?.averageRating}
                      title={anime?.attributes?.canonicalTitle}
                      synopsis={anime?.attributes?.synopsis}
                      genre={anime?.attributes?.ageRatingGuide}
                      onClick={() => {
                        setShowSearchInput(false);
                        clearSearchAnime()
                      }}
                      key={anime?.id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div onClick={handleToggleSearch} className={`md:hidden py-2 px-[6px] cursor-pointer hover:backdrop-brightness-200 transition-colors rounded-lg group ${showSearchInput ? 'backdrop-brightness-200' : ''}`}>
            {showSearchInput ? (
              <button className="relative flex flex-col items-center justify-center gap-2 w-8 h-8 p-1">
                <span className="absolute h-[2px] w-full top-[45%] rotate-45 bg-blue " />
                <span className="absolute h-[2px] w-full bottom-[50%] bg-blue rotate-[135deg]" />
              </button>
            ) : (
              <SearchIcon />
            )}
          </div>
          
          <div className="md:hidden">
            <Burger showSidebarMenu={showSidebarMenu} handleToggleMenu={handleToggleMenu}/>
          </div>
        </nav>
      </div>

      {/* Mobile */}
      {showSearchInput && (
        <div className="md:hidden relative w-full text-white-900 mt-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder='Digite o Nome do Anime'
              value={searchAnimeInput}
              onChange={e => setSearchAnimeInput(e.target.value)}
              className={`${styles.search_input} ${styles.mb}`}
              autoFocus 
            />

            {searchAnimeInput && (
              <div className="absolute right-4 top-[20%] smx:top-[15%] rounded-full bg-white-100 p-1 group" onClick={clearSearchAnime}>
                <button className="relative flex flex-col items-center justify-center gap-2 w-4 h-4 smx:w-5 smx:h-5 p-1">
                  <span className="absolute h-[1px] w-full top-[45%] rotate-45 bg-gray group-hover:bg-white-900 duration-300" />
                  <span className="absolute h-[1px] w-full bottom-[50%] bg-gray group-hover:bg-white-900 rotate-[135deg] duration-300" />
                </button>
              </div>
            )}
          </div>

          <div className='flex flex-col mt-2 gap-2'>
            {findedAnimes?.map(anime => (
              <SearchAnimeCard
                createdAt={anime?.attributes?.startDate}
                imgSrc={anime?.attributes?.posterImage?.small}
                score={anime?.attributes?.averageRating}
                title={anime?.attributes?.canonicalTitle}
                synopsis={anime?.attributes?.synopsis}
                genre={anime?.attributes?.ageRatingGuide}
                onClick={() => {
                  setShowSearchInput(false);
                  clearSearchAnime()
                }}
                key={anime?.id}
              />
            ))}
            
            {searchAnimeInput && findedAnimes?.length === 0 && (
              <div className='flex justify-center items-center flex-col w-full bg-slate-800 text-white-900 rounded-lg p-4'>
                <img src="/not-found.svg" alt="" className="max-w-[250px]" />
                <h3 className='text-[1.2rem] smx:text-[1.4rem] sm:text-[1.8rem]'>Anime não encontrado.</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
