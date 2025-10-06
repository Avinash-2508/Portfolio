import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useScrollAnimation from './useScrollAnimation'
const Navigation = () => {
  const [localTime, setLocalTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const [isDark, setIsDark] = useState(true)
  const { scrollY, scrollDirection } = useScrollAnimation()

  useEffect(() => {
    const id = setInterval(() => {
      setLocalTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000 * 60)
    return () => clearInterval(id)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark: newTheme } }))
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 ${isDark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-sm`}
    >
      <div className="max-w-6xl px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <motion.div
            className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-medium`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            [Avinash.]
          </motion.div>
          {/* Desktop Navigation */}
          <div className="items-center hidden gap-8 md:flex">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>Hyderabad, India</span>
            </motion.div>
            <div className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-sm font-medium`}>
              {localTime} IST
            </div>
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-colors fon`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download
              className="px-4 py-2 text-sm text-white transition-colors bg-orange-600 rounded hover:bg-orange-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-3 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download
              className="px-3 py-2 text-sm font-medium text-white transition-colors bg-orange-600 rounded hover:bg-orange-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
