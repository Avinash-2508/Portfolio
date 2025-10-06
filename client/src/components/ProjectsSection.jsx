import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Section from './Section'
import Project1Img from '../assets/Project1.png'
import Project2Img from '../assets/Project2.png'
import Project3Img from '../assets/Project3.png'
import Project4Img from '../assets/Project4.png'
import useScrollVisibility from './useScrollVisibility'
const ProjectsSection = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }
    
    window.addEventListener('themeChange', handleThemeChange)
    return () => window.removeEventListener('themeChange', handleThemeChange)
  }, [])
  
  const projects = [
    {
      title: "Interactive Portfolio",
      description: "Modern 3D portfolio website built with React, Three.js, and Framer Motion featuring smooth animations and interactive elements",
      image: Project1Img,
      technologies: ["React", "HTML", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.com"
    },
    {
      title: "E-commerce Dashboard",
      description: "Full-stack e-commerce platform with admin dashboard, payment integration, and real-time inventory management",
      image: Project2Img,
      technologies: ["Node.js", "Express", "PostgreSQL", "React", "Tailwind CSS"],
      github: "https://github.com/yourusername/ecommerce-dashboard",
      live: "https://ecommerce-demo.com"
    },
    {
      title: "Blog APP",
      description: "Real-time Blog application with location-based forecasts, interactive maps, and beautiful UI animations",
      image: Project3Img,
      technologies: ["React", "API Integration", "HTML", "Tailwind CSS"],
      github: "https://github.com/yourusername/weather-app",
      live: "https://weather-app-demo.com"
    },
    {
      title: "",
      description: "Collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking",
      image: Project4Img,
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "DnD"],
      github: "https://github.com/yourusername/task-manager",
      live: "https://taskmanager-demo.com"
    }
  ]

  return (
    <Section title="Projects" id="projects">
      <p className={`mb-10 opacity-80 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        A collection of projects showcasing my skills in full-stack development, UI/UX design, and problem-solving.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const { ref, isVisible } = useScrollVisibility(0.1, "0px 0px -20% 0px")
          return (
            <motion.div
              key={project.title}
              ref={ref}
              className={`group relative overflow-hidden rounded-lg ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100/50 border-gray-300/50'} border backdrop-blur-sm`}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 40,
                rotateX: isVisible ? 0 : -15
              }}
              transition={{ 
                type: "spring",
                stiffness: 70,
                damping: 22,
                mass: 0.8,
                velocity: 0.3,
                delay: index * 0.05,
                restDelta: 0.001
              }}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 200, damping: 15 }
              }}
            >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.description}
                className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
                title={`Project: ${project.title}`}
                onError={(e) => {
                  console.error('Image failed to load:', project.image, e);
                  e.target.style.backgroundColor = '#333';
                  e.target.style.display = 'flex';
                  e.target.style.alignItems = 'center';
                  e.target.style.justifyContent = 'center';
                  e.target.style.color = 'white';
                  e.target.innerHTML = 'Image not found';
                }}
                onLoad={() => console.log('Image loaded successfully:', project.image)}
                style={{ 
                  minHeight: '200px', 
                  backgroundColor: '#f0f0f0',
                  display: 'block',
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 10
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 pointer-events-none group-hover:bg-opacity-70">
                <motion.div
                  className="text-center transition-opacity duration-300 opacity-0 pointer-events-auto group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="px-4 mb-4 text-sm text-white">{project.description}</p>
                  <div className="flex justify-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs text-white transition-colors rounded-full bg-white/20 hover:bg-white/30"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs text-white transition-colors rounded-full bg-orange-500/80 hover:bg-orange-500"
                    >
                      Live Demo
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Project Info */}
            <div className="p-6">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>{project.title}</h3>
              <p className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm mb-4 leading-relaxed`}>{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 ${isDark ? 'bg-white/10 text-white/80 border-white/20' : 'bg-gray-200/50 text-gray-700 border-gray-300/50'} text-xs rounded-full border`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-center px-4 py-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20 border-white/20' : 'bg-gray-200/50 text-gray-900 hover:bg-gray-300/50 border-gray-300/50'} text-sm rounded-lg transition-colors border`}
                >
                  View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 text-sm text-center text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-500"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
          )
        })}
      </div>
        </Section>
  )
}
export default ProjectsSection
