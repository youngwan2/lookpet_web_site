<template>
  <div class="update_page_outer_container">
    <section class="update_page_inner_container">
      <input type="text" v-model="post.title" class="post_title" />
      <QuillEditor
        style="min-height: 60vh"
        theme="snow"
        toolbar="full"
        @ready="setHTML"
        @textChange="getHTML"
        ref="postContent"
      />
      <div class="control_box">
        <button @click="updatedPostSendToServer(postId)">수정</button>
        <button>취소</button>
      </div>
    </section>
  </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios'
export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      postId: 1,
      post: [],
      editorContent: '',
      preview: '',
      title: '',
      author: ''
    }
  },
  mounted() {
    this.postId = this.$route.params.id
    console.log(this.postId)
    axios.get(`http://localhost:3000/board/${this.postId}`).then((response) => {
      this.post = response.data[0]
      console.log(this.post)
      this.setHTML(this.post)
      this.author = response.data[0].author
      this.postId = response.data[0].id
    })
  },
  methods: {
    updatedPostSendToServer(id) {
      // 업데이트된 포스트
      const updatePost = {
        title: this.post.title,
        content: this.editorContent,
        preview: this.preview,
        author: this.author
      }

      axios
        .post(`http://localhost:3000/board/${id}`, { updatePost })
        .then((response) => {
          console.log(response)
          window.location.replace('/community')
        })
        .catch((error) => {
          console.log('서버로 데이터 전송 중 문제 발생:', error)
          alert(error.message)
        })
    },
    setHTML(post) {
      this.$refs.postContent.setHTML(`${post.content}`)
    },
    getHTML() {
      const content = this.$refs.postContent
      this.editorContent = content.getHTML() // 입력한 HTML 이 담긴다
      this.preview = content.getText() // 입력한 텍스트만 담긴다.

      console.log(this.editorContent, this.preview)
    }
  }
}
</script>
<style scoped>
.update_page_outer_container {
  min-height: 100vh;
}

.update_page_inner_container {
  max-width: 1000px;
  margin: 0 auto;
}

.post_title {
  border: none;
  text-align: center;
  font-size: 2rem;
  padding: 40px 0;
  max-width: 1000px !important;
  width: 100%;
}

.post_title:focus {
  outline: none;
}

.control_box {
  margin: 15px 0;
  text-align: center;
}

.control_box button {
  border: none;
  margin: 5px 5px;
  background-color: white;
  padding: 8px 10px;
  border-radius: 5px;
  box-shadow: inset 2px 2px 0 0 rgb(223, 223, 223),
    inset -1px -1px 0 0 rgb(174, 174, 173);
}

.control_box button:hover {
  cursor: pointer;
  background-color: rgb(143, 141, 137);
  color: white;
}
</style>
