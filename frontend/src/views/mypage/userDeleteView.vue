<template>
  <div class="container">
    <div class="content">
      <div class="side_menu" :class="{ 'hidden-menu': !isSideMenuOpen }">
        <h2 class="mypage_title" @click="toMypage">마이페이지</h2>
        <ul class="side_list">
          <div class="user_menu">
            <li class="side_title">회원정보</li>
            <ol @click="userEdit" class="active_btn">
              정보수정
            </ol>
            <ol class="user_delete">
              회원탈퇴
            </ol>
          </div>
          <div class="pet_menu">
            <li class="side_title">마이펫</li>
            <ol @click="registerPet" class="active_btn">
              펫 등록하기
            </ol>
          </div>
        </ul>
      </div>
      <div class="toggle-button-container">
        <button @click="toggleSideMenu" class="toggle-button">
          {{ isSideMenuOpen ? '<<' : '>>' }}
        </button>
      </div>
      <div class="user-info">
        <div class="info-box">
          <div class="info-content">
            <span>아이디</span>
            <input class="user-id" type="text" v-model="username" />
          </div>
          <div class="info-content">
            <span>비밀번호</span>
            <input type="password" v-model="password" />
          </div>
          <input
            id="agree"
            type="text"
            placeholder="'정말 탈퇴하겠습니다' 를 입력해주세요."
            autocomplete="off"
            v-model="agree"
          />
          <button @click="deleteUserInfo">탈퇴하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

// import axios from 'axios'
export default {
  name: 'Useredit',
  data() {
    return {
      userInfo: {},
      username: '',
      password: '',
      agree: '',
      message: '정말 탈퇴하겠습니다',
      isSideMenuOpen: true,
      sideMenuWidth: 0, // side_menu의 초기 width 값
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    }
  },
  created() {
    document.title = this.$route.name
    window.addEventListener('resize', this.handleResize)
    this.handleResize() // 페이지 로드 시 초기 상태 설정
  },
  methods: {
    toggleSideMenu() {
      // 스크린 너비가 600px 이하인 경우에만 토글로 열림/닫힘 상태 변경
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
    handleResize() {
      // 스크린 너비 업데이트
      this.screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      // 스크린 너비가 600px 이하인 경우, 메뉴를 닫도록 설정
      if (this.screenWidth <= 600) {
        this.isSideMenuOpen = false
      } else {
        // 스크린 너비가 600px 초과인 경우, 메뉴를 열도록 설정
        this.isSideMenuOpen = true
      }
    },
    toMypage() {
      this.$router.push({ path: '/mypage' })
    },
    userEdit() {
      this.$router.push({ path: '/mypage/useredit' })
    },
    registerPet() {
      this.$router.push({ path: '/mypage/register' })
    },
    moveBack() {
      this.$router.push({ path: '/mypage' })
    },
    async deleteUserInfo() {
      if (this.agree === this.message) {
        console.log('문구가 일치합니다.')
        try {
          const userInfo = {
            username: this.username,
            password: this.password
          }
          await axios
            .post('http://localhost:3000/mypage/withdrawal', {
              userInfo
            })
            .then((res) => {
              if (res.status === 200) {
                document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
                this.$router.push({ path: '/' })
              }
            })
        } catch {
          console.log('유저 정보 삭제 중에 에러가 발생했습니다.')
        }
      } else {
        alert('문구를 정확하게 입력해주세요.')
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  async mounted() {
    this.username = document.cookie.split('=')[1]
    await axios
      .get('http://localhost:3000/mypage/useredit', {
        params: { username: this.username }
      })
      .then((res) => {
        this.userInfo = res.data
      })
      .catch((e) => {
        console.log('mypage 데이터를 불러오는 중 에러가 발생했습니다.:', e)
      })

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  min-height: 80vh;
}
.content {
  display: flex;
  margin: 3rem 0;
  width: 100%;
  height: 100%;
}
.mypage_title {
  text-align: center;
  color: #f1dec9;
  background: #a4907c;
  text-shadow: 1px 1px 1px gray;
  box-shadow: 0 3px 5px #8d7b68;
  margin: 1rem 0 2rem 0;
  transition: 0.15s;
}
.mypage_title:hover {
  box-shadow: 0 5px 5px #8d7b68;
  background: #8d7b68;
  transform: scale(1.02);
  cursor: pointer;
}
.side_menu {
  margin: 0;
  width: 30%;
  min-height: 70vh;
  border: 3px solid #8d7b68;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 0 2px #8d7b68;
  max-width: 300px;
  min-width: 250px;
  padding: 10px 0;
  margin-right: 10px;
  background: #f1dec9;
  overflow: hidden;
  transition: 0.2s linear;
}

@media screen and (max-width: 600px) {
  /* .side_menu {
    display: none;
  } */
  .side_menu {
    transform: translateX(-100%);
  }
}
.user_menu {
  margin-bottom: 30px;
}
.active_btn {
  transition: 0.3s;
  margin-left: -20px;
  max-width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
}
.active_btn:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f1dec9;
  border-radius: 10px;
  background: #a4907c;
  box-shadow: 0 0 1px rgb(247, 247, 247);
  cursor: pointer;
}
.user_delete {
  color: #f1dec9;
  margin-left: -10px;
  background: #a4907c;
  border-bottom: 1px solid #8d7b68;
  max-width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 10px;
}
.side_list {
  width: 100%;
  color: #8d7b68;
  list-style: none;
  margin-bottom: 5px;
  transition: 0.3s;
}
.side_title {
  font-weight: 800;
  font-size: 1.2em;
  display: inline-block;
  margin-bottom: 10px;
}
.user-info {
  width: 100%;
  height: 100%;
  margin: 0;
}
.info-box {
  width: 50%;
  height: 400px;
  min-height: 250px;
  min-width: 300px;
  max-width: 500px;
  margin: auto;
  margin-top: 7%;
  background: #f1dec9;
  border-radius: 0 10% 0 10%;
  border:3px solid #8d7b68;
  padding: 20px;
  color: #8d7b68;
  box-shadow: 12px 12px 1px #8d7b68, 40px 70px 5px rgba(83, 83, 83, 0.464);
  animation: updown 1.5s infinite alternate ease-in-out;
}
@keyframes updown {
  from {
    transform: translate(0%, -1%);
  }
}

.info-content {
  margin-bottom: 10%;
  width: 80%;
  height: 30px;
  position: relative;
}
.info-content > span {
  font-size: 1.3rem;
}
.info-content > input {
  width: 70%;
  height: 100%;
  border-radius: 20px;
  border: 3px solid #8d7b68;
  background: #ffffff;
  padding: 3px;
  opacity: 0.6;
  position: absolute;
  left: 50%;
  box-shadow: 3px 3px 3px gray;
}
.info-content>input:focus{
  opacity: 1;
}
.info-box > button {
  width: 100%;
  height: 15%;
  background: #c8b6a6;
  border: none;
  border-radius: 20px;
  position: relative;
  top: 20%;
  transition: 0.15s;
  font-size: 1.5rem;
}
.info-box > button:hover {
  transform: scale(1.03);
  color: #f9ebde;
  background: #a4907c;
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.info-box > button:active {
  background: #8d7b68;
  box-shadow: -3px -3px 5px gray;
}
#agree {
  width: 100%;
  height: 10%;
  padding: 3px;
  border: none;
  margin-top: 5px;
  background: #c8b6a6;
}
.hidden-menu {
  transform: translate(-100%);
  position: absolute;
  box-shadow: 5px 0 10px #8d7b68;
  transition: transform 0.1s ease;
}
.toggle-button-container {
  position: relative;
}

.toggle-button {
  position: relative;
  right: 10px; /* 사이드 메뉴 오른쪽에 배치 */
  top: 250px;
  background-color: #a4907c;
  box-shadow: 5px 0 3px #8d7b68;
  color: #f9ebde;
  font-size: 1.2rem;
  border: none;
  border-radius: 0 10px 10px 0;
  width: 35px;
  height: 100px;
  cursor: pointer;
  transition: 0.1s linear;
}
.toggle-button:hover {
  box-shadow: inset 5px 0 2px #8d7b68;
  background: #8d7b68;
}
</style>
