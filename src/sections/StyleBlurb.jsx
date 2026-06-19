import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1]

function FadeUp({ children, delay = 0 }) {
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
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 20 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

const LINKS = [
  { label: 'Learn more about me',    to: '/about' },
  { label: 'Explore my portfolio',   to: '/gallery' },
  { label: 'Inquire about your date', to: '/contact' },
]

export default function StyleBlurb() {
  return (
    <section className="overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-0 md:min-h-[85vh]">

        {/* Left — portrait photo */}
        <div className="relative overflow-hidden min-h-[110vw] md:min-h-0">
          <motion.img
            src="/lois/lois 1.jpg"
            alt="Loïs Lamperth"
            className="absolute inset-0 w-full h-full object-cover object-top"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 1.4, ease }}
          />
        </div>

        {/* Right — warm panel */}
        <div className="bg-parchment flex flex-col justify-center px-12 md:px-16 lg:px-20 py-20">

          {/* Script greeting */}
          <FadeUp>
            <p
              className="font-elegant italic text-gold/80 mb-2 leading-none"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              Hello there,
            </p>
          </FadeUp>

          {/* Big name */}
          <FadeUp delay={0.08}>
            <h2
              className="font-display font-medium text-ink leading-none mb-8 uppercase"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.01em' }}
            >
              I'm Loïs
            </h2>
          </FadeUp>

          {/* Description */}
          <FadeUp delay={0.16}>
            <p
              className="font-sans text-sepia leading-loose mb-10 max-w-[38ch]"
              style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              I'm a Netherlands based photographer here to capture
              your authentic moments in a cinematic, old-school style.
            </p>
          </FadeUp>

          {/* + Links */}
          <div className="flex flex-col gap-0">
            {LINKS.map(({ label, to }, i) => (
              <FadeUp key={to} delay={0.22 + i * 0.08}>
                <Link
                  to={to}
                  className="group flex items-center gap-4 py-4 border-b border-ink/10 hover:border-ink/30 transition-colors duration-300"
                >
                  <span className="font-sans text-sepia/60 group-hover:text-ink transition-colors duration-300 text-base leading-none">+</span>
                  <span
                    className="font-sans text-ink/70 group-hover:text-ink transition-colors duration-300 tracking-[0.18em] uppercase"
                    style={{ fontSize: '0.62rem' }}
                  >
                    {label}
                  </span>
                </Link>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
