<template>
  <section class="dog_breed_section">
    <div class="loading_spinner" v-show="isLoading">
      <img
        src="../assets/loading.gif"
        alt="loading_spinner"
        width="400"
        height="300"
      />
    </div>

    <section>
      <h1 class="dog_title">멍이사전</h1>
      <span class="info_text">강아지/품종정보</span>
      <form action="#" class="dog_seacrh_form" @submit.prevent="submit">
        <label for="dog_search"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            /></svg        ></label>
        <input
          type="text"
          id="dog_search"
          v-model="dogName"
          @input.enter="dogInfoPickFromDB"
        />
      </form>
      <ul class="dog_ul" ref="cards">
        <li
          class="dog_items"
          v-for="(dog, i) in dogBreedInfo"
          :key="dog.id"
          ref="card"
          @dragstart="cardPickup($event, i)"
        >
          <router-link :to="'/dog/breed/detail/' + (i + 1)">
            <img
              class="dog_image"
              :src="require(`@/assets/db_dog_image/${dog.image}`)"
            />
            <p class="dog_name">
              {{ dog.name }} <br />
              ({{ dog.ko_name }})
            </p>
          </router-link>
        </li>
      </ul>
    </section>
    <button @click="addDogData" class="add-post-btn">
      더보기({{ page }}/4)
    </button>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      dogBreedInfo: [],
      isLoading: true,
      dogName: '',
      page: 1
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      const response = await axios.get(
        'http://localhost:3000/dog/breed/total?page=0'
      )
      if (response.status === 200) {
        this.dogBreedInfo = [...this.dogBreedInfo, ...response.data]
        this.isLoading = false
      }
    } catch (error) {
      console.error('dog 정보를 받아오는 중 에러가 발생하였습니다:', error)
    }
  },
  methods: {
    async addDogData() {
      this.isLoading = true
      if (this.page === 4) {
        this.isLoading = false
        return alert('마지막 리스트입니다.')
      } else {
        await axios
          .get(`http://localhost:3000/dog/breed/total?page=${this.page++}`)
          .then((response) => {
            if (response.status === 200) {
              this.dogBreedInfo = [...this.dogBreedInfo, ...response.data]
              this.isLoading = false
            }
          })
          .catch((error) => {
            console.error(
              'cat 정보를 받아오는 중 에러가 발생하였습니다:',
              error
            )
          })
      }
    },
    cardPickup(e, i) {
      console.log(this.$refs.card[i])
      console.log(this.$refs.cards)
    },
    dogInfoPickFromDB() {
      console.log(this.dogName)
      axios
        .get(`http://localhost:3000/breed/search?dogname=${this.dogName}`)
        .then((result) => {
          this.dogBreedInfo = result.data
          this.page = 4
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
.dog_title {
  text-align: center;
  color: #a07f7d;
  font-size: 1.8rem;
  text-shadow: 1px 1px 1px rgb(205, 129, 129), 2px 2px 1px rgb(255, 254, 254);
  margin-top: 2.3rem;
}
ul,
ol,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

/* 상단의 안내 메시지 */
.info_text {
  position: absolute;
  right: 5px;
  font-size: 11px;
  top: 2rem;
}

/*컨테이너*/
.dog_breed_section {
  position: relative;
  animation: appear 1s 1 ease-in-out;
  max-width: 1500px;
  margin: 0 auto;
}

/* 검색창 폼 */
.dog_seacrh_form {
  max-width: 500px;
  background-color: white;
  border-radius: 50px;
  margin: 2rem auto;
  box-shadow: inset 5px 3px rgb(166, 144, 144),
    inset -2px -5px rgb(167, 140, 140);
  padding: 10px;
}

/* 검색창 input*/
.dog_seacrh_form input {
  max-width: 300px;
  color: #654a4a;
  font-weight: 600;
  font-size: 1rem;
  background-color: white;
  width: 120%;
  padding: 18px 12px 15px 12px;
  border: none;
}

.dog_seacrh_form input:focus {
  outline: none;
}

/* 검색창 input 라벨 */

.dog_seacrh_form label {
  font-size: 1.25rem;
}

.dog_seacrh_form label svg {
  margin-top: 20px;
  margin-left: 10px;
}

section {
  height: 100%;
  top: 0px;
  left: 0px;
}

.dog_ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  transform: perspective(2000px);
  transform-style: preserve-3d;
}

.dog_image {
  width: 230px;
  height: 230px;
  border-bottom: 3px solid #c49e9b;
}

.dog_items {
  margin: 10px;
  border-radius: 5px;
  border: 3px solid #ae908e;
  background-color: #ffffff;
  max-width: 230px;
  max-height: 300px;
  text-align: center;
  transform: translateZ(0) translateY(0px) perspective(800px);
  transform-origin: center center;
  transform-style: preserve-3d;
  transition: 0.5s ease-in-out;
  padding: 1px 0;
}

.dog_items:hover {
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.145);
  transform: translateY(-30px) rotateX(-2deg);
}

.dog_items .dog_name {
  font-size: 15px;
  height: 35px;
  font-weight: 700;
  color: rgb(137, 126, 126);
  padding: 0px 10px 10px 0;
}
/* 로딩 스피너 */
.loading_spinner {
  font-size: 3rem;
  position: fixed;
  left: 50%;
  top: 0;
  line-height: 500px;
  color: white;
  z-index: 100000000;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.712);
  font-weight: 900;
  transform: translate(-50%);
  width: 100%;
  text-align: center;
  min-height: 143vh;
  background: rgba(0, 0, 0, 0.305);
}

.loading_spinner img {
  position: absolute;
  border-radius: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 30%;
}

/* 더보기 버튼 */
.add-post-btn {
  text-align: center;
  border: none;
  border-radius: 3px;
  color:white;
  background: brown;
  margin: 3rem auto 0 auto;
  font-size: 1.2rem;
  padding: 15px 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.add-post-btn:hover {
  cursor: pointer;
  background: rgb(255, 72, 48);
}
</style>
