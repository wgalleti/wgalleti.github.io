import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const ProductPage = () => import('../views/ProductPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/produto/:id',
    name: 'product',
    component: ProductPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // Support hash-based scroll on the home page (e.g. /#products, /#about)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
