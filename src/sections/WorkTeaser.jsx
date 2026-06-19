import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1]

const TEASER_PHOTOS = [
  'solo/solo shoot 5/DSCF7258.jpg',
  'family/Samuels/IMG_2108.JPG',
  'pregnancy/nadia/pregnancy 1.JPG',
  'family/Bijlards/DSCF5599.jpeg',
]

function RevealPhoto({ src, delay, className, position = 'center' }) {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 32 }}
      transition={{ duration: 1.1, ease, delay }}
    >
      <motion.img
        src={`/${src}`}
        alt=""
        className="w-full h-full object-cover"
        style={{ objectPosition: position }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 1.2, ease }}
      />
    </motion.div>
  )
}

export default function WorkTeaser() {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 px-8 md:px-20">
      <div ref={ref} className="max-w-6xl mx-auto mb-12 flex items-end justify-between flex-wrap gap-4">
        <div>
          <motion.span
            className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-gold block mb-3"
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 10 }}
            transition={{ duration: 0.8, ease }}
          >
            Selected work
          </motion.span>
          <motion.h2
            className="font-display font-medium text-ink leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 16 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
          >
            Moments in film
          </motion.h2>
        </div>
        <motion.div
          animate={{ opacity: vis ? 1 : 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <Link
            to="/gallery"
            className="font-sans text-[0.56rem] tracking-[0.3em] uppercase text-sepia hover:text-ink border-b border-sepia/40 hover:border-ink pb-px transition-all duration-300"
          >
            View full portfolio →
          </Link>
        </motion.div>
      </div>

      {/* Desktop: masonry grid */}
      <div className="max-w-6xl mx-auto hidden md:grid grid-cols-12 grid-rows-2 gap-3" style={{ height: 'clamp(400px, 65vw, 680px)' }}>
        <RevealPhoto src={TEASER_PHOTOS[0]} delay={0.1}  className="col-span-5 row-span-2" />
        <RevealPhoto src={TEASER_PHOTOS[1]} delay={0.18} className="col-span-4 row-span-1" position="center 70%" />
        <RevealPhoto src={TEASER_PHOTOS[2]} delay={0.24} className="col-span-3 row-span-1" />
        <RevealPhoto src={TEASER_PHOTOS[3]} delay={0.3}  className="col-span-7 row-span-1" position="center 62%" />
      </div>
      {/* Mobile: stacked two-column */}
      <div className="max-w-6xl mx-auto grid md:hidden grid-cols-2 gap-3">
        <RevealPhoto src={TEASER_PHOTOS[0]} delay={0.1}  className="col-span-1 aspect-[3/4]" />
        <RevealPhoto src={TEASER_PHOTOS[1]} delay={0.18} className="col-span-1 aspect-[3/4]" position="center 70%" />
        <RevealPhoto src={TEASER_PHOTOS[2]} delay={0.24} className="col-span-1 aspect-[3/4]" />
        <RevealPhoto src={TEASER_PHOTOS[3]} delay={0.3}  className="col-span-1 aspect-[3/4]" position="center 62%" />
      </div>
    </section>
  )
}
