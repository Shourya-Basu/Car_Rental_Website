import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/UI'
import Navbar        from './components/Navbar'
import HomePage      from './pages/HomePage'
import LoginPage     from './pages/LoginPage'
import RegisterPage  from './pages/RegisterPage'
import CarsPage      from './pages/CarsPage'
import BookCarPage   from './pages/BookCarPage'
import BookingsPage  from './pages/BookingsPage'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/"          element={<HomePage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />
            <Route path="/cars"      element={<CarsPage />} />

            {/* Protected routes — require login */}
            <Route
              path="/cars/:id/book"
              element={
                <ProtectedRoute>
                  <BookCarPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-dark-700 py-6 text-center text-white/25 text-xs">
          © {new Date().getFullYear()} DriveEasy · Spring Boot + React + MySQL
        </footer>
      </div>
    </AuthProvider>
  )
}
