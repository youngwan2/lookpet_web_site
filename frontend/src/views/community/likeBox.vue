<template>
  <article class="like_box">
    <p @click="likeChecker">
      좋아요<span>( {{ likeCounter.liked }} )</span>
    </p>
    <p @click="unlikeChecker">
      싫어요<span>( {{ likeCounter.unliked }} )</span>
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
    if (userInfo.unlike && likeCounter.unliked > 0) {
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
    .post(
      `http://localhost:3000/board/${route.value}/like-user`,
      updateUserInfo
    )
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
      const {
        username,
        like: likeState,
        unlike: unlikeState
      } = response.data.userInfo

      likeCounter.liked = likeCount
      likeCounter.unliked = unlikeCount
      userInfo.username = username
      userInfo.like = likeState
      userInfo.unlike = unlikeState
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
  padding: 6px 10px;
  box-shadow: inset 2px 2px 2px 1px rgb(227, 159, 159),
    2px 2px 2px 1px rgb(203, 83, 83);
  background-color: #e57265;
  text-align: center;
  color: white;
  border-radius: 10px;
}
</style>
