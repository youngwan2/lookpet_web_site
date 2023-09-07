<template>
  <div class="container">
    <div class="head_line">
      <div class="move_back" @click="moveBack"><h1>←</h1></div>
      <h1 class="pet_register_title">펫 등록</h1>
    </div>
    <hr />
    <div class="content">
      <div class="side_menu">
        <ul class="side_list">
          <div class="user_menu">
            <li class="side_title">회원정보</li>
            <ol class="user_edit">
              수정하기
            </ol>
          </div>
          <div class="pet_menu">
            <li class="side_title">마이펫</li>
            <ol class="pet_register">
              펫 등록하기
            </ol>
          </div>
        </ul>
      </div>
      <form @submit.prevent="petRegister" class="pet_register_form">
        <div class="pet_info">
          <div class="pet_image_box">
            <img
              class="pet_image"
              v-if="petimage"
              :src="petimage"
              alt="pet_image"
            />
            <label for="pet_image_input"
              ><div class="pet_image_label" v-if="!petimage">
                <div class="move_label">
                  <span class="add_icon">+</span>
                  <span>이미지를 올려주세요</span>
                </div>
              </div>
            </label>
            <label for="pet_image_input"
              ><div v-if="petimage" class="change_image">
                이미지 변경
              </div></label
            >
            <input
              id="pet_image_input"
              type="file"
              accept="image/*"
              @change="imageUpload"
            />
          </div>
          <div class="pet_info_box">
            <div class="pet_info_detail">
              <span>이름</span>
              <input
                class="info_text"
                autocomplete="off"
                type="text"
                v-model="petname"
              />
            </div>
            <div class="pet_info_detail">
              <span>종</span>
              <input
                class="info_text"
                autocomplete="off"
                type="text"
                v-model="breeds"
              />
            </div>
            <div class="pet_info_detail">
              <span>성별</span>
              <span class="gender_icon" id="gender_male">♂</span>
              <input
                class="checkbox"
                type="checkbox"
                v-model="gender"
                @change="checkGender"
                value="♂"
              />
              <span class="gender_icon" id="gender_female">♀</span>
              <input
                class="checkbox"
                type="checkbox"
                v-model="gender"
                @change="checkGender"
                value="♀"
              />
            </div>
            <div class="pet_info_detail">
              <span>나이</span>
              <input
                class="info_text"
                autocomplete="off"
                type="number"
                v-model="age"
                min="1"
              />
            </div>
            <div class="pet_info_detail">
              <span>소개</span>
              <textarea
                class="info_text"
                id="pet_introduce"
                type="text"
                autocomplete="off"
                v-model="introduce"
              ></textarea>
            </div>
            <button type="submit" class="pet_register_btn">펫 등록하기</button>
          </div>
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
      petimage: '',
      petname: '',
      breeds: '',
      gender: [],
      age: '',
      introduce: '',
      username: ''
    }
  },
  watch: {
    gender: function () {
      console.log('Selected gender: ' + this.gender)
    }
  },
  methods: {
    checkGender() {
      // gender 배열에 요소가 두 개 이상인 경우 두 번째 요소를 제거
      if (this.gender.length > 1) {
        this.gender.pop()
      }
    },
    moveBack() {
      this.$router.push({ path: '/mypage' })
    },
    async imageUpload(e) {
      const image = e.target.files[0]
      if (image) {
        const resizedImageFile = await this.resizeImage(image, 300, 300)
        const reader = new FileReader()
        reader.onload = () => {
          this.petimage = reader.result
        }
        reader.readAsDataURL(resizedImageFile)
      }
    },
    async resizeImage(imageFile, width, height) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = URL.createObjectURL(imageFile)
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob((blob) => {
            resolve(new File([blob], imageFile.name, { type: imageFile.type }))
          }, imageFile.type)
        }
      })
    },
    async petRegister() {
      const petInfo = {
        username: this.username,
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
      await axios
        .post('http://localhost:3000/mypage/register', petInfo)
        .then((res) => {
          console.log(res)
          this.$router.push('/mypage')
        })
        .catch((err) => {
          console.log('펫 등록중 오류가 발생했습니다.:', err)
        })
    }
  },
  mounted() {
    this.username = document.cookie.split('=')[1]
    console.log(this.username)
  }
}
</script>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.head_line {
  display: flex;
}
.pet_register_title {
  margin: auto;
}
.move_back {
  background: #815854;
  border-radius: 10px;
  margin: 10px;
  padding: 0 10px;
  padding-bottom: 5px;
  color: #f9ebde;
  transition: 0.1s;
}
.move_back:hover {
  transform: scale(1.05);
  background: rgb(198, 111, 17);
  cursor: pointer;
}
.content {
  display: flex;
  width: 100%;
}
.side_menu {
  max-width: 300px;
  min-width: 250px;
  padding: 10px 0;
  margin-right: 100px;
  background: #815854;
  overflow: hidden;
}
.user_menu {
  margin-bottom: 30px;
}
.user_edit {
  transition: 0.3s;
  margin-left: -20px;
  white-space: nowrap;
}
.user_edit:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
.user_edit:active {
  box-shadow: -1px -1px 5px gray;
}
.pet_register {
  background: rgb(198, 111, 17);
  border-bottom: 1px solid #f9ebde;
}
.side_list {
  width: 400px;
  min-width: 200px;
  /* background: #815854; */
  color: #f9ebde;
  width: 100%;
  list-style: none;
  transition: 0.1s;
  margin-bottom: 5px;
  transition: 0.3s;
}
.side_title {
  font-weight: 800;
  font-size: 1.2em;
  display: inline-block;
  margin-bottom: 10px;
}
.pet_info {
  display: flex;
  width: 100%;
  margin-top: 20px;
}
.pet_info_box {
  margin: 10px;
  min-width: 200px;
  position: relative;
  height: 700px;
}
.info_text {
  border: none;
  position: absolute;
  width: 300px;
  left: 100px;
  height: 30px;
  padding: 10px;
  border-radius: 30px;
  background: #815854;
  font-size: 1.5rem;
  opacity: 0.7;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
}
.info_text:focus {
  opacity: 1;
  box-shadow: 5px 5px 10px gray;
}
.pet_image_box {
  width: 300px;
  height: 300px;
  border: 5px solid #815854;
  border-radius: 30px;
  margin: 10px;
  margin-right: 100px;
  box-shadow: 5px 5px 10px gray;
}
.pet_register_btn {
  background: #815854;
  color: #f9ebde;
  border: none;
  border-radius: 10px;
  position: relative;
  top: 250px;
  left: 100px;
  width: 100px;
  height: 50px;
  transition: 0.15s;
  box-shadow: 3px 3px 7px gray;
}
.pet_register_btn:hover {
  transform: scale(1.05);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.pet_register_btn:active {
  background: rgb(198, 111, 17);
  box-shadow: -3px -3px 5px gray;
}
#gender_box {
  margin-right: 60px;
}
.gender_icon {
  font-size: 2rem;
  font-weight: 800;
  margin-right: 10px;
}
#gender_male {
  margin-left: 60px;
  color: blue;
}
#gender_female {
  color: red;
}
input[type='checkbox'] {
  width: 25px; /* 원하는 너비 설정 */
  height: 25px; /* 원하는 높이 설정 */
  margin-right: 10px;
}
#pet_image_input {
  display: none;
}
.pet_image_label {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.move_label {
  position: absolute;
  top: 100px;
  left: 50px;
  width: 200px;
  height: 100px;
  text-align: center;
  background: #815854;
  color: #f9ebde;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  animation: addImage 1s alternate infinite linear;
}
@keyframes addImage {
  from {
    transform: scale(1) rotate(-3deg);
  }
  to {
    transform: scale(1.1) rotate(3deg);
  }
}
.change_image {
  width: 100px;
  height: 40px;
  text-align: center;
  background: #815854;
  border-radius: 15px;
  color: #f9ebde;
  position: relative;
  margin-top: 20px;
  left: 100px;
  display: inline-block;
  padding-top: 15px;
  transition: 0.15s;
}
.change_image:hover {
  transform: scale(1.05);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.change_image:active {
  background: rgb(198, 111, 17);
  box-shadow: -3px -3px 5px gray;
}
.add_icon {
  font-size: 3rem;
}
.pet_info_box {
  margin-top: 15px;
}
.pet_info_detail {
  height: 50px;
  margin-bottom: 15px;
}
#pet_introduce {
  width: 500px;
  min-width: 300px;
  height: 250px;
  padding: 10px;
  font-size: 1.2rem;
}
.pet_info_detail > span:first-child {
  background: #815854;
  color: #f9ebde;
  position: relative;
  top: 5px;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
}
</style>
