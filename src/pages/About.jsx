import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'

const ease = [0.16, 1, 0.3, 1]

function FadeUp({ children, delay = 0 }) {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 20 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <motion.div
      className="bg-parchment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{   opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ── 1. Full-bleed portrait ── */}
      <div className="w-full overflow-hidden" style={{ height: '70vh' }}>
        <img
          src="/about me/DSCF5994_VSCO.jpeg"
          alt="Loïs"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── 2. Script greeting + story ── */}
      <section className="bg-parchment py-24 px-8 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-14 items-center">

          {/* Photo */}
          <FadeUp>
            <div className="overflow-hidden">
              <motion.img
                src="/lois/about me.jpg"
                alt="Loïs"
                className="w-full object-cover object-top"
                style={{ height: 'clamp(45vh, 55vw, 68vh)' }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.4, ease }}
              />
            </div>
          </FadeUp>

          {/* Text */}
          <div>
            <FadeUp delay={0.08}>
              <p
                className="font-script text-ink leading-tight mb-8"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}
              >
                Hello there! I am Loïs!<br />Your Netherlands-based photographer :)
              </p>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="font-elegant italic text-ink/55 mb-6 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}>
                Hi, I'm Loïs — the eye behind Grain &amp; Grace.
              </p>
            </FadeUp>

            <FadeUp delay={0.22}>
              <p className="font-sans font-light text-sepia leading-loose mb-5" style={{ fontSize: '0.9rem' }}>
                This space is where I share moments that feel dreamy, genuine, and timeless.
                I'm drawn to natural light and quiet details — the kind of beauty that doesn't
                need to shout to be seen.
              </p>
            </FadeUp>

            <FadeUp delay={0.28}>
              <p className="font-sans font-light text-sepia leading-loose" style={{ fontSize: '0.9rem' }}>
                I shoot with a film mindset: slow, intentional, and always honest. Every photograph
                is an attempt to capture not just what something looked like, but what it{' '}
                <em className="not-italic font-normal text-ink">felt</em> like.
              </p>
            </FadeUp>
          </div>

        </div>
      </section>

      {/* ── 3. Full-bleed photo divider ── */}
      <div className="w-full overflow-hidden" style={{ height: '85vh' }}>
        <img
          src="/about me/DSCF4155.jpeg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── 4. Side-by-side: text left, photo right ── */}
      <section className="bg-parchment py-24 px-8 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <FadeUp>
            <p
              className="font-elegant italic text-ink/70 leading-relaxed text-center md:text-right"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)' }}
            >
              "the kind of beauty<br />that doesn't need<br />to shout to be seen"
            </p>
            <div className="w-8 h-px bg-gold mx-auto md:ml-auto md:mr-0 mt-8 mb-8" />
            <p className="font-sans font-light text-sepia leading-loose text-center md:text-right" style={{ fontSize: '0.88rem' }}>
              Based in the Netherlands, available for any type of shoot —
              portrait, pregnancy, couples, families, and everything in between.
            </p>
            <div className="flex justify-center md:justify-end mt-10">
              <Link
                to="/contact"
                className="font-sans text-[0.56rem] tracking-[0.35em] uppercase text-ink border-b border-ink/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300"
              >
                Inquire about your date
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="overflow-hidden">
              <motion.img
                src="/about me/DSCF5945.jpeg"
                alt="Loïs"
                className="w-full object-cover object-center"
                style={{ height: 'clamp(45vh, 55vw, 65vh)' }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.4, ease }}
              />
            </div>
          </FadeUp>

        </div>
      </section>


      {/* ── 6. CTA ── */}
      <section className="bg-parchment py-24 px-8 text-center">
        <FadeUp>
          <p
            className="font-script text-ink mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Let's create something beautiful
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <Link
            to="/contact"
            className="inline-block font-sans text-[0.58rem] tracking-[0.35em] uppercase text-parchment bg-ink px-10 py-3.5 hover:bg-brown transition-colors duration-400"
          >
            Inquire about your date
          </Link>
        </FadeUp>
      </section>

      <Footer />
    </motion.div>
  )
}
