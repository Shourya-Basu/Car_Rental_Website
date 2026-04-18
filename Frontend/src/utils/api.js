import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Inject JWT token from localStorage before every request
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('cr_user') || '{}')
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  } catch { /* ignore */ }
  return config
})

// Normalise error messages from backend ErrorResponse
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Something went wrong'
    return Promise.reject(new Error(msg))
  }
)

// ── Auth ─────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data).then(r => r.data),
  login:    (data) => api.post('/api/auth/login',    data).then(r => r.data),
}

// ── Cars ─────────────────────────────────────────────────────────
export const carsAPI = {
  getAll:       ()   => api.get('/api/cars').then(r => r.data),
  getAvailable: ()   => api.get('/api/cars?available=true').then(r => r.data),
  getById:      (id) => api.get(`/api/cars/${id}`).then(r => r.data),
}

// ── Bookings ─────────────────────────────────────────────────────
export const bookingsAPI = {
  create:  (data) => api.post('/api/bookings',           data).then(r => r.data),
  getMy:   ()     => api.get('/api/bookings/my').then(r => r.data),
  cancel:  (id)   => api.put(`/api/bookings/${id}/cancel`).then(r => r.data),
}

export default api
