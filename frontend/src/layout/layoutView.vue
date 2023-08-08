<template>
  <section id="wrap">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </section>
</template>

<script>
import Header from '@/components/HeaderView.vue'
import Footer from '@/components/FooterView.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
