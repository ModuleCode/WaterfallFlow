import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/loginu',
    name: 'loginu',
    component: () => import('../views/LoginUserNameView.vue')
  },
  {
    path: '/logine',
    name: 'logine',
    component: () => import('../views/LoginEmailView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from,next) => {
  if (!localStorage.getItem("token") && to.name !== 'loginu' ) {
    next({ name: 'loginu' })
  }
  next()
})
export default router
