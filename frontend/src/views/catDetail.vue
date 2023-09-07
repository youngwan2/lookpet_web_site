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
              <span>식별</span>
              <p>{{ catDetailInfo.id }}</p>
            </li>
            <li>
              <span>이름(영문)</span>
              <p>{{ catDetailInfo.ko_name }}({{ catDetailInfo.name }})</p>
            </li>
            <li>
              <span>수명</span>
              <p>{{ catDetailInfo.life }}</p>
            </li>
            <li>
              <span>체중</span>
              <p>{{ catDetailInfo.weight }}</p>
            </li>
            <li>
              <span>색깔</span>
              <p>{{ catDetailInfo.colors }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bot_detail_info">
        <ul>
          <li>
            <span>기원 및 역사</span>
            <p>{{ catDetailInfo.origin }}</p>
          </li>
          <li>
            <span>성격</span>
            <p>{{ catDetailInfo.personality }}</p>
          </li>
          <li>
            <span>돌봄</span>
            <p>{{ catDetailInfo.care }}</p>
          </li>
          <li>
            <span>건강</span>
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
  name: 'catDetail',
  data() {
    return {
      catDetailInfo: '',
      imagePath: '',
      loading: true
    }
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
  border-top: 7px solid rgb(189, 155, 155);
  border-bottom-left-radius: 8px;
  border-left: 7px solid black;
  border-top-right-radius: 8px;
  margin: 1.5rem auto 2rem auto;
  max-width: 1000px;
  padding: 10px;
  background: rgb(135, 102, 102);
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
  box-shadow: 1px 1px 4px 3px rgba(24, 24, 24, 0.424);
  max-width: 330px;
  border-radius: 10px;
  min-width: 330px;
  max-height: 440px;
  width: 100%;
  height: 100%;
}

li span {
  display: inline-block;
  border-left: 3px solid rgb(205, 156, 156);

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
