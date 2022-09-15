import { useEffect } from "react";

export default function useClickOutside(handler: () => void) {
  useEffect(() => {
    const sidebarContainer = document.querySelector('#__next > div > div')
    const aside = sidebarContainer?.firstElementChild

    sidebarContainer?.addEventListener('click', e => {
      const clickedElement = e.target as HTMLElement

      if (!aside?.contains(clickedElement)) {
        handler()
      }
    })

    return () => document.removeEventListener('click', () => {})
  }, [])
}