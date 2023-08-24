<template>
  <div>
    <hr />
    <br />
    <h1 class="comment_title">댓글()</h1>
    <section>
      <ul>
        <li>
          <div class="author">
            <p>qodna2525</p>
            <span class="date">2023-08-24</span>
          </div>
          <p class="comment">오 귀엽고 깜찍 하네요!</p>
          <p class="sub_comment">
            <span role="button" @click="openInput">댓글달기</span><br />
            <textarea name="" id="" rows="5"></textarea>
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'commentVue',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openInput() {}
  }
}
</script>
<style scoped>
li {
  list-style: none;
}

/* 댓글() */
.comment_title {
  padding: 10px;
  margin: 12px 0 15px 5px;
}

/* 작성자 */
.author {
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
}

.author span {
  color: gray;
}

.author .date {
  font-size: 14px;
}

/* 코멘트 */
.comment {
  border: 1px solid rgb(234, 228, 228);
  border-radius: 20px;
  padding: 20px;
  margin: 5px 0;
}

.sub_comment {
  padding: 0 6px;
  justify-content: right;
}

.sub_comment span {
  border-radius: 20px;
  display: inline-block;
  font-size: 13px;
  margin: 5px 0;
  padding: 5px;
  background-color: rgb(232, 184, 61);
}

.sub_comment span:hover {
  background-color: goldenrod;
  cursor: pointer;
}

.sub_comment textarea {
  resize: none;
  border-radius: 10px;
  border-color: gray;
  width: 100%;
}

/* 서브 코멘트 input */
</style>
