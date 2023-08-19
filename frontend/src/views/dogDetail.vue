<template>
  <div class="detail_view">
    <h3 class="detail_title">{{ dogDetail.name }}({{ dogDetail.ko_name }})</h3>
    <div class="detail_card">
      <div class="detail_image"><img src="#" alt="강아지 이미지" /></div>
      <div class="detail_info">
        <p>식별</p>
        <p>{{ dogDetail.id }}</p>
        <p>이름(영문)</p>
        <p>{{ dogDetail.ko_name }}({{ dogDetail.name }})</p>
        <p>수명</p>
        <p>{{ dogDetail.life }}</p>
        <p>체중</p>
        <p>{{ dogDetail.weight }}</p>
        <p>색깔</p>
        <p>{{ dogDetail.colors }}</p>
      </div>
    </div>
    <div class="detail_bottom">
      <p class="detail_text">기원 및 역사</p>
      <p class="detail_text">{{ dogDetail.origin }}</p>
      <p class="detail_text">성격</p>
      <p class="detail_text">{{ dogDetail.personality }}</p>
      <p class="detail_text">돌봄</p>
      <p class="detail_text">{{ dogDetail.care }}</p>
      <p class="detail_text">건강</p>
      <p class="detail_text">{{ dogDetail.health }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'detail',
  data() {
    return {
      dogDetail: {}
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id
      const res = await axios.get(
        `http://localhost:3000/dog/breed/detail/${id}`
      )
      this.dogDetail = res.data
      console.log(this.dogDetail)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.detail_view {
  margin: 30px;
  border: 1px solid black;
  padding: 10px;
}
.detail_title {
  margin-bottom: 10px;
}
.detail_card {
  width: 100%;
  height: 300px;
  display: flex;
  padding: 5px;
}
.detail_image {
  display: inline-block;
  width: 300px;
  border: 2px solid gray;
  border-radius: 15px;
  box-shadow: 5px 5px 10px gray;
  margin-right: 10px;
}
.detail_info {
  width: 70%;
  padding: 10px;
  display: inline-block;
}
p {
  margin: auto;
  margin-bottom: 5px;
}
.detail_info > p:nth-child(odd) {
  background: rgb(231, 200, 159);
  display: inline-block;
  border-radius: 10px;
  padding: 3px;
}
.detail_bottom {
  margin-top: 5px;
  width: 100%;
  height: 300px;
  padding: 10px;
}
.detail_bottom > p:nth-child(odd) {
  background: rgb(231, 200, 159);
  display: inline-block;
  border-radius: 10px;
  padding: 3px;
}
</style>
