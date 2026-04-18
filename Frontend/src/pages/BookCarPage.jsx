import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { carsAPI, bookingsAPI } from '../utils/api'
import { Spinner, ErrorAlert, SuccessAlert, formatPrice, calcDays } from '../components/UI'

export default function BookCarPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()

  const [car, setCar]           = useState(null)
  const [loadingCar, setLoadingCar] = useState(true)
  const [carError, setCarError]     = useState('')

  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [endDate, setEndDate]     = useState('')
  const [booking, setBooking]     = useState(false)
  const [bookError, setBookError] = useState('')
  const [success, setSuccess]     = useState(false)

  // Fetch car details on mount
  useEffect(() => {
    carsAPI.getById(id)
      .then(setCar)
      .catch(err => setCarError(err.message))
      .finally(() => setLoadingCar(false))
  }, [id])

  const days       = calcDays(startDate, endDate)
  const totalPrice = car ? days * car.pricePerDay : 0

  const handleBook = async e => {
    e.preventDefault()
    setBookError('')
    if (!endDate) { setBookError('Please select a return date'); return }
    if (endDate <= startDate) { setBookError('Return date must be after pickup date'); return }

    setBooking(true)
    try {
      await bookingsAPI.create({
        carId: Number(id),
        startDate,
        endDate,
      })
      setSuccess(true)
      // Redirect to bookings after 1.8s
      setTimeout(() => navigate('/bookings'), 1800)
    } catch (err) {
      setBookError(err.message)
    } finally {
      setBooking(false)
    }
  }

  if (loadingCar) return <Spinner message="Loading car details..." />
  if (carError)   return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <ErrorAlert message={carError} />
    </div>
  )

  const fallbackImg = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80'

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate('/cars')}
        className="flex items-center gap-2 text-white/50 hover:text-white text-sm
                   mb-8 transition-colors duration-150 animate-fade-in"
      >
        ← Back to cars
      </button>

      <h1 className="font-display font-bold text-3xl mb-8 animate-fade-in">
        Book your car
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Left: Car Details ───────────────────── */}
        <div className="card overflow-hidden animate-slide-up">
          <img
            src={car.imageUrl || fallbackImg}
            alt={car.name}
            className="w-full h-48 object-cover"
            onError={e => { e.target.src = fallbackImg }}
          />
          <div className="p-6">
            <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">
              {car.brand} · {car.year}
            </p>
            <h2 className="font-display font-bold text-2xl mb-1">{car.name}</h2>
            <p className="text-white/50 text-sm mb-5">{car.model}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Daily Rate',    value: formatPrice(car.pricePerDay) },
                { label: 'Status',        value: car.available ? '✓ Available' : '✗ Unavailable' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-dark-700 rounded-xl p-3">
                  <p className="text-white/40 text-xs mb-1">{label}</p>
                  <p className="font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Price Summary (shows when dates selected) */}
            {endDate && endDate > startDate && (
              <div className="mt-4 bg-brand-500/10 border border-brand-500/20
                              rounded-xl p-4 animate-slide-up">
                <div className="flex justify-between text-sm text-white/60 mb-1">
                  <span>{formatPrice(car.pricePerDay)} × {days} {days === 1 ? 'day' : 'days'}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-display font-bold text-lg
                                border-t border-brand-500/20 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-brand-500">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Booking Form ─────────────────── */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '80ms' }}>
          <h3 className="font-display font-bold text-lg mb-6">Rental Details</h3>

          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30
                              flex items-center justify-center text-3xl">
                ✓
              </div>
              <div>
                <p className="font-display font-bold text-xl text-emerald-400 mb-1">Booking Confirmed!</p>
                <p className="text-white/50 text-sm">Redirecting to your bookings...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-5">
              <ErrorAlert message={bookError} onDismiss={() => setBookError('')} />

              <div>
                <label className="label">Pickup Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={e => setStartDate(e.target.value)}
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="label">Return Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={e => setEndDate(e.target.value)}
                  required
                  className="input"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-white/30 text-xs leading-relaxed">
                By booking, you agree to the rental terms. Payment is collected at pickup.
                Cancellations are allowed before the start date.
              </p>

              <button
                type="submit"
                disabled={booking || !car.available}
                className="btn-primary w-full"
              >
                {booking ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming...
                  </span>
                ) : !car.available ? 'Car Unavailable' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
