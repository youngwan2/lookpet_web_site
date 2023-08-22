<script setup>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
import modelView from './components/modelView.vue'

const loginUsername = document.cookie.split('=')[1] ?? ''
</script>
<template>
  <div id="app">
    <HeaderView :loginUsername="loginUsername" />
    <router-view />
    <model-view />
    <footer-view />
  </div>
</template>
<style>
* {
  margin: 0;
}
</style>
