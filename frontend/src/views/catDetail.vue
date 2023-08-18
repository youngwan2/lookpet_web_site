<template>
  <div class="detail_container">
    <h2 class="title">{{ catDetailInfo.name }}({{ catDetailInfo.ko_name }})</h2>

    <section>
      <div class="top_detail_info">
        <figure>
          <img :src="imagePath" alt="" />
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
      catDetailInfo: {},
      imagePath: ''
    }
  },
  mounted() {
    const breedId = this.$route.params.id
    console.log(breedId)
    axios
      .get(`http://localhost:3000/cat/breed/${breedId}`)
      .then((response) => {
        if (response.status === 200) {
          this.catDetailInfo = response.data
          console.log(response)
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
  margin: 15px 0;
}
/* 컨텐츠 전체 컨테이너(바깥 외곽) */
.detail_container {
  width: 80%;
  margin: 1.5rem auto 0 auto;
  min-height: 100vh;
}

ul {
  padding-left: 0;
}

li {
  list-style: none;
}

.top_detail_info li {
  list-style: none;
  margin: 15px 15px;
}

.top_detail_info li p {
  margin-top: 6px;
  padding-left: 8px;
}

/* 상단 우측 고양이 설명 */
.top_detail_info {
  display: flex;
}

.top_detail_info img {
  box-shadow: 5px 5px 5px 2px rgba(128, 128, 128, 0.616);
  max-width: 350px;
  border-radius: 10px;
  min-width: 330px;
  width: 100%;
  height: 100%;
}

li span {
  display: inline-block;

  border-radius: 20px;
  background-color: burlywood;
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
</style>
