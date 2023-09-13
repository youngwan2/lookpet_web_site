<template>
  <section>
    <button class="modal_icon" @click="modalSwitch">
      임시:: 모델아이콘임 <br />(on/off)
    </button>
    <article class="modal" :class="state.display">
      <div class="modal_inner_con">
        <h2 class="title">우리집 멍냥이는 어떤 종일까?</h2>
        <p
          style="
            font-size: 13px;
            text-align: center;
            display: inline-block;
            width: 100%;
          "
        >
          ※ 모델의 학습정도와 이미지의 각도에 따라서 잘못된 예측을 하기도
          합니다. 되도록 정확한 예측을 위해 정면에서 우리 가족님의 특징이 잘
          드러나도록 찍은 사진을 올려주세요!
        </p>
        <!-- 품종 선택 -->
        <select @change="choiceAnimal" class="select">
          <option value="null" selected>'멍' 인가요? '냥' 인가요?</option>
          <option value="dog">멍</option>
          <option value="cat">냥</option></select
        ><br />

        <!-- 품종 이미지 올리는 곳 -->
        <input
          type="file"
          @change="input"
          ref="image"
          class="input"
          :disabled="state.input"
        />
        <br />
        <img
          :src="blob || replaceImage"
          alt=""
          width="300"
          height="300"
        /><br />
        <!-- 품종 예측 완료전 로딩 -->
        <p class="result_loading" :class="state.resultLoading">
          {{ prediction.class }}
        </p>
        <!-- 품종 예측 결과 -->
        <p class="result_message" :class="state.resultDisplay">
          {{ prediction.class }} <br />
          {{ prediction.predict }}
        </p>
      </div>
      <!-- 추가 메시지 -->
      <div class="add_message" :class="state.resultDisplay">
        <span style="text-align: center; font-size: 14px"
          ><br />해당 품종에 대한 <br />추가적 정보를 <br />
          원한다면?</span
        >
        <button class="slide_btn">>></button>
      </div>
    </article>
  </section>
</template>

<script>
import { reactive, ref } from 'vue'
// import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'

export default {
  setup() {
    const prediction = reactive({
      class: '',
      predict: null
    })
    const state = reactive({
      isDisplay: false,
      display: 'off', // 모달창 온 오프 속성( :class= off or on)
      input: true,
      resultDisplay: 'off', // 품종 판결 결과창 온 오프 속성
      resultLoading: 'on' // 품종 판별 전 로딩 메시지 온 오프 속성
    })

    // 모달창을 온오프하는 함수
    const modalSwitch = () => {
      state.isDisplay = !state.isDisplay
      state.display = state.isDisplay ? 'on' : 'off'
    }

    const replaceImage = '/img/cats_3d/cats_3d_03.jpg'
    const blob = ref('')
    // public 폴더는 루트 경로에서 바로 접근이 가능함.
    const PATH = reactive({
      modelPath: '',
      metadataPath: ''
    })

    function input(e) {
      state.resultDisplay = 'off'
      state.resultLoading = 'on'
      prediction.class = '잠시만 기다려 주세요!'
      prediction.predict = ''
      // 전달받은 파일에 대한 URL를 생성한다(blob 타입으로)
      try {
        blob.value = URL.createObjectURL(e.target.files[0])

        // 이미지 태그 생성 후 해당 src 속성에 blob URL을 할당한다.
        const img = document.createElement('img')
        img.src = blob.value

        // 이미지를 선택한 후에 모델 로드와 예측을 수행합니다.
        tmImage.load(PATH.modelPath, PATH.metadataPath).then((model) => {
          model.predict(img).then((predictions) => {
            predictions.forEach((data) => {
              if (data.probability >= 0.3 && data.probability <= 1) {
                prediction.class = ' 가족님의 품종은' + data.className + '이며'
                prediction.predict =
                  '예측 확률은' +
                  (data.probability * 100).toFixed(2) +
                  '입니다.'
                state.resultDisplay = 'on'
                state.resultLoading = 'off'
              }
            })
          })
        })
      } catch (error) {
        console.log(error)
      }
    }
    // 선택한 동물에 따른 모델 불러오기를 분기처리하는 함수
    function choiceAnimal(e) {
      state.input = false
      const animal = e.target.value
      switch (animal) {
        case 'cat': {
          PATH.modelPath = '/cat_model/model.json'
          PATH.metadataPath = '/cat_model/metadata.json'
          break
        }
        case 'dog': {
          PATH.modelPath = '/dog_model/model.json'
          PATH.metadataPath = '/dog_model/metadata.json'
          break
        }
        default:
          console.log('선택해주세요!')
      }
    }

    return {
      input,
      blob,
      choiceAnimal,
      modalSwitch,
      state,
      prediction,
      replaceImage
    }
  }
}
</script>
<style scoped>
.title {
  text-align: center;
  margin: 25px 0;
  padding: 15px 0 0 0;
}
.on {
  visibility: visible;
  opacity: 1;
  translate: 0 0;
  transition: 2s ease-in-out;
}

.off {
  visibility: hidden;
  opacity: 0;
  translate: -500px 0;
}

/* 모달 아이콘 */
.modal_icon {
  position: fixed;
  background: white;
  box-shadow: 2px 2px inset bisque, -2px -2px inset rgb(250, 183, 183);
  padding: 10px;
  border: none;
  border-radius: 10px;
  right: 40px;
  bottom: 30px;
  /* z-index: 10000; */
  transform: translate(0, -50%);
}

.modal_icon:hover {
  cursor: pointer;
  background: bisque;
  transition: 1.2s;
}

.modal_inner_con {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
}

/* 모달창 */
.modal {
  transition: 1s;
  overflow: hidden auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  border: 1px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.modal::-webkit-scrollbar {
  width: 5px;
}
.modal::-webkit-scrollbar-thumb {
  background-color: rgb(234, 133, 133);
}

/* 동물 선택 */
.select {
  text-align: center;
  width: 100%;
  font-size: 1.15rem;
  padding: 20px 0;
  margin: 20px 0;
  border: none;
  box-shadow: inset 1px 1px rgb(0, 0, 0),
    inset -4px -5px rgba(45, 44, 44, 0.785);
  border-radius: 20px;
}

.select:focus {
  outline: none;
}

.select::selection {
  border-radius: 20px;
}

/* 동물 이미지 */
.input {
  margin: 10px 0;
}
.input::-webkit-file-upload-button {
  border: none;
  padding: 10px 0;
  border-radius: 10px;
  text-align: center;
}
img {
  margin: 10px 0;
  text-align: center;
  width: 100%;
  height: 450px;
  -webkit-box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #d9441f, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ea3333, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

/*  판별 결과 나오기 전 로딩 메시지 */
.result_loading.on {
  visibility: visible;
  opacity: 1;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  animation: hide 0.5s infinite alternate linear;
}

@keyframes hide {
  from {
    opacity: 0.7;
  }
}

.result_loading.off {
  visibility: hidden;
  opacity: 0;
}

/* 품종판별 결과 메시지  */
.result_message {
  text-align: center;
  transition: 1s;
  margin: 20px 0;
}

.result_message.on {
  visibility: visible;
  box-shadow: inset 15px 2px rgb(255, 153, 85),
    inset -5px -5px rgb(247, 184, 116), 5px 5px 5px 2px rgba(0, 0, 0, 0.37);
  text-align: center;
  border-radius: 20px;
  padding: 20px 0;
  opacity: 1;
}
.result_message.off {
  visibility: hidden;
  opacity: 0;
  left: 50%;
  transform: translate(-50%);
}

/* 품종 판별이 끝난 후 추가적인 안내 메시지 */
.add_message {
  position: fixed;
  right: 15px;
  display: flex;
  top: 50%;
  transition: 1s;
  transform: translate(1300px, -50%);
}

.add_message.on {
  position: fixed;
  right: 15px;
  display: flex;
  top: 50%;
  transform: translate(0, -50%);
}
.add_message.off {
  position: fixed;
  right: 15px;
  display: flex;
  top: 50%;
  transform: translate(1300px, -50%);
}

.slide_btn {
  animation: updown infinite 0.6s alternate;
  border: none;
  background: none;
  font-size: 5vw;
}

@keyframes updown {
  from {
    transform: translate(5px);
    opacity: 0.8;
  }
}
</style>
