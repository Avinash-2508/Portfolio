import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollAnimation from './useScrollAnimation'
// ...existing code for CustomCursor...
const CustomCursor = () => {
  const cursorRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { scrollY, scrollDirection, isScrolling } = useScrollAnimation()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll-based cursor effects
  const cursorScale = Math.min(1.5, 1 + scrollY / 1000)
  const cursorOpacity = Math.max(0.3, 0.7 - scrollY / 1000)

  return (
    <motion.div
      ref={cursorRef}
      className="fixed z-50 w-8 h-8 border border-white rounded-full pointer-events-none mix-blend-difference"
      style={{
        left: position.x - 16,
        top: position.y - 16,
        scale: cursorScale,
        opacity: cursorOpacity
      }}
      animate={{
        scale: isScrolling ? [1, 1.5, 1] : [1, 1.2, 1],
        opacity: isScrolling ? [0.5, 1, 0.5] : [0.7, 1, 0.7],
        rotate: scrollDirection === 'down' ? [0, 180, 360] : [0, -180, -360]
      }}
      transition={{
        duration: isScrolling ? 0.5 : 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}
export default CustomCursor
