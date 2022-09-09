import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import PlayButton from '../../assets/PlayButton';
import Card from '../../components/Card';
import MoreWatchedAnimeCard from '../../components/MoreWatchedAnimeCard';
import { AppContext } from '../../context/AppContext';
import { api } from '../../services/axios';
import styles from './styles.module.css';

interface AnimeProps {
  relatedAnimes: AnimeData[]
}

export default function Anime({ relatedAnimes }: AnimeProps) {
  const { asPath } = useRouter()
  const animeName = asPath.replace(/(\/anime\/)/gi, '').replace(/%20/g, ' ')

  const { animes, trendingAnimes, setRecentAnimes } = useContext(AppContext)
  const [anime, setAnime] = useState<AnimeData>(animes.find(anime => anime.attributes.canonicalTitle === animeName)!);
  
  useEffect(() => {
    (async () => {
      if (!anime || animeName !== anime.attributes.canonicalTitle) {
        const { data } = await api.get(`/anime?filter[text]=${animeName}&page[limit]=1`)

        setAnime(data.data[0])
        setRecentAnimes(prevRecentAnimes => Array.from(new Set([...prevRecentAnimes, data.data[0]])))
        return
      }

      setRecentAnimes(prevRecentAnimes => Array.from(new Set([...prevRecentAnimes, anime])))
    })()
  }, [animeName])

  return (
    <section className="w-full min-h-screen">
    <div className="flex gap-4 mt-12">
      <div className="flex flex-col gap-8 w-[75%]">
        <h2 className="text-white-900 font-rubik text-[2rem]">
          {anime?.attributes?.canonicalTitle || 'bla'}
          {' '}
          - Episódio 1
        </h2>

        <div className='relative h-[100%] max-h-[490px]'>
          <img src={anime?.attributes?.coverImage?.small || anime?.attributes?.posterImage.small} alt="" className="w-full object-cover h-[100%]" />
          <PlayButton />
        </div>
      </div>

      <div className="flex flex-col gap-8 flex-grow">
        <h3 className="text-gray text-[1.5rem] font-rubik mt-3">Mais Assistidos</h3>

        <div className="flex flex-col gap-3 max-w-[330px] w-full">
          {trendingAnimes.map(trendingAnime => (
            <MoreWatchedAnimeCard
              key={trendingAnime?.id}
              createdAt={trendingAnime?.attributes?.createdAt}
              imgSrc={trendingAnime?.attributes?.posterImage.small}
              title={trendingAnime?.attributes?.canonicalTitle}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="flex gap-8 mt-20">
      <img src={anime?.attributes?.posterImage.small} alt="" className="rounded-xl" />

      <div className="flex flex-col gap-6">
        <div>
          <p className={styles['text-information']}>
            <span>Duração : </span>
            {' '}
&nbsp;
            {anime?.attributes?.episodeLength}
          </p>
          <p className={styles['text-information']}>
            <span>Estúdio : </span>
&nbsp; Studio X
          </p>
          <p className={styles['text-information']}>
            <span>Gênero : </span>
&nbsp;
            {' '}
            {anime?.attributes?.ageRatingGuide}
          </p>
        </div>

        <div>
          <p className={styles['text-information']}>
            <span className="block">Sinopse: </span>
            {anime?.attributes?.synopsis}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-20">
      <h3 className="font-rubik text-[2rem] text-white-900 mb-5">Comentários</h3>

      <div className="flex gap-[1.8rem] py-4">
        <img src="/profile-1.png" alt="" className="w-[60px] h-[60px]" />

        <div className="flex flex-col gap-2">
          <span className="font-rubik font-medium text-lg text-white-900">Ana Júlia</span>

          <p className="font-inter text-gray">Episodio muito top, já voltou muito bom!</p>
        </div>
      </div>

      <div className="flex gap-[1.8rem] py-4 border-t border-dark-200">
        <img src="/profile-2.png" alt="" className="w-[60px] h-[60px]" />

        <div className="flex flex-col gap-2">
          <span className="font-rubik font-medium text-lg text-white-900">Bruno San</span>

          <p className="font-inter text-gray">Primeira vez assistindo e já estou adorando :)</p>
        </div>
      </div>

      <div className='mt-20'>
        <h3 className="font-rubik text-[2rem] text-white-900">Relacionados</h3>

        <div className="flex flex-wrap gap-6 mt-10">
          {relatedAnimes?.map(relatedAnime => (
            <Card
              key={relatedAnime.id}
              imgSrc={relatedAnime.attributes?.posterImage.small}
              title={relatedAnime.attributes?.canonicalTitle}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: relatedAnimes } = await api.get(`/anime?page[limit]=6&page[offset]=${Math.round(Math.random() * 100)}`)   

    return {
      props: {
        relatedAnimes: relatedAnimes.data
      }
    }
  } catch (error) {
    console.log(error)

    return {
      props: {
        relatedAnimes: null
      }
    }
  }
}