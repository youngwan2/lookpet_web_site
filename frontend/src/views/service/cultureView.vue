<template>
  <div>
    <div class="culture_title">
      <h1>반려동물 동반가능 문화시설 정보 조회</h1>
      <span class="page_message"
        >현재 페이지: {{ currentPage }}/{{ totalPage }}</span
      >
    </div>
    <div class="category_box">
      <button
        class="category_menu"
        v-for="p in categoryInfo"
        :key="p"
        @click="getCategoryInfo(), getCategory($event)"
      >
        {{ p }}
      </button>
    </div>
    <div class="culture_list">
      <table class="culture_table">
        <tr v-for="data in cultureInfo" :key="data.id">
          <td class="culture_name">{{ data.name }}</td>
        </tr>
      </table>
    </div>
    <nav class="pagination_nav">
      <ul class="pagination_box">
        <li class="page_shifter" @click="prevPage" v-show="currentPage !== 1">
          prev
        </li>
        <li
          class="page_shifter"
          v-for="(page, i) in pageList"
          :key="i"
          @click="getNextPage"
        >
          {{ page }}
        </li>
        <li
          class="page_shifter"
          @click="nextPage"
          v-show="totalPage > lastPage"
        >
          next
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'culture',
  data() {
    return {
      cultureInfo: {},
      categoryInfo: [
        '문예회관',
        '미술관',
        '미용',
        '박물관',
        '반려동물용품',
        '식당',
        '여행지',
        '위탁관리',
        '호텔',
        '카페',
        '펜션'
      ],
      category: '',
      currentPage: 1,
      firstPage: 1,
      displayPage: 5,
      lastPage: 5,
      currentPageGroup: Math.ceil(this.currentPage / this.displayPage),
      totalInfoCnt: 0,
      pageList: [1, 2, 3, 4, 5],
      maxPage: 0,
      totalPage: 0,
      focusPage: 1,
      focus: ''
    }
  },
  methods: {
    getCategory(e) {
      this.category = e.target.innerText
      this.currentPage = 1
    },
    // 각 번호 클릭 시 페이지 이동 함수
    getNextPage(e) {
      console.log(e.target.innerText)
      this.currentPage = e.target.innerText * 1
      this.getCategoryInfo()
      this.paginationControlFunc(this.currentPage)
    },
    // // 페이지네이션 기본 셋팅 함수
    paginationControlFunc(currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.currentPageGroup = Math.ceil(currentPage / this.displayPage)
      this.lastPage = this.displayPage * this.currentPageGroup
      this.firstPage = this.lastPage - this.displayPage + 1

      console.log('첫페이지:', this.firstPage)
      console.log('마지막페이지:', this.lastPage)
      console.log('현재페이지:', this.currentPage)
      console.log(this.pageList.length)
      const list = []
      if (this.lastPage >= this.totalPage) {
        this.lastPage = this.totalPage
      }
      for (let i = this.firstPage; i <= this.lastPage; i++) {
        list.push(i)
      }
      this.pageList = list
      console.log(this.pageList)
    },
    // 다음 페이지 이동 함수
    nextPage() {
      console.log('다음 페이지 이동중')
      console.log(this.maxPage)
      if (this.currentPage <= this.maxPage) {
        this.currentPage++
        this.getCategoryInfo()
        this.paginationControlFunc(this.currentPage)
        console.log('현재페이지:', this.currentPage)
      }
    },
    // 이전 페이지 이동 함수
    prevPage() {
      console.log('이전 페이지 이동중')
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.getCategoryInfo()
        this.paginationControlFunc(this.currentPage)
      }
      console.log('현재페이지:', this.currentPage)
    },
    // 서버로부터 병원 정보를 받아오는 함수
    getCategoryInfo() {
      axios
        .get(
          `http://localhost:3000/service/culture/?category=${this.category}&page=${
            this.currentPage || 1
          }`
        )
        .then((response) => {
          if (response.status === 200) {
            this.cultureInfo = response.data.result
            this.totalInfoCnt = response.data.totalCount * 1
            this.maxPage = this.totalInfoCnt / this.displayPage
            this.totalPage = response.data.totalPage
            this.focusPage = response.data.page
            console.log(this.cultureInfo)
          }
        })
        .catch((error) => {
          console.log(
            '동물병원정보 데이터를 가져오는중에 에러가 발생했습니다.:',
            error
          )
        })
    }
  },
  // 페이지 첫 화면 세팅
  async mounted() {
    await axios
      .get('http://localhost:3000/service/culture')
      .then((response) => {
        if (response.status === 200) {
          this.cultureInfo = response.data.result
          this.totalPage = response.data.totalPage
          console.log(this.cultureInfo)
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
.culture_title {
  text-align: center;
  border-bottom: 1px solid gray;
}
.category_box {
  padding: 10px;
  border-bottom: 1px solid gray;
}
.category_menu {
  border:none;
  margin: 0 0 10px 10px;
  padding:5px;
  background: beige;
  transition: 0.1s ease-in;
}
.category_menu:hover {
  transform: scale(1.01);
  background: rgb(228, 185, 169);
  box-shadow: 3px 3px 5px gray;
}
.category_menu:active {
  transform: scale(1);
  background: rgb(219, 141, 113);
  box-shadow: -1px -1px 3px gray;
}
.page_message {
  position: fixed;
  font-size: 14px;
  bottom: 300px;
  right: 5px;
  background: rgb(253, 241, 172);
  box-shadow: inset 1px 1px 5px 2px rgb(245, 219, 69);
  padding: 10px;
  border-radius: 10px;
}
/* 페이지네이션 */
.pagination_nav {
  width: 70%;
  margin: 10px auto;
}
.pagination_box {
  display: flex;
  justify-content: center;
  align-content: center;
}
.page_shifter {
  border: 1px solid rgba(128, 128, 128, 0.807);
  list-style: none;
  text-align: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 3px;
  padding: 11px 10px 5px 10px;
}
.page_shifter:hover {
  background: rgb(255, 211, 154);
  cursor: pointer;
}
.culture_list{
  margin:20px;
  width:100%;
}
.culture_name{
  width:100%;
  border-bottom: 1px solid gray;
}
</style>
