import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { SiPython, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiGit, SiReact, SiFramer, SiNodedotjs, SiExpress, SiPostgresql, SiFigma, SiCanva } from 'react-icons/si'
import { FaJava, FaBullhorn } from 'react-icons/fa'
import useScrollVisibility from './useScrollVisibility' 
// ...existing code for SkillsSection...
const SkillsSection = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  const skills = [
    { icon: <span>⚡</span>, title: 'DSA', subtitle: 'PROGRAMMING' },
    { icon: <SiPython className="text-white" />, title: 'Python', subtitle: 'PROGRAMMING' },
    { icon: <FaJava className="text-white" />, title: 'Java', subtitle: 'PROGRAMMING' },
    { icon: <SiJavascript className="text-yellow-300" />, title: 'JavaScript', subtitle: 'PROGRAMMING' },
    { icon: <SiHtml5 className="text-orange-500" />, title: 'HTML5', subtitle: 'FRONTEND' },
    { icon: <SiCss3 className="text-blue-400" />, title: 'CSS3', subtitle: 'FRONTEND' },
    { icon: <SiTailwindcss className="text-cyan-400" />, title: 'Tailwind CSS', subtitle: 'STYLING' },
    { icon: <SiGit className="text-orange-400" />, title: 'Git', subtitle: 'TOOLS' },
    { icon: <SiReact className="text-cyan-300" />, title: 'React', subtitle: 'FRONTEND' },
    { icon: <SiFramer className="text-pink-400" />, title: 'Framer Motion', subtitle: 'ANIMATION' }, // <-- Added Framer Motion
    { icon: <SiNodedotjs className="text-green-500" />, title: 'Node.js', subtitle: 'BACKEND' },
    { icon: <SiExpress className="text-gray-200" />, title: 'Express.js', subtitle: 'BACKEND' },
    { icon: <span className="text-white">EJS</span>, title: 'EJS', subtitle: 'TEMPLATING' },
    { icon: <SiPostgresql className="text-sky-500" />, title: 'PostgreSQL', subtitle: 'DATABASE (BASIC)' },
    { icon: <SiFigma className="text-pink-400" />, title: 'Figma', subtitle: 'DESIGN' },
    { icon: <SiCanva className="text-cyan-300" />, title: 'Canva', subtitle: 'DESIGN' },
    { icon: <FaBullhorn className="text-orange-400" />, title: 'Digital Marketing', subtitle: 'MARKETING' } // <-- Added Digital Marketing
  ]

  return (
    <Section title="Skills & Expertise" id="skills">
      <p className={`mb-10 opacity-80 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        From CSE to development — building the future through code and creativity.
      </p>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {skills.map(({ icon, title, subtitle }, index) => {
          const { ref, isVisible } = useScrollVisibility(0.1, "0px 0px -15% 0px")
          return (
            <motion.div
              key={title}
              ref={ref}
              className={`group rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-300/50'} border p-8 backdrop-blur-sm ${isDark ? 'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-white/20' : 'shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] hover:border-gray-400/50'} hover:-translate-y-1 transition [perspective:800px]`}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 30,
                rotateX: isVisible ? 0 : -10
              }}
              transition={{ 
                type: "spring",
                stiffness: 80,
                damping: 25,
                mass: 0.8,
                velocity: 0.2,
                delay: index * 0.03,
                restDelta: 0.001
              }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
            <motion.div 
              className={`w-12 h-12 rounded-xl ${isDark ? 'bg-white/8 border-white/10' : 'bg-gray-200/50 border-gray-300/50'} border flex items-center justify-center text-2xl mb-6 group-hover:animate-[spin-x_0.6s_linear_1]`}
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.6 }
              }}
            >
              {icon}
            </motion.div>
            <motion.h4 
              className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}
              whileHover={{ 
                color: isDark ? "#f97316" : "#ea580c",
                transition: { duration: 0.2 }
              }}
            >
              {title}
            </motion.h4>
            <motion.p 
              className={`text-sm tracking-widest ${isDark ? 'text-white/60' : 'text-gray-600'}`}
              whileHover={{ 
                color: isDark ? "#ffffff" : "#000000",
                transition: { duration: 0.2 }
              }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          )
        })}
      </div>
        </Section>
  )
}
export default SkillsSection
