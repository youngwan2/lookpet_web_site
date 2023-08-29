<template>
  <div class="login_container">
    <h2>로그인 화면 작업중</h2>

    <form @submit.prevent="loginRequest" class="login_form">
      <div class="login_form_inner_con">
        <div class="username_con">
          <label for="uesrname">아이콘1</label>
          <input
            type="text"
            placeholder="아이디"
            name="username"
            v-model="username"
          />
        </div>
        <br />
        <div class="password_con">
          <label for="password">아이콘2</label>
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            v-model="password"
          />
        </div>
        <span><router-link to="/auth/signup">회원가입</router-link></span>
        <br />
        <button type="submit" class="login_btn">로그인</button> <br>
        <span style="left:15px;font-size: 13px; margin-top: 10px; position: absolute;" v-show="!success">{{ error }}</span>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '', // 비밀번호 틀리면 담기는 에러 메시지
      success: true
    }
  },
  methods: {
    async loginRequest() {
      const userInfo = {
        username: this.username,
        password: this.password
      }
      await axios
        .post('http://localhost:3000/auth/login', userInfo)
        .then(async (res) => {
          console.log(res)

          await axios
            .get(`http://localhost:3000/auth/login?name=${this.username}`, {
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
.login_container {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

/* 로그인 폼 */
.login_form {
  max-width: 350px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-color: burlywood;
  max-height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  background-color: white;
}
.username_con label {
  min-width: 60px;
}

input {
  padding: 10px;
  border: none;
}

input:focus {
  outline: none;
}

.password_con {
  display: flex;
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
  background-color: brown;
  padding: 10px;
}

.login_btn:hover {
  cursor: pointer;
  background-color: bisque;
}
</style>
