<template>
  <div class="detail_container" ref="detail">
    <section>
      <!-- 포스트 제목 -->
      <h2 class="post_title">
        {{ post.title || '제목이 들어가는 자리입니다.' }}
      </h2>
      <div class="layout"></div>
      <!-- 포스트 콘텐츠  -->
      <QuillEditor
        readOnly
        ref="postContent"
        @ready="setHTML"
        theme="snow"
        class="editor"
        style="min-height: 70vh; border-radius: 5px"
      />
      <!-- 좋아요/싫어요 -->
      <LikeBox />
      <!-- 작성자/작성일자 -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div class="etc">
          <p class="author">{{ post.author }}</p>
          <p class="date">{{ post.date }}</p>
        </div>
        <!-- 수정/삭제 버튼 -->
        <article class="control_box" v-show="isAuthorization">
          <button @click="moveToUpdatePage(post.id)">수정</button>
          <button @click="postDel">삭제</button>
        </article>
      </div>
      <comment :postId="post.id" />
    </section>
  </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import comment from '../community/comment.vue'
import axios from 'axios'
import LikeBox from './likeBox.vue'
export default {
  components: {
    QuillEditor,
    comment,
    LikeBox
  },
  data() {
    return {
      post: [],
      liked: 0,
      unliked: 0,
      isAuthorization: false
    }
  },
  mounted() {
    this.$refs.detail.scrollIntoView({ behavior: 'smooth' })
    const { id } = this.$route.params
    console.log(id)
    axios
      .get(`http://localhost:3000/board/${id}`)
      .then((response) => {
        this.post = response.data[0]
        this.setHTML(this.post)
        return this.authorization()
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    setHTML(post) {
      this.$refs.postContent.setHTML(`${post.content}`)
    },
    postDel() {
      const isAgree = confirm('정말 삭제하시겠습니까?')

      if (isAgree) {
        axios
          .delete(`http://localhost:3000/board/${this.post.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path: '/community' })
            }
          })
          .catch((error) => {
            console.log('게시글 삭제 중 문제가 발생하였습니다 ::', error)
          })
      }
    },
    moveToUpdatePage(id) {
      // 업데이트 가능한 게시글 수정 화면으로 넘어가야 함
      this.$router.push({ path: `/community/modify/${id}` })
      console.log(id)
    },

    /* 유저 인증 함수 */
    authorization() {
      if (document.cookie.split('=')[1] === this.post.author) {
        this.isAuthorization = true
      } else {
        this.isAuthorization = false
      }
    }
  }
}
</script>
<style scoped>
.detail_container {
  min-height: 100vh;
  margin: 2rem auto;
  position: relative;
  max-width: 1200px;
}

.post_title {
  padding: 10px;
  font-size: 2rem;
  position: relative;
  text-align: center;
  top: 30px;
  z-index: 11;
}

.layout {
  width: 100%;
  max-width: 1200px;
  height: 56px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  z-index: 10;
  top: 3rem;
}

/* 작성자/작성일자 */
.etc {
  margin: 1.3rem 0;
  padding: 10px;
  border: 1px solid rgb(224, 212, 212);
  width: 170px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}

.etc .author {
  color: rgb(0, 0, 0);
  border-radius: 20px;
  display: inline-block;
  padding: 3px 0;
  font-weight: 500;
}

.etc .date {
  font-size: 14px;
  color: rgb(89, 89, 89);
}

/* 수정/삭제 버튼 */
.control_box {
  height: 61px;
  border: 1px solid rgb(190, 187, 187);
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
}

.control_box button {
  border: none;
  box-shadow: 1px 2px 1px 0 rgba(77, 76, 76, 0.585);
  border-radius: 10px;
  color: white;
  background-color: rgb(0, 0, 0);
  margin: 5px;
  transition: 0.3s;
  padding: 10px 16px;
}

.control_box button:hover {
  cursor: pointer;
  color: white;
  background-color: rgb(208, 170, 119);
  box-shadow: 0 0 0 0, inset 2px 4px 1px 1px rgba(0, 0, 0, 0.469);
}
</style>
