import React from 'react'
import { motion } from 'framer-motion'
import useScrollAnimation from './useScrollAnimation'
const FloatingScrollIndicator = () => {
  const { scrollProgress, scrollDirection } = useScrollAnimation()
  
  return (
    <motion.div
      className="fixed z-40 flex flex-col items-center gap-4 transform -translate-y-1/2 right-8 top-1/2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <motion.div
        className="relative w-1 h-32 overflow-hidden rounded-full bg-gradient-to-b from-orange-500 to-purple-500"
        whileHover={{ scale: 1.2 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full bg-white rounded-full"
          style={{ 
            height: `${scrollProgress * 100}%`,
            background: "linear-gradient(to bottom, #f97316, #a855f7)"
          }}
        />
      </motion.div>
      
      <motion.div
        className="text-xs text-white/60"
        animate={{ 
          opacity: scrollDirection === 'down' ? 1 : 0.3,
          y: scrollDirection === 'down' ? 0 : -5
        }}
        transition={{ duration: 0.3 }}
      >
        {scrollDirection === 'down' ? '↓' : '↑'}
      </motion.div>
    </motion.div>
  )
}
export default FloatingScrollIndicator
