import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

import AppLayout from '@/views/AppLayout.vue'
import AppView from '@/views/AppView.vue'
import LinksView from '@/views/LinksView.vue'
import { useDataStore } from '@/stores/data'
import ShortView from '@/views/ShortView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/short/:shortId',
      name: 'short-redirect',
      component: ShortView,
    },
    {
      path: '/app',
      component: AppLayout,
      meta: { requireAuth: true },
      children: [
        {
          path: '',
          //component: AppView,
          component: LinksView,
        },
        {
          path: 'links',
          component: LinksView,
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const dataStore = useDataStore()

  const isAuthenticated = !!dataStore.getToken()

  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
