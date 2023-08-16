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
      path: '/',
      name: 'root',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../layout/layoutView.vue'
        ),
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'main',
          component: () =>
            import(
              /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mainView.vue'
            )
        }
      ]
    },
    {
      path: '/menu01',
      name: 'menu01',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu01View.vue'
        )
    },
    {
      path: '/menu02',
      name: 'menu02',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu02View.vue'
        )
    },
    {
      path: '/menu03',
      name: 'menu03',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu03View.vue'
        )
    },
    {
      path: '/menu04',
      name: 'menu04',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu04View.vue'
        )
    },
    {
      path: '/menu05',
      name: 'menu05',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/menu05View.vue'
        )
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/catsGallery.vue'
        )
    },
    {
      path: '/page01',
      name: 'page01',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/page01View.vue'
        )
    }
  ]
})

export default router
