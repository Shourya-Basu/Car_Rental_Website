import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

/** Provides authentication state and helpers to the whole app. */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restore from localStorage on page refresh
    try {
      const saved = localStorage.getItem('cr_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  /** Called after successful login/register with the API response payload. */
  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('cr_user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('cr_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Convenience hook — use anywhere inside the app. */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
