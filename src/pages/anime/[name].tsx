import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import PlayButton from '../../assets/PlayButton';
import Card from '../../components/Card';
import MoreWatchedAnimeCard from '../../components/MoreWatchedAnimeCard';
import { AppContext } from '../../context/AppContext';
import { localApi } from '../../services/axios';
import formatAnimeName from '../../utils/formatAnimeName';
import styles from './styles.module.css';

interface AnimeProps {
  relatedAnimes: AnimeData[]
}

export default function Anime({ relatedAnimes }: AnimeProps) {
  const { asPath } = useRouter()
  const animeName = formatAnimeName(asPath)

  const { animes, trendingAnimes, setRecentAnimes, recentAnimes } = useContext(AppContext)
  const [anime, setAnime] = useState<AnimeData>(animes.find(anime => anime.attributes.canonicalTitle === animeName)!);

  useEffect(() => {
    (async () => {
      if (!anime || animeName !== anime?.attributes?.canonicalTitle) {
        const { data } = await localApi.get('/getAnime', {
          params: {
            animeName,
          }
        })

        const animeAlreadyExists = recentAnimes.some(recentAnime => recentAnime.attributes?.canonicalTitle === animeName)

        if (animeAlreadyExists) {
          setAnime(data[0])
          return
        }

        setAnime(data[0])
        setRecentAnimes(prevRecentAnimes => [...prevRecentAnimes, data[0]])
        return
      }

      setRecentAnimes(prevRecentAnimes => Array.from(new Set([...prevRecentAnimes, anime])))
    })()
  }, [animeName])

  return (
    <section className="w-full min-h-screen">
      <div className="flex gap-4 mt-12">
        <div className="flex flex-col gap-8 w-full md:w-[75%]">
          <h2 className="text-white-900 font-rubik text-[1.5rem] md:text-[2rem]">
            {anime?.attributes?.canonicalTitle && anime?.attributes?.canonicalTitle + ' - Episódio 1'}
          </h2>

          <div className='relative max-h-[490px] w-full'>
            <img src={anime?.attributes?.coverImage?.small || anime?.attributes?.posterImage?.small} alt="" className="w-full object-cover h-[360px] smx:h-[400px] md:h-full" />
            <PlayButton />
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-8 flex-grow">
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

      <div className="flex gap-8 mt-10 md:mt-20">
        <img src={anime?.attributes?.posterImage?.small} alt="" className="hidden rounded-xl md:block" />

        <div className="flex flex-col gap-6">
          <div>
            <p className={styles['text-information']}>
              <span>Duração : </span>
              {' '}
  &nbsp;
              {anime?.attributes?.episodeLength && anime?.attributes?.episodeLength + ' Min.'}
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

      <div className="mt-10 md:mt-20">
        <h2 className="font-rubik text-[1.5rem] md:text-[2rem] text-white-900">Comentários</h2>

        <div className="flex gap-[1.8rem] py-4">
          <img src="/profile-1.png" alt="" className="w-[60px] h-[60px]" />

          <div className="flex flex-col gap-2">
            <span className="font-rubik font-medium text-base md:text-lg text-white-900">Ana Júlia</span>

            <p className="font-inter text-gray text-sm md:text-base">Episodio muito top, já voltou muito bom!</p>
          </div>
        </div>

        <div className="flex gap-[1.8rem] py-4 border-t border-dark-200">
          <img src="/profile-2.png" alt="" className="w-[60px] h-[60px]" />

          <div className="flex flex-col gap-2">
            <span className="font-rubik font-medium text-base md:text-lg text-white-900">Bruno San</span>

            <p className="font-inter text-gray text-sm md:text-base">Primeira vez assistindo e já estou adorando :)</p>
          </div>
        </div>

        <div className='mt-10 md:mt-20'>
          <h2 className="font-rubik text-[1.5rem] md:text-[2rem] text-white-900">Relacionados</h2>

          <div className="grid grid-cols-1 place-items-center mb:grid-cols-2 smx:flex smx:flex-wrap gap-6 mt-5">
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
    const { data: relatedAnimes } = await localApi.get('/getRelatedAnimes')   

    return {
      props: {
        relatedAnimes
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