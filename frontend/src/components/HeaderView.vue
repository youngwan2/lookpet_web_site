<template>
  <header class="header">
    <div class="header_inner">
      <h1 class="title">
        <RouterLink to="/">Look Pet</RouterLink>
      </h1>
      <nav class="menu">
        <RouterLink to="/dog/breed">PUPPY</RouterLink>
        <RouterLink to="/cat/breed">CAT</RouterLink>
        <RouterLink to="/community">COMMUNITY</RouterLink>
        <RouterLink to="/service/hospital">SERVICE</RouterLink>
        <article class="drop_box">
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
            <p>서비스</p>
            <RouterLink to="/service/hospital">동물병원정보조회</RouterLink
            ><br />
            <RouterLink to="/service/culture"
              >반려동물동반가능시설조회</RouterLink
            ><br />
            <RouterLink to="/service/">반려동물 지능 테스트</RouterLink
            ><br />
            <RouterLink to="/service">반려동물 우울증 테스트</RouterLink
            ><br />
          </ul>
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
      username: ''
    }
  },
  props: {
    loginUsername: String
  },
  watch: {
    scrollY() {
      window.addEventListener('scroll', () => {
        console.log(window.scrollY)
        return window.scrollY
      })
    }
  },
  methods: {
    logout(username) {
      console.log(username)
      document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      window.location.replace('/')
    }
  },
  mounted() {
    console.log(this.loginUsername)
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: tomato;
}

li {
  list-style: none;
}

.title > a {
  color: orange;
}
.header {
  width: 100%;
  padding: 20px 0;
  z-index: 100000;
  background-color: #ece7dd;
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
  color: orange;
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
  z-index: 10000;
  transition: 0.5s;
  height: 0%;
  width: 100%;
  background: linear-gradient(30deg, rgb(255, 120, 93), rgb(255, 144, 53));
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
  color: white;
  font-weight: 500;
}
.drop_item p {
  text-align: center;
  margin: 10px;
  font-weight: 600;
  color: white;
  font-size: 1.25rem;
}

/* 미디어 쿼리 */
@media screen and (max-width: 823px) {
  .drop_box {
    flex-direction: column;
    width: 30%;
    transform: translate(-50px);
    transform-origin: center right;
    height: 100%;
    align-content: stretch;
    text-align: left;
    justify-content: start;
  }

  .header:hover .drop_box {
    transform: translate(0);

    height: 100%;
    width: 60%;
  }

  .drop_item {
    margin: 10px 0;
  }
  .drop_item p {
    text-align: left;
  }
  .menu .drop_item a {
    color: white;
  }
}
</style>
