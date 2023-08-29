<template>
  <div class="container">
    <h1 class="title">F & A</h1>
    <ul class="qna_container">
      <li
        class="qna_item"
        v-for="item in items"
        :key="item.id"
        @click="open"
        ref="item"
      >
        <p>{{ item.question }}</p>
        <button class="drop_icon"></button>
        <ul class="answer">
          <li>
            {{ item.answer }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          question: '로그인은 어떻게 하나요?',
          answer:
            '우측 상단에 login 아이콘을 클릭하시면 로그인 안내 페이지로 이동합니다.'
        },
        {
          id: 2,
          question: '다른 반려동물에 대한 정보를 올려도 되나요?',
          answer: '되도록 고양이와 강아지에 대한 글만 올려주시면 감사하겠습니다'
        }
      ]
    }
  },
  methods: {
    open() {
        console.log(this.$refs.item)
    }
  }
}
</script>
<style scoped>
li {
  list-style: none;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.title {
  text-align: center;
  margin: 50px;
}

.qna_container {
  padding: 10px;
}

.qna_item {
  position: relative;
}

.qna_item p {
  color: rgb(0, 0, 0);
  border-radius: 5px;
  padding: 20px;
  box-shadow: inset 0 -2px 3px rgb(190, 163, 11);
  background-color: rgb(224, 165, 37);
}

.qna_item:nth-of-type(2n) p {
  background-color: rgb(255, 224, 123);
}

.answer {
  transition: 0.1s;
  z-index: -1;
  visibility: hidden;

  height: 0;
  opacity: 0;
  transform: translate(0, -5px);
}

.drop_icon {
  border: none;
  background-color: transparent;
  color: rgb(50, 49, 49);
  position: absolute;
  right: 5px;
  font-size: 1.25rem;
  padding: 10px;
  top: 12px;
}

.drop_icon::before {
  content: '▼';
}

.drop_icon:focus::before {
  content: '▲';
}
.drop_icon:focus + .answer {
  padding: 20px 5px;
  border: 1px solid dashed tomato;
  width: 100%;
  height: 100%;
  display: block;
  visibility: visible;
  opacity: 1;
  transform: translate(0, 0);
}
</style>
