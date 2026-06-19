import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { shoots } from '../data/photos.js'
import Lightbox from '../components/Lightbox.jsx'
import Footer from '../components/Footer.jsx'

const FILTERS = [
  { key: 'all',       label: 'All' },
  { key: 'solo',      label: 'Solo' },
  { key: 'pregnancy', label: 'Pregnancy' },
  { key: 'family',    label: 'Family' },
  { key: 'couple',    label: 'Couple' },
]

const SLIDE_MS = 6000
const ease = [0.16, 1, 0.3, 1]

function ShootCard({ shoot, onOpen }) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef()
  const barRef  = useRef()
  const timer   = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    )
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  function startBar() {
    const b = barRef.current
    if (!b) return
    b.style.transition = 'none'
    b.style.width = '0%'
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!b) return
      b.style.transition = `width ${SLIDE_MS}ms linear`
      b.style.width = '100%'
    }))
  }

  useEffect(() => {
    if (!visible || hovered || shoot.photos.length <= 1) {
      clearInterval(timer.current)
      if (barRef.current) { barRef.current.style.transition = 'none'; barRef.current.style.width = '0%' }
      return
    }
    startBar()
    timer.current = setInterval(() => {
      setCurrent(c => (c + 1) % shoot.photos.length)
      startBar()
    }, SLIDE_MS)
    return () => clearInterval(timer.current)
  }, [visible, hovered, shoot.photos.length])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '3/4' }}
      onClick={() => onOpen(shoot, current)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.55, ease }}
    >
      {shoot.photos.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <img src={`/${src}`} alt={shoot.label} className="w-full h-full object-cover object-center" />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-all duration-500 group-hover:from-ink/85" />
      <div ref={barRef} className="shoot-bar-el" />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex justify-between items-end">
        <motion.span
          className="font-sans font-light text-parchment/80"
          style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.35 }}
        >
          {shoot.label}
        </motion.span>
        <motion.span
          className="font-sans text-gold/60"
          style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          {shoot.photos.length} photos
        </motion.span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lb, setLb] = useState(null)

  const filtered = shoots.filter(s => filter === 'all' || s.category === filter)

  function openLightbox(shoot, startIdx) { setLb({ images: shoot.photos, index: startIdx }) }
  function closeLightbox() { setLb(null) }
  function prevPhoto() { setLb(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length })) }
  function nextPhoto() { setLb(l => ({ ...l, index: (l.index + 1) % l.images.length })) }

  return (
    <motion.div
      className="min-h-[100dvh] bg-parchment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{   opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="pt-36 pb-10 px-8 md:px-20 border-b border-ink/8">
        <motion.span
          className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-gold block mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          All work
        </motion.span>
        <motion.h1
          className="font-display font-bold text-ink leading-none mb-3"
          style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.05 }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          className="font-sans font-light text-sepia"
          style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Photography by Loïs Lamperth
        </motion.p>
      </div>

      {/* Filter */}
      <div className="px-8 md:px-20 py-6 border-b border-ink/8 flex gap-3 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-sans text-[0.56rem] tracking-[0.28em] uppercase px-5 py-2 border transition-all duration-300 ${
              filter === f.key
                ? 'bg-ink text-parchment border-ink'
                : 'text-sepia border-ink/15 hover:border-ink/40 hover:text-ink'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-8 md:px-20 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {filtered.map((shoot, i) => (
              <motion.div
                key={shoot.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
              >
                <ShootCard shoot={shoot} onOpen={openLightbox} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />

      <AnimatePresence>
        {lb && (
          <Lightbox
            images={lb.images}
            index={lb.index}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
