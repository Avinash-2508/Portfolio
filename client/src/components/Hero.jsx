import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import heroImage from '../assets/Heros_c.png'
import useScrollAnimation from './useScrollAnimation'
// ...existing code for Hero component...
const Hero = () => {
  const [isDark, setIsDark] = useState(true)
  const [showParticles, setShowParticles] = useState(false)
  const [showWave, setShowWave] = useState(false)
  const [konamiCode, setKonamiCode] = useState([])
  const { scrollY, scrollDirection, scrollProgress } = useScrollAnimation()
  const heroRef = useRef(null)
  
  // Scroll-based transforms using direct calculations
  const y = scrollY * -0.2
  const opacity = Math.max(0, 1 - scrollY / 300)
  const scale = Math.max(0.8, 1 - scrollY / 500)
  const rotateX = scrollY * 0.015

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key
      const expectedSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
      
      setKonamiCode(prev => {
        const newCode = [...prev, key].slice(-8)
        if (JSON.stringify(newCode) === JSON.stringify(expectedSequence)) {
          setShowWave(true)
          setTimeout(() => setShowWave(false), 3000)
          return []
        }
        return newCode
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNameClick = () => {
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 2000)
  }

  // Scroll to section helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.section 
      ref={heroRef}
      className={`min-h-screen flex flex-col justify-center items-center px-6 relative z-10 overflow-hidden ${showWave ? 'animate-pulse' : ''}`}
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        y,
        opacity,
        scale,
        rotateX
      }}
    >
  {/* Overlay: dark in dark mode, light in light mode */}
  <div className={`absolute inset-0 transition-colors duration-300 ${isDark ? 'bg-black/50' : 'bg-white/10'}`}></div>

      {/* Floating Particles Animation */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Wave Animation Background */}
      {showWave && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-purple-500/20 animate-pulse"></div>
      )}

      {/* Name Text */}
      <motion.h1
        className={`relative text-6xl md:text-9xl font-light ${isDark ? 'text-white' : 'text-gray-900'} text-center mb-8 tracking-tight cursor-pointer select-none z-10`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onClick={handleNameClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Avinash Ponneboina
      </motion.h1>
      
      <motion.p
        className={`text-xl md:text-2xl ${isDark ? 'text-white' : 'text-gray-900'} text-center max-w-2xl opacity-90 mb-12 z-10`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        Creative Developer & Designer
      </motion.p>
      <motion.div
        className="flex space-x-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.button
          className={`px-8 py-3 border border-orange-600 ${isDark ? 'text-white' : 'text-gray-900'} hover:bg-orange-600 hover:border-orange-600 transition-colors duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('projects')}
        >
          View Work
        </motion.button>
        <motion.button
          className={`px-8 py-3 bg-orange-600 ${isDark ? 'text-white' : 'text-white'} hover:bg-orange-500 transition-colors duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </motion.button>
      </motion.div>
    </motion.section>
  )
}
export default Hero
