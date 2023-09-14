<template>
  <article class="like_box">
    <p @click="likeCounter">
      좋아요<span>( {{ liked }} )</span>
    </p>
    <p @click="unlikeCounter">
      싫어요<span>( {{ unliked }} )</span>
    </p>
  </article>
</template>
<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

// 좋아요와 싫어요 갯수를 카운팅한다.
const liked = ref(0)
const unliked = ref(0)

// 파라미스 정보가 담겨 있다.
const route = ref(useRoute().params.id)

// 유저의 정보가 저장된다
const userInfo = reactive({
  postId: route,
  username: document.cookie.split('=')[1],
  like: false,
  unlike: false
})

/* 좋아요 싫어요 함수 */
function likeCounter() {
  // 좋아요를 클릭 시 마다 활성화/비활성화 번갈아 변경
  userInfo.like = !userInfo.like
  // 좋아요가 true 라면 좋아요를 1 증가 시킨다.
  if (userInfo.like) {
    liked.value++
    // 싫어요가 true 이며, 1이상이면 1을 감소시킨다.
    if (userInfo.unlike && unliked.value > 0) {
      unliked.value--
      userInfo.unlike = false
    }
    sendUserInfoToServer(userInfo)
  } else {
    liked.value--
  }

  console.log(userInfo)
}
function unlikeCounter() {
  userInfo.unlike = !userInfo.unlike

  // 싫어요가 활성화되어 있으면 싫어요를 1 증가 시킨다.
  if (userInfo.unlike) {
    unliked.value++
    // 좋아요가 활성화 되어 있고, 좋아요가 1 이상이라면
    // 좋아요를 1 감소 시키고, 좋아요 상태를 비활성화시킨다.
    if (userInfo.like && liked.value > 0) {
      liked.value--
      userInfo.like = false
    }
    sendUserInfoToServer(userInfo)
    // 싫어요가 비활성화된다면 싫어요를 1 감소 시킨다.
  } else {
    unliked.value--
  }
  console.log(userInfo)
}

/* 서버로 유저가 좋아요한 결과를 보낸다. */
const sendUserInfoToServer = async (updateUserInfo) => {
  await axios
    .post(
      `/board/${route.value}/like-user`,
      updateUserInfo
    )
    .then((response) => {
      console.log('보낸게 성공했다면:', response.statusText)
    })
    .catch((error) => {
      console.log(error)
    })
}

/* 해당 포스트의 좋아요/싫어요 정보를 서버로 부터 받아온다. */
/* const getPostLikeInfoFromServer = () => {
  axios
    .get(`/board/${route.value}/like-counter`)
    .then((response) => {
      console.log('서버로 부터 받아온 좋아요 정보:', response)
    })
    .catch((error) => {
      console.log(error)
    })
}
getPostLikeInfoFromServer()
*/
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
  box-shadow: inset 2px 2px 2px 1px rgb(227, 159, 159), 2px 2px 2px 1px rgb(203, 83, 83);
  background-color: #e57265;
  text-align: center;
  color:white;
  border-radius: 10px;
}
</style>
