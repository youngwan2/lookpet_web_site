<script setup>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
</script>
<template>
  <div id="app">
    <HeaderView />
    <router-view />
    <footer-view />
  </div>
</template>
<style></style>
