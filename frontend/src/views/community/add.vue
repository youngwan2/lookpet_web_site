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
      <QuillEditor @ready="setHTML" ref="preview" readOnly></QuillEditor>
      <button @click="previewPost" class="preview_return_btn">돌아가기</button>
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
        author: ''
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
      console.log(this.editorContent)
      console.log(this.postTitle)

      this.post.title = this.postTitle
      this.post.content = this.editorContent
      this.post.author = document.cookie?.split('=')[1]

      console.log(this.post)
      axios
        .post('http://localhost:3000/board', this.post)
        .then((result) => {
          console.log('전송 성공!', result)
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
      console.log(this.editorContent)
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
  max-width: 1700px;
  margin: 0 auto;
}
.post_title {
  width: 100%;
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
.preview_container {
  width: 100%;
  background: white;
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
  bottom: 2rem;
  left: 50%;
  border-radius: 25px;
  padding: 12px 10px;
  transform: translate(-50%);
}

.preview_return_btn:hover {
  background: tomato;
  color: white;
}
</style>
