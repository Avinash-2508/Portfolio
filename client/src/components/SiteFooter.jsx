import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'
// ...existing code for SiteFooter component...
const SiteFooter = () => {
  const [showHearts, setShowHearts] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isDark, setIsDark] = useState(true)
  
  const socials = [
    { href: 'https://github.com', label: 'GitHub', icon: <FaGithub />, color: '#a855f7' }, 
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: <FaLinkedinIn />, color: '#0A66C2' },
    { href: 'https://instagram.com', label: 'Instagram', icon: <FaInstagram />, color: '#E4405F' },
    { href: 'https://twitter.com', label: 'Twitter', icon: <FaTwitter />, color: '#1DA1F2' },
  ]

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  const handleHeartClick = () => {
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 3000)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isListening) return
      
      const key = e.key.toLowerCase()
      setTypedText(prev => {
        const newText = prev + key
        if (newText === 'ap') {
          console.log('💖 Thank you for visiting my portfolio! Your support means the world to me. Keep coding and stay awesome! 🚀')
          return ''
        }
        return newText.slice(-2) // Keep only last 2 characters
      })
    }

    const handleFocus = () => setIsListening(true)
    const handleBlur = () => {
      setIsListening(false)
      setTypedText('')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [isListening])

  return (
    <footer className="relative overflow-hidden">
      <div className={`absolute inset-0 ${isDark 
        ? 'bg-gradient-to-r from-indigo-900/40 via-fuchsia-900/30 to-rose-900/40' 
        : 'bg-gradient-to-r from-gray-100 via-blue-50 to-gray-200 border-t border-gray-300'} `} />

      {/* Floating Hearts Animation */}
      {showHearts && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl text-red-500"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: -50,
                scale: [0, 1.2, 0.8],
                opacity: [1, 0.8, 0]
              }}
              transition={{
                duration: 3,
                ease: "easeOut",
                delay: i * 0.1
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative max-w-6xl px-6 py-16 mx-auto">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h3 className={`text-4xl md:text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>[Avinash.]</h3>
            <p className={`${isDark ? 'text-sky-300' : 'text-blue-600'} tracking-widest text-base md:text-lg mb-6 max-w-2xl`}>WEB DEVELOPER • CYBERSECURITY ENTHUSIAST • TECH ENTHUSIAST</p>
            <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} max-w-xl`}>
              Building the future with code and creativity. Always learning, always creating, always pushing boundaries.
            </p>
          </div>

          <div className="md:justify-self-end">
            <h4 className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Connect With Me</h4>
            <div className="flex items-center gap-4">
              {socials.map(({ href, label, icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{ '--c': color }}
                  className={`group relative inline-flex h-12 w-12 items-center justify-center rounded-full border ${isDark ? 'border-white/20 bg-white/10 text-white hover:border-white/30' : 'border-gray-300/50 bg-gray-200/50 text-gray-700 hover:border-gray-400/50'} transition transform hover:-translate-y-1`}
                >
                  <span className="text-xl transition-transform group-hover:scale-110 group-hover:text-[var(--c)] group-hover:drop-shadow-[0_0_10px_var(--c)]">
                    {icon}
                  </span>
                  <span
                    className="absolute inset-0 transition-all rounded-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-110"
                    style={{ border: '2px solid var(--c)', boxShadow: '0 0 10px var(--c), 0 0 25px var(--c)' }}
                  />
                </a>
              ))}
            </div>
            <div className={`text-4xl md:text-5xl font-['Passions_Conflict',_cursive] tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} mt-8 text-left md:text-right`}>
              Avinash Ponneboina
            </div>

          </div>
        </div>

        <div className={`mt-12 h-px ${isDark ? 'bg-white/10' : 'bg-gray-300/50'}`} />

        <div className={`mt-6 flex flex-col md:flex-row items-center justify-between gap-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          <p>
            © 2025 Avinash. Designed and developed with 
            <span 
              className="inline-block transition-colors transform cursor-pointer hover:text-red-400 hover:scale-110"
              onClick={handleHeartClick}
            >
              ❤️
            </span> 
            using React & Framer Motion
          </p>
          <nav className={`flex gap-6 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'blogs', label: 'Blogs' },
              { id: 'contact', label: 'Contact' },
            ].map(({ id, label }) => (
              <motion.a 
                key={id} 
                href={`#${id}`} 
                className={`relative group ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors duration-300`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(id)
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} origin-left`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
export default SiteFooter
