<template>
  <div>
    <div class="category"></div>
    <div>
      <div>
        <h1>동반가능 조회 서비스</h1>
      </div>
      <hr />
      <div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'culture',
  data() {
    return {
      menu: '',
      cultureInfo: {}
    }
  },
  async mounted() {
    await axios
      .get('http://localhost:3000/service/culture')
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.cultureInfo = response.data
          console.log(this.cultureInfo)
        }
      })
      .catch((error) => {
        console.log(
          '동반가능 문화시설 정보를 가져오는중 에러가 발생했습니다.',
          error
        )
      })
  }
}
</script>

<style scoped></style>
