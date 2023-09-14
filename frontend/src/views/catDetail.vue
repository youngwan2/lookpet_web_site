<template>
  <div class="detail_container" ref="detail">
    <span v-show="loading" class="loading_spinner">로딩중..</span>
    <h2 class="title">{{ catDetailInfo.name }}({{ catDetailInfo.ko_name }})</h2>
    <section class="detail_into_container">
      <div class="top_detail_info">
        <figure>
          <img
            v-if="catDetailInfo.image"
            :src="require(`@/assets/db_cat_image/${catDetailInfo.image}`)"
            :alt="catDetailInfo.name"
          />
        </figure>
        <div>
          <ul>
            <li>
              <p class="detail_text_h">식별</p>
              <p>{{ catDetailInfo.id }}</p>
            </li>
            <li>
              <p class="detail_text_h">이름(영문)</p>
              <p>{{ catDetailInfo.ko_name }}({{ catDetailInfo.name }})</p>
            </li>
            <li>
              <p class="detail_text_h">수명</p>
              <p>{{ catDetailInfo.life }}</p>
            </li>
            <li>
              <p class="detail_text_h">체중</p>
              <p>{{ catDetailInfo.weight }}</p>
            </li>
            <li>
              <p class="detail_text_h">색깔</p>
              <p>{{ catDetailInfo.colors }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bot_detail_info">
        <ul>
          <li>
            <p class="detail_text_h">기원 및 역사</p>
            <p>{{ catDetailInfo.origin }}</p>
          </li>
          <li>
            <p class="detail_text_h">성격</p>
            <p>{{ catDetailInfo.personality }}</p>
          </li>
          <li>
            <p class="detail_text_h">돌봄</p>
            <p>{{ catDetailInfo.care }}</p>
          </li>
          <li>
            <p class="detail_text_h">건강</p>
            <p>{{ catDetailInfo.health }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CatDetail',
  data() {
    return {
      catDetailInfo: '',
      imagePath: '',
      loading: true
    }
  },
  created() {
    document.title = this.$route.name
  },
  mounted() {
    this.$refs.detail.scrollIntoView({ behavior: 'smooth' })
    this.loading = true
    const breedId = this.$route.params.id
    console.log(breedId)
    axios
      .get(`http://localhost:3000/cat/breed/${breedId}`)
      .then((response) => {
        if (response.status === 200) {
          this.catDetailInfo = response.data
          console.log(response)
          console.log(this.catDetailInfo.image)
          this.loading = false
        }
      })
      .catch((error) => {
        console.error('서버에서 데이터를 받아오던 중 문제가 발생::', error)
      })
  }
}
</script>
<style scoped>
/* 페이지 제목(동물명) */
.title {
  font-size: 1.6rem;
  text-align: center;
  border-top: 7px solid rgb(255, 182, 182);
  border-bottom-left-radius: 8px;
  border-left: 7px solid rgb(173, 60, 60);
  border-top-right-radius: 8px;
  margin: 1.5rem auto 2rem auto;
  max-width: 1000px;
  padding: 10px;
  background: rgba(221, 81, 81, 0.741);
  text-shadow: 1px 1px 2px black;
  color: rgb(246, 219, 219);
  filter: drop-shadow(10px 20px 3px rgba(98, 79, 79, 0.253));
}
/* 컨텐츠 전체 컨테이너(바깥 외곽) */
.detail_container {
  width: 100%;
  max-width: 900px;
  margin: 1.5rem auto 0 auto;
  min-height: 100vh;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}
ul {
  padding-left: 0;
}

li {
  list-style: none;
}

.top_detail_info li {
  list-style: none;
  margin: 15px 30px;
}

.top_detail_info li p {
  margin-top: 6px;
  padding-left: 8px;
}

/* 상단 우측 고양이 설명 */
.top_detail_info {
  display: flex;
}

.top_detail_info figure {
  margin-top: 1rem;
}
.top_detail_info img {
  border-radius: 1px;
  max-width: 350px;
  margin: 0 20px 0 0px;
  max-height: 400px;
  height: 100%;
  min-width: 350px;
  -webkit-box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ee4242d1, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ee4242d1, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

li .detail_text_h {
  display: inline-block;
  border-left: 4px solid rgb(236, 121, 121);

  padding: 5px 7.5px;
  font-size: 1.25em;
  font-weight: 600;
}

.bot_detail_info li {
  margin: 1.5rem 0;
}
.bot_detail_info li p {
  margin-top: 7.5px;
  line-height: 1.5;
  padding: 0 0 0 6px;
}

/* 로딩 스피너 */
.loading_spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  font-size: 2.5rem;
  transform: translate(-50%, -50%);
}

@media screen and (min-width: 769px) {
  .bot_detail_info {
    margin-top: 1.8rem;
  }
}

@media screen and (max-width: 768px) {
  .top_detail_info {
    flex-direction: column;
  }

  .top_detail_info figure {
    text-align: center;
  }

  .top_detail_info li {
    margin: 1.5rem 0;
  }

  .detail_container {
    text-align: start;
  }
}
</style>
