import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const active = images[index]

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowLeft')  onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  /* Touch swipe */
  let touchX = 0
  const onTouchStart = (e) => { touchX = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    const delta = touchX - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) delta > 0 ? onNext() : onPrev()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{   opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-7 right-8 z-10 text-warm/60 hover:text-warm transition-colors text-2xl leading-none font-light"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Counter */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 font-mono text-[0.55rem] tracking-[0.3em] text-muted">
        {index + 1} &nbsp;/&nbsp; {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 z-10 text-warm/50 hover:text-warm transition-colors text-2xl px-3 py-6"
        aria-label="Previous"
      >
        &#8592;
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={active}
          src={`/${active}`}
          alt=""
          className="max-w-[90vw] max-h-[88vh] object-contain select-none"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-10 text-warm/50 hover:text-warm transition-colors text-2xl px-3 py-6"
        aria-label="Next"
      >
        &#8594;
      </button>
    </motion.div>
  )
}
