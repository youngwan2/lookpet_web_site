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
          <div class="pet_info_detail">
            <span>아이 소개</span><br />
            <span>{{ pet.introduce }}</span>
          </div>
        </div>
        <div class="card_btn_box">
          <button
            class="card_btn"
            id="edit_btn"
            @click="editPetInfo(pet.petId)"
          >
            수정
          </button>
          <button class="card_btn" id="delete_btn" @click="deleteData">
            삭제
          </button>
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
  methods: {
    editPetInfo(id) {
      this.$router.push({ path: `/mypage/petedit/${id}` })
    },
    deleteData() {}
  },
  async mounted() {
    this.username = document.cookie.split('=')[1]
    await axios
      .get('http://localhost:3000/mypage', {
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
  height: 600px;
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
  background: rgb(245, 236, 220);
}
.pet_image_box {
  margin: 10px 0;
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
.card_btn_box {
  position: relative;
  top: 120px;
  left: 60px;
  opacity: 0;
  transition: 0.2s ease-in;
}
.card_btn {
  margin: 0 5px;
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  transition: 0.1s ease;
}
.card_btn:hover {
  transform: scale(1.05);
  box-shadow: 3px 3px 10px gray;
}
.card_btn:active {
  box-shadow: -1px -1px 5px gray;
}
#edit_btn {
  background: rgb(167, 196, 143);
}
#delete_btn {
  background: rgb(236, 120, 52);
}
#edit_btn:hover {
  background: rgb(115, 148, 88);
}
#delete_btn:hover {
  background: rgb(243, 99, 16);
}
.pet_card:hover .card_btn_box {
  opacity: 1;
  transform: translate(0, -10px);
}
</style>
