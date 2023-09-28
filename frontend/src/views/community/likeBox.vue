<template>
  <article class="like_box">
    <p @click="likeChecker" :class="userInfo.like ? 'on' : 'off'" class="like">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          :class="userInfo.like ? 'on' : 'off'"
          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
        />
      </svg>
      <span>{{ likeCounter.liked }}</span>
    </p>
    <p
      @click="unlikeChecker"
      class="unlike"
      :class="userInfo.unlike ? 'on' : 'off'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          :class="userInfo.unlike ? 'on' : 'off'"
          d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z"
        />
      </svg>
      <span>{{ likeCounter.unliked }}</span>
    </p>
  </article>
</template>
<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 좋아요와 싫어요 갯수를 카운팅한다.

const likeCounter = reactive({
  liked: 0,
  unliked: 0
})

// 파라미스 정보가 담겨 있다.
const route = ref(useRoute().params.id)

// 좋아요/싫어요를 클릭한 유저의 정보가 저장된다
const userInfo = reactive({
  postId: route,
  username: document.cookie.split('=')[1],
  like: false,
  unlike: false
})

/* 좋아요 측정 함수 */
function likeChecker() {
  if (userInfo.username === undefined) {
    return alert('로그인 유저만 허용 됩니다.')
  }
  // 좋아요를 클릭 시 마다 활성화/비활성화 번갈아 변경
  userInfo.like = !userInfo.like
  // 좋아요가 true 라면 좋아요를 1 증가 시킨다.
  if (userInfo.like) {
    likeCounter.liked++
    // 싫어요가 true 이며, 1이상이면 1을 감소시킨다.
    if (userInfo.unlike) {
      likeCounter.unliked--
      userInfo.unlike = false
    }
  } else {
    likeCounter.liked--
  }

  sendUserInfoToServer(userInfo)
}

/* 싫어요 측정 함수 */
function unlikeChecker() {
  if (userInfo.username === undefined) {
    return alert('로그인 유저만 허용 됩니다.')
  }
  userInfo.unlike = !userInfo.unlike

  // 싫어요가 활성화되어 있으면 싫어요를 1 증가 시킨다.
  if (userInfo.unlike) {
    likeCounter.unliked++
    // 좋아요가 활성화(true) 되어 있고, 좋아요가 1 이상이라면
    // 좋아요를 1 감소 시키고, 좋아요 상태를 비활성화시킨다.
    if (userInfo.like && likeCounter.liked > 0) {
      likeCounter.liked--
      userInfo.like = false
    }

    // 싫어요가 비활성화된다면 싫어요를 1 감소 시킨다.
  } else {
    likeCounter.unliked--
  }
  // 서버에 좋아요/싫어요 유저 정보를 보낸다.

  sendUserInfoToServer(userInfo)
}

/* 서버로 유저가 좋아요한 결과를 보낸다. */
const sendUserInfoToServer = async (updateUserInfo) => {
  if (updateUserInfo.username === undefined) {
    return alert('로그인 유저만 허용 됩니다.')
  }
  await axios
    .post(`http://localhost:3000/board/${route.value}/like-user`, updateUserInfo)
    .then((response) => {
      console.log('보낸게 성공했다면:', response.statusText)
    })
    .catch((error) => {
      console.log(error)
    })
}

/* 해당 포스트의 좋아요/싫어요 정보 및 클릭 유저의 정보를 서버로 부터 받아온다. */
const getPostLikeInfoFromServer = () => {
  axios
    .get(
      `http://localhost:3000/board/${route.value * 1}/like-counter?username=${
        document.cookie.split('=')[1]
      }`
    )
    .then((response) => {
      console.log('서버로 부터 받아온 좋아요 정보:', response.data)
      const { likeCount, unlikeCount } = response.data.result
      likeCounter.liked = likeCount
      likeCounter.unliked = unlikeCount
      const {
        username,
        like: likeState,
        unlike: unlikeState
      } = response.data.userInfo
      console.log(
        `${username}님의 좋아요(${likeState}), 싫어요(${unlikeState})`
      )
      userInfo.username = username || '방문자'
      userInfo.like = likeState || false
      userInfo.unlike = unlikeState || false
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  getPostLikeInfoFromServer()
})
</script>
<style scoped>
/* 좋아요/싫어요 */
.like_box {
  display: flex;
  padding: 15px;
  justify-content: center;
}

.like_box p {
  margin: 0 5px;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  padding: 6px 10px;
  text-align: center;
  color: rgb(0, 0, 0);
  transition: 0.5s;
  cursor: pointer;
  border-radius: 10px;
}

.like_box p:hover svg {
  fill: brown;
}

.like_box p svg {
  margin: 5px;
  background: rgb(255, 255, 255);
  padding: 5px;
  border-radius: 10px;
  fill: rgb(178, 106, 106);
  border: 1px solid rgb(169, 74, 23);
  opacity: 0.9;
  font-size: 28px;
}

.like_box p svg::before {
  content: '';
  width: 30px;
  position: absolute;
  border-left: 10px solid black;
  border-right: 10px solid black;
  border-bottom: 10px solid black;
  border-top: 10px solid black;
}
.like_box p svg .on {
  fill: rgb(255, 0, 0);
}
</style>
