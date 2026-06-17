import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 28 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section className="bg-paper overflow-hidden border-b border-ink/8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[80vh]">

        {/* Photo side */}
        <div className="relative overflow-hidden min-h-[65vw] md:min-h-0">
          <motion.img
            src="/lois/lois 1.jpg"
            alt="Loïs Lamperth"
            className="absolute inset-0 w-full h-full object-cover object-center"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Subtle warm gradient bleeding into text side */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paper/20 pointer-events-none" />
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 bg-paper">
          <FadeUp>
            <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-terra block mb-8">
              About
            </span>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2
              className="font-display font-bold text-ink leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
            >
              The eye behind<br />Grain &amp; Grace
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="w-12 h-px bg-terra mb-8" />
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-sans font-light text-sepia leading-relaxed mb-5" style={{ fontSize: '0.9rem' }}>
              Hi, I'm Loïs — the eye behind Grain &amp; Grace.
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="font-sans font-light text-sepia leading-relaxed mb-5" style={{ fontSize: '0.9rem' }}>
              This space is where I share moments that feel dreamy, genuine,
              and timeless. I'm drawn to natural light, quiet details — the kind
              of beauty that doesn't need to shout to be seen.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="font-sans font-light text-sepia leading-relaxed mb-12" style={{ fontSize: '0.9rem' }}>
              Photography, to me, is about preserving moments and the feeling
              and the textures within them. Grain &amp; Grace is my way of telling
              those stories, one frame at a time.
            </p>
          </FadeUp>

          <FadeUp delay={0.35}>
            <Link
              to="/gallery"
              className="inline-block font-sans text-[0.58rem] tracking-[0.35em] uppercase text-ink border border-ink/30 px-7 py-3 hover:bg-ink hover:text-parchment transition-all duration-500 w-fit"
            >
              View Portfolio
            </Link>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}
