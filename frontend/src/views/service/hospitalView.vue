<template>
  <div>
    <div>
      <h1>동물병원 정보 조회</h1>
    </div>
    <hr />
    <ul>
      <li class="region_menu" v-for="p in region" :key="p" @click="select = p">
        <router-link :to="'/service/hospital/' + p"> {{ p }} | </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hospital',
  data() {
    return {
      hospitalInfo: {},
      region: [
        '서울',
        '부산',
        '대구',
        '인천',
        '광주',
        '대전',
        '울산',
        '세종',
        '경기',
        '강원',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주'
      ],
      select: ''
    }
  },
  async mounted() {
    await axios
      .get('http://localhost:3000/service/hospital')
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          this.hospitalInfo = response.data
          console.log(this.hospitalInfo)
        }
      })
      .catch((error) => {
        console.log(
          '동물병원정보 데이터를 가져오는중에 에러가 발생했습니다.:',
          error
        )
      })
  }
}
</script>

<style scoped>
.region_menu {
  display: inline-block;
  list-style: none;
}
</style>
