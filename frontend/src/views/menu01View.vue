<template>
  <div class="home">
    <h1>menu01</h1>
    <button @click="getData">가져오기</button>

    <p>강아지 이름은 {{ setData.name }} 입니다.</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'menu01View',
  components: {},
  data() {
    return {
      setData: ''
    }
  },
  methods: {
    getData() {
      axios.get('http://localhost:3000/dog').then((response) => {
        console.log(response)
        this.setData = response.data
      })
    }
  }
}
</script>
