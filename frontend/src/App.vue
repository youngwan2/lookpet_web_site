<script setup>
import HeaderView from './components/HeaderView.vue'
import FooterView from './components/FooterView.vue'
import modelView from './components/modelView.vue'
</script>
<template>
  <div id="app">
    <HeaderView />
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
