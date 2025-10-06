import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa'
import useScrollVisibility from './useScrollVisibility'
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isDark, setIsDark] = useState(true)
  const { ref, isVisible } = useScrollVisibility(0.1, "0px 0px -10% 0px")

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="flex flex-col justify-center min-h-screen px-6 py-20 mx-auto md:px-20 max-w-7xl"
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
      >
        Get In Touch
      </motion.h2>

      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <motion.div
          className={`rounded-3xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-300/50'} border p-8 md:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]`}
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : -30
          }}
          transition={{ 
            type: "spring",
            stiffness: 70,
            damping: 22,
            mass: 0.8,
            velocity: 0.2,
            delay: 0.15,
            restDelta: 0.001
          }}
        >
          <motion.h3
            className={`text-4xl md:text-5xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ 
              type: "spring",
              stiffness: 60,
              damping: 20,
              mass: 1
            }}
          >
            Let's Build Something Amazing
          </motion.h3>
          <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-lg leading-relaxed mb-10`}>
            I'm always excited to discuss new opportunities, collaborate on interesting projects, or just have a
            chat about technology, development, and innovation.
          </p>

          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20">
                <span className="text-xl text-orange-500">📧</span>
              </div>
              <div>
                <div className="mb-1 font-medium text-orange-500">Email</div>
                <a href="mailto:avinash@example.com" className={`${isDark ? 'text-white hover:text-orange-300' : 'text-gray-900 hover:text-orange-600'} transition-colors`}>
                  avinash@example.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20">
                <span className="text-xl text-orange-500">📍</span>
              </div>
              <div>
                <div className="mb-1 font-medium text-orange-500">Location</div>
                <p className={`${isDark ? 'text-white/80' : 'text-gray-700'}`}>Hyderabad, India</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20">
                <span className="text-xl text-orange-500">⚡</span>
              </div>
              <div>
                <div className="mb-1 font-medium text-orange-500">Response Time</div>
                <p className={`${isDark ? 'text-white/80' : 'text-gray-700'}`}>Usually within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-10">
            <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} mb-4`}>Follow me on</p>
            <div className="flex space-x-4">
              {[
                { href: 'https://github.com', icon: <FaGithub />, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: <FaLinkedinIn />, label: 'LinkedIn' },
                { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
                { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' }
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} rounded-full flex items-center justify-center transition-colors`}
                  aria-label={label}
                >
                  <span className="text-orange-500">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className={`rounded-3xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-300/50'} border p-8 md:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]`}
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : 30
          }}
          transition={{ 
            type: "spring",
            stiffness: 70,
            damping: 22,
            mass: 0.8,
            velocity: 0.2,
            delay: 0.2,
            restDelta: 0.001
          }}
        >
          <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
            Send me a message
          </h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className={`block ${isDark ? 'text-white/80' : 'text-gray-700'} mb-2 font-medium`}>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-orange-500' : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-orange-500'} border rounded-lg focus:outline-none transition-colors`}
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className={`block ${isDark ? 'text-white/80' : 'text-gray-700'} mb-2 font-medium`}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-orange-500' : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-orange-500'} border rounded-lg focus:outline-none transition-colors`}
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className={`block ${isDark ? 'text-white/80' : 'text-gray-700'} mb-2 font-medium`}>Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black/20 border-white/20 text-white placeholder-white/40 focus:border-orange-500' : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:border-orange-500'} border rounded-lg focus:outline-none transition-colors resize-none`}
                placeholder="Tell me about your project or just say hello..."
                required
              />
            </div>
          </div>
          
          <motion.button
            type="submit"
            className="w-full px-6 py-4 mt-8 font-medium text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  )
}
export default ContactSection
