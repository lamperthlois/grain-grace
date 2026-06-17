import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const ease = [0.16, 1, 0.3, 1]

// Pages that start with a dark/photo background
const DARK_HERO_PAGES = ['/', '/about', '/contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location  = useLocation()
  const hasDarkHero = DARK_HERO_PAGES.includes(location.pathname)
  const overPhoto   = hasDarkHero && !scrolled

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[200] flex justify-between items-center px-8 md:px-14 py-5"
      animate={{
        backgroundColor: scrolled ? 'rgba(245,237,219,0.96)' : 'rgba(0,0,0,0)',
        backdropFilter:  scrolled ? 'blur(14px)' : 'blur(0px)',
        borderBottom:    scrolled ? '1px solid rgba(28,13,4,0.08)' : '1px solid transparent',
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo — bigger */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      >
        <Link to="/" className="flex items-baseline gap-1">
          <span className={`font-display font-bold uppercase text-[1rem] tracking-[0.18em] transition-colors duration-400 ${overPhoto ? 'text-parchment' : 'text-ink'}`}>
            Grain &amp;
          </span>
          <span className={`font-elegant italic font-light text-[1.45rem] leading-none transition-colors duration-400 ${overPhoto ? 'text-parchment' : 'text-ink'}`}>
            Grace
          </span>
        </Link>
      </motion.div>

      {/* Nav links */}
      <nav className="flex items-center gap-7 md:gap-9">
        {LINKS.map((link, i) => {
          const active = location.pathname === link.href
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.07 }}
            >
              <Link
                to={link.href}
                className={`line-draw font-sans text-[0.6rem] tracking-[0.22em] uppercase transition-colors duration-400 ${
                  active
                    ? overPhoto ? 'text-parchment' : 'text-ink'
                    : overPhoto
                      ? 'text-gold/90 hover:text-gold'
                      : 'text-sepia hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </motion.header>
  )
}
