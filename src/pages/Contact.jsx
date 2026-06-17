import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Footer from '../components/Footer.jsx'
import { igGridPhotos } from '../data/photos.js'

function IgCard() {
  const cardRef    = useRef()
  const cursorRef  = useRef()
  const btnRef     = useRef()
  const [following, setFollowing] = useState(false)
  const [cardVis,   setCardVis]   = useState(false)
  const cursorCtrl = useAnimation()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCardVis(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (cardRef.current) obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!cardVis) return
    let cancelled = false

    async function loop() {
      while (!cancelled) {
        await cursorCtrl.set({ opacity: 0, x: 120, y: 60 })
        await new Promise(r => setTimeout(r, 800))
        await cursorCtrl.start({ opacity: 1, transition: { duration: 0.3 } })

        if (btnRef.current && cardRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect()
          const btnRect  = btnRef.current.getBoundingClientRect()
          const tx = btnRect.left - cardRect.left + btnRect.width  / 2 - 8
          const ty = btnRect.top  - cardRect.top  + btnRect.height / 2 - 8
          await cursorCtrl.start({ x: tx, y: ty, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } })
        }

        await cursorCtrl.start({ scale: 0.8, transition: { duration: 0.1 } })
        await new Promise(r => setTimeout(r, 80))
        await cursorCtrl.start({ scale: 1,   transition: { duration: 0.15 } })

        if (!cancelled) setFollowing(true)
        await new Promise(r => setTimeout(r, 1800))
        await cursorCtrl.start({ opacity: 0, transition: { duration: 0.4 } })
        await new Promise(r => setTimeout(r, 600))
        if (!cancelled) setFollowing(false)
        await new Promise(r => setTimeout(r, 1200))
      }
    }

    loop()
    return () => { cancelled = true }
  }, [cardVis, cursorCtrl])

  return (
    <div ref={cardRef} className={`ig-live-card${cardVis ? ' visible' : ''}`}>
      <div className="ig-browser-bar">
        <div className="ig-browser-dots">
          <span style={{ background: '#f87171' }} />
          <span style={{ background: '#fbbf24' }} />
          <span style={{ background: '#4ade80' }} />
        </div>
        <span className="ig-browser-url">instagram.com/graingracephotography</span>
      </div>
      <div className="ig-page">
        <div className="ig-page-nav">
          <span className="ig-wordmark">Instagram</span>
        </div>
        <div className="ig-profile-row">
          <div className="ig-profile-pic">
            <img src="/about me/DSCF5994_VSCO.jpeg" alt="profile" />
          </div>
          <div className="ig-profile-details">
            <div className="ig-username">graingracephotography</div>
            <div className="ig-fullname">Grain &amp; Grace Photography</div>
            <div className="ig-stats-row">
              <span><b>10</b> posts</span>
              <span><b>64</b> followers</span>
              <span><b>2</b> following</span>
            </div>
            <div className="ig-bio">
              Photographer<br />
              oldschool love &amp; love for oldschool<br />
              based in the Netherlands<br />
              dm me for more info :)
            </div>
            <button ref={btnRef} className={`ig-follow-btn${following ? ' following' : ''}`}>
              {following ? 'Following ⌄' : 'Follow'}
            </button>
          </div>
        </div>
        <div className="ig-grid">
          {igGridPhotos.map(src => (
            <img key={src} src={`/${src}`} alt="" />
          ))}
        </div>
      </div>
      <motion.svg
        ref={cursorRef}
        animate={cursorCtrl}
        width="22" height="26" viewBox="0 0 22 26" fill="none"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 30 }}
      >
        <path d="M1 1l7 18 3.5-4.5 5.5 7 2-1.5-5.5-7 5.5-1.5z" fill="white" stroke="#333" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.svg>
    </div>
  )
}

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
      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 24 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function Field({ label, id, type = 'text', placeholder, required, textarea, brown }) {
  const labelCls = brown
    ? 'font-sans text-[0.52rem] tracking-[0.32em] uppercase text-parchment/50'
    : 'font-sans text-[0.52rem] tracking-[0.32em] uppercase text-sepia/70'
  const inputCls = brown
    ? 'bg-transparent border-b border-parchment/20 text-parchment font-sans font-light placeholder-parchment/30 px-0 py-3 outline-none focus:border-gold/60 transition-colors duration-300 w-full'
    : 'bg-transparent border-b border-ink/20 text-ink font-sans font-light placeholder-muted/40 px-0 py-3 outline-none focus:border-gold/60 transition-colors duration-300 w-full'

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          id={id} name={id} placeholder={placeholder} required={required} rows={5}
          className={`${inputCls} resize-none`}
          style={{ fontSize: '0.85rem' }}
        />
      ) : (
        <input
          id={id} name={id} type={type} placeholder={placeholder} required={required}
          className={inputCls}
          style={{ fontSize: '0.85rem' }}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [sent,    setSent]    = useState(false)
  const [sending, setSending] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      e.target.reset()
      setTimeout(() => setSent(false), 6000)
    }, 1000)
  }

  return (
    <motion.div
      className="bg-parchment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{   opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ── Dark hero — photo, no fade ── */}
      <div className="relative flex items-center justify-center overflow-hidden bg-ink" style={{ minHeight: '80vh' }}>
        <img
          src="/background/DSCF5857.JPG"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45, objectPosition: 'center 20%' }}
        />
        {/* Edge vignette only — no bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,5,0,0.55) 100%)' }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <motion.div
            className="w-8 h-px bg-gold/60 mb-7"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          />
          <motion.h1
            className="font-elegant italic font-light text-parchment leading-none mb-5"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            Get in touch
          </motion.h1>
          <motion.p
            className="font-sans text-[0.56rem] tracking-[0.4em] uppercase text-gold/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            let's create together
          </motion.p>
        </div>
      </div>

      {/* ── Full-width dark form band ── */}
      <section className="relative bg-ink overflow-hidden">
        {/* Organic warm glow accents */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 50% 80% at 0% 50%, rgba(200,146,42,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 100% 30%, rgba(181,66,10,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,146,42,0.06) 0%, transparent 70%)
          `
        }} />
        {/* Subtle grain texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-20 py-28 grid md:grid-cols-2 gap-20 lg:gap-32 items-start">

          {/* Left — form */}
          <FadeUp delay={0.1}>
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-px bg-gold/40" />
                <span className="font-sans text-[0.52rem] tracking-[0.45em] uppercase text-gold/70">
                  Send a message
                </span>
              </div>
              <h2
                className="font-elegant italic font-light text-parchment mb-14 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
              >
                Tell me about<br />your moment
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-9">
                <Field id="name"    label="Your name"     placeholder="e.g. Anna de Vries"             required brown />
                <Field id="email"   label="Email address" placeholder="hello@youremail.com" type="email" required brown />
                <Field id="subject" label="Subject"       placeholder="Shoot inquiry, collaboration…"   brown />
                <Field id="message" label="Message"       placeholder="Tell me a bit about what you have in mind…" required textarea brown />

                <div className="flex items-center gap-6 pt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="relative font-sans text-[0.58rem] tracking-[0.35em] uppercase text-ink bg-gold/90 px-10 py-4 overflow-hidden hover:bg-gold transition-colors duration-500 disabled:opacity-60"
                    style={{ borderRadius: '2px' }}
                  >
                    {sending ? 'Sending…' : 'Send message'}
                  </button>
                  {sent && (
                    <motion.p
                      className="font-sans text-[0.58rem] tracking-[0.12em] text-gold"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Thank you — I'll be in touch soon.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </FadeUp>

          {/* Right — connect + IG */}
          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-12 md:pt-6">

              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-px bg-gold/40" />
                  <span className="font-sans text-[0.52rem] tracking-[0.45em] uppercase text-gold/70">
                    Connect
                  </span>
                </div>
                <p className="font-sans font-light text-parchment/60 leading-loose mb-6" style={{ fontSize: '0.87rem' }}>
                  The quickest way to reach me is through Instagram. I'm always
                  open to new shoots, collaborations, or just a friendly hello.
                </p>
                <a
                  href="https://www.instagram.com/graingracephotography?igsh=MXdkMWZ6NHU2eXQ2ag=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-sans text-[0.56rem] tracking-[0.3em] uppercase text-gold/80 border-b border-gold/25 pb-1 hover:border-gold hover:text-gold transition-all duration-300 mb-10"
                >
                  @graingracephotography
                </a>
                <IgCard />
              </div>

              <div className="w-full h-px bg-parchment/8" />

              <div>
                <span className="font-sans text-[0.52rem] tracking-[0.45em] uppercase text-gold/70 block mb-4">
                  Based in
                </span>
                <p className="font-elegant italic text-parchment/50 leading-none" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                  The Netherlands
                </p>
              </div>

            </div>
          </FadeUp>

        </div>
      </section>

      <Footer />
    </motion.div>
  )
}
