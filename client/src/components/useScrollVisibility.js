import { useState, useRef, useEffect } from 'react'
import useScrollAnimation from './useScrollAnimation'
// ...existing code for useScrollVisibility...
const useScrollVisibility = (threshold = 0.1, rootMargin = "0px 0px -5% 0px") => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef(null)
  const { scrollDirection } = useScrollAnimation()
  const rafRef = useRef(null)
  const lastUpdateTime = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const now = performance.now()
        
        // Ultra-smooth throttling
        if (now - lastUpdateTime.current < 16) return // ~60fps
        lastUpdateTime.current = now

        // Use requestAnimationFrame for smooth updates
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        
        rafRef.current = requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              setIsVisible(true)
              setHasBeenVisible(true)
            }
          } else {
            // Only hide when scrolling up and element has been visible
            if (isVisible && scrollDirection === 'up' && hasBeenVisible) {
              setIsVisible(false)
            }
          }
        })
      },
      { 
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [threshold, scrollDirection, hasBeenVisible, isVisible])

  return { ref, isVisible, hasBeenVisible }
}
export default useScrollVisibility
