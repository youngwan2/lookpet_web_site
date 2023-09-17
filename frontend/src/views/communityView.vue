<template>
  <div ref="board">
    <section class="board_container">
      <h1 class="title">커뮤니티</h1>
      <article class="board_top_etc">
        <form @submit.prevent class="board_search_form">
          <label for="search"><h3>검색</h3></label>
          <input
            type="text"
            class="board_search"
            v-model="searchVal"
            @input="boardSearch"
          />
        </form>
        <article class="filter_container">
          <h3>필터</h3>
          <div class="filter">
            <p class="dog" data-type="dog" @click="getFilteredPostFromDB">
              강아지
            </p>
            <p class="cat" data-type="cat" @click="getFilteredPostFromDB">
              고양이
            </p>
            <p class="free" data-type="free" @click="getFilteredPostFromDB">
              자유
            </p>
            <p
              class="popular"
              data-type="popular"
              @click="getFilteredPostFromDB"
            >
              자유
            </p>
            <p class="all" data-type="all" @click="getFilteredPostFromDB">
              전체
            </p>
          </div>
        </article>
      </article>
      <div
        v-for="post in posts"
        :key="post.id"
        class="post_items"
        @click="moveToDetail(post.id)"
      >
        <div class="post_top">
          <p class="post_id">{{ post.id }}</p>
          <p class="post_category">{{ post.category }}</p>
        </div>
        <h3>{{ post.title }}</h3>
        <p class="content">{{ post.preview }}</p>
        <div style="display: flex" class="author">
          <p>{{ post.author }}</p>
          <p>{{ post.date }}</p>
        </div>
      </div>

      <router-link class="post_add_btn" to="/community/newpost" v-if="auth"
        >글쓰기</router-link
      >
    </section>
    <!-- 페이지네이션 -->
    <article class="pagination">
      <ul id="pagination_container">
        <!-- 이전 -->
        <li @click="prevSwitch" v-show="currentPage > 1">prev</li>
        <!-- 페이지 번호 -->
        <li
          :class="{ focus: page === currentPage }"
          v-for="(page, i) in pageList"
          :key="page"
          @click="pageSwitch(i + 1)"
        >
          {{ page }}
        </li>
        <!-- 다음  -->
        <li @click="nextSwitch" v-show="totalPageCount !== currentPage">
          next
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Community',
  data() {
    return {
      auth: false,
      posts: [],
      category: 'all', // 상단 카테고리 버튼 클릭 시 지정한 요소의 타입이 저장됨
      currentPage: 1,
      perPage: 10,
      focusedPage: 1,
      currentPageGroup: 1,
      lastPage: 10,
      firstPage: 1,
      pageList: [],
      totalPageCount: 0 // 전체페이지 수가 저장된다.
    }
  },
  mounted() {
    this.$refs.board.scrollIntoView({ behavior: 'smooth' })
    this.getBoardList()

    const list = []
    for (let i = 1; i < this.totalPageCount; i++) {
      list.push(i)
      this.pageList = list
    }
  },
  created() {
    document.title = this.$route.name
    const username = document.cookie?.split('=')[1]
    if (username?.length > 2) {
      this.auth = true
    } else {
      this.auth = false
    }

    // 페이지네이션 정보
  },
  methods: {
    /* 게시글 목록 불러오기 */
    getBoardList() {
      this.$refs.board.scrollIntoView({ behavior: 'smooth' })
      this.currentPageGroup = Math.ceil(this.currentPage / this.perPage)
      axios
        .get(
          `http://localhost:3000/board?page=${this.currentPage}&category=${this.category}`
        )
        .then((response) => {
          this.totalPageCount = response.data.totalCount
          this.posts = response.data.result
          console.log(this.posts)
          this.pageList = this.totalPageCount
        })
        .catch((error) => {
          console.log(error)
        })
    },

    /* 디테일 페이지 이동 */
    moveToDetail(id) {
      this.$router.push({ path: `/community/detail/${id}` })
    },

    /* 페이지네이션 함수 */
    pageSwitch(pageNum) {
      this.currentPage = pageNum * 1
      this.lastPage = this.currentPageGroup * this.perPage
      this.firstPage = this.lastPage - this.perPage + 1

      // 마지막 페이지가 전체 페이지 수 보다 크거나 같으면
      // 전체 페이지 수를 마지막 페이지 수로 할당한다.

      if (this.lastPage >= this.totalPageCount) {
        this.lastPage = this.totalPageCount
      }

      for (let i = this.firstPage; i <= this.lastPage; i++) {
        this.pageList = i
      }
      this.focusedPage = pageNum // focusedPage 속성을 업데이트합니다
      this.getBoardList()
    },

    /* 이전 페이지 이동 */
    prevSwitch() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.getBoardList()
      }
    },

    /* 다음 페이지 이동 */
    nextSwitch() {
      if (this.currentPage < this.totalPageCount) {
        this.currentPage++
        this.getBoardList()
      }
    },

    /* 게시글 검색  */
    boardSearch(e) {
      console.log(e.target.value)
    },

    /* 필터된 게시글 목록 가져오기 */
    getFilteredPostFromDB(e) {
      this.category = e.target.dataset.type
      this.getBoardList()
    }
  }
}
</script>
<style scoped>
/* 페이지네이션 */
.pagination {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
#pagination_container {
  padding: 0;
}
li {
  display: inline-block;
  list-style: none;
  border-radius: 20px;
  margin: 0 2px;
  transition: 0.5s;
  padding: 10px 15px;
}

li:hover {
  background-color: #fba5a5;
  color: rgb(0, 0, 0);
  cursor: pointer;
}

/* 각 페이지 별로 포커스된 경우에만 배경색을 적용한다. */
li.focus {
  box-shadow: inset 50px 50px 0 0 rgb(157, 134, 134);
  color: white;
}

@keyframes round {
  from {
    background: black;
  }
}

a {
  text-decoration: none;
}

/* 페이지 전체 컨테이너 */
.board_container {
  width: 95%;
  max-width: 900px;
  position: relative;
  padding: 2rem 0 0 0;
  margin: 0 auto;
  min-height: 100vh;
}
.title {
  text-align: center;
  color: #b19191;
  font-size: 1.8rem;
  margin: 1rem 0 2rem 0;
}

/* post_items */

.post_top {
  display: flex;
  justify-content: space-between;
}

.post_top .post_id {
  box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.305);
  border-radius: 20px;
  color: white;
  margin: 1px 0 15px 0;
  max-width: 60px;
  min-width: 50px;
  text-align: center;
  background-color: #d5b39b;
}

/* 각 게시글 카테고리 */
.post_top .post_category {
  font-weight: 600;
  background: rgb(220, 194, 157);
  font-size: 15px;
  border-radius: 10px;
  max-width: 50px;
  width: 100%;
  max-height: 15px;
  min-width: 40px;
  text-align: center;
  padding: 1px 5px 8px 5px;
}

h3 {
  color: #ad825f;
  padding: 0 5px;
}
.post_items {
  cursor: pointer;
  margin: 10px auto;
  padding: 10px;
  box-shadow: inset 0 0 1px 1px rgb(174, 157, 134);
  border-radius: 10px;
  background-color: #ffffff;
  max-width: 900px;
  transition: 0.2s;
}

.post_items:hover {
  box-shadow: inset 0 0 1px 2px rgb(158, 129, 103);
}

/* 콘텐츠 */
.content {
  padding: 10px 0 18px 15px;
  width: 200px;
  font-size: 13px;
  color: #9e6969;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 작성자/작성일자 */

.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.author p {
  font-size: 13px;
  margin: 5px 5px 0 0;
  border-radius: 20px;
  color: rgb(77, 58, 58);
  padding: 6px 12px;
}

/* 글쓰기 버튼 */
.post_add_btn {
  border-radius: 15px;
  border: 1px solid rgb(159, 141, 109);
  position: absolute;
  background: rgb(255, 255, 255);
  top: 8rem;
  color: black;
  right: 0;
  margin: 17.9px 0;
  padding: 10px;
}

.post_add_btn:hover {
  box-shadow: inset 0 0 1px 1px rgb(143, 123, 89);
}

.board_top_etc {
  width: 100%;
  padding: 4px;
}

/* 필터 */

.filter_container {
  align-items: center;
  display: flex;
  margin: 5px 0;
  padding: 10px 0 0 0;
}

.filter_container .filter {
  display: flex;
  margin: 0 5px;
  padding: 3px 0;
}

.filter_container .filter p {
  margin: 5px;
  padding: 3px 5px;
  background: rgb(231, 202, 170);
  border-radius: 5px;
}

.filter_container .filter p:hover {
  cursor: pointer;
  box-shadow: 0 0 1px 2px rgb(140, 110, 93);
}

/* 게시판 검색(조회) */
.board_search_form label h3 {
  display: inline-block;
}

.board_search_form .board_search {
  margin: 0 0 0 13px;
  max-width: 213px;
  width: 100%;
  border: none;
  box-shadow: 0 0 1px 1px rgb(166, 128, 91);
  border-radius: 2px;
  padding: 8px 7px;
}

.board_search_form .board_search:focus {
  outline: none;
}
</style>
