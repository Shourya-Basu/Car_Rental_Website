import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function HomePage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="animate-fade-in">

     
      <section className="relative overflow-hidden bg-dark-800 border-b border-dark-700">
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/8
                          rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-500/5
                          rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32 text-center">
         

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl
                         leading-tight mb-6 animate-slide-up"
              >
            Rent a car.<br />
            <span className="text-white">Drive anywhere.</span>
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


      <section className=" border-dark-700">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        </div>
      </section>
    </div>
  )
}
