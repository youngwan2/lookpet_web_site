<template>
  <div>
    <section>
      <h1>멍이사전</h1>
      <form action="#" class="dog_search_form" @submit.prevent="submit">
        <input type="text" id="dog_search" />
      </form>
      <ul>
        <li>
          <div></div>
          <p>{{ dogBreedInfo }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dogBreedInfo: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/dog/breed')
      console.log(response)
      this.dogBreedInfo = response.data
    } catch (error) {
      console.error('dog 정보를 받아오는 중 에러가 발생하였습니다:', error)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
</style>
