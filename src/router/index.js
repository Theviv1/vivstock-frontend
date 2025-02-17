
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
      meta: { guest: true }
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true }
    },
    {
      path: '/signup',
      component: () => import('../views/Signup.vue'),
      meta: { guest: true }
    },
    {
      path: '/market',
      component: () => import('../views/Market.vue'),
      meta: { guest: true }
    },
    {
      path: '/market/local-stocks',
      component: () => import('../views/LocalStocks.vue'),
      meta: { guest: true }
    },
    {
      path: '/market/foreign-stocks',
      component: () => import('../views/ForeignStocks.vue'),
      meta: { guest: true }
    },
    {
      path: '/wallet',
      component: () => import('../views/Wallet.vue'),
      meta: { guest: true }
    },
    {
      path: '/trade',
      component: () => import('../views/Trade.vue'),
      meta: { guest: true }
    },
    {
      path: '/trade/:symbol',
      component: () => import('../views/StockDetail.vue'),
      meta: { guest: true }
    },
    {
      path: '/history',
      component: () => import('../views/History.vue'),
      meta: { guest: true }
    },
    {
      path: '/fixed',
      component: () => import('../views/Fixed.vue'),
      meta: { guest: true }
    },
    {
      path: '/refer',
      component: () => import('../views/Refer.vue'),
      meta: { guest: true }
    },
    {
      path: '/referals',
      component: () => import('../views/Referals.vue'),
      meta: { guest: true }
    },
    {
      path: '/settings',
      component: () => import('../views/settings.vue'),
    },
    {
      path: '/reset-password',
      component: () => import('../views/ResetPassword.vue'),
    },
    {
      path: '/kyc',
      component: () => import('../views/KYC.vue'),
      meta: { guest: true }
    },
   
    // Admin routes
  //   {
  //     path: '/admin',
  //     component: () => import('../views/admin/AdminDashboard.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/users',
  //     component: () => import('../views/admin/Users.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/new-users',
  //     component: () => import('../views/admin/newUsers.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/Kyc',
  //     component: () => import('../views/admin/usersKyc.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/verified-users',
  //     component: () => import('../views/admin/verifiedUsers.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/unverifed-users',
  //     component: () => import('../views/admin/unverifiedUsers.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/transactions',
  //     component: () => import('../views/admin/Transactions.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/user-deposits',
  //     component: () => import('../views/admin/usersDeposit.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/user-withdrawals',
  //     component: () => import('../views/admin/usersWithdrawals.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/notification',
  //     component: () => import('../views/admin/adminNotification.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  
  //   {
  //     path: '/admin/settings',
  //     component: () => import('../views/admin/Settings.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   },
  //   {
  //     path: '/admin/Blog',
  //     component: () => import('../views/admin/adminBlog.vue'),
  //     meta: { guest: true , requiresAdmin: false }
  //   }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const isAdmin = authStore.user?.user_metadata?.role === 'admin'

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/')
  } else if (to.meta.guest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
