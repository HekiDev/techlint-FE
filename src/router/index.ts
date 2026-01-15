import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/useAuthStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreateIpAddress.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/EditIpAddress.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('@/views/AuditLogView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const token = localStorage.getItem('authToken')

  // If token exists but no user loaded, validate token by calling /user
  if (token && !authStore.user) {
    try {
      await authStore.handleGetUser()
    } catch (error) {
      localStorage.removeItem('authToken')
      authStore.user = null

      if (to.meta.requiresAuth) {
        return next('/login')
      }
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    return next('/login')
  }

  if (!to.meta.requiresAuth && authStore.isAuthenticated()) {
    return next('/')
  }

  next()
})

export default router
