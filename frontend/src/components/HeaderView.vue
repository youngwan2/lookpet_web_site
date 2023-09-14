<template>
  <header class="header" ref="header">
    <div class="header_inner">
      <h1 class="title">
        <RouterLink to="/">Look Pet</RouterLink>
      </h1>
      <span class="menu_icon" @click="menuOpen"
        ><img
          width="30"
          height="30"
          src="../assets/icon/menu_icon.svg"
          alt="menu-bar"
      /></span>
      <nav class="menu">
        <RouterLink to="/dog/breed" class="menu_item">강아지</RouterLink>
        <RouterLink to="/cat/breed" class="menu_item">고양이</RouterLink>
        <RouterLink to="/community" class="menu_item">커뮤니티</RouterLink>
        <RouterLink to="/tools/hospital" class="menu_item"
          >부가서비스</RouterLink
        >
        <RouterLink to="/service/qna" class="menu_item">고객센터</RouterLink>

        <article class="drop_box" :class="menuOpenClassName" ref="dropBox">
          <ul class="drop_item">
            <p>강아지</p>
            <RouterLink to="/dog/breed">품종 정보</RouterLink>
            <br />
            <RouterLink to="/dog/tip">멍 팁</RouterLink>
          </ul>
          <ul class="drop_item">
            <p>고양이</p>
            <RouterLink to="/cat/breed">품종 정보</RouterLink
            ><br />
            <RouterLink to="/cat/tip">냥 팁</RouterLink>
          </ul>
          <ul class="drop_item">
            <p>커뮤니티</p>
            <RouterLink to="/community">커뮤니티</RouterLink
            ><br />
          </ul>
          <ul class="drop_item">
            <p>부가서비스</p>
            <RouterLink to="/tools/hospital">동물병원정보조회</RouterLink
            ><br />
            <RouterLink to="/tools/culture">반려동물동반가능시설조회</RouterLink
            ><br />
            <RouterLink to="/tools/test">멍냥이 지식 테스트</RouterLink
            ><br />
            <RouterLink to="/tools">반려동물 우울증 테스트</RouterLink
            ><br />
          </ul>
          <ul class="drop_item">
            <p>고객센터</p>
            <RouterLink to="/service/qna">QnA</RouterLink
            ><br />
          </ul>
          <!-- 강아지 발자국 이미자 -->
          <div class="dog_foot"></div>
        </article>
      </nav>
      <ul class="util">
        <router-link to="/auth/login" v-if="loginUsername.length < 2"
          >Login</router-link
        >
        <li v-if="loginUsername.length > 2" @click="logout(loginUsername)">
          Logout
        </li>
        <router-link to="/mypage" v-if="loginUsername.length > 2"
          >mypage</router-link
        >
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      on: false,
      menuOpenClassName: ''
    }
  },
  props: {
    loginUsername: String
  },
  updated() {
    console.log(this.headerWidth)
  },
  methods: {
    logout(username) {
      console.log(username)
      document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      window.location.replace('/')
    },
    menuOpen() {
      console.log((this.on = !this.on))

      this.menuOpenClassName = this.on ? 'on' : 'off'
      console.log(this.menuOpenClassName)
    },
    handleDocumentClick(event) {
      // 메뉴가 열려 있고, 클릭 이벤트가 메뉴 영역 밖에서 발생한 경우 메뉴를 닫음
      if (this.on && !this.$refs.header.contains(event.target)) {
        this.menuOpen()
      }
    }
  },
  mounted() {
    console.log(this.loginUsername)
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 이벤트 리스너를 제거
    document.removeEventListener('click', this.handleDocumentClick)
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color:white;
}

li {
  list-style: none;
}

.title > a {
  color:white;
}
.header {
  width: 100%;
  border-radius: 5px;
  padding: 20px 0;
  box-shadow: inset 0px -5px 3px 0 rgba(29, 1, 1, 0.554);
  z-index: 100000;
  background: #b87474;
}
.header .header_inner {
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.meun {
  font: 'arial';
}
.menu a {
  margin: 10px;
  color:white;
  font-weight: 600;
  height: 100%;
}

.menu:hover .drop_box {
  visibility: visible;
  z-index: 100;
  opacity: 1;
  height: 25%;
}

.drop_box {
  position: absolute;
  background: white;
  z-index: 10000;
  transition: 0.5s;
  height: 0%;
  width: 100%;
  visibility: hidden;
  left: 0;
  box-shadow: 2px 5px 5px 2px rgba(43, 43, 43, 0.426);
  top: 5.1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  opacity: 0;
}

.dog_foot {
  background-image: url('../assets/dog.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 50px;
  height: 50px;
}

.drop_item {
  margin: 10px auto;
  line-height: 1.45;
  font-size: 15px;
  display: inline-block;
}

.menu .drop_item a {
  font-weight: 500;
  color: black;
}
.drop_item p {
  text-align: center;
  margin: 10px;
  font-weight: 600;
  font-size: 1.25rem;
}

/* 메뉴 아이콘 */
.menu_icon {
  display: none;
}

.menu_icon.on {
  display: inline-block;
}

.menu_icon.off {
  display: none;
}

/* 미디어 쿼리 */
@media screen and (max-width: 823px) {
  .drop_box {
    flex-direction: column;
    width: 30%;
    top: 0;
    z-index: 999;
    position: fixed;
    transform: translate(-50px);
    transform-origin: center right;
    height: 100%;
    align-content: stretch;
    text-align: left;
    justify-content: start;
  }
  .drop_item {
    margin: 20px 0;
  }
  .drop_item p {
    box-shadow: -3px 0 0 0 brown;
    padding: 0 3px;
    text-align: left;
  }

  .drop_box a {
    line-height: 2;
    color: black;
    position: relative;
  }
  .drop_box a::after {
    transition: 0.5s;
    content: '';
    width: 100%;
    margin: -4px 0;
    position: absolute;
    transform: scale(0);
    transform-origin: center center;
    left: 0;
    bottom: 0;
    border-bottom: 2px solid black;
  }
  .drop_box a:hover::after {
    content: '';
    transform: scale(1);
    border: 1px solid black;
  }

  .menu_item {
    display: none;
  }

  .menu:hover > .drop_box {
    height: 100%;
  }

  .menu_icon {
    position: absolute;
    display: block;
    right: 30px;
  }

  /* on 이 되면 카테고리 메뉴가 보인다. */
  .drop_box.on {
    transform: translate(0);
    height: 100%;
    width: 40%;
    visibility: visible;
    opacity: 1;
  }
  .drop_box.off {
    transform: translate(-100px);
    visibility: hidden;
    opacity: 0;
    height: 100%;
    width: 0%;
  }
}

@media screen and (max-width: 700px) {
  .util {
    margin-right: 3.5rem;
  }
}
</style>
