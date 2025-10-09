import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import { assets } from '../assets/assets'
const AboutSection = () => {
    const [showConfetti, setShowConfetti] = useState(false)
    const [isWinking, setIsWinking] = useState(false)
    const [showSunglasses, setShowSunglasses] = useState(false)
    const [isGlowing, setIsGlowing] = useState(false);
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const handleThemeChange = (e) => {
            setIsDark(e.detail.isDark)
        }

        window.addEventListener('themeChange', handleThemeChange)
        return () => window.removeEventListener('themeChange', handleThemeChange)
    }, [])

    const handleImageClick = () => {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
    }

    const handleImageHover = () => {
        // Random effect on hover
        const effects = ['wink', 'sunglasses', 'glow']
        const randomEffect = effects[Math.floor(Math.random() * effects.length)]

        switch (randomEffect) {
            case 'wink':
                setIsWinking(true)
                setTimeout(() => setIsWinking(false), 1000)
                break
            case 'sunglasses':
                setShowSunglasses(true)
                setTimeout(() => setShowSunglasses(false), 2000)
                break
            case 'glow':
                setIsGlowing(true)
                setTimeout(() => setIsGlowing(false), 1500)
                break
        }
    }

    // Download business card as PDF (from public HTML)
    const handleDownloadBusinessCard = async (e) => {
        e.preventDefault()
        // Open the business card HTML in a hidden iframe, trigger its PDF download, then remove the iframe
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = '/contact-business-card.html?download=1'
        document.body.appendChild(iframe)
        // Remove iframe after a short delay
        setTimeout(() => {
            document.body.removeChild(iframe)
        }, 4000)
    }

    return (
        <Section title="About Me" id="about">
            <div className="grid items-center gap-12 md:grid-cols-2">
                <div>
                    <p className={`mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Hi, I’m Avinash Ponneboina, a passionate Computer Science student at SRM University with a strong drive for continuous learning and problem-solving. I specialize in full-stack development, data structures, and cybersecurity, and I love turning ideas into practical projects
                    </p>
                    <p className={`mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Over the years, I’ve built a solid foundation in Python, Java, C, JavaScript, HTML, and CSS, and I’m continuously expanding my skills in web development, backend technologies, and ethical hacking. My goal is to create impactful applications and eventually secure a position at a leading product-based company.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['React', 'Three.js', 'Tailwind', 'Framer Motion',].map((skill) => (
                            <motion.span
                                key={skill}
                                className={`px-4 py-2 border ${isDark ? 'border-white text-white' : 'border-gray-900 text-gray-900'} text-sm`}
                                whileHover={{ scale: 1.05, backgroundColor: isDark ? "#ffffff" : "#000000", color: isDark ? "#000000" : "#ffffff" }}
                                transition={{ duration: 0.2 }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                    {/* Download Business Card Button */}
                    {/* <div className="mt-8">
                        <button
                            onClick={handleDownloadBusinessCard}
                            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-colors bg-orange-600 shadow rounded-xl hover:bg-orange-500"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 16v-8m0 8l-3-3m3 3l3-3M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download Business Card
                        </button>
                    </div> */}
                </div>
                {/* ...existing image and effects... */}
                <motion.div
                    className="relative cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onClick={handleImageClick}
                    onMouseEnter={handleImageHover}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Confetti Animation */}
                    {showConfetti && (
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
                                    }}
                                    initial={{
                                        x: '50%',
                                        y: '50%',
                                        scale: 0,
                                        opacity: 1
                                    }}
                                    animate={{
                                        x: Math.random() * 400 - 200,
                                        y: Math.random() * 400 - 200,
                                        scale: [0, 1, 0],
                                        opacity: [1, 0.8, 0],
                                        rotate: Math.random() * 720
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeOut",
                                        delay: i * 0.05
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Glow Effect */}
                    {isGlowing && (
                        <div className="absolute inset-0 z-10 rounded-lg bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 animate-pulse" />
                    )}

                    {/* Sunglasses Overlay */}
                    {showSunglasses && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <motion.div
                                className="text-6xl"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ duration: 0.5, ease: "backOut" }}
                            >
                                😎
                            </motion.div>
                        </div>
                    )}

                    {/* Wink Effect */}
                    {isWinking && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <motion.div
                                className="text-6xl"
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1, 0] }}
                                transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                            >
                                😉
                            </motion.div>
                        </div>
                    )}

                    <img
                        src={assets.About}
                        alt="Professional portrait of a creative developer in a modern, minimalist style"
                        className={`w-full h-auto rounded-lg transition-all duration-300 ${isGlowing ? 'shadow-2xl shadow-blue-500/50' : 'shadow-lg'
                            }`}
                    />

                    {/* Hover Glow Ring */}
                    <div className="absolute inset-0 transition-all duration-300 border-2 border-transparent rounded-lg group-hover:border-white/30 group-hover:shadow-lg group-hover:shadow-white/20" />
                </motion.div>
            </div>
        </Section>
    )
}

export default AboutSection
