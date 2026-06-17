import { motion } from 'framer-motion'
import Hero             from '../sections/Hero.jsx'
import WorkTeaser       from '../sections/WorkTeaser.jsx'
import StyleBlurb       from '../sections/StyleBlurb.jsx'
import CtaSection       from '../sections/CtaSection.jsx'
import InstagramSection from '../sections/InstagramSection.jsx'
import Footer           from '../components/Footer.jsx'

function Divider() {
  return (
    <div className="flex items-center justify-center px-8 py-2">
      <div className="flex-1 h-px bg-gold/20" />
      <span className="mx-5 text-gold/35 text-[0.55rem] tracking-[0.4em] uppercase font-sans">g&g</span>
      <div className="flex-1 h-px bg-gold/20" />
    </div>
  )
}

export default function Home() {
  return (
    <motion.div
      className="bg-parchment"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <WorkTeaser />
      <Divider />
      <StyleBlurb />
      <Divider />
      <CtaSection />
      <Divider />
      <InstagramSection />
      <Footer />
    </motion.div>
  )
}
