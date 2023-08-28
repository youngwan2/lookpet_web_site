<template>
  <section class="newpost_container">
    <input
      class="post_title"
      type="text"
      placeholder="제목을 입력하세요"
      v-model="postTitle"
    />
    <QuillEditor
      theme="snow"
      toolbar="full"
      style="height: 100vh"
      ref="content"
      @textChange="getHTML"
    />
    <article class="bottom_area">
      <button @click="previewPost" class="preview_btn">미리보기</button>
      <button class="complete_btn" @click="addPost" v-show="auth">완료</button>
    </article>

    <article v-if="isPreview" class="preview_container">
      <div class="layout">미리보기</div>
      <QuillEditor
        @ready="setHTML"
        ref="preview"
        readOnly
        style="
          margin: 0 auto;
          max-width: 1200px;
          background: white;
          box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.194),
            -5px 20px 10px 0 rgba(0, 0, 0, 0.194);
        "
      ></QuillEditor>
      <button @click="previewPost" class="preview_return_btn">X</button>
    </article>
  </section>
</template>
<script>
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      editorContent: '<p>fsdfsdfds</p>',
      isPreview: false,
      content: 'fsdfdsf',
      auth: '',
      postTitle: '',
      post: {
        title: '',
        content: '',
        author: '',
        preview: ''
      }
    }
  },
  mounted() {
    const username = document.cookie.split('=')[1]
    if (username.length > 2) {
      this.auth = true
    } else {
      this.auth = false
    }
  },
  methods: {
    addPost() {
      this.post.title = this.postTitle
      this.post.content = this.editorContent
      this.post.author = document.cookie?.split('=')[1]
      if (this.post.title === '' || this.post.content.length <= 5) {
        return alert('제목을 입력해주세요.')
      }
      axios
        .post('/board', this.post)
        .then((result) => {
          console.log('전송 성공!', result)
          this.$router.push({ path: '/community' })
        })
        .catch((error) => {
          console.log('전송실패..', error)
        })
    },
    previewPost() {
      this.isPreview = !this.isPreview
    },

    // 서버로 전송할 데이터 생성
    getHTML() {
      const content = this.$refs.content
      this.editorContent = content.getHTML()
      this.post.preview = content.getText()
    },

    // 미리보기에 사용
    setHTML() {
      this.$refs.preview.setHTML(this.editorContent)
    }
  }
}
</script>
<style scoped>
.newpost_container {
  max-width: 1200px;
  margin: 0 auto;
}
.post_title {
  width: 98.7%;
  margin: 10px 0 0 0;
  border: none;
  border-bottom: 2px solid black;
  padding: 35px 0 26px 15px;
  font-size: 2rem;
}

.post_title:focus {
  outline: none;
}

.post_title::placeholder {
  font-size: 2rem;
}

/* 밑바닥 완료버튼 있는 영역 */
.bottom_area {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: rgba(155, 154, 154, 0.802);
}

.complete_btn {
  border-radius: 25px;
  background: black;
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  padding: 13px 28px;
}

.complete_btn:hover {
  background: tomato;
  cursor: pointer;
}

/* 미리보기 */

.layout {
  color: white;
  text-align: center;
  width: 100%;
  padding: 12px 0;
  background: rgb(252, 111, 41);
  z-index: 10;
  position: absolute;
}
.preview_container {
  background: rgb(248, 212, 185);
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
}

/* 프리뷰 버튼 */
.preview_btn {
  left: 36%;
  top: 50%;
  transform: translate(-60%, -50%);
  border-radius: 20px;
  padding: 12px 10px;
  position: absolute;
}

.preview_btn:hover {
  background: rgb(216, 214, 214);
}

/* 프리뷰 돌아가기 버튼 */

.preview_return_btn {
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 1.25em;
  z-index: 100;
  border: none;
  color: white;
  background: transparent;
  border-radius: 25px;
  padding: 12px 10px;
}

.preview_return_btn:hover {
  cursor: pointer;
  color: rgb(241, 125, 125);
}
</style>
