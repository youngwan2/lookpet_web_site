<template>
  <div class="container">
    <div class="head_line">
      <div class="move_back" @click="moveBack"><h1>←</h1></div>
      <h1 class="user_info_title">유저정보 수정</h1>
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
    </div>
  </div>
</template>
<script>
import axios from 'axios'

// import axios from 'axios'
export default {
  name: 'useredit',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    moveBack() {
      this.$router.push({ path: '/mypage' })
    }
  },
  async mounted() {
    this.username = document.cookie.split('=')[1]
    await axios
      .get('http://localhost:3000/mypage/useredit', {
        params: { username: this.username }
      })
      .then((res) => {
        this.userInfo = res.data
        console.log(this.userInfo)
      })
      .catch((e) => {
        console.log('mypage 데이터를 불러오는 중 에러가 발생했습니다.:', e)
      })
  }
}
</script>
<style scoped>
.head_line {
  display: flex;
}
.user_info_title {
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
  height: 600px;
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
.pet_register {
  transition: 0.3s;
  margin-left: -20px;
  white-space: nowrap;
}
.pet_register:hover {
  border-bottom: 1px solid #f9ebde;
  transform: translateX(5px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
.pet_register:active {
  box-shadow: -1px -1px 5px gray;
}
.user_edit {
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
</style>
