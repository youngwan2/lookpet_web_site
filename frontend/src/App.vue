<script setup>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
import modelView from './components/modelView.vue'
import ChatBot from './components/ChatBot.vue'
import { onMounted, ref } from 'vue'

const header = ref(null)
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (header.value && window.scrollY > 50) {
      header.value.style.cssText = `position:sticky;
      top:0;
      width:100%;
      background:white;
      transition:0.3s ease-in-out;
      box-shadow:0 3px 5px rgba(0,0,0,0.5);
      z-index:1000000;
      `
    }
    if (header.value && window.scrollY < 50) {
      header.value.style.cssText = `position:static;
      top:0;
      width:100%;
      transition:0.3s ease-in-out;
      z-index:1000000;
      `
    }
  })
})

// 상단 이동
function topShifter() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 하단 이동
function btnShifter() {
  window.scrollTo({
    top: document.documentElement.offsetHeight,
    behavior: 'smooth'
  })
}

document.title = 'Home'

const loginUsername = document.cookie.split('=')[1] ?? ''
</script>
<template>
  <div id="app">
    <ChatBot />
    <div ref="header"><HeaderView :loginUsername="loginUsername" /></div>
    <router-view></router-view>
    <model-view />

    <article class="shifter_btn_con">
      <button @click="topShifter">▲</button>
      <button @click="btnShifter">▼</button>
    </article>
    <footer-view />
  </div>
</template>
<style>
* {
  margin: 0;
}

body {
  font-family: sans-serif;
  background-color: rgba(0, 0, 0, 0.325);
}

body::before {
  content: '';
  background-image: url('./assets/bg.png');
  position: fixed;
  opacity: 0.9;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

body::-webkit-scrollbar {
  width: 5px;
  background: rgb(255, 255, 255);
}

body::-webkit-scrollbar-thumb {
  width: 5px;
  background: beige;
}

/* 상/하단 이동 버튼 */
.shifter_btn_con {
  position: fixed;
  color: white;
  z-index: 100000000;
  width: 50px;
  height: 79px;
  display: flex;
  flex-direction: column;
  bottom: 13.3rem;

  right: 2.8rem;
}

.shifter_btn_con button {
  background: rgb(41, 40, 40);
  border:none;
  font-size: 18px;
  margin: 1px 0;
  border-radius: 50%;
  color: white;
  padding: 12px 16px;
}

.shifter_btn_con button:hover {
  cursor: pointer;
  background: rgb(107, 107, 106);
}
</style>
