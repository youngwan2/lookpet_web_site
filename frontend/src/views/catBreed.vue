<template>
  <div class="cat_breed_section">
    <section>
      <h2>고양이 모음집(임시)</h2>
      <form action="#" class="cat_seacrh_form" @submit.prevent="submit">
        <label for="cat_search"><svg xmlns="http://www.w3.org/2000/svg" height="1em"
            viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg></label>
        <input type="text" id="cat_search">
      </form>
      <ul class="cat_ul">
        <li class="cat_items" v-for="(cat) in catBreedInfo" :key="cat.id">
          <div class="cat_image"></div>
          <p class="cat_name">{{ cat.name }}</p>
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
      catBreedInfo: []
    }
  },
  async mounted() {
    await axios.get('http://localhost:3000/cat/breed').then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.catBreedInfo = response.data
      }
    }).catch((error) => {
      console.error("cat 정보를 받아오는 중 에러가 발생하였습니다:", error)
    })
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

/*컨테이너*/

/* 검색창 폼 */
.cat_seacrh_form {
  max-width: 400px;
  background-color: white;
  box-shadow: 0 0 5px 2px rgb(220, 220, 220);
  border-radius: 50px;
  margin: 2rem auto;
  padding: 12px
}

/* 검색창 input*/
.cat_seacrh_form input {
  max-width: 300px;
  width: 100%;
  padding: 12px;
  border: none;
}

/* 검색창 input 라벨 */

.cat_seacrh_form label{
  font-size: 1.25rem;
}

.cat_seacrh_form label svg{
  margin-top: 10px;
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
  width: 400px;
  height: 300px;
  border-radius: 15px;
  border-bottom: none;
}

.cat_items {
  box-shadow: 0 0 5px 2px rgb(223, 222, 222);
  margin: 10px;
  text-align: center;
  padding: 1px 0;
}

.cat_items .cat_name {
  background-color: burlywood;
  padding: 10px;
}</style>
