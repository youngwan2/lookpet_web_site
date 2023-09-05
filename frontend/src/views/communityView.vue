<template>
  <div ref="board">
    <section class="board_container">
      <h1 class="title">자유 게시판</h1>
      <p style="text-align: center; padding: 10px; font-size: 14px">
        참고) 현재는 테스트를 위해 로그인된 유저가 모든 게시글 수정 삭제 가능
      </p>
      <span
        style="position: fixed; right: 40px; background: rgba(1, 1, 1, 0.088)"
        >현재 페이지: {{ currentPage }}/{{ totalPageCount }}</span
      >
      <div
        v-for="post in posts"
        :key="post.id"
        class="post_items"
        @click="moveToDetail(post.id)"
      >
        <p class="post_id">{{ post.id }}</p>
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
  data() {
    return {
      auth: false,
      posts: [],
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
        .get(`http://localhost:3000/board?page=${this.currentPage}`)
        .then((response) => {
          this.totalPageCount = response.data.totalCount
          this.posts = response.data.result
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
  box-shadow: 1px 1px 0 0 goldenrod, -1px -1px 0 0 rgb(200, 172, 11);
  padding: 10px 15px;
}

li:hover {
  box-shadow: inset 50px 50px 0 0 rgb(246, 180, 12);
  color: white;
}

/* 각 페이지 별로 포커스된 경우에만 배경색을 적용한다. */
li.focus {
  box-shadow: inset 50px 50px 0 0 rgb(246, 180, 12);
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
  padding: 3rem 0 0 0;
  margin: 0 auto;
  min-height: 100vh;
}
.title {
  text-align: center;
}

/* post_items */

.post_id {
  box-shadow: inset 1px 1px 1px 1px rgba(0, 0, 0, 0.305);
  border-radius: 20px;
  margin: 5px 0 10px 0;
  max-width: 60px;
  min-width: 28px;
  text-align: center;
  background-color: rgba(218, 165, 32, 0.583);
}
.post_items {
  margin: 10px auto;
  box-shadow: 1px 2px 2px rgba(152, 141, 15, 0.344);
  padding: 10px;
  max-width: 900px;
  border-radius: 10px;
  transition: 0.5s;
}

/* 콘텐츠 */
.content {
  padding: 10px 0 18px 0;
  width: 200px;
  color: rgb(101, 100, 100);
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
  padding: 5px;
  background-color: rgb(249, 243, 210);
}

/* 글쓰기 버튼 */
.post_add_btn {
  box-shadow: 2px 2px 0 0 rgb(170, 146, 13);
  border-radius: 10px;
  position: absolute;
  background: rgb(245, 207, 109);
  top: 2rem;
  right: 5px;
  color: black;
  margin: 17.9px 0;
  padding: 5px;
}

.post_add_btn:hover {
  background: gold;
}
</style>
