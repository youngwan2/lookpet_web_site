<template>
  <div class="container">
    <h1 class="mypage_title">마이페이지</h1>
    <hr />
    <div class="content">
      <div class="side_menu" :class="{ 'hidden-menu': !isSideMenuOpen }">
        <ul class="side_list">
          <div class="user_menu">
            <li class="side_title">회원정보</li>
            <ol @click="userEdit">
              수정하기
            </ol>
            <ol @click="withDrawal">
              탈퇴하기
            </ol>
          </div>
          <div class="pet_menu">
            <li class="side_title">마이펫</li>
            <ol @click="registerPet" class="pet_register">
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
      <div class="pet_list" v-if="petInfo" ref="petList">
        <h1 class="pet_info_not" v-if="petInfo == ''">펫 등록을 해주세요.</h1>
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
              @click="editPetData(pet.petId)"
            >
              수정
            </button>
            <button
              class="card_btn"
              id="delete_btn"
              @click="delPetData(pet.petId)"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
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
      petInfo: {},
      isSideMenuOpen: true,
      sideMenuWidth: 0, // side_menu의 초기 width 값
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    }
  },
  created() {
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
    withDrawal() {
      this.$router.push({ path: '/mypage/withdrawal' })
    },
    userEdit() {
      this.$router.push({ path: '/mypage/useredit' })
    },
    registerPet() {
      this.$router.push({ path: '/mypage/register' })
    },
    editPetData(id) {
      this.$router.push({ path: `/mypage/petedit/${id}` })
    },
    delPetData(id) {
      console.log(id)
      const isAgree = confirm('정말 삭제하시겠습니까?')

      if (isAgree) {
        axios
          .delete(`http://localhost:3000/mypage/${id}`)
          .then((response) => {
            if (response.status === 200) {
              window.location.reload()
            }
          })
          .catch((error) => {
            console.log('게시글 삭제 중 문제가 발생하였습니다 ::', error)
          })
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
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

    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    const petList = this.$refs.petList

    petList.addEventListener('wheel', (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault()
        petList.scrollLeft += event.deltaY
      }
    })
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.mypage_title {
  text-align: center;
}
.mypage_info_exist {
  text-align: center;
}
.content {
  display: flex;
  width: 100%;
}
.side_menu {
  margin: 0;
  width: 30%;
  max-width: 300px;
  min-width: 250px;
  min-height:600px;
  padding: 10px 0;
  margin-right: 10px;
  background: #815854;
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
ol {
  transition: 0.3s;
  margin-left: -20px;
}
ol:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
ol:active {
  box-shadow: -1px -1px 5px gray;
}
.pet_card {
  width: 320px;
  border: 3px solid #815854;
  padding-bottom: 40px;
  margin: 10px;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  position: relative;
  box-shadow: 5px 5px 10px gray;
  transition: 0.15s;
}
.pet_card:hover {
  transform: translateY(-10px);
}
.pet_image_box {
  margin: 10px;
}
.pet_info {
  margin: 10px;
}
.pet_info_detail {
  margin-bottom: 10px;
}
.pet_info_not {
  margin: auto;
}
.pet_list::-webkit-scrollbar {
  height: 10px;
}

.pet_list::-webkit-scrollbar-track {
  background-color: #815854;
}

.pet_list::-webkit-scrollbar-thumb {
  background-color: #f5b880;
}

.pet_list::-webkit-scrollbar-thumb:hover {
  background-color: #f5963c;
}
.pet_info_detail > span:first-child {
  background: #815854;
  color: #f9ebde;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 3px;
}
.card_btn_box {
  position: absolute;
  bottom: 5px;
  right: 5px;
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
.hidden-menu {
  display: none;
}
.toggle-button-container {
  position: relative;
}

.toggle-button {
  position: relative;
  right: 10px; /* 사이드 메뉴 오른쪽에 배치 */
  top: 250px;
  background-color: #613d3a;
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
