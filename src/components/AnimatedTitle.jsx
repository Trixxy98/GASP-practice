import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SET INITIAL STATE
      gsap.set('.animated-word', {
        opacity: 0,
        transform: 'translate3d(0, 100%, 0) rotateY(10deg) rotateX(10deg)', 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.out',
        stagger: 0.04,
      })
    }, containerRef)

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass || ''}`}>
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
          {line.split(' ').map((word, i) => (
            <span key={i} className="inline-block overflow-hidden"> 
              <span
                className="animated-word inline-block" 
                dangerouslySetInnerHTML={{ __html: word }}
              />
              {i < line.split(' ').length - 1 && ' '}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle