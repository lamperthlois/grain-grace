import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div ref={ref} animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 24 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1], delay }}>
      {children}
    </motion.div>
  )
}

export default function Philosophy() {
  return (
    <section className="bg-parchment py-32 px-8 md:px-20 border-b border-ink/8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <div>
          <FadeUp>
            <span className="font-sans text-[0.55rem] tracking-[0.45em] uppercase text-terra block mb-10">
              The work
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display font-bold text-ink leading-[1.05] mb-8" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}>
              Old-school love.<br />Captured forever.
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className="w-14 h-px bg-terra mb-8" />
          </FadeUp>
          <FadeUp delay={0.18}>
            <p className="font-sans font-light text-sepia leading-relaxed mb-4 max-w-[52ch]" style={{ fontSize: '0.9rem' }}>
              Grain &amp; Grace is rooted in a deep love for the old-school — for grain,
              warmth, and the quiet weight of a real moment. Every image is an attempt
              to capture not just what something looked like, but what it <em className="font-normal not-italic text-brown">felt</em> like.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p className="font-sans font-light text-sepia leading-relaxed mb-12 max-w-[52ch]" style={{ fontSize: '0.9rem' }}>
              Cinematic. Organic. Shot with a film mindset — slow, intentional, and always honest.
            </p>
          </FadeUp>
          <FadeUp delay={0.26}>
            <div className="flex flex-wrap gap-3">
              {['Cinematic', 'Organic', 'Film-inspired', 'Timeless'].map(t => (
                <span key={t} className="font-sans text-[0.54rem] tracking-[0.22em] uppercase text-sepia border border-sepia/30 px-4 py-2 hover:border-terra hover:text-terra transition-colors duration-300">
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Pull quote */}
        <FadeUp delay={0.1}>
          <blockquote className="border-l-2 border-terra pl-8">
            <p className="font-elegant italic font-light text-ink/70 leading-relaxed" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}>
              "The texture of afternoon light, the heaviness of a glance, the stillness right before the moment slips away."
            </p>
          </blockquote>
        </FadeUp>

      </div>
    </section>
  )
}
