<template>
  <div class="container">
    <h1 class="mypage_title">마이페이지</h1>
    <h1 class="mypage_info_exist" v-if="!petInfo">{{ exist }}</h1>
    <hr />
    <div class="pet_list" v-if="petInfo">
      <div class="pet_card" v-for="pet in petInfo" :key="pet">
        <div class="pet_image_box">
          <img class="pet_image" :src="pet.petimage" alt="pet_image" />
        </div>
        <div class="pet_info">
          <div class="pet_info_detail">
            <span>이름</span><span>{{ pet.petname }}</span>
          </div>
          <div class="pet_info_detail">
            <span>종</span><span>{{ pet.breeds }}</span>
          </div>
          <div class="pet_info_detail">
            <span>성별</span><span>{{ pet.gender[0] }}</span>
          </div>
          <div class="pet_info_detail">
            <span>나이</span><span>{{ pet.age }}</span>
          </div>
        </div>
        <div class="pet_info_detail">
          <span>아이 소개</span><br />
          <span>{{ pet.introduce }}</span>
        </div>
      </div>
    </div>
    <router-link :to="'/mypage/register'">
      <button class="pet_register">펫 등록하기</button>
    </router-link>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'mypage',
  data() {
    return {
      exist: '펫 등록을 해주세요.',
      username: '',
      petInfo: {}
    }
  },
  async mounted() {
    this.username = document.cookie.split('=')[1]
    await axios
      .get('/mypage', {
        params: { username: this.username }
      })
      .then((res) => {
        this.petInfo = res.data
        console.log(this.petInfo)
      })
      .catch((e) => {
        console.log('mypage 데이터를 불러오는 중 에러가 발생했습니다.:', e)
      })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.pet_list {
  display: flex;
}
.mypage_title {
  text-align: center;
}
.mypage_info_exist {
  text-align: center;
}
.pet_register {
  margin: 10px;
  border: none;
  border-radius: 20px;
  width: 100px;
  height: 60px;
  background: rgb(255, 145, 0);
  font-weight: 800;
  font-size: 1em;
  transition: 0.1s ease-in;
}
.pet_register:hover {
  box-shadow: 3px 3px 10px rgb(230, 81, 81);
  background: rgb(236, 37, 104);
  transform: scale(1.01);
}
.pet_register:active {
  box-shadow: -3px -3px 5px rgb(122, 46, 46);
}
.pet_card {
  border: 3px solid orange;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.pet_image_box {
  margin-bottom: 10px;
}
.pet_info_detail {
  margin-bottom: 10px;
}
.pet_info_detail > span:first-child {
  background: orange;
  border-radius: 5px;
  margin-right: 10px;
  padding: 2px;
}
</style>
