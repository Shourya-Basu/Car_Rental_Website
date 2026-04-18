import { useState, useEffect } from 'react'
import { carsAPI } from '../utils/api'
import CarCard from '../components/CarCard'
import { Spinner, ErrorAlert } from '../components/UI'

export default function CarsPage() {
  const [cars, setCars]         = useState([])
  const [filter, setFilter]     = useState('all') // 'all' | 'available'
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState('')

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true)
      setError('')
      try {
        const data = filter === 'available'
          ? await carsAPI.getAvailable()
          : await carsAPI.getAll()
        setCars(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()
  }, [filter])

  const availableCount = cars.filter(c => c.available).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
          Browse Cars
        </h1>
        <p className="text-white/50">
          {loading ? 'Loading...' : `${cars.length} cars · ${availableCount} available`}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 animate-fade-in">
        {[
          { key: 'all',       label: 'All Cars' },
          { key: 'available', label: 'Available Only' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-brand-500 text-white'
                : 'bg-dark-700 text-white/60 hover:text-white hover:bg-dark-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6">
          <ErrorAlert message={error} onDismiss={() => setError('')} />
        </div>
      )}

      {/* Loading */}
      {loading && <Spinner message="Loading cars..." />}

      {/* Empty */}
      {!loading && !error && cars.length === 0 && (
        <div className="text-center py-20 text-white/30 animate-fade-in">
          <div className="text-5xl mb-4">🚗</div>
          <p className="text-lg font-medium">No cars found</p>
          <p className="text-sm mt-1">Try switching to "All Cars"</p>
        </div>
      )}

      {/* Cars Grid */}
      {!loading && !error && cars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car, i) => (
            <div key={car.id} style={{ animationDelay: `${i * 60}ms` }}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
