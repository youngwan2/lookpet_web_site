<template>
  <div>
    <hr />
    <br />
    <h1 class="comment_title">댓글({{ commentTotal }})</h1>
    <section>
      <ul>
        <li v-for="(comment, i) in commentReceivedFromDB" :key="i">
          <div class="author">
            <p>{{ comment.author }}</p>
            <span class="date">{{ comment.date }}</span>
          </div>
          <p class="comment">{{ comment.comment }}</p>
          <p class="sub_comment">
            <span role="button" @click="openInput(i)">{{
              subCommentBtnName[i]
            }}</span
            ><br />
            <textarea
              maxlength="500"
              v-show="isOpen[i]"
              name=""
              id=""
              rows="5"
            ></textarea>
            <button
              class="sub_comment_add_btn"
              v-show="isOpen[i]"
              @click="subCommentAdd"
            >
              등록
            </button>
          </p>
        </li>
      </ul>
      <article class="main_comment_form" @submit.prevent="commentAdd">
        <h3 class="main_comment_title">댓글 등록</h3>
        <span class="text_length">{{ textLength }}</span>
        <textarea
          type="text"
          placeholder="댓글을 남겨주세요!"
          maxlength="500"
          @keyup.enter="commentAdd"
          @keyup="textLengthControl"
        ></textarea>
        <button type="button" class="main_comment_add_btn" @click="commentAdd">
          등록
        </button>
      </article>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'commentVue',
  props: {
    postId: String
  },
  data() {
    return {
      isOpen: [false], // 대댓글 버튼의 온오프
      choice: 0,
      commentTotal: 0,
      subCommentBtnName: [],
      textLength: '0/500', // 코멘트 길이 측정
      comment: '',
      commentReceivedFromDB: []
    }
  },
  mounted() {
    /* 서버로 부터 유저가 등록한 댓글 목록을 가져온다. */
    const postId = this.$route.params.id
    axios
      .get(`http://localhost:3000/board/${postId}/comment`)
      .then((response) => {
        console.log(response.data.result)
        this.commentReceivedFromDB = response.data.result
        this.commentTotal = response.data.result.length

        // 대댓글 등록 창을 온오프 하는 데 쓰이는 불린 값으로
        // 초기에 false 를 채워넣어 모두 off 상태로 지정
        const isOpen = Array(this.commentTotal).fill(false)
        const subComment = Array(this.commentTotal).fill('댓글')
        this.isOpen = isOpen
        this.subCommentBtnName = subComment
      })
      .catch((error) => {
        console.log('댓글 목록을 불러오던 중 문제 발생:', error)
      })
  },
  methods: {
    /* 대댓글 창 온오프 */
    openInput(i) {
      this.isOpen[i] = !this.isOpen[i]
      // 버튼 이름이 댓글 이라면 취소로 바꾸고, 그게 아니라면 댓글로 바꾼다.
      this.subCommentBtnName[i] =
        this.subCommentBtnName[i] === '취소' ? '댓글' : '취소'
      console.log(this.subCommentBtnName)
    },
    /* 대댓글 등록 */
    subCommentAdd() {
      // 코멘트를 저장하는 데이터베이스에 댓글 목록을 저장해야 함
      // 댓글을 저장 시 댓글을 단 유저의 고유 아이디, 게시글의 아이디, 코멘트 등 전달
    },

    /* 코멘트 길이 측정 */
    textLengthControl(e) {
      this.comment = e.target.value
      this.textLength = this.comment.length + '/500'
    },

    /* 코멘트(댓글) 등록 */
    commentAdd() {
      const commentInfo = {
        postId: this.postId,
        comment: this.comment,
        author: document.cookie.split('=')[1] || '익명'
      }

      console.log(commentInfo)
      axios
        .post(`http://localhost:3000/board/${this.postId}/comment`, {
          commentInfo
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })

      window.location.reload()
    }
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
  font-size: 14px;
  display: flex;
  margin-top: 10px;
  padding: 0 8px;
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
  border-radius: 15px;
  padding: 20px;
  margin: 5px 0;
}

/* 메인 코멘트(댓글) */

.main_comment_form {
  width: 95%;
  margin: 50px auto;
  position: relative;
  max-width: 1330px;
}

.main_comment_title {
  margin: 10px 3px;
  padding: 0 5px;
  box-shadow: -3px 0 0 goldenrod;
}

.main_comment_form textarea {
  width: 100%;
  padding: 5px;
  min-height: 100px;
  border-radius: 10px;
  border: 1px solid rgba(128, 128, 128, 0.802);
  resize: none;
}

.main_comment_form textarea:focus {
  outline: none;
}

.text_length {
  position: absolute;
  right: 0;
  bottom: 38px;
  border-radius: 20px;
  display: inline-block;
  font-size: 11px;
  margin: 5px 0;
  padding: 5px 12px;
  background-color: rgba(232, 184, 61, 0.834);
}

.main_comment_add_btn {
  padding: 5px 12px;
  border: none;
  margin: 2px 0;
  background: gold;
  border-radius: 15px;
}

.main_comment_add_btn:hover {
  background: rgb(240, 188, 56);
}
/* 대댓글(서브 코멘트) */
.sub_comment {
  padding: 0 6px;
  justify-content: right;
}
.sub_comment span {
  border-radius: 20px;
  display: inline-block;
  font-size: 13px;
  margin: 5px 0;
  padding: 5px 12px;
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

.sub_comment_add_btn {
  padding: 5px 12px;
  border: none;
  margin: 2px 0;
  background: gold;
  border-radius: 15px;
}

.sub_comment_add_btn:hover {
  background: rgb(240, 188, 56);
}

/* 서브 코멘트 input */
</style>
