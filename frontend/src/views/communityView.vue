<template>
  <div>
    <section class="board_container">
      <h1 class="title">자유 게시판</h1>
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
    <ul id="pagination_container">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      auth: false,
      posts: []
    }
  },
  mounted() {
    this.getBoardList()
    const username = document.cookie?.split('=')[1]
    if (username?.length > 2) {
      this.auth = true
    } else {
      this.auth = false
    }
  },
  methods: {
    getBoardList() {
      axios
        .get('http://localhost:3000/board')
        .then((response) => {
          this.posts = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    moveToDetail(id) {
      this.$router.push({ path: `/community/detail/${id}` })
    }
  }
}
</script>
<style scoped>
#pagination_container {
  display: flex;
  position: relative;
  left: 50%;
  transform: translate(-8%);
  padding: 0;
}
li {
  list-style: none;
  border: 1px solid gray;
  margin: 5px;
  padding: 10px;
}

a {
  text-decoration: none;
}

/* 페이지 전체 컨테이너 */
.board_container {
  width: 95%;
  padding: 3rem 0 0 0;
  margin: 0 auto;
  min-height: 100vh;
}
.title {
  text-align: center;
}

/* post_items */

.post_id {
  border-radius: 20px;
  margin: 5px 0 10px 0;
  max-width: 60px;
  min-width: 28px;
  text-align: center;
  background-color: rgba(218, 165, 32, 0.583);
}
.post_items {
  border: 1px dashed rgb(216, 158, 77);
  margin: 10px auto;
  padding: 10px;
  max-width: 900px;
  border-radius: 10px;
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
  border: 1px solid black;
  position: absolute;
  margin: 17.9px 0;
  padding: 5px;
}
</style>
