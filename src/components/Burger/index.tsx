import React from 'react'
import styles from './styles.module.css'

interface BurgerProps {
  showSidebarMenu: boolean
  handleToggleMenu: () => void
}

export default function Burger({showSidebarMenu, handleToggleMenu}: BurgerProps) {

  return (
    <button onClick={handleToggleMenu} className={`${styles.burger} ${showSidebarMenu ? styles.active : ''} group`}>
      <span className={styles.burger_line} />
      <span className={styles.burger_line} />
      <span className={styles.burger_line} />
    </button>
  )
}
