import Link from 'next/link'
import React from 'react'

interface Props {
  imgSrc: string
  title: string
  createdAt: Date
}

export default function MoreWatchedAnimeCard({ createdAt, imgSrc, title }: Props) {
  return (
    <Link href={`/anime/${title}`}>
      <article className="flex w-full">
        <img src={imgSrc} alt="" className="basis-[100px] max-h-[107px]"/>

        <div className="flex flex-col gap-2 max-w-[191px] p-3 bg-dark-200 h-[100%]">
          <h3 className="text-white-900 font-rubik font-medium text-lg">{title}</h3>

          <span className="font-inter font-medium text-sm text-gray">{new Date(createdAt).getFullYear()}</span>
        </div>
      </article>
    </Link>
  )
}
