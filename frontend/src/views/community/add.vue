<template>
  <section class="newpost_container">
    <div class="select_container">
      <label for="category">분류</label>
      <select @change="categorySelector" autofocus class="category_select">
        <option value="dog">강아지</option>
        <option value="cat">고양이</option>
        <option value="free" selected>자유</option>
      </select>
    </div>
    <input
      class="post_title"
      type="text"
      placeholder="제목을 입력하세요"
      v-model="postTitle"
    />
    <QuillEditor
      theme="snow"
      toolbar="full"
      style="height: 100vh; background: white; padding: 10px"
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
  name: 'CommunityNewPost',
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
        preview: '',
        category: 'free'
      }
    }
  },
  created() {
    document.title = this.$route.name
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
        .post('http://localhost:3000/board', this.post)
        .then((result) => {
          console.log('전송 성공!', result)
        })
        .catch((error) => {
          console.log('전송실패..', error)
        })
      this.$router.push({ path: '/community' })
    },
    previewPost() {
      this.isPreview = !this.isPreview
    },

    // 서버로 전송할 데이터 생성
    getHTML() {
      // 에디터에서 작성한 내용을 참조하는 요소를 content 에 담는다.
      const content = this.$refs.content
      // 해당 content의 메서드 중 getHTML을 사용하면 HTML을 받아올 수 있다.
      this.editorContent = content.getHTML()
      // getText를 사용하면 HTML을 제외한 텍스트만 받아올 수 있다(프리뷰 용도로 활용)
      this.post.preview = content.getText()
    },

    // 미리보기에 사용
    setHTML() {
      this.$refs.preview.setHTML(this.editorContent)
    },
    categorySelector(e) {
      this.post.category = e.target.value

      console.log(this.post)
    }
  }
}
</script>
<style scoped>
.newpost_container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 포스트 카테고리 */
.select_container {
  margin-top: 2rem;
}
.select_container label {
  font-weight: 600;
  display: inline-block;
  min-width: 50px;
  text-align: center;
}
.category_select {
  padding: 10px 15px;
  border-radius: 5px;
  border:2px solid rgb(175, 114, 114)
}

.category_select option {
  background: rgb(174, 101, 101);
  color:white;
}

/* 포스트 타이틀 */
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
  cursor: pointer;
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
  color: rgb(255, 209, 209);
}

@media screen and (max-width: 526px) {
  .preview_btn {
    position: relative;
  }

  .complete_btn {
    position: relative;
  }
}
</style>
