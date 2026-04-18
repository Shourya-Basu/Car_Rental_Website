import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { bookingsAPI } from '../utils/api'
import { Spinner, ErrorAlert, formatPrice } from '../components/UI'
import { useAuth } from '../context/AuthContext'

export default function BookingsPage() {
  const { user }  = useAuth()
  const [bookings, setBookings]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [cancelling, setCancelling] = useState(null) // id of booking being cancelled

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await bookingsAPI.getMy()
      // Newest first
      setBookings(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking? The car will become available again.')) return
    setCancelling(id)
    try {
      const updated = await bookingsAPI.cancel(id)
      setBookings(prev => prev.map(b => b.id === id ? updated : b))
    } catch (err) {
      setError(err.message)
    } finally {
      setCancelling(null)
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  const calcDays = (start, end) => {
    const diff = new Date(end) - new Date(start)
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-1">My Bookings</h1>
        <p className="text-white/50">
          {user?.name}'s rental history
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6">
          <ErrorAlert message={error} onDismiss={() => setError('')} />
        </div>
      )}

      {/* Loading */}
      {loading && <Spinner message="Loading bookings..." />}

      {/* Empty State */}
      {!loading && !error && bookings.length === 0 && (
        <div className="text-center py-24 animate-fade-in">
          <div className="text-5xl mb-4">📋</div>
          <p className="font-display font-bold text-xl mb-2">No bookings yet</p>
          <p className="text-white/40 text-sm mb-6">
            Start by browsing our available cars
          </p>
          <Link to="/cars" className="btn-primary inline-flex">
            Browse Cars →
          </Link>
        </div>
      )}

      {/* Bookings List */}
      {!loading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking, i) => {
            const days      = calcDays(booking.startDate, booking.endDate)
            const isCancelled  = booking.status === 'CANCELLED'
            const isConfirmed  = booking.status === 'CONFIRMED'
            const isPast       = new Date(booking.startDate) < new Date()

            const fallbackImg = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80'

            return (
              <div
                key={booking.id}
                className={`card p-5 sm:p-6 animate-slide-up ${isCancelled ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Car thumbnail */}
                  <div className="w-full sm:w-32 h-28 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-dark-700">
                    <img
                      src={booking.car?.imageUrl || fallbackImg}
                      alt={booking.car?.name}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = fallbackImg }}
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-lg leading-tight">
                          {booking.car?.name}
                        </h3>
                        <p className="text-white/50 text-sm">
                          {booking.car?.brand} · {booking.car?.year}
                        </p>
                      </div>
                      {/* Status badge */}
                      <span className={isConfirmed ? 'badge-confirmed' : 'badge-cancelled'}>
                        {booking.status}
                      </span>
                    </div>

                    {/* Date and price grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-dark-700 rounded-lg p-2.5">
                        <p className="text-white/40 text-xs mb-0.5">Pickup</p>
                        <p className="text-sm font-medium">{formatDate(booking.startDate)}</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2.5">
                        <p className="text-white/40 text-xs mb-0.5">Return</p>
                        <p className="text-sm font-medium">{formatDate(booking.endDate)}</p>
                      </div>
                      <div className="bg-dark-700 rounded-lg p-2.5 col-span-2 sm:col-span-1">
                        <p className="text-white/40 text-xs mb-0.5">{days}d total</p>
                        <p className="text-brand-500 font-display font-bold">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancel button — only for confirmed, future bookings */}
                {isConfirmed && !isPast && (
                  <div className="mt-4 pt-4 border-t border-dark-600 flex justify-end">
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancelling === booking.id}
                      className="text-sm text-red-400/70 hover:text-red-400 font-medium
                                 transition-colors duration-150 disabled:opacity-50"
                    >
                      {cancelling === booking.id ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                          Cancelling...
                        </span>
                      ) : 'Cancel Booking'}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
