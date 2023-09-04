<template>
  <section class="addbreed_container" :class="addClass">
    <h1>추가 품종 정보를 제공하는 뷰</h1>
    <div>{{ breedInfo }}</div>
  </section>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const breedInfo = ref('')
    const addClass = ref('on').value
    return {
      addClass,
      breedInfo
    }
  }
}
</script>
<style scoped>
.addbreed_container {
  min-height: 100vh;
  max-width: 900px;
  width: 100%;
}
</style>
