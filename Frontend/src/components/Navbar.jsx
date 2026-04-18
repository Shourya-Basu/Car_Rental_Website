import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLink = (to, label) => {
    const active = location.pathname === to
    return (
      <Link
        to={to}
        className={`text-sm font-medium transition-colors duration-150 ${
          active ? 'text-brand-500' : 'text-white/60 hover:text-white'
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur border-b border-dark-700">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-display font-bold text-sm">
            D
          </div>
          <span className="font-display font-bold text-lg tracking-tight">DriveEasy</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {navLink('/cars', 'Browse Cars')}
          {isLoggedIn && navLink('/bookings', 'My Bookings')}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="hidden sm:block text-sm text-white/50">
                Hi, <span className="text-white font-medium">{user.name.split(' ')[0]}</span>
              </span>
              <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn-outline text-sm py-2 px-4">Login</Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
