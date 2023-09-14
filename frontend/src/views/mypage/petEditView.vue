<template>
  <div class="container">
    <div class="head_line">
      <div class="move_back" @click="moveBack"><h1>←</h1></div>

    </div>
    <div class="content">
      <div class="side_menu" :class="{ 'hidden-menu': !isSideMenuOpen }">
        <h2 class="pet_edit_title">펫 정보 수정</h2>
        <ul class="side_list">
          <div class="user_menu">
            <li class="side_title">회원정보</li>
            <ol @click="userEdit" class="active_btn">
              수정하기
            </ol>
            <ol @click="withDrawal" class="active_btn">
              탈퇴하기
            </ol>
          </div>
          <div class="pet_menu">
            <li class="side_title">마이펫</li>
            <ol @click="registerPet" class="active_btn">
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
      <form @submit.prevent="updatePetInfo" class="pet_register_form">
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
              <div class="gender_info_detail">
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
          <button class="pet_edit_btn" @click="pageMove">취소</button>
          <button type="submit" class="pet_edit_btn">수정하기</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Petedit',
  data() {
    return {
      petInfo: {},
      id: '',
      username: '',
      petimage: '',
      petname: '',
      breeds: '',
      age: '',
      introduce: '',
      isSideMenuOpen: true,
      sideMenuWidth: 0, // side_menu의 초기 width 값
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
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
      if (this.screenWidth <= 600) {
        this.isSideMenuOpen = false
      } else {
        // 스크린 너비가 600px 초과인 경우, 메뉴를 열도록 설정
        this.isSideMenuOpen = true
      }
    },
    moveBack() {
      this.$router.push({ path: '/mypage' })
    },
    withDrawal() {
      this.$router.push({ path: '/mypage/withdrawal' })
    },
    userEdit() {
      this.$router.push({ path: '/mypage/useredit' })
    },
    registerPet() {
      this.$router.push({ path: '/mypage/register' })
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
    updatePetInfo() {
      console.log(this.id)
      const newPetInfo = {
        petId: this.id,
        username: this.petInfo.username,
        petimage: this.petimage,
        petname: this.petname,
        breeds: this.breeds,
        gender: this.petInfo.gender,
        age: this.age,
        introduce: this.introduce
      }
      console.log(newPetInfo)
      axios
        .post(`/mypage/petedit/${this.id}`, {
          newPetInfo
        })
        .then((res) => {
          console.log(res)
          this.pageMove()
        })
        .catch((e) => {
          console.log('수정된 정보를 전송중에 에러가 발생했습니다.:', e)
        })
    },
    pageMove() {
      this.$router.push({ path: '/mypage' })
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  async mounted() {
    const petId = this.$route.params.id
    await axios
      .get(`/mypage/petedit/${petId}`)
      .then((res) => {
        this.petInfo = res.data
        this.petimage = this.petInfo.petimage
        this.petname = this.petInfo.petname
        this.breeds = this.petInfo.breeds
        this.age = this.petInfo.age
        this.introduce = this.petInfo.introduce
        this.id = petId
      })
      .catch((e) => {
        console.log('해당 펫 정보를 불러오는중에 에러가 발생했습니다.:', e)
      })

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.head_line {
  display: flex;
}
.pet_edit_title {
  text-align: center;
  color: white;
  text-shadow: 1px 1px 2px rgb(181, 60, 60);
  margin: 1rem 0 2rem 0;
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
  height: 100%;
  margin: 1rem 0;
}

.side_menu {
  margin: 0;
  width: 30%;
  border-radius: 10px;
  max-width: 300px;
  min-width: 250px;
  padding: 10px 0;
  margin-right: 10px;
  background: #ff5f5f;
  overflow: hidden;
  transition: 0.2s linear;
}
@media screen and (max-width: 600px) {
  .side_menu {
    display: none;
  }
}
.user_menu {
  margin-bottom: 30px;
}
.side_list {
  width: 100%;
  color: #f9ebde;
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
.pet_list {
  display: flex;
  width: 100%;
  overflow-x: auto;
}

/** 사이드 메뉴 세부 리스트(회원정보/마이펫 영역) */
ol {
  transition: 0.3s;
  margin-left: -20px;
  max-width: 120px;
}
ol:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  border-radius: 10px;
  background: rgb(219, 58, 58);
  box-shadow: 0 0 1px rgb(247, 247, 247);
  cursor: pointer;
}
ol:active {
  box-shadow: -1px -1px 5px gray;
}
.user_menu {
  margin-bottom: 30px;
}
.active_btn {
  transition: 0.3s;
  margin-left: -20px;
  white-space: nowrap;
}
.active_btn:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
.side_list {
  width: 400px;
  min-width: 200px;
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

/** 펫 정보 (우측 수정할 정보)*/
.pet_info {
  width: 100%;
  height: 100%;
  border: 3px solid #d55044;
  border-radius: 5px;
}
.pet_top {
  display: flex;
}
@media screen and (max-width: 600px) {
  .pet_top {
    display: block; /* 미디어 쿼리가 적용될 때, display를 block으로 변경 */
  }
}
.pet_info_box {
  margin: 10px;
  position: relative;
}
.info_text {
  border: none;
  width: 70%;
  height: 30px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid rgb(248, 95, 95);
  background: #ffffff;
  font-size: 1.5rem;
  opacity: 0.6;
  color: #7f0404;
  box-shadow: 5px 5px 3px gray;
}
.info_text:focus {
  opacity: 1;
  box-shadow: 3px 3px 5px gray;
}

/** 펫 이미지 */
.pet_image_box {
  width: 300px;
  height: 300px;
  border: 5px solid #e35b4f;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 5px 5px 10px gray;
  display: inline-block;
}

/** 수정/취소 버튼 */
.pet_edit_btn {
  background: #f55b4d;
  color: #f9ebde;
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 50px;
  transition: 0.15s;
  box-shadow: 3px 3px 7px gray;
  margin: 10px;
  float: right;
}
.pet_edit_btn:hover {
  transform: scale(1.05);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 5px 5px 10px gray;
  cursor: pointer;
}
.pet_edit_btn:active {
  background: rgb(198, 111, 17);
  box-shadow: -3px -3px 5px gray;
}

/** 펫 성별 */
#gender_box {
  margin-right: 60px;
}
.gender_info_detail > span:first-child {
  position: absolute;
  left: 0;
  top: 5px;
  background: #e34f41;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
}
.gender_icon {
  font-size: 1.8rem;
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
.pet_image_label {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.change_image {
  width: 40%;
  height: 15%;
  text-align: center;
  background: #f75243;
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
  background: rgb(255, 46, 46);
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
.pet_info_detail {
  margin-bottom: 30px;
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.gender_info_detail {
  margin-bottom: 30px;
  position: relative;
  display: flex;
}
#pet_introduce {
  width: 500px;
  min-width: 300px;
  height: 250px;
  padding: 10px;
  font-size: 1.2rem;
}
.pet_info_detail > span:first-child {
  position: absolute;
  left: 0;
  top: 5px;
  background: #815854;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
}
.pet_info_introduce {
  margin: 30px 10px 0 10px;
}
.pet_info_introduce > span {
  background: #e88177;
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
  position: absolute;
  left: 0;
  top: 5px;
  background: #e34f41;
  color: #f9ebde;
  box-shadow: 3px 3px 8px gray;
  border-radius: 5px;
  padding: 5px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.edit_title {
  text-align: center;
}
.hidden-menu {
  display: none;
}
.toggle-button-container {
  position: relative;
}

/* 사이드 바 토글 버튼 */
.toggle-button {
  position: relative;
  right: 10px; /* 사이드 메뉴 오른쪽에 배치 */
  top: 250px;
  background-color: #da4234;
  box-shadow: inset 5px 0 2px rgb(142, 36, 36);
  color: #f9ebde;
  font-size: 1.2rem;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 35px;
  height: 100px;
  cursor: pointer;
}
</style>
