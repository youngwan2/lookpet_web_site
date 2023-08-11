<template>
  <section id="wrap">
    <MyHeader></MyHeader>
    <router-view/>
    <MyFooter></MyFooter>
  </section>
</template>

<script>
import MyHeader from '@/components/HeaderView.vue'
import MyFooter from '@/components/FooterView.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
