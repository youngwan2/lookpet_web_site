import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../components/mainView.vue'
        )
    },
    // 강아지/고양이 카테고리
    {
      path: '/dog/breed',
      name: 'DogBreed',
      component: () =>
        import(
          /* webpackChunkName: "dog",webpackPrefetch:true */ '../views/dogBreed.vue'
        )
    },
    {
      path: '/dog/breed/detail/:id',
      name: 'DogBreedDetail',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/dogDetail.vue'
        )
    },
    {
      path: '/dog/tip',
      name: 'DogTip',
      component: () =>
        import(
          /* webpackChunkName: "dog",webpackPrefetch:true */ '../views/tip/dogTipView.vue'
        )
    },
    {
      path: '/cat/breed',
      name: 'CatBreed',
      component: () =>
        import(
          /* webpackChunkName: "cat",webpackPrefetch:true */ '../views/catBreed.vue'
        )
    },
    {
      path: '/cat/breed/detail/:id',
      name: 'CatBreedDetail',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/catDetail.vue'
        )
    },
    {
      path: '/cat/tip',
      name: 'CatTip',
      component: () =>
        import(
          /* webpackChunkName: "cat",webpackPrefetch:true */ '../views/tip/catTipView.vue'
        )
    },
    // 커뮤니티
    {
      path: '/community',
      name: 'Community',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/communityView.vue'
        )
    },
    {
      path: '/community/newpost',
      name: 'CommunityNewPost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/add.vue'
        )
    },
    {
      path: '/community/updatepost',
      name: 'CommunityUpdatePost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/update.vue'
        )
    },
    {
      path: '/community/detail/:id',
      name: 'CommunityDetailPost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/postDetail.vue'
        )
    },
    {
      path: '/community/modify/:id',
      name: 'CommunityModifyPost',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/community/update.vue'
        )
    },
    // 각종 부가서비스
    {
      path: '/tools/hospital',
      name: 'ToolsHospital',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/hospitalView.vue'
        )
    },
    {
      path: '/tools/culture',
      name: 'ToolsCulture',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/cultureView.vue'
        )
    },
    {
      path: '/tools/test',
      name: 'ToolsTest',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/tools/test.vue'
        )
    },
    // 고객센터
    {
      path: '/service/qna',
      name: 'ServiceFnA',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/service/Qna.vue'
        )
    },

    // 로그인/회원가입
    {
      path: '/auth/login',
      name: 'Login',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/loginView.vue'
        )
    },
    {
      path: '/auth/signup',
      name: 'Signup',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/signupView.vue'
        )
    },

    // 마이 페이지
    {
      path: '/mypage',
      name: 'Mypage',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/mypageView.vue'
        )
    },
    {
      path: '/mypage/register',
      name: 'Register',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/petRegisterView.vue'
        )
    },
    {
      path: '/mypage/petedit/:id',
      name: 'Petedit',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/petEditView.vue'
        )
    },
    {
      path: '/mypage/useredit/',
      name: 'Useredit',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/userEditView.vue'
        )
    },
    {
      path: '/mypage/withdrawal/',
      name: 'Withdrawal',
      component: () =>
        import(
          /* webpackChunkName: "about",webpackPrefetch:true */ '../views/mypage/userDeleteView.vue'
        )
    }
  ]
})

export default router
