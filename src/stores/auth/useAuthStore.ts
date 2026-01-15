import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/lib/http/axios'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null)

  const handleLogin = async (form: { email: string; password: string }) => {
    return await new Promise((resolve, reject) => {
      axios
        .post('/login', form)
        .then((response) => {
          resolve(response.data)
          user.value = response.data.user
          localStorage.setItem('authToken', response.data.token)
        })
        .catch((errs) => {
          reject(errs.response.data)
        })
    })
  }

  const handleLogout = async () => {
    return await new Promise((resolve, reject) => {
      axios
        .post('/logout')
        .then((response) => {
          resolve(response.data)
          user.value = null
          localStorage.removeItem('authToken')
        })
        .catch((errs) => {
          reject(errs.response.data)
        })
    })
  }

  const handleGetUser = async () => {
    return await new Promise((resolve, reject) => {
      axios
        .get('/user')
        .then((response) => {
          resolve(response.data)
          user.value = response.data.user
        })
        .catch((errs) => {
          user.value = null
          localStorage.removeItem('authToken')
          reject(errs.response.data)
        })
    })
  }

  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken')
  }

  return {
    user,
    handleLogin,
    handleLogout,
    isAuthenticated,
    handleGetUser,
  }
})
