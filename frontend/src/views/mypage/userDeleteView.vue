<template>
  <div class="container">
    <div class="head_line">
      <div class="move_back" @click="moveBack"><h1>←</h1></div>
      <h1 class="user_info_title">회원탈퇴</h1>
    </div>
    <hr />
    <div class="content">
      <div class="side_menu" :class="{ 'hidden-menu': !isSideMenuOpen }">
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
.head_line {
  display: flex;
}
.user_info_title {
  margin: auto;
}
.move_back {
  background: #815854;
  border-radius: 10px;
  margin: 10px;
  padding: 0 10px;
  padding-bottom: 5px;
  color: #f9ebde;
  transition: 0.1s;
}
.move_back:hover {
  transform: scale(1.05);
  background: rgb(198, 111, 17);
  cursor: pointer;
}
.content {
  display: flex;
  width: 100%;
  height: 600px;
}
.side_menu {
  margin: 0;
  width: 30%;
  max-width: 300px;
  min-width: 250px;
  padding: 10px 0;
  margin-right: 10px;
  background: #815854;
  overflow: hidden;
  transition: 0.2s linear;
}
@media screen and (max-width: 600px) {
  .side_menu {
    display: none;
  }
}
.user_menu {
  margin-bottom: 30px;
}
.active_btn {
  transition: 0.3s;
  margin-left: -20px;
  white-space: nowrap;
}
.active_btn:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
.active_btn:active {
  box-shadow: -1px -1px 5px gray;
}
.user_delete {
  background: rgb(198, 111, 17);
  border-bottom: 1px solid #f9ebde;
}
.side_list {
  width: 400px;
  min-width: 200px;
  /* background: #815854; */
  color: #f9ebde;
  width: 100%;
  list-style: none;
  transition: 0.1s;
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
  height: 30%;
  min-height: 300px;
  min-width: 300px;
  max-width: 500px;
  margin: auto;
  margin-top: 7%;
  background: #815854;
  border-radius: 0 10% 0 10%;
  padding: 20px;
  color: #f9ebde;
  transform: translate(0%, 0%);
  box-shadow: inset 10px 10px 2px #af7770, 40px 70px 5px rgba(83, 83, 83, 0.464);
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
  height: 10%;
  position: relative;
}
.info-content > span {
  font-size: 1.3rem;
}
.info-content > input {
  width: 70%;
  height: 100%;
  border: none;
  border-radius: 10px;
  padding: 3px;
  position: absolute;
  left: 50%;
  background: #f9ebde;
}
.info-box > button {
  width: 100%;
  height: 15%;
  border: none;
  border-radius: 20px;
  position: relative;
  top: 20%;
  transition: 0.15s;
  font-size: 1.5rem;
  background: #f9ebde;
}
.info-box > button:hover {
  transform: scale(1.03);
  background: #ee7129;
  color: #fff;
}
.info-box > button:active {
  box-shadow: inset 3px 3px 5px gray;
}
#agree {
  width: 100%;
  height: 10%;
  padding: 3px;
  border: none;
  background: rgb(223, 220, 220);
}
.hidden-menu {
  display: none;
}
.toggle-button-container {
  position: relative;
}

.toggle-button {
  position: relative;
  right: 10px; /* 사이드 메뉴 오른쪽에 배치 */
  top: 250px;
  background-color: #613d3a;
  color: #f9ebde;
  font-size: 1.2rem;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 35px;
  height: 100px;
  cursor: pointer;
}
</style>
