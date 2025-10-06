import React, { Suspense, useRef, useState, useEffect } from 'react'
import BlogSection from './BlogSection'
import Project4Img from './assets/Project4.png'
import { assets } from './assets/assets'
import useScrollVisibility from './components/useScrollVisibility'
import DisclaimerModal from './components/DisclaimerModal'
import ScrollProgressIndicator from './components/ScrollProgressIndicator'
import ThreeScene from './components/ThreeScene'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import CustomCursor from './components/CustomCursor'
import EducationModal from './components/EducationModal'
import EducationPopup from './components/EducationPopup'
import Hero from './components/Hero'
import Navigation from './components/Navigation'
import FloatingScrollIndicator from './components/FloatingScrollIndicator'
import SiteFooter from './components/SiteFooter'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import useScrollAnimation from './components/useScrollAnimation'


// Main App Component
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const aboutRef = useRef(null)
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [showEducationPopup, setShowEducationPopup] = useState(false)
  const [educationPrompted, setEducationPrompted] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const { ref: aboutSectionRef, isVisible: aboutInView } = useScrollVisibility(0.3, "0px 0px -30% 0px")

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])

  // Show popup only when About section is in view
  useEffect(() => {
    if (aboutInView && !educationPrompted) {
      setShowEducationPopup(true)
      setEducationPrompted(true)
    }
    if (!aboutInView && showEducationPopup) {
      setShowEducationPopup(false)
   
    }
  }, [aboutInView, educationPrompted, showEducationPopup])

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'} overflow-x-hidden transition-colors duration-300`}>
      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <DisclaimerModal open={showDisclaimer} onClose={() => setShowDisclaimer(false)} isDark={isDark} />
      )}
      {!showDisclaimer && (
        <>
          <ScrollProgressIndicator />
          <FloatingScrollIndicator/>
          <ThreeScene />
          <CustomCursor />
          <Navigation />
          <main>
            <div id="home">
              <Hero />
            </div>
            {/* AboutSection with ref for scroll detection */}
            <div ref={aboutRef} id="about-section-scroll-trigger">
              <div ref={aboutSectionRef}>
                <AboutSection />
              </div>
            </div>
            <SkillsSection />
            <ProjectsSection />
            <BlogSection />
            <ContactSection />
          </main>
          <SiteFooter />
          {/* Education Pop-up and Modal */}
          <EducationPopup open={showEducationPopup} onClick={() => { setShowEducationModal(true); setShowEducationPopup(false); }} isDark={isDark} onClose={() => setShowEducationPopup(false)} />
          <EducationModal open={showEducationModal} onClose={() => setShowEducationModal(false)} isDark={isDark} />
        </>
      )}
    </div>
  )
}