<template>
  <div class="container">
    <div class="content">
      <div class="side_menu" :class="{ 'hidden-menu': !isSideMenuOpen }">
        <h2 class="mypage_title" @click="toMypage">마이페이지</h2>
        <ul class="side_list">
          <div class="user_menu">
            <li class="side_title">회원정보</li>
            <ol @click="userEdit" class="active_btn">
              정보수정
            </ol>
            <ol @click="withDrawal" class="active_btn">
              회원탈퇴
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
      <div class="toggle-button-container">
        <button @click="toggleSideMenu" class="toggle-button">
          {{ isSideMenuOpen ? '<<' : '>>' }}
        </button>
      </div>
      <div class="info_container">
        <form @submit.prevent="petRegister" class="pet_register_form">
          <div class="pet_info">
            <div class="pet_top">
              <div class="pet_image_box">
                <img
                  class="pet_image"
                  v-if="petimage"
                  :src="petimage"
                  alt="pet_image"
                />
                <label for="pet_image_input">
                  <div class="move_label" v-if="!petimage">
                    <span class="add_icon">+</span>
                    <span>이미지를 올려주세요</span>
                  </div>
                </label>
                <label for="pet_image_input"
                  ><div v-if="petimage" class="change_image">
                    <span>이미지 변경</span>
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
                  <span>품종</span>
                  <input
                    class="info_text"
                    autocomplete="off"
                    type="text"
                    v-model="breeds"
                  />
                </div>
                <div class="pet_info_detail">
                  <span>성별</span>
                  <div class="gender_box">
                    <div class="gender">
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
                  </div>
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
              </div>
            </div>
            <div class="pet_info_introduce">
              <span>소개</span><br />
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
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Register',
  data() {
    return {
      petimage: '',
      petname: '',
      breeds: '',
      gender: [],
      age: '',
      introduce: '',
      username: '',
      isSideMenuOpen: true,
      sideMenuWidth: 0, // side_menu의 초기 width 값
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    }
  },
  watch: {
    gender: function () {
      console.log('Selected gender: ' + this.gender)
    }
  },
  created() {
    document.title = this.$route.name
    window.addEventListener('resize', this.handleResize)
    this.handleResize() // 페이지 로드 시 초기 상태 설정
  },
  methods: {
    toggleSideMenu() {
      // 스크린 너비가 600px 이하인 경우에만 토글로 열림/닫힘 상태 변경
      this.isSideMenuOpen = !this.isSideMenuOpen
    },
    handleResize() {
      // 스크린 너비 업데이트
      this.screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      // 스크린 너비가 600px 이하인 경우, 메뉴를 닫도록 설정
      if (this.screenWidth <= 900) {
        this.isSideMenuOpen = false
      } else {
        // 스크린 너비가 600px 초과인 경우, 메뉴를 열도록 설정
        this.isSideMenuOpen = true
      }
    },
    toMypage() {
      this.$router.push({ path: '/mypage' })
    },
    withDrawal() {
      this.$router.push({ path: '/mypage/withdrawal' })
    },
    userEdit() {
      this.$router.push({ path: '/mypage/useredit' })
    },
    checkGender() {
      // gender 배열에 요소가 두 개 이상인 경우 두 번째 요소를 제거
      if (this.gender.length > 1) {
        this.gender.pop()
      }
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
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    this.username = document.cookie.split('=')[1]
    console.log(this.username)

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.mypage_title {
  text-align: center;
  color: #f1dec9;
  background: #a4907c;
  text-shadow: 1px 1px 1px gray;
  box-shadow: 0 3px 5px #8d7b68;
  margin: 1rem 0 2rem 0;
  transition: 0.15s;
}
.mypage_title:hover {
  box-shadow: 0 5px 5px #8d7b68;
  background: #8d7b68;
  transform: scale(1.02);
  cursor: pointer;
}
.container {
  width: 100%;
  height: 100%;
  min-height: 80vh;
}
.content {
  display: flex;
  margin: 3rem 0;
  width: 100%;
  height: 100%;
}

.side_menu {
  margin: 0;
  width: 30%;
  min-height: 70vh;
  border: 3px solid #8d7b68;
  border-radius: 0 10px 10px 0;
  box-shadow: 2px 0 2px #8d7b68;
  max-width: 300px;
  min-width: 250px;
  padding: 10px 0;
  margin-right: 10px;
  background: #f1dec9;
  overflow: hidden;
  transition: 0.2s linear;
}
@media screen and (max-width: 870px) {
  .side_menu {
    transform: translateX(-100%);
  }
}
.user_menu {
  margin-bottom: 30px;
}
.pet_register {
  color: #f1dec9;
  margin-left: -10px;
  background: #a4907c;
  border-bottom: 1px solid #8d7b68;
  max-width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 10px;
}
.side_list {
  width: 100%;
  color: #8d7b68;
  list-style: none;
  margin-bottom: 5px;
  transition: 0.3s;
}
.side_title {
  font-weight: 800;
  font-size: 1.2em;
  display: inline-block;
  margin-bottom: 10px;
}
.active_btn {
  transition: 0.3s;
  margin-left: -20px;
  max-width: 120px;
  font-weight: 500;
  font-size: 1.1rem;
}
.active_btn:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f1dec9;
  border-radius: 10px;
  background: #a4907c;
  box-shadow: 0 0 1px rgb(247, 247, 247);
  cursor: pointer;
}
.info_container {
  width: 100%;
  height: 100%;
}
.pet_info {
  max-width: 700px;
  border: 5px solid #8d7b68;
  margin: auto;
}
.pet_top {
  display: flex;
  text-align: center;
}
@media screen and (max-width: 600px) {
  .pet_top {
    display: block; /* 미디어 쿼리가 적용될 때, display를 block으로 변경 */
  }
}
.pet_info_box {
  margin: 30px 10px;
  position: relative;
}
.info_text {
  width: 70%;
  height: 30px;
  padding-left: 10px;
  border-radius: 20px;
  border: 3px solid #8d7b68;
  background: #ffffff;
  font-size: 1.5rem;
  opacity: 0.6;
  color: #7f0404;
  box-shadow: 3px 3px 3px gray;
}
.info_text:focus {
  opacity: 1;
  box-shadow: 3px 3px 3px gray;
}
.pet_image_box {
  width: 300px;
  height: 300px;
  border: 5px solid #8d7b68;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 5px 5px 10px gray;
  display: inline-block;
}

.pet_register_btn {
  background: #c8b6a6;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 50px;
  transition: 0.15s;
  box-shadow: 3px 3px 7px gray;
  margin: 10px;
  float: right;
}
.pet_register_btn:hover {
  transform: scale(1.03);
  color: #f9ebde;
  background: #a4907c;
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.pet_register_btn:active {
  background: #8d7b68;
  box-shadow: -3px -3px 5px gray;
}
.gender_icon {
  font-size: 1.6rem;
  font-weight: 800;
  margin-right: 10px;
}
#gender_male {
  margin-left: 80px;
  color: blue;
}
#gender_female {
  color: red;
}
input[type='checkbox'] {
  width: 25px;
  margin-right: 10px;
}
#pet_image_input {
  display: none;
}
.move_label {
  margin: 80px auto;
  width: 70%;
  height: 35%;
  text-align: center;
  background: #c8b6a6;
  color: #f9ebde;
  cursor: pointer;
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
  width: 40%;
  height: 15%;
  text-align: center;
  background: #c8b6a6;
  border-radius: 15px;
  color: #f9ebde;
  position: relative;
  margin: 10px auto;
  transition: 0.15s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.change_image:hover {
  transform: scale(1.05);
  color: #f9ebde;
  background: #a4907c;
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.change_image:active {
  background: #8d7b68;
  box-shadow: -3px -3px 5px gray;
}
.add_icon {
  font-size: 3rem;
}
.pet_info_detail {
  margin-bottom: 30px;
  position: relative;
  display: flex;
  justify-content: space-around;
}

/** 펫 성별 */
.gender_box {
  width: 70%;
  padding-left: 10px;
}
.gender {
  display: flex;
}

.pet_info_introduce {
  margin: 30px 10px 0 10px;
}
.pet_info_introduce > span {
  background: #8d7b68;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
  display: inline-block;
}
#pet_introduce {
  width: 94%;
  min-height: 200px;
  padding: 10px;
  margin: 10px auto;
  font-size: 1.2rem;
}
.pet_info_detail > span:first-child {
  background: #8d7b68;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
}
.hidden-menu {
  transform: translate(-100%);
  position: absolute;
  box-shadow: 5px 0 10px #8d7b68;
  transition: transform 0.1s ease;
}
.toggle-button-container {
  position: relative;
}

.toggle-button {
  position: relative;
  right: 10px; /* 사이드 메뉴 오른쪽에 배치 */
  top: 250px;
  background-color: #a4907c;
  box-shadow: 5px 0 3px #8d7b68;
  color: #f9ebde;
  font-size: 1.2rem;
  border: none;
  border-radius: 0 10px 10px 0;
  width: 35px;
  height: 100px;
  cursor: pointer;
  transition: 0.1s linear;
}
.toggle-button:hover {
  box-shadow: inset 5px 0 2px #8d7b68;
  background: #8d7b68;
}
</style>
