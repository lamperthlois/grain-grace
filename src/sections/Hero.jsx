import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroPhotos } from '../data/photos.js'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    if (heroPhotos.length <= 1) return
    const id = setInterval(() => setPhotoIndex(i => (i + 1) % heroPhotos.length), 9000)
    return () => clearInterval(id)
  }, [])

  function prev() { setPhotoIndex(i => (i - 1 + heroPhotos.length) % heroPhotos.length) }
  function next() { setPhotoIndex(i => (i + 1) % heroPhotos.length) }

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center bg-ink">

      <AnimatePresence mode="sync">
        <motion.div
          key={photoIndex}
          className="absolute inset-0"
          initial={{ opacity: photoIndex === 0 ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <motion.img
            src={`/${heroPhotos[photoIndex].src}`}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: heroPhotos[photoIndex].position || 'center', willChange: 'transform' }}
            initial={{ scale: photoIndex === 0 ? 1.0 : 1.04 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 11, ease: 'linear' }}
            fetchPriority={photoIndex === 0 ? 'high' : 'low'}
            loading={photoIndex === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-ink/30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, rgba(10,5,0,0.45) 100%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.p
          className="font-elegant italic font-light text-gold/90 leading-relaxed"
          style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.9rem)', letterSpacing: '0.02em' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease, delay: 0.7 }}
        >
          the kind of beauty that doesn't need to shout to be seen
        </motion.p>
      </div>

      {heroPhotos.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous photo"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-parchment/50 hover:text-parchment transition-colors duration-300">
            <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
              <line x1="36" y1="6" x2="2" y2="6" stroke="currentColor" strokeWidth="1"/>
              <polyline points="8,1 2,6 8,11" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </button>
          <button onClick={next} aria-label="Next photo"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-parchment/50 hover:text-parchment transition-colors duration-300">
            <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
              <line x1="0" y1="6" x2="34" y2="6" stroke="currentColor" strokeWidth="1"/>
              <polyline points="28,1 34,6 28,11" stroke="currentColor" strokeWidth="1" fill="none"/>
            </svg>
          </button>
        </>
      )}

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div className="w-px bg-parchment/25 origin-top"
          initial={{ height: 0 }} animate={{ height: 40 }}
          transition={{ delay: 2.4, duration: 1, ease: 'easeOut' }}
        />
      </motion.div>

    </section>
  )
}
