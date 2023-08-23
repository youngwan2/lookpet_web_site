<template>
  <div>
    <section class="board_container">
      <h1 class="title">자유 게시판</h1>
      <table class="board">
        <thead>
          <tr>
            <th>ID</th>
            <th class="post_title">제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          <!-- 각 게시글 별 디테일 이동 -->
          <tr>
            <td>1</td>
            <td>고양이가 좋아하는 먹이</td>
            <td>캣빠</td>
            <td>2023-08-23</td>
            <td>11</td>
          </tr>
        </tbody>
      </table>
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
export default {
  data() {
    return {
      auth: false
    }
  },
  mounted() {
    const username = document.cookie.split('=')[1]
    if (username.length > 2) {
      this.auth = true
    } else {
      this.auth = false
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
.board {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  border-collapse: collapse;
}

tr {
  border: 1px solid black;
}
th {
  border: 1px solid rgb(67, 64, 64);
  border-bottom: 3px double black;
}
td {
  padding: 5px;
  border: 1px solid rgb(90, 88, 88);
}

.post_title {
  min-width: 400px;
}

/* 글쓰기 버튼 */
.post_add_btn {
  border: 1px solid black;
  position: absolute;
  margin: 17.9px 0;
  padding: 5px;
}
</style>
