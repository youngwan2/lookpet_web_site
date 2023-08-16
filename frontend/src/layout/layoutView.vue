<template>
  <section id="wrap">
    <HeaderVue></HeaderVue>
    <router-view />
    <FooterVue></FooterVue>
  </section>
</template>

<script>
import HeaderVue from '../components/HeaderView.vue'
import FooterVue from '../components/FooterView.vue'

export default {
  components: {
    HeaderVue,
    FooterVue
  }
}
</script>
