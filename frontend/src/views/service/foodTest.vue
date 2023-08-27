<template>
  <div class="page_container">
    <h1 class="page_title">멍냥이 푸드 지식 테스트</h1>

    <div class="test_container">
      <div class="dog">
        <p class="title">강아지</p>

        <p class="msg">
          혹시 강아지가 먹을 수 있는 음식과 <br />아닌 음식에 대해 잘 알고
          있으신가요? <br />
          이번 기회에 한 번 테스트 해보세요! <br />
          평소에 잘 아셨던 분은 어느 정도 알고 있는지 <br />
          평소 모르셨던 분은 보다 가족에게 가까워지는 <br />
          기회가 되셨으면 좋겠어요!
        </p>
        <br />
        <a class="test_link" href="https://smore.im/quiz/fiTDV7SHp1"
          >테스트 도전!</a
        >
      </div>
      <div class="cat">
        <p class="title">고양이</p>
        <p class="msg">
          혹시 고양이가 먹을 수 있는 음식과 <br />아닌 음식에 대해 잘 알고
          있으신가요? <br />
          이번 기회에 한 번 테스트 해보세요! <br />
          평소에 잘 아셨던 분은 어느 정도 알고 있는지 <br />
          평소 모르셨던 분은 보다 가족에게 가까워지는 <br />
          기회가 되셨으면 좋겠어요!
        </p>
        <br />
        <a class="test_link" href="https://smore.im/quiz/fiTDV7SHp1"
          >테스트 도전!</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IQtestView',
  data() {
    return {}
  }
}
</script>

<style scoped>

.page_title {
  text-align: center;
  max-width:920px;
  border-radius: 5px;
  padding: 10px 0;
  box-shadow: inset -2px -2px 0 0 goldenrod, inset 2px 2px 0 0 goldenrod;
  margin: 40px auto -35px auto;
  animation: top 1s 1 cubic-bezier(0.175, 2.52, 0.765, 0.1);
}

@keyframes top {
  from {transform: translate(-100px, -100px) rotate(10deg);
    opacity: 0;
  }
}
.page_container {
  min-height: 100vh;
}
.test_container {
  display: flex;
  justify-content: center;
  min-height: 80vh;
  padding: 5px 0;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
}

.title {
  color:white;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 5px 0;
  box-shadow: 1px 1px 4px 1px rgba(23, 23, 23, 0.332);
  border-radius: 10px;
  background: rgb(248, 191, 49);
}

.msg {
  margin-top: 1rem;
  padding: 15px 0 10px 0;
  line-height: 2;
}
.test_link {
  position: relative;
  text-decoration: none;
  display: inline-block;
  color: black;
  margin: 10px 0;
  font-size: 1.25rem;
  font-weight: 600;
  background: gold;
  box-shadow: 2px 2px 5px goldenrod;
  border-radius: 20px;
  padding: 12px 8px;
}

.test_link:hover {
  background: goldenrod;
  color: white;
}

.dog,
.cat {
  margin: 5px 10px;
  max-width: 450px;
  text-align: center;
  width: 100%;
  box-shadow: 1px 1px 2px 1px rgba(128, 128, 128, 0.516);
  border-radius: 10px;
  min-height: 430px;
  transition: 0.5s;
}

:is(.dog,.cat):hover {
  background: rgb(255, 247, 204);
  transform: translate(0,-30px);
  box-shadow: 10px 20px 5px 0 rgba(0, 0, 0, 0.199);
}

.cat {
  animation: left 1s 1 ease-in-out;
}

.dog {
  animation: right 1s 1 ease-in-out;
}

@keyframes left {
  from {
    transform: translate(500px);
  }
}
@keyframes right {
  from {
    transform: translate(-500px);
  }
}
</style>
