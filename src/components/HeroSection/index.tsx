import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { localApi } from '../../services/axios'
import Card from '../Card'
import Filter from '../Filter'
import styles from './styles.module.css'

export default function HeroSection() {
  const { animes, setAnimes, recentAnimes } = useContext(AppContext)

  const [selectedFilter, setSelectedFilter] = useState('all')
  const [animesCount, setAnimesCount] = useState(11)

  useEffect(() => {
    if (selectedFilter !== 'all') {
      (async () => {
        const { data } = await localApi.get('api/getAnimes', {
          params: {
            animeName: selectedFilter
          }
        })

        setAnimes(data)
        setAnimesCount(11)
      })()
    } else {
      (async () => {
        const { data } = await localApi.get('api/getAnimes', {
          params: {
            animeName: selectedFilter
          }
        });

        setAnimes(data)
        setAnimesCount(11)
      })()
    }
  }, [selectedFilter])
  
  async function handleShowMoreAnimes(filterText: string) {
    const filter = filterText === 'all' ? '' : `&filter[text]=${filterText}`

    const { data } = await localApi.get('api/getMoreAnimes', {
      params: {
        animesCount,
        filter
      }
    })

    setAnimes(prevState => [...prevState, ...data])
    setAnimesCount(prevState => prevState + 10)
  }
  
  return (
    <section className="py-8">
      <Filter 
        setSelectedFilter={setSelectedFilter}
      />
      <div className="w-full font-rubik mt-12">
        <h2 className='text-white-900 text-[1.4rem] smx:text-[1.5rem] sm:text-[2rem]'>Últimas Novidades</h2>
        <p className="text-gray font-inter text-base sm:text-2xl font-extralight">O que você vai assistir hoje?</p>

        <div className={`${styles.banner} group overflow-hidden rounded-lg h-[160px] smx:h-auto`}>
          <img src="/one-punch-man.png" className="object-cover h-[160px] smx:h-auto smx:object-cover group-hover:scale-110 transition-all duration-500 z-0"/>

          <div className={styles['banner-information']}>
            <h2>ONE PUNCH MAN TERÁ 3º TEMPORADA</h2>
            <p id={styles['first-paragraph']}>
              Como relatado anteriormente, a franquia baseada no mangá escrito por ONE e ilustrado por Yusuke Murata,
              One Punch Man, divulgou um comunicado confirmando a 
              produção de uma terceira temporada da adaptação para o anime […]
            </p>
            <p id={styles['second-paragraph']}>
              Como relatado anteriormente, a franquia baseada no mangá escrito por ONE e ilustrado por Yusuke Murata, One Punch […]
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-12">
        <h2 className='text-white-900 text-[1.4rem] smx:text-[1.5rem] sm:text-[2rem] font-rubik'>Últimas atualizações</h2>

        <div className='grid grid-cols-1 place-items-center mb:grid-cols-2 smx:flex smx:flex-wrap gap-6 mt-5 smx:mt-10'>
          {animes?.map(anime => (
            <Card key={anime.id} imgSrc={anime.attributes?.posterImage.small} title={anime.attributes?.canonicalTitle}/>
          ))}
        </div>

        <button onClick={() => handleShowMoreAnimes(selectedFilter)} className="block m-auto mt-16 py-2 min-w-[180px] bg-dark-200 text-white-900 rounded-[4px] outline-1 outline-blue hover:brightness-125 active:brightness-90 duration-500">Ver Mais</button>
      </div>

      <div className="mt-10">
        <h2 className="font-rubik text-[1.4rem] smx:text-[1.5rem] md:text-[2rem] text-white-900">Animes recentes</h2>

        <div className="grid grid-cols-1 place-items-center mb:grid-cols-2 smx:flex smx:flex-wrap gap-6 mt-10">
          {recentAnimes.map(recentAnime => (
            <Card 
              key={recentAnime?.id}
              imgSrc={recentAnime?.attributes.posterImage.small}
              title={recentAnime?.attributes.canonicalTitle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
