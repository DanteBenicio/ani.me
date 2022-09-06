import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

interface CardProps {
  title: string
  imgSrc: string
}

export default function Card({ imgSrc, title }: CardProps) {
  return (
    <Link href={`/anime/${title}`}>
      <article className='flex-1 basis-[188px] text-center gap-2 group cursor-pointer'>
        <div className={styles.shadow}>
          <img src={imgSrc} className='w-full h-[254px] rounded-xl group-hover:scale-110 duration-500'/>
        </div>

        <h3 className="text-white-900 font-rubik mt-4">{title}</h3>
      </article>
    </Link>
  )
}
