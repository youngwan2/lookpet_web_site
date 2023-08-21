import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/dog/tip',
      name: 'dog-tip',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/dog/dogTip.vue'
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
      path: '/cat/breed/detail/:id',
      name: 'cat-breed-detail',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/catDetail.vue'
        )
    },
    {
      path: '/cat/tip',
      name: 'cat-tip',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/cat/catTip.vue'
        )
    },
    {
      path: '/community',
      name: 'community',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/communityView.vue'
        )
    },
    {
      path: '/service/hospital',
      name: 'service-hospital',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/service/hospitalView.vue'
        )
    },
    {
      path: '/service/culture',
      name: 'service-culture',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/service/cultureView.vue'
        )
    },
    {
      path: '/service/iq-test',
      name: 'service-iqtest',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/service/IQTestView.vue'
        )
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/loginView.vue'
        )
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/signupView.vue'
        )
    }
  ]
})

export default router
