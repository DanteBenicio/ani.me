import React from 'react'
import useClickOutside from '../../hooks/useClickOutside'
import Burger from '../Burger'
import styles from './styles.module.css'

interface SidebarMenuProps {
  handleToggleMenu: () => void
  showSidebarMenu: boolean
}

export default function SidebarMenu({handleToggleMenu, showSidebarMenu}: SidebarMenuProps) {

  useClickOutside(handleToggleMenu)

  return (
    <div className={styles.sidebar_container} >
      <aside className={`${styles.sidebar} ${showSidebarMenu ? styles.active : ''}`}>
        <div className="p-4">
          <Burger showSidebarMenu={showSidebarMenu} handleToggleMenu={handleToggleMenu}/>
        </div>

        <ul className="flex items-center flex-col mt-4 justify-center gap-4">
          <li className={styles.li}>Início</li>
          <li className={styles.li}>Lista</li>
          <li className={styles.li}>Gêneros</li>
          <li className={styles.li}>Novos Episódios</li>
        </ul>
      </aside>
    </div>
  )
}
