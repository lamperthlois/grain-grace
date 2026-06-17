const IG = 'https://www.instagram.com/graingracephotography?igsh=MXdkMWZ6NHU2eXQ2ag=='

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-ink/8 py-14 px-8 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <p className="font-elegant italic font-light text-ink text-xl tracking-wide">
          Grain <span className="not-italic font-extralight text-gold">&amp;</span> Grace
        </p>

        <a
          href={IG}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-sepia hover:text-gold transition-colors duration-300"
        >
          @graingracephotography
        </a>

        <p className="font-sans text-[0.52rem] tracking-[0.2em] uppercase text-muted">
          &copy; 2025 Loïs Lamperth &mdash; All rights reserved
        </p>

      </div>
    </footer>
  )
}
