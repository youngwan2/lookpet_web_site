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
  name: 'DogBreedDetail',
  data() {
    return {
      dogDetail: {}
    }
  },
  created() {
    document.title = this.$route.name
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
  min-height: 100vh;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}
/* 서브 카테고리 공통 */

.detail_text_h {
  border-left: 4px solid rgb(236, 121, 121);
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0 5px;
}

.detail_text {
  padding: 5px 0 0 0.5rem;
}

.detail_con {
  margin: 0 auto;
  max-width: 900px;
}
/* 디테일 이미지 컨테이너 */
.detail_image_con {
  text-align: center;
}
/* 세부 페이지 제목(동물이름 들어감) */
.detail_title {
  font-size: 1.6rem;
  text-align: center;
  border-top: 7px solid rgb(255, 182, 182);
  border-bottom-left-radius: 8px;
  border-left: 7px solid rgb(173, 60, 60);
  border-top-right-radius: 8px;
  margin: 1.5rem auto;
  max-width: 900px;
  padding: 10px;
  background: rgba(221, 81, 81, 0.741);
  text-shadow: 1px 1px 2px black;
  color: rgb(246, 219, 219);
  filter: drop-shadow(10px 20px 3px rgba(98, 79, 79, 0.253));
}

/* 상단 설명 */
.detail_top {
  display: flex;
  width: 100%;
  min-height: 440px;
  padding: 30px 0 0 0;
}
.dog_image {
  -webkit-box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ee4242d1, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ee4242d1, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  border-radius: 1px;
  max-width: 350px;
  max-height: 400px;
  margin: 0 20px 0 0px;
  height: 100%;
  min-width: 350px;
}
.detail_info {
  width: 70%;
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
}
.detail_bottom > p:nth-child(odd) {
  background: rgb(231, 200, 159);
  border-radius: 10px;
  padding: 3px;
}

/* 각 텍스트 컨테이너(타이틀/내용) */
.text_con {
  margin: 20px 0;
}

@media screen and (min-width: 769px) {
  .detail_info {
    margin-left: 1.5rem;
  }
  .detail_bottom {
    margin-top: 1.5rem;
    min-height: 40vh;
  }
}

@media screen and (max-width: 768px) {
  /* 디테일 설명 탑 / 밑 */
  .detail_top {
    flex-direction: column;
  }

  .detail_info {
    margin-top: 2rem;
  }
  .detail_bottom {
    margin-top: 0;
    min-height: 60vh;
  }
  .detail_title {
    margin: 2rem 0 1rem 0;
  }
}
</style>
