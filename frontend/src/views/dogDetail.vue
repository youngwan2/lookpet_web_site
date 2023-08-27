<template>
  <div class="detail_view" ref="detail">
    <h3 class="detail_title">{{ dogDetail.name }}({{ dogDetail.ko_name }})</h3>
    <div class="detail_con">
      <div class="detail_top">
        <figure class="detail_image_con">
          <img
            class="dog_image"
            v-if="dogDetail.image"
            :src="require(`@/assets/db_dog_image/${dogDetail.image}`)"
            alt="강아지 이미지"
          />
        </figure>
        <div class="detail_info">
          <div class="text_con">
            <p class="detail_text_h">식별</p>
            <p class="detail_text">{{ dogDetail.id }}</p>
          </div>
          <div class="text_con">
            <p class="detail_text_h">이름(영문)</p>
            <p class="detail_text">
              {{ dogDetail.ko_name }}({{ dogDetail.name }})
            </p>
          </div>
          <div class="text_con">
            <p class="detail_text_h">수명</p>
            <p class="detail_text">{{ dogDetail.life }}</p>
          </div>
          <div class="text_con">
            <p class="detail_text_h">체중</p>
            <p class="detail_text">{{ dogDetail.weight }}</p>
          </div>
          <div class="text_con">
            <p class="detail_text_h">색깔</p>
            <p class="detail_text">{{ dogDetail.colors }}</p>
          </div>
        </div>
      </div>
      <div class="detail_bottom">
        <div class="text_con">
          <p class="detail_text_h">기원 및 역사</p>
          <p class="detail_text">{{ dogDetail.origin }}</p>
        </div>
        <div class="text_con">
          <p class="detail_text_h">성격</p>
          <p class="detail_text">{{ dogDetail.personality }}</p>
        </div>
        <div class="text_con">
          <p class="detail_text_h">돌봄</p>
          <p class="detail_text">{{ dogDetail.care }}</p>
        </div>
        <div class="text_con">
          <p class="detail_text_h">건강</p>
          <p class="detail_text">{{ dogDetail.health }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'detail',
  data() {
    return {
      dogDetail: {}
    }
  },
  async mounted() {
    this.$refs.detail.scrollIntoView({ behavior: 'smooth' })
    try {
      const id = this.$route.params.id
      const res = await axios.get(
        `http://localhost:3000/dog/breed/detail/${id}`
      )
      this.dogDetail = res.data
      console.log(this.dogDetail)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* 페이지 전체 감싼 컨테이너 */
.detail_view {
  margin: 15px;
  padding: 10px;
  min-height: 100vh;
  height: 100%;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}
/* 서브 카테고리 공통 */

.text_con {
  margin: 1rem;
}
.detail_text_h {
  border-left: 4px solid rgb(220, 87, 87);
  padding: 5px 5px;
  font-size: 1.2rem;
  font-weight: 700;
}

.detail_text {
  padding: 5px 0 0 0.5rem;
}

.detail_con {
  margin: 0 auto;
  max-width: 1000px;
}

/* 세부 페이지 제목(동물이름 들어감) */
.detail_title {
  font-size: 1.6rem;
  padding: 5px 0 10px 30px;
  max-width: 1000px;
  margin: 1rem auto;
  background: rgba(245, 245, 245, 0.123);
  color: rgb(173, 84, 20);
  border-top-left-radius: 10px;
  border-top-right-radius: 5px;
}

/* 상단 설명 */
.detail_top {
  width: 100%;
  min-height: 440px;
  display: flex;
  padding: 5px;
}
.dog_image {
  box-shadow: 1px 1px 4px 3px rgba(24, 24, 24, 0.2);
  border-radius: 15px;
  max-width: 350px;
  height: 100%;
  min-width: 350px;
}
.detail_info {
  width: 70%;
  padding: 10px;
}
.detail_info > p:nth-child(odd) {
  background: rgb(231, 200, 159);
  border-radius: 10px;
  padding: 3px;
}

/* 하단 설명 */
.detail_bottom {
  margin-top: 1.5rem;
  width: 100%;
  height: 300px;
  padding: 10px;
}
.detail_bottom > p:nth-child(odd) {
  background: rgb(231, 200, 159);
  border-radius: 10px;
  padding: 3px;
}

@media screen and (max-width: 768px) {
  /* 전체 컨테이너 */
  .detail_view {
    text-align: center;
  }

  /* 디테일 설명 탑 / 밑 */
  .detail_top {
    flex-direction: column;
  }
  .detail_bottom {
    margin-top: 0;
  }

  /* 디테일 설명 탑과 밑을 감싸고 있는 컨테이너 */
  .detail_info {
    margin: 0 auto;
  }

  /* 디테일 설명의 서브 카테고리 */
  .detail_text_h {
    margin: 8px auto;
    border-radius: 10px;
    border-left: none;
    width: 200px;
    box-shadow: 4px 4px 1px 0 rgb(191, 141, 13), -2px -2px 1px 0 goldenrod;
  }

  .detail_title {
    margin: 2rem 0 1rem 0;
  }
}
</style>
