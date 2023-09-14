<template>
  <div>
    <hr />
    <br />
    <h1 class="comment_title">댓글({{ commentTotal }})</h1>
    <section class="comment_render_area">
      <ul>
        <li v-for="(comment, i) in commentReceivedFromDB" :key="i">
          <div class="author">
            <!-- 작성자 이름 -->
            <p>{{ comment.author }}</p>
            <div>
              <!-- 작성 날짜 -->
              <span class="date">{{ comment.date }}</span>
              <!-- 댓글 수정 및 삭제 -->
              <span
                class="comment_update_btn"
                role="button"
                v-show="authCheck[i]"
                @click="commentUpdateFormActivation(i)"
                >수정</span
              >
              <span
                class="comment_del_btn"
                role="button"
                @click="commentDel(i)"
                v-show="authCheck[i]"
                >삭제</span
              >
            </div>
          </div>
          <!-- 등록된 댓글 -->
          <p class="comment" v-show="!isUpdate[i]">{{ comment.comment }}</p>
          <!-- 등록된 댓글 수정 -->
          <textarea
            v-model="updateComment"
            class="comment"
            style="width: 92%; resize: none"
            v-show="isUpdate[i]"
          ></textarea>
          <!-- 등록된 댓글 수정 버튼 -->
          <span
            role="button"
            class="comment_update_btn"
            @click="commentUpdate(i)"
            v-show="isUpdate[i]"
            >등록하기</span
          >

          <!-- 대댓글(서브 코멘트) 입력 폼 -->
          <!-- <p class="sub_comment">
            <span role="button" @click="openInput(i)">{{
              subCommentBtnName[i]
            }}</span
            ><br />
          </p> -->

          <!-- 대댓글 작성 폼(메인 코멘트 작성폼) -->
          <textarea
            maxlength="500"
            v-show="isOpen[i]"
            name=""
            id=""
            rows="5"
          ></textarea>
          <!-- 댓글 등록 버튼 -->
          <button
            class="sub_comment_add_btn"
            v-show="isOpen[i]"
            @click="subCommentAdd"
          >
            등록
          </button>
        </li>
      </ul>

      <!-- 메인 댓글 등록 폼 -->
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
        <!-- 댓글 등록 버튼 -->
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
  name: 'Comment',
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
      commentReceivedFromDB: [],
      authCheck: false,
      isUpdate: [],
      updateComment: ''
    }
  },
  mounted() {
    /* 서버로 부터 유저가 등록한 댓글 목록을 가져온다. */
    const postId = this.$route.params.id
    axios
      .get(`/board/${postId}/comment`)
      .then((response) => {
        console.log(response.data.result)
        this.commentReceivedFromDB = response.data.result
        this.commentTotal = response.data.result.length

        // 대댓글 등록 창을 온오프 하는 데 쓰이는 불린 값으로
        // 초기에 false 를 채워넣어 모두 off 상태로 지정
        const isOpen = Array(this.commentTotal).fill(false)
        const subComment = Array(this.commentTotal).fill('댓글')
        const isUpdate = Array(this.commentTotal).fill(false)
        this.authCheck = Array(this.commentTotal).fill(false)
        this.isOpen = isOpen
        this.subCommentBtnName = subComment
        this.isUpdate = isUpdate

        /* 유저 체크 */

        this.commentReceivedFromDB.forEach((data, i) => {
          if (data.author === document.cookie.split('=')[1]) {
            this.authCheck[i] = !this.authCheck[i]
          } else {
            this.authCheck[i] = false
          }
        })

        console.log(this.authCheck)
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
      axios
        .post(`/board/${this.postId}/comment`, {
          commentInfo
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })

      window.location.reload()
    },

    /* 지정한 코멘트를 수정하는 함수 */
    commentUpdate(i) {
      const updateCommentId = this.commentReceivedFromDB[i]._id
      const updateComment = this.updateComment
      axios
        .put(`/board/${i}/comment`, {
          updateComment,
          updateCommentId
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      window.location.reload()
    },
    commentUpdateFormActivation(i) {
      this.isUpdate[i] = !this.isUpdate[i]
    },
    commentDel(id) {
      const delComment = this.commentReceivedFromDB[id]._id
      console.log(delComment)
      const check = confirm('정말 삭제하시겠습니까?')

      check &&
        axios
          .delete(
            `/board/${this.postId}/comment?target=${delComment}`
          )
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
ul {
  padding: 5px;
}
li {
  list-style: none;
}

textarea {
  border: none;
}

textarea:focus {
  outline: none;
}

/* 댓글() */
.comment_title {
  padding: 5px;
  color: rgb(196, 99, 99);
  margin: 12px 0 -4px 5px;
}

/* 작성자 */
.author {
  font-size: 14px;
  display: flex;
  color: rgb(175, 71, 71);
  margin-top: 30px;
  padding: 0 8px;
  align-items: center;
  justify-content: space-between;
}

.author span {
  color: rgb(173, 125, 125);
}

.author .date {
  font-size: 14px;
}

/* 코멘트 */
.comment {
  border-radius: 10px;
  padding: 20px;
  box-shadow: inset -2px -2px 4px rgb(134, 97, 97);
  color: white;
  margin: 5px 0;
  background: linear-gradient(100deg, rgb(232, 119, 119), #e89292);
}

/* 댓글 수정 버튼 */
.comment_update_btn {
  background-color: #f48b83;
  border-radius: 10px;
  box-shadow: inset -2px -2px 3px rgb(130, 91, 91);
  margin: 0 5px;
  display: inline-block;
  color: white !important;
  padding: 4px;
}

/* 댓글 삭제 버튼 */
.comment_del_btn {
  background-color: #f48b83;
  color: white !important;
  box-shadow: inset -2px -2px 3px rgb(130, 91, 91);
  border-radius: 10px;
  display: inline-block;
  padding: 4px;
}

:is(.comment_update_btn, .comment_del_btn):hover {
  background-color: #c77e7e;
  cursor: pointer;
}

/* 메인 코멘트(댓글) 다는 폼 */

.main_comment_form {
  width: 95%;
  margin: 50px auto;
  position: relative;
  max-width: 1330px;
}

.main_comment_title {
  margin: 10px 3px;
  padding: 0 5px;
  box-shadow: -3px 0 0 rgb(188, 129, 129);
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

/* 텍스트 길이 표시하는 css */
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
  background: #c6635a;
  color: white;
  border-radius: 15px;
}

.main_comment_add_btn:hover {
  background: #e17a74;
  cursor: pointer;
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
  background-color: #815854;
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
