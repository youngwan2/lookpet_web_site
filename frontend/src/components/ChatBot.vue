<template>
  <div>
    <button class="chat_open_btn" @click="chatDisplaySwitch"></button>
    <div class="chatbot_container off" ref="chat">
      <div class="chatbot_header">
        <h1 class="chatbot_title">
          CHAT
          <button type="button" @click="chatDisplaySwitch">X</button>
        </h1>
      </div>

      <ul class="message_window" ref="window">
        <li
          v-show="management.length < 1"
          class="chat_intro_message"
          ref="introMessage"
        >
          AI 전문가에게 여러분 가족에 대한 상담을 요청해보세요!
        </li>
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
        <label
          for="chat_input"
          style="
            margin-left: 4px;
            border-radius: 50%;
            display: inline-block;
            width: 20px;
            background: rgb(255, 171, 171);
            height: 17px;
          "
        ></label>
        <input
          id="chat_input"
          type="text"
          v-model="message"
          placeholder="무엇이 궁금하신가요?"
          @keyup.enter="sendMeg"
        />
        <button type="button" class="submit_btn" @click="sendMeg">전송</button>
      </form>
    </div>
  </div>
</template>
<script>
import chatGPT from '../../public/chat-gpt'
export default {
  name: 'ChatBot',
  data() {
    return {
      message: '',
      management: [],
      loadingState: {
        isLoading: false,
        message: ''
      }
    }
  },
  methods: {
    chatDisplaySwitch() {
      console.log(this.$refs.chat.classList.toggle('off'))
      this.$refs.introMessage.classList.toggle('on')
    },

    async sendMeg() {
      if (this.message === '') return
      this.management.push({
        id: 'user',
        name: '',
        content: this.message
      })
      this.loadingState.isLoading = true
      this.loadingState.message = '답변을 작성 중입니다!'
      try {
        const response = await chatGPT(this.message)
        this.management.push({
          id: 'gpt',
          name: 'AI 전문가',
          content: response
        })

        this.message = ''

        console.log(this.management)

        this.loadingState.isLoading = false
        this.loadingState.message = ''

        this.$refs.window.scrollTo({ top: 1000000000 })
      } catch (error) {
        console.log(error)
        this.message = ''
        alert(
          '죄송합니다. 현재 AI 상담사가 부재중 이므로 나중에 다시 시도해주세요.'
        )
        this.$refs.window.scrollTo({ top: 1000000000 })
      }
    }
  }
}
</script>
<style scoped>
.chat_open_btn {
  background-image: url('../assets/상담.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  background-color: transparent;
  position: fixed;
  right: 31px;
  z-index: 10000000;
  bottom: 110px;
  border-radius: 50%;
  transition: 0.5s;
  width: 80px;
  filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.313));
  height: 80px;
}

.chat_open_btn:hover {
  cursor: pointer;
}

.chat_open_btn::before {
  content: '';
  position: absolute;
  border-left: 20px solid transparent;
  left: -12px;
  rotate: -40deg;
  top: 1.2rem;
  visibility: hidden;
  opacity: 0;
  border-bottom: 20px solid rgb(254, 187, 62);
}

.chat_open_btn::after {
  content: 'AI 반려동물 전문가';
  font-size: 1.05rem;
  position: absolute;
  padding: 20px 0;
  right: 4.8rem;
  visibility: hidden;
  opacity: 0;
  top: -1rem;
  border-radius: 15px;
  width: 200px;
  background: rgb(255, 185, 55);
}

.chat_open_btn:hover::before {
  opacity: 1;
  visibility: visible;
}
.chat_open_btn:hover::after {
  opacity: 1;
  visibility: visible;
}

.modal_inner_con {
  margin: 0 auto;
  max-width: 600px;
}

/** 채팅창 컨테이너 */
.chatbot_container {
  z-index: 1000000;
  position: fixed;
  width: 100%;
  min-width: 290px;
  max-width: 400px;
  background: white;
  border-radius: 20px;
  right: 4rem;
  bottom: 12rem;
  box-shadow: 0 0 50px 25px rgba(0, 0, 0, 0.129),
    0 0 50px 25px rgba(0, 0, 0, 0.082);
  height: 65vh;
  transition: 0.5s ease-in-out;
  transform-origin: bottom right;
}

.chatbot_container.off {
  opacity: 0;
  transform: scale(0.1) translateY(15px);
  transform-origin: bottom right;
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
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.227);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgb(215, 181, 159);
  padding: 5px 0;
  text-align: center;
  color: white;
}

/** 채팅창 */

.chat_intro_message {
  text-align: center;
  line-height: 2;
  margin-top: 2rem;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.312);
  border-radius: 10px;
  padding: 5px;
}

.chat_intro_message.on {
  animation: topAppear 1.5s 1 ease-in-out;
}

.chat_intro_message::before {
  content: '';
  position: absolute;
  top: 5.5rem;
  left: 50%;
  filter: drop-shadow(1px -3px 2px rgba(0, 0, 0, 0.197));
  border-bottom: 15px solid white;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  transform: translate(-50%);
}

.message_window {
  margin: 10px 0;
  overflow: hidden scroll;
  max-height: 400px;
}

.message_window::-webkit-scrollbar {
  width: 5px;
  background-color: burlywood;
}

.message_window::-webkit-scrollbar-thumb {
  background-color: rgb(201, 137, 81);
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
  animation: 0.5s appear ease-in-out 1;
  margin: 8px 0;
}

@keyframes appear {
  from {
    transform: translate(-30px);
    opacity: 0;
  }
}

.gpt .name {
  padding: 0 0 5px 6px;
  color: black;
  font-size: 14px;
  display: inline-block;
}

.gpt .profile_img {
  background-color: rgb(199, 85, 85);
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border-radius: 5px;
  color: white;
}

.gpt .profile_contents .content {
  background-color: rgb(255, 176, 133);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.127);
  color: black;
  margin: 0 5px;
  min-width: 200px;
  border-radius: 10px;
  padding: 10px;
}

.gpt .profile_contents .content::after {
  content: '';
  position: absolute;
  left: 30px;
  bottom: 3px;
  rotate: -3deg;
  border-right: 25px solid rgb(255, 176, 133);
  border-top: 13px solid rgba(255, 255, 255, 0);
  border-bottom: 13px solid rgba(255, 255, 255, 0);
}

/** 유저 */
.user {
  position: relative;
  flex-direction: row-reverse;
  width: 100%;
  animation: 0.5s appearReverse ease-in-out 1;
}

@keyframes appearReverse {
  from {
    transform: translate(30px);
    opacity: 0;
  }
}

.user .profile_contents .content {
  background-color: rgb(186, 105, 39);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.127);
  color: white;
  margin: 5px 5px;
  min-width: 200px;
  border-radius: 10px;
  padding: 10px;
}

.user .profile_contents .content::after {
  content: '';
  position: absolute;
  right: -5px;
  bottom: 7px;
  rotate: 3deg;
  border-left: 25px solid rgb(186, 105, 39);
  border-top: 13px solid rgba(255, 255, 255, 0);
  border-bottom: 13px solid rgba(255, 255, 255, 0);
}

.chat_form {
  position: absolute;
  bottom: 0;
  box-shadow: 0 -5px 4px 0 rgba(0, 0, 0, 0.103);
  background-color: rgb(255, 255, 255);
  width: 97%;
  left: 50%;
  transform: translate(-50%);
  padding: 10px 10px 10px 0;
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
  background-color: rgb(224, 163, 149);
  border-radius: 5px;
  color: white;
  width: 50px;
  height: 41px;
}

.submit_btn:hover {
  background-color: rgb(215, 142, 102);
  cursor: pointer;
}
</style>
