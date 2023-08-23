<template>
  <div class="container">
    <h1>펫 등록</h1>
    <div class="register_card">
      <form @submit.prevent="petRegister" class="pet_register_form">
        <div>
          <img src="" alt="" />
        </div>
        <div class="pet_name">
          <span>이름:</span>
          <input type="text" />
        </div>
        <div class="pet_breeds">
          <span>종:</span>
          <input type="text" />
        </div>
        <div class="pet_breeds">
          <span>성별:</span>
          ♂
          <input type="checkbox" v-model="gender" value="♂" />
          ♀
          <input type="checkbox" v-model="gender" value="♀" />
        </div>
      </form>
      <div></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'register',
  data() {
    return {
      petname: '',
      breeds: '',
      gender: [],
      age: '',
      introduce: ''
    }
  },
  watch: {
    gender: function () {
      console.log('Selected gender: ' + this.gender)
    }
  },
  methods: {
    petRegister() {
      const petInfo = {
        petname: this.petname,
        breeds: this.breeds,
        gender: this.gender,
        age: this.age,
        introduce: this.introduce
      }
      //   const nameReg = /^[가-힣]{1,8}/ // 한글 1~8자까지
      //   const breedsReg = /^[가-힣]{1,15}/ //한글 최대 15자
      //   const ageReg = /^[0,9]{1,2}/ // 숫자만 최대 2자

      //   const [result1, result2, result3] = [
      //     nameReg.test(this.username),
      //     breedsReg.test(this.password),
      //     ageReg.test(this.email)
      //   ]

      axios
        .post('http://localhost:3000/mypage/register', petInfo)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log('펫 등록중 오류가 발생했습니다.:', err)
        })
    }
  }
}
</script>
<style></style>
