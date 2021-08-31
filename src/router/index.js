import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/baccaratEntry',
    name: 'BaccaratEntry',
    component: () => import('../views/BaccaratEntry.vue'),
    props: true
  },
  {
    path: '/table',
    name: 'BaccaratTable',
    component: () => import('../views/BaccaratTableMain'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
