<template>
  <div class="cat_breed_section">
    <section>
      <h2>고양이 모음집(임시)</h2>
      <form action="#" id="cat_seacrh_form" @submit.prevent="submit">
        <label for="cat_search">돋보기</label>
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
  box-shadow: 0 0 5px 2px rgb(223, 222, 222);
  border-radius: 15px;
}

.cat_items {
  margin: 10px;
  text-align: center;
}

.cat_items .cat_name {
  margin: 10px;
}
</style>
