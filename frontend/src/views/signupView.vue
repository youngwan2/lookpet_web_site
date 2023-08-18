<template>
  <div class="signup_container">
    <h2>회원가입 화면 작업중</h2>

    <form @submit.prevent="signupRequest" class="signup_form">
      <div class="signup_form_inner_con">
        <div class="username_con">
          <input
            type="text"
            placeholder="아이디"
            name="username"
            v-model="username"
          />
        </div>
        <br />
        <div class="password_con">
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            v-model="password"
          />
        </div>
        <br />
        <div class="email_con">
          <input
            type="email"
            placeholder="이메일"
            name="email"
            v-model="email"
          />
        </div>
        <br />
        <button type="submit" class="signup_btn">회원가입</button>
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
      email: ''
    }
  },
  methods: {
    signupRequest() {
      const userInfo = {
        username: this.username,
        password: this.password,
        email: this.email
      }

      // 정규식 검사

      const nameReg = /^[A-Za-z0-9]{4,10}$/g
      // eslint-disable-next-line
      const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/ //영문 숫자 조합 8장리 이상
      const mailReg =
        // eslint-disable-next-line
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

      const [result1, result2, result3] = [
        nameReg.test(this.username),
        pwReg.test(this.password),
        mailReg.test(this.email)
      ]

      // 정규표현식에 모두 통과한 경우에만 회원가입 요청을 보낸다.
      if (result1 && result2 && result3) {
        console.log('보냈다')
        axios
          .post('http://localhost:3000/auth/signup', userInfo)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log('회원가입 시도 중 문제 발생::', error)
          })
      } else {
        alert('양식에 맞춰 다시 작성해주세요.')
      }
    }
  }
}
</script>
<style scoped>
.signup_container {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

/* 로그인 폼 */
.signup_form {
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
.signup_form_inner_con {
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

/* 이메일 */
.email_con {
  display: flex;
  background-color: white;
}

/* 회원가입 요청 버튼 */
.signup_btn {
  text-align: center;
  width: 200px;
  border: none;
  border-radius: 20px;
  background-color: brown;
  padding: 10px;
}

.signup_btn:hover {
  cursor: pointer;
  background-color: bisque;
}
</style>
