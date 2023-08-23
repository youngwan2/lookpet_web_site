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
      <button>글쓰기</button>
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
    return {}
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
.board_container {
  width: 100%;
}
.title {
  text-align: center;
}
.board {
  width: 95%;
  text-align: center;
  margin-top: 30px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  border-collapse: collapse;
}

tr{
  border: 1px solid black;
}
th{
  border: 1px solid rgb(67, 64, 64);
  border-bottom: 3px double black;
}
td{
  padding: 5px;
  border: 1px solid rgb(90, 88, 88);
}

.post_title{
  min-width: 400px;
}
</style>
