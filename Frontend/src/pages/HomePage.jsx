import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { icon: '🚗', title: 'Wide Selection',  desc: 'Hatchbacks, sedans, SUVs, and EVs — all in one place.' },
  { icon: '📅', title: 'Instant Booking', desc: 'Pick your dates, confirm in seconds. No paperwork.' },
  { icon: '💰', title: 'Best Prices',     desc: 'Transparent daily rates. No hidden charges.' },
]

export default function HomePage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="animate-fade-in">

      {/* ── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark-800 border-b border-dark-700">
        {/* Decorative gradient blob */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/8
                          rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-500/5
                          rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20
                          text-brand-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-6
                          animate-slide-up">
            🇮🇳 Available across India
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl
                         leading-tight mb-6 animate-slide-up"
              style={{ animationDelay: '60ms' }}>
            Rent a car.<br />
            <span className="text-brand-500">Drive anywhere.</span>
          </h1>

          <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto mb-10
                        animate-slide-up" style={{ animationDelay: '120ms' }}>
            Browse, book, and hit the road — all without leaving your screen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3
                          animate-slide-up" style={{ animationDelay: '180ms' }}>
            <Link to="/cars" className="btn-primary text-base px-8 py-3.5">
              Browse Cars →
            </Link>
            {!isLoggedIn && (
              <Link to="/register" className="btn-outline text-base px-8 py-3.5">
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-center mb-12">
          Why DriveEasy?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="card p-6 hover:border-dark-500 text-center animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────── */}
      <section className="bg-dark-800 border-t border-dark-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            Ready to hit the road?
          </h2>
          <p className="text-white/50 mb-8">
            Join thousands of happy renters across India.
          </p>
          <Link to={isLoggedIn ? '/cars' : '/register'} className="btn-primary text-base px-10 py-3.5">
            {isLoggedIn ? 'Browse Available Cars' : 'Get Started — It\'s Free'}
          </Link>
        </div>
      </section>
    </div>
  )
}
