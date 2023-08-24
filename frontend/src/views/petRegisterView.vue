<template>
  <div class="container">
    <h1>펫 등록</h1>
    <div class="register_card">
      <form @submit.prevent="petRegister" class="pet_register_form">
        <div class="pet_image">
          <img v-if="petimage" :src="petimage" alt="pet_image" />
          <label for="pet_image_input" v-if="inputState"
            >이미지를 올려주세요.
          </label>
          <input
            id="pet_image_input"
            class="pet_image_input"
            type="file"
            accept="image/*"
            @change="imageUpload"
          />
        </div>
        <div class="pet_name">
          <span>이름 :</span>
          <input type="text" v-model="petname" />
        </div>
        <div class="pet_breeds">
          <span>종 :</span>
          <input type="text" v-model="breeds" />
        </div>
        <div class="pet_gender">
          <span>성별 :</span>
          <span class="gender_icon" id="gender_male">♂</span>
          <input type="checkbox" v-model="gender" value="♂" />
          <span class="gender_icon" id="gender_female">♀</span>
          <input type="checkbox" v-model="gender" value="♀" />
        </div>
        <div class="pet_age">
          <span>나이 :</span>
          <input type="number" v-model="age" min="1" />
        </div>
        <div class="pet_introduce">
          <span>아이 소개 :</span>
          <input type="text" v-model="introduce" />
        </div>
        <button type="submit" class="pet_register">펫 등록하기</button>
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
      petimage: '',
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
    imageUpload(e) {
      const image = e.target.files[0]
      if (image) {
        const reader = new FileReader()
        reader.onload = () => {
          this.petimage = reader.result
          console.log(this.petimage)
        }
        reader.readAsDataURL(image)
      }
    },
    petRegister() {
      const petInfo = {
        petimage: this.petimage,
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
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.gender_icon {
  font-size: 1.4rem;
  font-weight: 800;
}
#gender_male {
  color: blue;
}
#gender_female {
  color: red;
}
.pet_image_input {
  visibility: hidden;
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
</style>
