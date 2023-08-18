import { createRouter, createWebHistory } from 'vue-router'
// import layoutView from '@/layout/layoutView.vue'
// import mainView from '@/views/mainView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   component: layoutView,
    //   redirect: '/main',
    //   children: [{ path: '/main', component: mainView }]
    // },
    {
      path: '/dog/breed',
      name: 'dog-breed',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/dogBreed.vue'
        )
    },
    {
      path: '/dog/breed/detail/:id',
      name: 'dog-breed/detail',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/dogDetail.vue'
        )
    },
    {
      path: '/cat/breed',
      name: 'cat-breed',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/catBreed.vue'
        )
    },
    {
      path: '/community',
      name: 'community',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu03View.vue'
        )
    },
    {
      path: '/service',
      name: 'service',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu04View.vue'
        )
    }
  ]
})

export default router
