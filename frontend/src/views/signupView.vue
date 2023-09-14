<template>
  <div class="signup_container">
    <h2 class="title">회원가입</h2>

    <form @submit.prevent="signupRequest" class="signup_form">
      <div class="signup_form_inner_con">
        <div class="username_con">
          <input
            type="text"
            placeholder="ID(영문/숫자 조합 4자 이상)"
            name="username"
            v-model="username"
          />
          <button class="double_check_btn" type="button" @click="doubleIdCheck">
            확인
          </button>
        </div>
        <br />
        <div class="password_con">
          <input
            type="password"
            placeholder="PW(영문/숫자 조합 8자 이상)"
            name="password"
            v-model="password"
          />
        </div>
        <br />
        <div class="email_con">
          <input
            type="email"
            placeholder="example@address.com"
            name="email"
            v-model="email"
          />
        </div>
        <br />
        <div class="nickname_con">
          <input
            type="text"
            placeholder="닉네임(한글2자이상~6자)"
            name="nickname"
            v-model="nickname"
          />
          <button
            class="double_check_btn"
            type="button"
            @click="doubleNickCheck"
          >
            확인
          </button>
        </div>
        <br />
        <button type="submit" class="signup_btn" :disabled="!isCheck">
          회원가입
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Singup',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      message: '',
      nickname: '',
      isCheck: false
    }
  },
  created() {
    document.title = this.$route.name
  },
  methods: {
    doubleIdCheck() {
      axios
        .post('/auth/idcheck', { username: this.username })
        .then((res) => {
          this.message = res.data.message
          this.isCheck = res.data.success
          console.log(this.message)
        })
        .catch((error) => {
          console.log('회원가입 시도 중 문제 발생::', error)
        })
    },
    doubleNickCheck() {
      axios
        .post('/auth/nickcheck', {
          nickname: this.nickname
        })
        .then((res) => {
          this.message = res.data.message
          this.isCheck = res.data.success
          console.log(this.message)
        })
        .catch((error) => {
          console.log('회원가입 시도 중 문제 발생::', error)
        })
    },
    signupRequest() {
      const userInfo = {
        username: this.username,
        password: this.password,
        email: this.email,
        nickname: this.nickname
      }

      // 정규식 검사

      const nameReg = /^[A-Za-z0-9]{4,10}$/g
      // eslint-disable-next-line
      const pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/ //영문 숫자 조합 8장리 이상
      const mailReg =
        // eslint-disable-next-line
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      const nickReg = /^[가-힣]{2,6}$/g

      const [result1, result2, result3, result4] = [
        nameReg.test(this.username),
        pwReg.test(this.password),
        mailReg.test(this.email),
        nickReg.test(this.nickname)
      ]

      // 정규표현식에 모두 통과한 경우에만 회원가입 요청을 보낸다.
      if (result1 && result2 && result3 && result4) {
        console.log('보냈다')
        window.location.replace('/auth/login')
        axios
          .post('/auth/signup', userInfo)
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
/* 인풋 태그 공통*/
input {
  padding: 18px 25px;
  border: none;
  font-size: 15px;
}

input:focus {
  outline: none;
}

/* 페이지 타이틀 */
.title {
  position: absolute;
  text-shadow: 30px 30px 3px rgb(113, 111, 111);
  left: 50%;
  font-size: 1.6rem;
  color: #815854;
  transform: translate(-50%);
  margin-top: 8rem;
}

/* 회원가입 폼 컨테이너 */
.signup_container {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
}

/* 회원가입 폼 */
.signup_form {
  max-width: 500px;
  border-radius: 5px;
  border-top-left-radius: 2px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 25px;
  width: 100%;
  height: 100%;
  background: linear-gradient(100deg, #9a706c, #483332);
  max-height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: inset 10px 10px 2px #c78d87, 40px 70px 5px rgba(0, 0, 0, 0.464);
  animation: updown 1s infinite alternate ease-in-out;
}

@keyframes updown {
  from {
    transform: translate(-50%, -49.9%);
  }
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

.double_check_btn {
  border: none;
  width: 50px;
  background-color: #d19e9a;
}

.double_check_btn:hover {
  background-color: #ddbc9e;
  cursor: pointer;
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
/* 닉네임 */
.nickname_con {
  display: flex;
  background-color: white;
}

/* 회원가입 요청 버튼 */
.signup_btn {
  text-align: center;
  width: 200px;
  margin-top: 1rem;
  font-size: 15px;
  border: none;
  border-radius: 20px;
  background-color: #f9ebde;
  color: #815854;
  font-weight: 600;
  padding: 10px;
  box-shadow: inset 1px 1px 5px black;
}

.signup_btn:hover {
  cursor: pointer;
  background-color: bisque;
}
</style>
