import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Full-page loading spinner */
export function Spinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-2 border-dark-600 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-white/40 text-sm">{message}</p>
    </div>
  )
}

/** Inline error alert */
export function ErrorAlert({ message, onDismiss }) {
  if (!message) return null
  return (
    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400
                    rounded-xl px-4 py-3 text-sm animate-fade-in">
      <span className="mt-0.5 text-base">⚠</span>
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400/60 hover:text-red-400 ml-2">✕</button>
      )}
    </div>
  )
}

/** Success alert */
export function SuccessAlert({ message }) {
  if (!message) return null
  return (
    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20
                    text-emerald-400 rounded-xl px-4 py-3 text-sm animate-fade-in">
      <span>✓</span>
      <span>{message}</span>
    </div>
  )
}

/** Redirects unauthenticated users to /login */
export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}

/** Format Indian Rupee price */
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(amount)
}

/** Calculate rental days between two date strings */
export function calcDays(start, end) {
  if (!start || !end) return 0
  const diff = new Date(end) - new Date(start)
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
