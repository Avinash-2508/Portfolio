import React from 'react'
import { motion } from 'framer-motion'
import useScrollAnimation from './useScrollAnimation'
const ScrollProgressIndicator = () => {
  const { scrollProgress } = useScrollAnimation()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-orange-500 to-purple-500"
      style={{ scaleX: scrollProgress }}
    />
  )
}
export default ScrollProgressIndicator
