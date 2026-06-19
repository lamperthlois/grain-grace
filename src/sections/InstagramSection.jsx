import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { igGridPhotos } from '../data/photos.js'

const IG_URL = 'https://www.instagram.com/graingracephotography?igsh=MXdkMWZ6NHU2eXQ2ag=='
const ease = [0.16, 1, 0.3, 1]

/* ── Animated Instagram card ─────────────────────────── */
function IgCard() {
  const cardRef    = useRef()
  const cursorRef  = useRef()
  const btnRef     = useRef()
  const [following, setFollowing] = useState(false)
  const [cardVis,   setCardVis]   = useState(false)
  const cursorCtrl = useAnimation()

  // Fade card in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCardVis(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  // Run cursor animation loop once card is visible
  useEffect(() => {
    if (!cardVis) return
    let cancelled = false

    async function loop() {
      while (!cancelled) {
        // 1. start hidden, off to the right
        await cursorCtrl.set({ opacity: 0, x: 120, y: 60 })
        await new Promise(r => setTimeout(r, 800))

        // 2. fade in
        await cursorCtrl.start({ opacity: 1, transition: { duration: 0.3 } })

        // 3. move to button
        if (btnRef.current && cardRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect()
          const btnRect  = btnRef.current.getBoundingClientRect()
          const tx = btnRect.left - cardRect.left + btnRect.width  / 2 - 8
          const ty = btnRect.top  - cardRect.top  + btnRect.height / 2 - 8
          await cursorCtrl.start({
            x: tx, y: ty,
            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
          })
        }

        // 4. click shrink
        await cursorCtrl.start({ scale: 0.8, transition: { duration: 0.1 } })
        await new Promise(r => setTimeout(r, 80))
        await cursorCtrl.start({ scale: 1,   transition: { duration: 0.15 } })

        // 5. toggle state
        if (!cancelled) setFollowing(true)
        await new Promise(r => setTimeout(r, 1800))

        // 6. fade cursor out
        await cursorCtrl.start({ opacity: 0, transition: { duration: 0.4 } })
        await new Promise(r => setTimeout(r, 600))

        // 7. reset
        if (!cancelled) setFollowing(false)
        await new Promise(r => setTimeout(r, 1200))
      }
    }

    loop()
    return () => { cancelled = true }
  }, [cardVis, cursorCtrl])

  return (
    <div ref={cardRef} className={`ig-live-card mx-auto${cardVis ? ' visible' : ''}`}>

      {/* Browser bar */}
      <div className="ig-browser-bar">
        <div className="ig-browser-dots">
          <span style={{ background: '#f87171' }} />
          <span style={{ background: '#fbbf24' }} />
          <span style={{ background: '#4ade80' }} />
        </div>
        <span className="ig-browser-url">instagram.com/graingracephotography</span>
      </div>

      {/* Page */}
      <div className="ig-page">
        <div className="ig-page-nav">
          <span className="ig-wordmark">Instagram</span>
        </div>

        {/* Profile row */}
        <div className="ig-profile-row">
          <div className="ig-profile-pic">
            <img src="/lois/lois 1.jpg" alt="profile" />
          </div>
          <div className="ig-profile-details">
            <div className="ig-username">graingracephotography</div>
            <div className="ig-fullname">Grain &amp; Grace · Photography</div>
            <div className="ig-stats-row">
              <span><b>47</b> posts</span>
              <span><b>1.2k</b> followers</span>
              <span><b>312</b> following</span>
            </div>
            <div className="ig-bio">
              film-minded · warm light · honest moments<br />
              <b>🇳🇱 Netherlands</b>
            </div>
            <button
              ref={btnRef}
              className={`ig-follow-btn${following ? ' following' : ''}`}
            >
              {following ? 'Following ✓' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="ig-grid">
          {igGridPhotos.map(src => (
            <img key={src} src={`/${src}`} alt="" />
          ))}
        </div>
      </div>

      {/* Animated cursor */}
      <motion.svg
        ref={cursorRef}
        className="ig-cursor"
        animate={cursorCtrl}
        width="22" height="26"
        viewBox="0 0 22 26"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 30 }}
      >
        <path d="M1 1l7 18 3.5-4.5 5.5 7 2-1.5-5.5-7 5.5-1.5z" fill="white" stroke="#333" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.svg>
    </div>
  )
}

/* ── Main section ─────────────────────────────────────── */
export default function InstagramSection() {
  const ref = useRef()
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-parchment py-16 md:py-24 px-8 md:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.span
            className="font-sans text-[0.52rem] tracking-[0.5em] uppercase text-gold block mb-4"
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 10 }}
            transition={{ duration: 0.8, ease }}
          >
            Instagram
          </motion.span>
          <motion.h2
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 14 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
          >
            See the latest
          </motion.h2>
          <motion.p
            className="font-sans font-light text-sepia"
            style={{ fontSize: '0.82rem' }}
            animate={{ opacity: vis ? 1 : 0 }}
            transition={{ duration: 0.8, ease, delay: 0.16 }}
          >
            @graingracephotography
          </motion.p>
        </div>

        {/* 6-photo grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-12">
          {igGridPhotos.map((src, i) => (
            <motion.a
              key={src}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group block"
              style={{ aspectRatio: '1' }}
              animate={{ opacity: vis ? 1 : 0, scale: vis ? 1 : 0.96 }}
              transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.07 }}
            >
              <img
                src={`/${src}`}
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-all duration-400 flex items-center justify-center">
                <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 10 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
        >
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-[0.58rem] tracking-[0.35em] uppercase text-ink border border-ink/25 px-10 py-3 hover:bg-ink hover:text-parchment transition-all duration-500"
          >
            Follow on Instagram
          </a>
        </motion.div>

        {/* Animated IG card */}
        <motion.div
          animate={{ opacity: vis ? 1 : 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
        >
          <IgCard />
        </motion.div>

      </div>
    </section>
  )
}
