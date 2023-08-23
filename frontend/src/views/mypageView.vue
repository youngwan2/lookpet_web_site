<template>
  <div>
    <h1>마이페이지</h1>
    <hr />
    <router-link :to="'/mypage/register'">
      <button class="pet_register">펫 등록하기</button>
    </router-link>
  </div>
</template>
<script></script>
<style scoped>
.pet_register {
  margin: 10px;
  border: none;
  border-radius: 20px;
  width: 100px;
  height: 60px;
  background: rgb(255, 145, 0);
  font-weight: 800;
  font-size: 1em;
  transition: 0.1s ease-in;
}
.pet_register:hover {
  box-shadow: 3px 3px 10px rgb(230, 81, 81);
  background: rgb(236, 37, 104);
  transform: scale(1.01);
}
.pet_register:active {
  box-shadow: -3px -3px 5px rgb(122, 46, 46);
}
</style>
