<template>
  <div class="container">
    <h1 class="title">F n A</h1>
    <ul class="qna_container">
      <li
        class="qna_item"
        :class="state[i]"
        v-for="(item, i) in items"
        :key="item.id"
        @click="open(i)"
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
        },
        {
          id: 3,
          question: '고양이와 강아지와 싸우면 누가 이기나요?',
          answer:
            '보통 같은 체급에서 싸우는 경우 고양이가 더 우세하기도 하지만, 이는 동물의 성향이 공격적이냐 아니냐에 따라서 달라질 수 있기에 정확한 답변이 어려울 것 같습니다.'
        },
        {
          id: 4,
          question: '고양이가 먹으면 안 되는 음식에는 뭐가 있을까요?',
          answer: `1)초콜릿은 고양이에게 구토, 설사, 발작, 심하면 사망을 유발할 수 있는 테오브로민이라는 화학물질을 함유하고 있기 때문에, 고양이에게 절대 먹여서는 안 됩니다.\n
2) 양파와 마늘은 모두 고양이의 적혈구에 손상을 일으켜 빈혈을 유발하는 화합물을 함유하고 있습니다.\n
3) 적은 양의 알코올도 고양이에게는 강력한 독으로 작용할 수 있으며, 구토, 설사, 호흡 곤란, 심하면 죽음을 초래할 수 있습니다.\n
4) 포도는 고양이에게 신부전을 일으킬 수 있으므로 고양이가 먹지 않도록 조심해야 합니다.\n
5) 닭 뼈 등 동물의 뼈는 고양이의 소화관에 손상을 주거나 질식을 초래할 수 있으므로 고양이의 생활 반경 안에 두어서는 안 됩니다.\n
6) 아보카도는 고양이에게 구토와 설사를 일으킬 수 있는 페르신이라는 독성 화합물을 함유하고 있습니다.\n
7) 카페인은 고양이에게 불안감, 빠른 호흡, 두근거림, 근육 떨림을 일으킬 수 있습니다.\n
8) 자일리톨은 고양이에게 인슐린 분비를 일으켜 저혈당을 유발할 수 있습니다.\n
9) 날고기와 달걀은 고양이의 건강에 치명적인 질병을 유발하는 대장균, 살모넬라균과 같은 박테리아를 옮길 수 있기 때문에 조심해야 합니다.\n
`
        }
      ],
      state: []
    }
  },
  methods: {
    open(id) {
      if (this.state[id] === 'off') this.state[id] = 'on'
      else {
        this.state[id] = 'off'
      }

      console.log(this.state)
    }
  },
  mounted() {
    // qna 게시글 갯수 만큼 배열을 생성하고 해당 값은 off 로 채운다
    this.state = new Array(this.items.length).fill('off')
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
  color: rgb(255, 255, 255);
  border-radius: 5px;
  padding: 20px;
  background-color: rgb(175, 110, 110);
}

.qna_item:nth-of-type(2n) p {
  background-color: rgb(193, 145, 145);
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
  color: rgb(240, 240, 240);
  position: absolute;
  transition: 0.5s;
  right: 5px;
  font-size: 1.4rem;
  padding: 10px;
  top: 12px;
}

.qna_item.off .drop_icon::before {
  content: '▼';
  transition: 0.5s;
}

.qna_item.on .drop_icon::before {
  content: '▲';
  transition: 0.5s;
}
.qna_item.on .answer {
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
