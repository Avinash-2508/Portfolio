import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import useScrollAnimation from './useScrollAnimation'
// ...existing code for ThreeScene, ScrollBasedCube, ScrollBasedParticles...

const ParticleSphere = () => {
  const points = useRef()
  const particles = 500
  const positions = new Float32Array(particles * 3)
  
  for (let i = 0; i < particles; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    points.current.rotation.x = state.clock.getElapsedTime() * 0.1
    points.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#ffffff" 
        size={0.02} 
        sizeAttenuation 
        transparent
        opacity={0.6}
      />
    </points>
  )
}


const ScrollBasedParticles = ({ scrollY }) => {
  const points = useRef()
  const group = useRef()
  const particles = 300
  const positions = new Float32Array(particles * 3)
  
  for (let i = 0; i < particles; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 15
    positions[i3 + 1] = (Math.random() - 0.5) * 15
    positions[i3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state) => {
    if (points.current && group.current) {
      // Base rotation
      points.current.rotation.x = state.clock.getElapsedTime() * 0.1
      points.current.rotation.y = state.clock.getElapsedTime() * 0.15
      
      // Scroll-based movement
      const scrollFactor = scrollY / 2000
      group.current.position.z = scrollFactor * 5
      group.current.rotation.x = scrollFactor * Math.PI
      
      // Dynamic opacity based on scroll
      const opacity = 0.3 + Math.sin(scrollFactor * Math.PI) * 0.3
      points.current.material.opacity = opacity
    }
  })

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#ffffff" 
          size={0.02} 
          sizeAttenuation 
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  )
}

const ScrollBasedCube = ({ scrollY, scrollDirection }) => {
  const mesh = useRef()
  const group = useRef()
  
  useFrame((state) => {
    if (mesh.current && group.current) {
      // Base rotation
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5
      
      // Scroll-based transformations
      const scrollFactor = scrollY / 1000
      group.current.position.y = Math.sin(scrollFactor) * 2
      group.current.position.x = Math.cos(scrollFactor) * 1
      group.current.rotation.z = scrollFactor * 0.5
      
      // Scale based on scroll direction
      const scaleFactor = scrollDirection === 'down' ? 1 + scrollFactor * 0.2 : 1 - scrollFactor * 0.1
      group.current.scale.setScalar(scaleFactor)
    }
  })
  
  return (
    <group ref={group}>
      <mesh ref={mesh} position={[0, 0, -2]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          wireframe 
          opacity={0.1 + (scrollY / 2000) * 0.1} 
          transparent 
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  )
}
const ThreeScene = () => {
  const { scrollY, scrollDirection } = useScrollAnimation()
  
  return (
    <Canvas
      className="fixed top-0 left-0 w-full h-full -z-10"
      camera={{ position: [0, 0, 8], fov: 75 }}
      gl={{ alpha: true, antialias: true }}
      style={{height:'70px'}}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={null}>
        <ScrollBasedCube scrollY={scrollY} scrollDirection={scrollDirection} />
        <ScrollBasedParticles scrollY={scrollY} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
export default ThreeScene
