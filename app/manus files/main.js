import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/tailwind.css'

// Import views
import Login from './views/Login.vue'
import Mailbox from './views/Mailbox.vue'
import Compose from './views/Compose.vue'
import Settings from './views/Settings.vue'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/mailbox' },
    { path: '/login', component: Login },
    { path: '/mailbox', component: Mailbox, meta: { requiresAuth: true } },
    { path: '/compose', component: Compose, meta: { requiresAuth: true } },
    { path: '/settings', component: Settings, meta: { requiresAuth: true } }
  ]
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth_token')
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
