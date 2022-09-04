import React, { MouseEvent, useRef } from 'react'
import styles from './styles.module.css'

interface FilterProps {
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>
}

export default function Filter({ setSelectedFilter }: FilterProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  function handleSelectButton(e: MouseEvent<HTMLButtonElement>) {
    const clickedButton = e.target as HTMLButtonElement

    if (clickedButton.classList.length === 2) {
      return
    }

    const buttonArray = Array.from(carouselRef.current?.children!)

    buttonArray.forEach(button => {
      if (button.classList.length === 2) {
        button.classList.remove(button.classList[1])
      }

      if (clickedButton === button) {
        button.classList.add(styles.active)

        setSelectedFilter(button.textContent === 'Todos' ? 'all' : button.textContent!)
      }
    })    
  }

  return (
    <div className={styles.carousel} ref={carouselRef}>
      <button className={`${styles.button} ${styles.active}`} onClick={handleSelectButton}>Todos</button>
      <button className={styles.button} onClick={handleSelectButton}>A</button>
      <button className={styles.button} onClick={handleSelectButton}>B</button>
      <button className={styles.button} onClick={handleSelectButton}>C</button>
      <button className={styles.button} onClick={handleSelectButton}>D</button>
      <button className={styles.button} onClick={handleSelectButton}>E</button>
      <button className={styles.button} onClick={handleSelectButton}>F</button>
      <button className={styles.button} onClick={handleSelectButton}>G</button>
      <button className={styles.button} onClick={handleSelectButton}>H</button>
      <button className={styles.button} onClick={handleSelectButton}>I</button>
      <button className={styles.button} onClick={handleSelectButton}>J</button>
      <button className={styles.button} onClick={handleSelectButton}>K</button>
      <button className={styles.button} onClick={handleSelectButton}>L</button>
      <button className={styles.button} onClick={handleSelectButton}>M</button>
      <button className={styles.button} onClick={handleSelectButton}>N</button>
      <button className={styles.button} onClick={handleSelectButton}>O</button>
      <button className={styles.button} onClick={handleSelectButton}>P</button>
      <button className={styles.button} onClick={handleSelectButton}>Q</button>
      <button className={styles.button} onClick={handleSelectButton}>R</button>
      <button className={styles.button} onClick={handleSelectButton}>S</button>
      <button className={styles.button} onClick={handleSelectButton}>T</button>
      <button className={styles.button} onClick={handleSelectButton}>U</button>
      <button className={styles.button} onClick={handleSelectButton}>V</button>
      <button className={styles.button} onClick={handleSelectButton}>W</button>
      <button className={styles.button} onClick={handleSelectButton}>X</button>
      <button className={styles.button} onClick={handleSelectButton}>Y</button>
      <button className={styles.button} onClick={handleSelectButton}>Z</button>
    </div>
  )
}
