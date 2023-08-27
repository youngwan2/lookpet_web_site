<template>
  <div class="cat_breed_section">
    <span v-show="isLoading" class="loading_spinner">로딩중...</span>
    <h2 class="title">냥이 사전</h2>
    <span class="info_text">고양이/품종정보</span>
    <section>
      <!-- 고양이 품종 검색창(필터링)이 표시되는 영역-->
      <form class="cat_seacrh_form" @submit.prevent="submit">
        <label for="cat_search"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            /></svg
        ></label>
        <input type="text" id="cat_search" @keyup="search" />
      </form>

      <!-- 고양이 품종 목록이 렌더링되어 표시되는 영역-->
      <ul class="cat_ul">
        <li
          class="cat_items"
          v-for="(cat, i) in catBreedInfo"
          :key="cat.id"
          @click="getDetail(i + 1)"
        >
          <router-link :to="`/cat/breed/detail/${i + 1}`">
            <img
              :src="require(`@/assets/db_cat_image/${cat.image}`)"
              class="cat_image"
            />
            <p class="cat_name">
              {{ cat.name }} <br />
              ({{ cat.ko_name }})
            </p>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      catBreedInfo: [],
      isLoading: true
    }
  },
  async mounted() {
    this.isLoading = true
    await axios
      .get('http://localhost:3000/cat/breed')
      .then((response) => {
        if (response.status === 200) {
          this.catBreedInfo = response.data
          this.isLoading = false
        }
      })
      .catch((error) => {
        console.error('cat 정보를 받아오는 중 에러가 발생하였습니다:', error)
      })
  },
  methods: {
    submit() {
      console.log('전송!')
    },
    getDetail(i) {
      console.log(`${i}번 고양이`)
    },
    search(e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>
@charset "utf-8";

* {
  margin: 0px;
  padding: 0px;
}

ul,
ol,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

/** 페이지 전체 컨테이너 */
.cat_breed_section {
  position: relative;
  margin: 0 auto;
  max-width: 1500px;
}

/** 페이지 제목 */
.title {
  text-align: center;
  margin-top: 2.3rem;
}

/** 상단 안내 메시지 */
.info_text {
  position: absolute;
  right: 5px;
  font-size: 11px;
  top: 2rem;
}

/* 검색창 폼 */
.cat_seacrh_form {
  max-width: 500px;
  background-color: white;
  box-shadow: 0 0 5px 2px rgb(220, 220, 220);
  border-radius: 50px;
  margin: 2rem auto;
  padding: 10px;
}

/* 검색창 input*/
.cat_seacrh_form input {
  max-width: 300px;
  font-weight: 600;
  font-size: 1rem;
  width: 120%;
  padding: 18px 12px 15px 12px;
  border: none;
}

.cat_seacrh_form input:focus {
  outline: none;
  font-size: 16px;
}

/* 검색창 input 라벨 */
.cat_seacrh_form label {
  font-size: 1.25rem;
}

.cat_seacrh_form label svg {
  margin: 15px 0 0 8px;
}

section {
  height: 100%;
  top: 0px;
  left: 0px;
}

.cat_ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.cat_image {
  width: 230px;
  height: 230px;
  border-bottom: 4px solid rgb(198, 111, 17);
}

.cat_items {
  box-shadow: 0 0 5px 2px rgb(223, 222, 222);
  margin: 10px;
  max-width: 230px;
  max-height: 300px;
  text-align: center;
  padding: 1px 0;
}

.cat_items .cat_name {
  font-size: 15px;
  height: 35px;
  padding: 0px 10px 10px 0;
  color: rgb(0, 0, 0);
}

.loading_spinner {
  font-size: 3rem;
  position: fixed;
  left: 50%;
  top: 0;
  line-height: 500px;
  color: white;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.712);
  font-weight: 900;
  transform: translate(-50%);
  width: 100%;
  text-align: center;
  height: 100vh;
  background: rgba(60, 59, 58, 0.231);
}
</style>
