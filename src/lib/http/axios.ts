import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const http = axios.create({
  baseURL,
})

http.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken')
    // If the authentication token exists, add it to the Authorization header
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
