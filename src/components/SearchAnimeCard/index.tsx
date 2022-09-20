import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SearchAnimeCardProps {
  title: string
  score: string
  imgSrc: string
  createdAt: string
  synopsis: string
  genre: string
  desktop?: boolean
  onClick: () => void
}

export default function SearchAnimeCard({ createdAt, score, title, imgSrc, onClick, synopsis, genre, desktop }: SearchAnimeCardProps) {
  const formattedCreatedAt = createdAt?.split('-').filter(string => string.length === 4)

  return (
    <Link
      href={`/anime/${title}`}
    >
      <div className={`flex gap-2 w-full h-48 rounded-lg overflow-hidden cursor-pointer border-2 border-dark-200 ${desktop ? 'bg-dark-300' : ''} hover:backdrop-brightness-200 duration-300`} onClick={onClick}>
        <div className="min-w-[128px] h-full relative">
          <Image src={imgSrc} alt="imagem do anime" className='rounded-lg' objectFit='cover' layout='fill' priority/>
        </div>

        <div className={`flex flex-col gap-4 justify-between p-2 ${desktop ? 'text-white-900' : ''}`}>
          <h3 className="text-base smx:text-xl font-medium">{title}</h3>

          <div className="flex flex-col gap-1 text-xs smx:text-base">
            <p className="font-medium">Score: <span className="text-gray font-light smx:font-normal">{score} ✯</span></p>
            <p className="font-medium">Genre: <span className="text-gray font-light smx:font-normal">{genre}</span></p>
            <p className="font-medium max-w-[120px] mb:max-w-[200px] smx:max-w-[300px] sm:max-w-[350px] md:max-w-[400px] whitespace-nowrap overflow-hidden text-ellipsis">Sinopse: <span className="block mb:inline text-gray font-light smx:font-normal">{synopsis}</span></p>
            <p className="font-medium">Ano: <span className="text-gray font-light smx:font-normal">{formattedCreatedAt}</span></p>
          </div>
        </div>
      </div>
    </Link>
  )
}

SearchAnimeCard.defaultProps = {
  desktop: false
}