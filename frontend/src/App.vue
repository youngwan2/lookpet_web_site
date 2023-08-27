<script setup>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
import modelView from './components/modelView.vue'

// window.addEventListener('resize', () => {
//   console.log(window.innerWidth)
// })

const loginUsername = document.cookie.split('=')[1] ?? ''
</script>
<template>
  <div id="app">
    <HeaderView :loginUsername="loginUsername" />
    <router-view></router-view>

    <model-view />
    <footer-view />
  </div>
</template>
<style>
* {
  margin: 0;
}

body::-webkit-scrollbar {
  width: 5px;
  background: rgb(255, 255, 255);
}

body::-webkit-scrollbar-thumb {
  width: 5px;
  background: beige;
}
</style>
