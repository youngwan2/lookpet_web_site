import { createRouter, createWebHistory } from 'vue-router'
import layoutView from '@/layout/layoutView.vue'
import mainView from '@/views/mainView.vue'
import menu01View from '@/views/menu01View.vue'
import menu02View from '@/views/menu02View.vue'
import menu03View from '@/views/menu03View.vue'
import menu04View from '@/views/menu04View.vue'
import menu05View from '@/views/menu05View.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: layoutView,
      redirect: '/main',
      children: [{ path: '/main', component: mainView }]
    },
    { path: '/menu01', component: menu01View },
    { path: '/menu02', component: menu02View },
    { path: '/menu03', component: menu03View },
    { path: '/menu04', component: menu04View },
    { path: '/menu05', component: menu05View }
  ]
})

export default router
