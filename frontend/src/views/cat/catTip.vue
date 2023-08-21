<template>
  <div>
    <h2 class="title">냥 팁</h2>
    <span class="page_message"
      >현재 페이지: {{ currentPage }}/{{ totalPage }}</span
    >

    <section class="content_container">
      <div v-for="data in getTip" :key="data.id" class="tip_box">
        <p class="category">{{ data.category }}</p>
        <p class="content">{{ data.content }}</p>
      </div>
    </section>
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
  name: 'catTip',
  data() {
    return {
      currentPage: 1,
      getTip: '',
      firstPage: 1,
      displayPage: 5,
      lastPage: 5,
      currentPageGroup: Math.ceil(this.currentPage / this.displayPage),
      totalTipCnt: 0,
      pageList: [1, 2, 3, 4, 5],
      maxPage: 0,
      totalPage: 0,
      focusPage: 1,
      focus: ''
    }
  },
  methods: {
    // 각 번호 버튼 클릭 시페이지 이동을 담당하는 함수
    getNextPage(e) {
      console.log(e.target.innerText)
      const i = e.target.innerText * 1
      this.currentPage = i
      this.getAxios(this.currentPage)
      this.paginationControlFunc(this.currentPage)
    },

    // 페이지네이션 기본 셋팅을 담당하는 함수
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
    /* 다음 페이지 이동 버튼 함수 */
    nextPage() {
      console.log('다음 페이지 이동중')
      console.log(this.maxPage)
      if (this.currentPage <= this.maxPage) {
        this.currentPage++
        this.getAxios(this.currentPage)
        this.paginationControlFunc(this.currentPage)
        console.log('현재페이지:', this.currentPage)
      }
    },

    /* 이전 페이지 이동 버튼 함수 */
    prevPage() {
      console.log('이전 페이지 이동중')
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.getAxios(this.currentPage)
        this.paginationControlFunc(this.currentPage)
      }
      console.log('현재페이지:', this.currentPage)
    },

    /* 서버로 부터 고양이 팁 정보를 가져오는 비동기 함수 */
    getAxios() {
      axios
        .get(`http://localhost:3000/cat/cattip?page=${this.currentPage || 1}`)
        .then((response) => {
          console.log(response)
          this.getTip = response.data.result
          this.totalTipCnt = response.data.totalCount * 1
          this.maxPage = this.totalTipCnt / this.displayPage
          this.totalPage = response.data.totalPage
          this.focusPage = response.data.page
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  /* 사용자가 페이지 방문 시 초기 데이터를 셋팅 */
  mounted() {
    this.getAxios()
  }
}
</script>
<style scoped>
/* 페이지 메시지 */
.page_message {
  position: fixed;
  font-size: 14px;
  right: 5px;
  background: rgb(253, 241, 172);
  box-shadow: inset 1px 1px 5px 2px rgb(245, 219, 69);
  padding: 10px;
  border-radius: 10px;
}

/* 페이지 타이틀 */
.title {
  text-align: center;
  margin: 10px;
}
.container {
  border: 1px solid gray;
  margin: 5px;
  padding: 10px;
  transition: 1s;
}

.content_container {
  display: flex;
  flex-wrap: wrap;
}

/* 고양이 팁 콘텐츠 박스 */
.tip_box {
  animation: appear 1s 1 cubic-bezier(1, -0.07, 0.43, 1.95);
  max-width: 450px;
  mix-blend-mode: difference;
  border-radius: 10px;
  padding: 5px;
  margin: 10px auto;
  transition: 0.3s;
  transform: perspective(600px);
  transform-style: preserve-3d;
  box-shadow: inset 4px 4px rgb(251, 160, 41), inset -4px -4px rgb(251, 160, 41);
}
@keyframes appear {
  from {
    opacity: 0;
    transform: translate(-100px);
  }
}
.tip_box:nth-of-type(2n) {
  animation: reverse-appear 1s 1 cubic-bezier(1, -0.07, 0.43, 1.95);
}

@keyframes reverse-appear {
  from {
    opacity: 0;
    transform: translate(100px);
  }
}

.tip_box:hover {
  transform: translateY(-10px) rotateY(15deg) scale(1.1);
  box-shadow: inset 4px 4px rgb(251, 160, 41), inset -4px -4px rgb(251, 160, 41),
    10px 15px 5px 2px rgba(128, 128, 128, 0.611);
  cursor: pointer;
}

.tip_box .category {
  width: 110px;
  text-align: center;
  color: white;
  background: rgb(252, 188, 26);
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: inset 2px 4px rgb(255, 188, 63), inset -2px -4px rgb(174, 102, 9);
  padding: 10px;
  margin: 5px auto;
}

.tip_box .content {
  padding: 8px 3px 3px 3px;
}

/* 페이지 네이션 */
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
</style>
