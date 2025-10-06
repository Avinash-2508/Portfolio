import { useState, useEffect } from 'react'
// ...existing code for useScrollAnimation...
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('down')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollData = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      
      setScrollY(currentScrollY)
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setScrollProgress(Math.min(currentScrollY / maxScroll, 1))
      setIsScrolling(true)
      
      lastScrollY = currentScrollY
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollData)
        ticking = true
      }
    }

    const handleScrollEnd = () => {
      setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScrollEnd, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollEnd)
    }
  }, [])

  return { scrollY, scrollDirection, scrollProgress, isScrolling }
}
export default useScrollAnimation
