<template>
  <div class="login_container">
    <h2 class="title">로그인</h2>
    <form @submit.prevent="loginRequest" class="login_form">
      <div class="login_form_inner_con">
        <div class="username_con">
          <label for="uesrname">ID</label>
          <input
            type="text"
            placeholder="아이디"
            name="username"
            v-model="username"
          />
        </div>
        <br />
        <div class="password_con">
          <label for="password">PW</label>
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            v-model="password"
          />
        </div>
        <span class="signup_btn_area"
          ><router-link to="/auth/signup" class="signup_btn"
            >회원가입</router-link
          ></span
        >
        <br />
        <button type="submit" class="login_btn">로그인</button> <br />
        <span
          style="
            left: 15px;
            font-size: 13px;
            margin-top: 10px;
            position: absolute;
          "
          v-show="!success"
          >{{ error }}</span
        >
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '', // 비밀번호 틀리면 담기는 에러 메시지
      success: true
    }
  },
  created() {
    document.title = this.$route.name
  },
  methods: {
    async loginRequest() {
      const userInfo = {
        username: this.username,
        password: this.password
      }
      await axios
        .post('/auth/login', userInfo)
        .then(async (res) => {
          console.log(res)

          await axios
            .get(`/auth/login?name=${this.username}`, {
              withCredentials: true
            })
            .then((result) => {
              console.log('쿠키 생성후 데이터:', result.data)
            })
            .catch((error) => {
              console.log(error)
            })
          window.location.replace('/')
        })
        .catch((error) => {
          this.error = error.response.data.message
          this.success = error.response.data.success
          console.log(this.error)
        })
    }
  }
}
</script>
<style scoped>
.title {
  position: absolute;
  text-shadow: 30px 30px 3px rgb(113, 111, 111);
  left: 50%;
  font-size: 1.8rem;
  color: #815854;
  transform: translate(-50%);
  margin-top: 8rem;
}
.login_container {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

/* 로그인 폼 */
.login_form {
  max-width: 500px;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 25px;
  width: 100%;
  height: 100%;
  background: linear-gradient(80deg, #684946, #765654);
  max-height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 10px 10px 2px #c78d87, 40px 70px 5px rgba(0, 0, 0, 0.464);
  animation: updown 1.5s infinite alternate ease-in-out;
}

@keyframes updown {
  from {
    transform: translate(-50%, -49%);
  }
}

/* 로그인 폼 내부 컨테이너(input 태그 위치 중앙정렬) */
.login_form_inner_con {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* 유저 아이디 컨테이너 */
.username_con {
  display: flex;
  width: 300px;
  align-items: center;
  border-radius: 5px;
  background-color: white;
}
.username_con label {
  min-width: 60px;
}

input {
  border-radius: 5px;
  padding: 15px;

  width: 100%;
  border: none;
}

input:focus {
  outline: none;
}

.password_con {
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: white;
}

.password_con label {
  min-width: 60px;
}

/* 로그인 요청 버튼 */
.login_btn {
  text-align: center;
  width: 200px;
  border: none;
  border-radius: 20px;
  background-color: #f9ebde;
  margin: 1rem 0 0 0;
  font-size: 15px;
  box-shadow: inset 1px 1px 5px black;
  padding: 10px;
}

.login_btn:hover {
  cursor: pointer;
  background-color: #fedcda;
}

/* 회원가입 이동 버튼 */

.signup_btn_area {
  display: inline-block;
  margin-top: 1.5rem;
}
.signup_btn {
  color: white;
  text-decoration: none;
}
</style>
