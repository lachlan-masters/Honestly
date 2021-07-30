import { createRouter, createWebHashHistory } from 'vue-router'
import Shoppers from '../views/Shoppers.vue'
import Auth from '../auth/index'

const routes = [
  {
    path: '/',
    name: 'Shoppers',
    component: Shoppers
  },
  {
    path: '/orgs',
    name: 'Orgs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Orgs.vue')
  },
  {
    path: '/profile',
    name: "profile",
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    beforeEnter: Auth.routeGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
