<template>
  <div class="container">
    <div class="hos_info_box">
      <div class="map_box"></div>
      <div class="hos_info">
        <p>{{ this.hosInfo.name }}</p>
        <p>{{ this.hosInfo.name }}</p>
        <p>{{ this.hosInfo.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'hospital-detail',
  data() {
    return {
      hosInfo: {}
    }
  },
  methods: {},
  async mounted() {
    const hosId = this.$route.params.id
    console.log(hosId)
    await axios
      .get(`http://localhost:3000/service/hospital/${hosId}`)
      .then((res) => {
        console.log(res.data.result)
        this.hosInfo = res.data.result
      })
      .catch((e) => {
        console.log('데이터를 가져오는 중 에러가 발생했습니다.:', e)
      })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.map_box {
  width: 50%;
  height: 100%;
}
.hos_info_box {
  margin: 30px auto;
  border: 1px solid black;
  border-radius: 5px;
  width: 80%;
  height: 60%;
  background: beige;
  display: flex;
}
.hos_info {
  width: 50%;
  height: 100%;
}
</style>
