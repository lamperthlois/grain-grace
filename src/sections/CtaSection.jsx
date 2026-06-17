import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ease = [0.16, 1, 0.3, 1]

function useReveal(threshold = 0.15) {
  const ref = useRef()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

export default function CtaSection() {
  const [ref, vis] = useReveal(0.1)

  return (
    <section ref={ref} className="bg-parchment overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12 md:gap-0">

        {/* Left — text + button */}
        <div className="md:w-[38%] flex-shrink-0 flex flex-col items-start">
          <motion.h2
            className="font-elegant italic font-light text-ink leading-[1.15] mb-10"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 24 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            let's capture<br />your story
          </motion.h2>

          <motion.div
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 16 }}
            transition={{ duration: 0.9, ease, delay: 0.28 }}
          >
            <Link
              to="/contact"
              className="font-sans text-[0.58rem] tracking-[0.32em] uppercase text-ink border border-ink/40 px-10 py-4 hover:bg-ink hover:text-parchment transition-all duration-500 inline-block"
            >
              Click here to inquire
            </Link>
          </motion.div>
        </div>

        {/* Right — two floating photos */}
        <div className="md:w-[62%] relative flex items-start justify-center" style={{ height: 'clamp(380px, 55vw, 620px)' }}>

          {/* Large photo — center, taller */}
          <motion.div
            className="absolute overflow-hidden shadow-lg"
            style={{ width: '46%', top: 0, left: '16%', height: '100%' }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 28 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <motion.img
              src="/couple/levi & kris/d985ca49-06ba-4a06-8218-1b71859687a6.jpeg"
              alt=""
              className="w-full h-full object-cover object-center"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.3, ease }}
            />
          </motion.div>

          {/* Smaller photo — right, offset lower */}
          <motion.div
            className="absolute overflow-hidden shadow-lg"
            style={{ width: '32%', top: '12%', right: '0%', height: '76%' }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 36 }}
            transition={{ duration: 1, ease, delay: 0.28 }}
          >
            <motion.img
              src="/solo/solo shoot 1/solo 3.jpeg"
              alt=""
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.3, ease }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
