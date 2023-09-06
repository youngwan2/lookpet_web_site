<template>
  <section class="addbreed_container" :class="addClass" ref="addbreed">
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
        <article class="add_link">
          <a href="/dog/breed">강아지 품종 정보</a>
          <a href="/cat/breed">고양이 품종 정보</a>
        </article>
      </div>
      <div class="item_box">
        <h2 class="tip_info_title sub_title">
          멍이와 냥이 꿀팁 정보가 궁금하다면?
        </h2>
        <article class="add_link">
          <a href="/dog/tip">강아지 팁</a>
          <a href="/cat/tip">고양이 팁</a>
        </article>
      </div>
      <div class="item_box">
        <h2 class="test_info_title sub_title">
          간단한 테스트를 통해 멍냥이에 대해 더 알아가고자 한다면?
        </h2>
        <article class="add_link">
          <a href="/tools/test">멍냥이 지식 테스트</a>
        </article>
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
/* 공통 */

.page_title {
  margin-top: 3rem;
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
  box-shadow: inset 5px 10px 6px 0 rgba(15, 16, 14, 0.43);
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
  background-color: rgb(255, 183, 0);
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 2px rgb(59, 57, 57);
  font-weight: 600;
  cursor: pointer;
}

/* 추가정보에 대한 각 텍스트 컨테이너 */
.item_box {
  margin: 60px;
}

.add_link {
  margin-top: 2.5rem;
  text-align: center;
}

.add_link a {
  text-decoration: none;
  color: black;
  background-color: gold;
  margin: 5px;
  border-radius: 3px;
  border: 1px dashed goldenrod;
  padding: 10px;
}

.add_link a:hover {
  background-color: rgb(255, 205, 80);
  color: rgb(0, 0, 0);
}
</style>
