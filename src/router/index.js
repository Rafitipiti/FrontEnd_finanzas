import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tasa',
    component: () => import(/* webpackChunkName: "about" */ '../views/tasa.vue')
  },
  {
    path: '/tasa',
    name: 'tasa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/tasa.vue')
  },
  {
    path: '/cliente',
    name: 'client',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/client/pages/client')
  },
  {
    path: '/letra',
    name: 'bills',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "bills" */ '@/bills/pages/bills')
  },
  {
    path: '/costes',
    name: 'costs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "costs" */ '@/costs/pages/costs')
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: ()=>import('@/log-in/pages/log-in')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: ()=>import('@/sign-up/pages/sign-up')
  },
  {
    path: '/pago-letra',
    name: 'pago-letra',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "pago-letra" */ '@/pago-letra/pages/pago-letra')
  },
  {
    path: '/execute',
    name: 'execute',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "execute" */ '@/execute/pages/execute')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
