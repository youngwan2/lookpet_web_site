<template>
  <div class="page_container">
    <h2 class="page_title">멍냥이 지식 테스트</h2>

    <div class="test_container">
      <div :class="test.class" v-for="test in testList" :key="test.id">
        <p class="title">{{ test.animalId }}</p>
        <span class="category">{{ test.category }}</span>
        <p class="msg">{{ test.meg }}</p>
        <br />
        <a class="test_link" :href="test.link">도전</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IQtestView',
  data() {
    return {
      testList: [
        {
          id: 1,
          class: 'dog',
          animalId: '강아지',
          meg: `   혹시 강아지가 먹을 수 있는 음식과 아닌 음식에 대해 잘 알고
          있으신가요?
          이번 기회에 한 번 테스트 해보세요!
          평소에 잘 아셨던 분은 어느 정도 알고 있는지
          평소 모르셨던 분은 보다 가족에게 가까워지는 
          기회가 되셨으면 좋겠어요!!`,
          category: `음식`,
          link: 'https://smore.im/quiz/fiTDV7SHp1'
        },
        {
          id: 2,
          class: 'cat',
          animalId: '고양이',
          meg: `혹시 고양이가 먹을 수 있는 음식과 아닌 음식에 대해 잘 알고
          있으신가요?
          이번 기회에 한 번 테스트 해보세요!
          평소에 잘 아셨던 분은 어느 정도 알고 있는지
          평소 모르셨던 분은 보다 가족에게 가까워지는 
          기회가 되셨으면 좋겠어요!!`,
          category: `음식`,
          link: 'https://smore.im/quiz/27nMdhQHcZ'
        },

        {
          id: 3,
          class: 'dog',
          animalId: '강아지',
          meg: `혹시 강아지 입양을 준비하고 계신가요?
          하지만, 제대로 키울 수 있을지 고민되지 않으신가요? 
          준비되지 않은 입양은 멍이와 여러분을 모두 힘들게
          할 수 있어요. 이번 기회를 통해
          자신의 준비 정도를 테스트 해보시길 권장 드려요!`,
          category: `입양`,
          link: `https://smore.im/quiz/27nMdhQHcZ`
        },
        {
          id: 4,
          class: 'dog',
          animalId: '강아지',
          meg: `할로윈 데이를 맞이했을 때, 우리 멍이에게 어울리는 코스튬은?!
          간단한 퀴즈를 통해서 어떤 친구들 보다도 귀엽고, 멋진 코스튬을 골라보세요!
          단, 너무 진지하게는 말고 재미로 봐주세요! 테스트 보다는 여러분이 더 잘아실지도 
          모르잖아요!?
          `,
          category: `축제`,
          link: 'https://smore.im/quiz/bxp7sVzTa6'
        }
      ]
    }
  }
}
</script>

<style scoped>
.page_title {
  text-align: center;
  max-width: 920px;
  color: rgb(248, 246, 243);
  border-radius: 8%;
  padding: 15px 0;
  text-shadow: 1px 1px 2px rgba(36, 36, 36, 0.846);
  background-color: rgb(219, 187, 160);
  box-shadow: inset -2px -3px 1px 0 rgb(180, 151, 110),
    inset 3px 3px 0 0 rgb(217, 190, 152);
  margin: 40px auto -35px auto;
  animation: top 1s 1 cubic-bezier(0.175, 2.52, 0.765, 0.1);
}

@keyframes top {
  from {
    transform: translate(-100px, -100px) rotate(10deg);
    opacity: 0;
  }
}
.page_container {
  min-height: 100vh;
}
.test_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 80vh;
  padding: 5px 0;
  align-items: center;
  margin: 5rem auto;
  width: 100%;
  max-width: 1000px;
}

.title {
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 5px 0;
  background: rgb(211, 176, 154);
}

.msg {
  margin: 5.5rem 5px 0 5px;
  padding: 15px 5px 10px 5px;
  border: 3px solid rgb(202, 159, 124);
  line-height: 2;
  background: white;
  border-radius: 20px;
}

.msg::before {
  content: '';
  position: absolute;
  top: 7.25rem;
  left: 50%;
  transform: translate(-50%);
  border-bottom: 20px solid white;
  filter: drop-shadow(0px -3px 0 rgb(202, 159, 124));
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
}
.test_link {
  position: relative;
  text-decoration: none;
  display: inline-block;
  color: black;
  margin: 10px 0;
  font-size: 1.25rem;
  font-weight: 600;
  background: rgb(212, 174, 145);
  box-shadow: 2px 2px 3px rgb(172, 129, 129);
  border-radius: 20px;
  padding: 10px 12px;
}

.test_link:hover {
  background: rgb(255, 181, 147);
  color: white;
}

.dog,
.cat {
  margin: 10px 10px;
  max-width: 450px;
  border: 3px solid rgb(190, 165, 131);
  position: relative;
  text-align: center;
  width: 100%;
  border-radius: 10px;
  min-height: 430px;
  transform: perspective(600px);
  transform-origin: top left;
  transform-style: preserve-3d;
  transition: 0.5s;
}

:is(.dog, .cat):hover {
  background: rgba(245, 212, 195, 0.34);
  transform: translate(0, -30px) rotateY(10deg);
  transform-origin: top right;
  cursor: pointer;
  box-shadow: 10px 20px 5px 0 rgba(0, 0, 0, 0.199);
}

:is(.dog, .cat):nth-of-type(2n) {
  animation: left 1s 1 ease-in-out;
}

:is(.dog, .cat):nth-of-type(2n-1) {
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

.category {
  background-color: rgb(206, 164, 121);
  border-radius: 20px;
  padding: 4px 6px;
  color: white;
  margin: 1.7rem 0 0 0;
  position: absolute;
  right: 50%;
  transform: translate(50%, 0);
}
</style>
