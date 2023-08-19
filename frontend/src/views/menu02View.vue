<template>
  <div class="home">
    <h1>menu02</h1>
    <hr />
    <form action="" @submit.prevent="login" method="post">
      <input type="text" placeholder="ID" v-model="username" name="username" /><br />
      <input type="text" placeholder="PW" v-model="password" name="password" /> <br /><br />
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'menu02View',
  components: {},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      await axios
        .post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
