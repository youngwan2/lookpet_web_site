import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'mainView',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../components/mainView.vue'
        )
    },
    // 강아지/고양이 카테고리
    {
      path: '/dog/breed',
      name: 'dog-breed',
      component: () =>
        import(
          /* webpackChunkName: "dog",webpackPrefetch:true */ '../views/dogBreed.vue'
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
          /* webpackChunkName: "dog",webpackPrefetch:true */ '../views/tip/dogTipView.vue'
        )
    },
    {
      path: '/cat/breed',
      name: 'cat-breed',
      component: () =>
        import(
          /* webpackChunkName: "cat",webpackPrefetch:true */ '../views/catBreed.vue'
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
          /* webpackChunkName: "cat",webpackPrefetch:true */ '../views/tip/catTipView.vue'
        )
    },
    // 커뮤니티
    {
      path: '/community',
      name: 'community',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/communityView.vue'
        )
    },
    {
      path: '/community/newpost',
      name: 'community-newpost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/add.vue'
        )
    },
    {
      path: '/community/updatepost',
      name: 'community-updatepost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/update.vue'
        )
    },
    {
      path: '/community/detail/:id',
      name: 'community-detailpost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/postDetail.vue'
        )
    },
    {
      path: '/community/modify/:id',
      name: 'community-modifypost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/update.vue'
        )
    },
    // 각종 부가서비스
    {
      path: '/tools/hospital',
      name: 'tools-hospital',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/hospitalView.vue'
        )
    },
    {
      path: '/tools/culture',
      name: 'tools-culture',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/cultureView.vue'
        )
    },
    {
      path: '/tools/test',
      name: 'tools-test',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/test.vue'
        )
    },
    // 고객센터
    {
      path: '/service/qna',
      name: 'service-qna',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/service/Qna.vue'
        )
    },

    // 로그인/회원가입
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
    },

    // 마이 페이지
    {
      path: '/mypage',
      name: 'mypage',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/mypageView.vue'
        )
    },
    {
      path: '/mypage/register',
      name: 'register',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/petRegisterView.vue'
        )
    },
    {
      path: '/mypage/petedit/:id',
      name: 'petedit',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/petEditView.vue'
        )
    },
    {
      path: '/mypage/useredit/',
      name: 'useredit',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/userEditView.vue'
        )
    }
  ]
})

export default router
