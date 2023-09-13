<template>
  <div class="chatbot_container" ref="chat">
    <div class="chatbot_header">
      <h1 class="chatbot_title">
        CHAT
        <button type="button" @click="chatClose">X</button>
      </h1>
    </div>

    <ul class="message_window">
      <li
        class="message"
        :class="meg.id == 'user' ? `user` : `gpt`"
        v-for="(meg, i) in management"
        :key="i"
      >
        <div class="profile_img"></div>
        <div class="profile_contents">
          <span class="name">{{ meg.name }}</span>
          <p class="content">{{ meg.content }}</p>
        </div>
      </li>
    </ul>
    <form @submit.prevent class="chat_form">
      <label for="chat_input">아이콘</label>
      <input
        id="chat_input"
        type="text"
        v-model="message"
        @keyup.enter="sendMeg"
      />
      <button type="button" class="submit_btn" @click="sendMeg">전송</button>
    </form>
  </div>
</template>
<script>
import chatGPT from '../../public/chat-gpt'
export default {
  data() {
    return {
      message: '',
      management: []
    }
  },
  methods: {
    chatClose() {
      console.log(this.$refs.chat.classList.add('off'))
    },

    async sendMeg() {
      if (this.message === '') return
      this.management.push({ id: 'user', name: '', content: this.message })
      try {
        const response = await chatGPT(this.message)
        this.management.push({
          id: 'gpt',
          name: 'AI 전문가',
          content: response
        })

        this.message = ''

        console.log(this.management)
      } catch (error) {
        console.log(error)
        this.message = ''
      }
    }
  }
}
</script>
<style scoped>
.chatbot_container {
  z-index: 1000000;
  position: fixed;
  width: 40%;
  min-width: 320px;
  max-width: 350px;
  background-color: rgb(237, 201, 129);
  border-radius: 20px;
  right: 2rem;
  bottom: 2rem;
  box-shadow: 10px 5px 8px rgba(0, 0, 0, 0.19),
    -10px 5px 8px rgba(0, 0, 0, 0.207);
  height: 60vh;
  transition: 0.5s ease-in-out;
}

.chatbot_container.off {
  opacity: 0;
  transform: scale(0.5);
  transform-origin: bottom 30%;
}

/** 제목 */
.chatbot_header button {
  position: absolute;
  right: 8px;
  font-size: 1.25rem;
  top: 16px;
  border: none;
  background-color: transparent;
}

.chatbot_header button:hover {
  color: beige;
  cursor: pointer;
}
.chatbot_title {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgb(187, 68, 68);
  padding: 5px 0;
  text-align: center;
  color: white;
}

/** 채팅창 */
.message_window {
  margin: 10px 0;
  overflow: hidden scroll;
  max-height: 340px;
}

.message_window::-webkit-scrollbar {
  width: 5px;
  background-color: burlywood;
}

.message_window::-webkit-scrollbar-thumb {
  background-color: brown;
}

.message_window .message {
  display: flex;
}

ul {
  padding: 5px;
}

/** 지피티 */
.gpt {
  position: relative;
  flex-direction: reverse;
  width: 100%;
}

.gpt .name {
  padding: 0 0 5px 5px;
  display: inline-block;
}

.gpt .profile_img {
  background-color: brown;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border-radius: 5px;
  color: white;
}

.gpt .profile_contents .content {
  background-color: white;
  color: black;
  margin: 0 5px;
  min-width: 200px;
  border-radius: 10px;
  padding: 10px;
}

/** 유저 */
.user {
  position: relative;
  flex-direction: row-reverse;
  width: 100%;
}

.user .profile_contents .content {
  background-color: white;
  color: black;
  margin: 5px 5px;
  min-width: 200px;
  border-radius: 10px;
  padding: 10px;
}

.chat_form {
  position: absolute;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  width: 97%;
  left: 50%;
  transform: translate(-50%);
  padding: 10px 5px;
  border-radius: 10px;
}

/** 유저 메시지 입력창 */
.chat_form input {
  border: none;
  padding: 0 0 0 10px;
}

.chat_form input:focus {
  outline: none;
}

/** 전송버튼 */
.submit_btn {
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgb(181, 58, 58);
  border-radius: 5px;
  color: white;
  width: 50px;
  height: 41px;
}

.submit_btn:hover {
  background-color: rgb(174, 92, 92);
  cursor: pointer;
}
</style>
