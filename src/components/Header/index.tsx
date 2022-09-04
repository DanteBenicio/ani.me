import React from 'react'
import styles from './styles.module.css'

export default function Header() {
  return (
    <header className='w-full p-2 flex justify-center items-center'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='font-rubik font-medium text-blue text-4xl cursor-pointer'>Ani.me</h1>

        <nav className="flex items-center">
          <ul className="flex items-center gap-2 font-inter font-medium text-base">
            <li className={styles.li}>Início</li>
            <li className={styles.li}>Lista</li>
            <li className={styles.li}>Gêneros</li>
            <li className={styles.li}>Novos Episódios</li>
          </ul>

          <input type="text" placeholder='Buscar' className={styles['search-input']}/>
        </nav>
      </div>
    </header>
  )
}
