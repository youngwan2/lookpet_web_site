<template>
  <section class="addbreed_container" :class="addClass">
    <h1 class="page_title">가족님을 위한 추가 정보를 준비했어요!</h1>
    <article class="content">
      <div class="item_box">
        <h2 class="breed_info_title sub_title">
          해당 품종의 자세한 정보를 알고 싶다면?
        </h2>
        <div class="breed_info">{{ breedInfo }}</div>
      </div>
      <div class="item_box">
        <h2 class="breed_info_title sub_title">
          더 다양한 품종 정보를 확인하려면?
        </h2>
      </div>
      <div class="item_box">
        <h2 class="tip_info_title sub_title">
          멍이와 냥이 꿀팁 정보가 궁금하다면?
        </h2>
      </div>
      <div class="item_box">
        <h2 class="test_info_title sub_title">
          간단한 테스트를 통해 멍냥이에 대해 더 알아가고자 한다면?
        </h2>
      </div>
    </article>
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
.page_title {
  transform-origin: top top;
  text-align: center;
  box-shadow: 1px 1px 1px 0 rgb(137, 125, 93),
    -1px -1px 5px 1px rgb(188, 181, 141);
  padding: 20px 0;
  background: linear-gradient(10deg, goldenrod, gold);
}

.content {
  margin-top: 2rem;
}

.breed_info {
  height: 50%;
}

.addbreed_container {
  min-height: 100vh;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.sub_title {
  transition: 0.2s;
  max-width: 700px;
  box-shadow: inset 4px 5px 10px 0 rgb(143, 110, 9);
  background-color: goldenrod;
  color: white;
  border-radius: 20px;
  text-align: center;
  margin: 20px auto;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 16px 0 13px 0;
}

.sub_title:hover {
  background-color: rgb(255, 208, 91);
  color: black;
  font-weight: 600;
  cursor: pointer;
}
</style>
