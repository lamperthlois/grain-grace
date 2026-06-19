const STRIP_PHOTOS = [
  'solo/solo shoot 5/DSCF7114.jpg',
  'solo/solo shoot 5/DSCF7258.jpg',
  'pregnancy/nadia/pregnancy 1.JPG',
  'solo/solo shoot 2/solo 12.jpeg',
  'family/Bijlards/family 1.JPG',
  'solo/solo shoot 7/DSCF0432.jpg',
  'pregnancy/nadia/pregnancy 4.jpeg',
  'solo/solo shoot 4/solo 20.JPG',
  'solo/solo shoot 3/solo 18.JPG',
  'family/Samuels/IMG_2100.jpg',
  'solo/solo shoot 6/DSCF0197.jpg',
  'pregnancy/nadia/pregnancy 2.jpeg',
]

export default function PhotoStrip({ bg = '#0d0906', reverse = false }) {
  const doubled = [...STRIP_PHOTOS, ...STRIP_PHOTOS]

  return (
    <div className="overflow-hidden py-5" style={{ background: bg }}>
      <div
        className={`flex gap-4 ${reverse ? 'marquee-reverse' : 'marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden"
            style={{ width: '200px', aspectRatio: '3/4' }}
          >
            <img
              src={`/${src}`}
              alt=""
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
