import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)
  const { y: currentScrollY } = useWindowScroll()

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true)
      setIsScrolled(false)
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsNavVisible(false)
      setIsScrolled(true)
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true)
      setIsScrolled(true)
    }
    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [isNavVisible])

  const toggleAudio = () => {
    const newState = !isAudioPlaying
    setIsAudioPlaying(newState)
    
    if (newState) {
      audioElementRef.current?.play().catch(error => {
        console.error('Audio play failed:', error)
        setIsAudioPlaying(false)
      })
    } else {
      audioElementRef.current?.pause()
    }
  }

  return (
    <div 
      ref={navContainerRef} 
      className={`fixed inset-x-4 top-4 z-50 h-16 transition-all duration-300 md:inset-x-6 ${
        isScrolled ? 'floating-nav border-hsla' : ''
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4">
          <div className="flex items-center gap-7">
            <img 
              src="/img/logo.png" 
              alt="logo" 
              className="w-10"
            />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 hidden md:flex items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:flex items-center">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button className="md:hidden ml-6 p-2 text-white/90">
              <div className="w-6 h-0.5 bg-white/90 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white/90 mb-1.5"></div>
              <div className="w-4 h-0.5 bg-white/90"></div>
            </button>

            <button 
              className="ml-6 md:ml-10 flex items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-white/10"
              onClick={toggleAudio}
              aria-label={isAudioPlaying ? 'Pause audio' : 'Play audio'}
            >
              <audio 
                ref={audioElementRef}
                className="hidden" 
                src="/audio/loop.mp3" 
                loop 
                preload="metadata"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div 
                  key={bar}
                  className={`indicator-line ${isAudioPlaying ? 'active' : ''}`}
                  style={{
                    animationDelay: isAudioPlaying ? `${bar * 0.15}s` : '0s'
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar