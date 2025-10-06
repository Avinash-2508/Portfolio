import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollVisibility from './useScrollVisibility'
// ...existing code for Section...
const Section = ({ title, children, id }) => {
  const [isDark, setIsDark] = useState(true)
  const { ref, isVisible } = useScrollVisibility(0.1, "0px 0px -10% 0px")

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  return (
    <motion.section
      ref={ref}
      id={id}
      className="flex flex-col justify-center max-w-6xl min-h-screen px-6 py-20 mx-auto md:px-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30
      }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.8,
        velocity: 0.2,
        restDelta: 0.001
      }}
    >
      <motion.h2
        className={`text-4xl md:text-6xl font-light ${isDark ? 'text-white' : 'text-gray-900'} mb-12`}
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : -20
        }}
        transition={{ 
          type: "spring",
          stiffness: 80,
          damping: 25,
          mass: 0.9,
          velocity: 0.15,
          delay: 0.1,
          restDelta: 0.001
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg md:text-xl leading-relaxed`}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20
        }}
        transition={{ 
          type: "spring",
          stiffness: 60,
          damping: 20,
          mass: 0.8,
          velocity: 0.1,
          delay: 0.2,
          restDelta: 0.001
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}
export default Section
