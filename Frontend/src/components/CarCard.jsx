import { Link } from 'react-router-dom'
import { formatPrice } from './UI'

export default function CarCard({ car }) {
  const fallbackImg = `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80`

  return (
    <div className="card hover:border-dark-500 hover:shadow-xl hover:shadow-black/30
                    group animate-slide-up overflow-hidden flex flex-col">
      {/* Car Image */}
      <div className="relative h-44 bg-dark-700 overflow-hidden">
        <img
          src={car.imageUrl || fallbackImg}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = fallbackImg }}
        />
        {/* Availability badge overlay */}
        <div className="absolute top-3 right-3">
          {car.available
            ? <span className="badge-available"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />Available</span>
            : <span className="badge-unavailable"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" />Booked</span>
          }
        </div>
      </div>

      {/* Car Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">
            {car.brand} · {car.year}
          </p>
          <h3 className="font-display font-bold text-lg leading-tight">{car.name}</h3>
          <p className="text-white/50 text-sm mt-0.5">{car.model}</p>
        </div>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-dark-600 flex items-center justify-between">
          <div>
            <span className=" bg-blue-500 font-display font-bold text-xl">
              {formatPrice(car.pricePerDay)}
            </span>
            <span className="text-white/40 text-xs"> / day</span>
          </div>

          {car.available ? (
            <Link
              to={`/cars/${car.id}/book`}
              className="btn-primary text-sm py-2 px-4"
            >
              Book Now →
            </Link>
          ) : (
            <span className="text-white/30 text-sm font-medium">Unavailable</span>
          )}
        </div>
      </div>
    </div>
  )
}
