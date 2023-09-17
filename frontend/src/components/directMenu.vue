<template>
  <div class="wrap">
    <h2>바로가기<span>(DIRECT MENU)</span></h2>
    <swiper
      :direction="horizontal"
      :loop="true"
      :pagination="{
        el: '.swiper-pagination',
        type: 'fraction'
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }"
      :spaceBetween="0"
      :slidesPerView="'auto'"
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :speed="1000"
      :coverflowEffect="{
        rotate: 50,
        stretch: -100,
        depth: 400,
        modifier: 1,
        slideShadows: false
      }"
      :autoplay="{
        delay: 1000,
        disableOnInteraction: true
      }"
      :modules="modules"
      class="swiper-wrapper"
    >
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/dog.svg" />
            <h2 @click="gotoPage('/dog/breed')">01.강아지 품종</h2>
            <p>
              키우시는 강아지가 무슨 종인가요?<br />
              여기서 품종 정보를 얻을 수 있습니다.
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/dog-info.svg" />
            <h2 @click="gotoPage('/dog/tip')">02.멍 팁</h2>
            <p>
              키우시는 강아지가 어떤 특성을 가졌는지 아시나요?<br />
              여기서 확인해 보세요
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/cat.svg" />
            <h2 @click="gotoPage('/cat/breed')">03.고양이 품종 정보</h2>
            <p>
              키우시는 고양이가 무슨 종인가요?<br />
              여기서 품종 정보를 얻을 수 있습니다.
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/cat_info.svg" />
            <h2 @click="gotoPage('/cat/tip')">04.냥 팁</h2>
            <p>
              키우시는 고양이가 어떤 특성을 가졌는지 아시나요?<br />
              여기서 확인해 보세요
            </p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/community.svg" />
            <h2 @click="gotoPage('/community')">05.커뮤니티 게시판</h2>
            <p>강아지, 고양이, 자유 카테고리별 게시글을 확인할 수 있습니다.</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/hospital.svg" />
            <h2 @click="gotoPage('/tools/hospital')">06.동물병원 정보 조회</h2>
            <p style="margin-top: 50px;">현재 위치에서 가까운 동물병원을 확인할 수 있습니다.</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/with_dog.png" />
            <h2 @click="gotoPage('/tools/culture')">
              07.반려동물 동반 가능 시설조회
            </h2>
            <p>반려동물과 함께 갈수 있는 시설을 확인할 수 있습니다.</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/quiz.png" />
            <h2 @click="gotoPage('/tools/test')">08.멍냥이 지식 테스트</h2>
            <p>멍냥이에 대한 퀴즈를 풀어 보세요.</p>
          </div>
        </div>
      </swiper-slide>
      <!-- <swiper-slide class="swiper-slide">
        <div class="inner">
          <div class="con">
            <img src="../assets/icon/우울증.png" />
            <h2 @click="gotoPage('/tools')">09.반려동물 우울증 테스트</h2>
            <p>우리 반려동물이 얼마나 우울한지 테스트 해 보세요.</p>
          </div>
        </div>
      </swiper-slide> -->
      <!-- 좌우버튼 -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>

      <!-- 페이징 버튼 -->
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [EffectCoverflow, Pagination]
    }
  },
  methods: {
    gotoPage(url) {
      this.$router.push(url)
      // location.href = url // <== 새로고침이 필요해서 추가함
    }
  }
}
</script>
<style scoped>
.wrap {
  width: 90%;
  display: flex;
  flex-direction: column;
  max-width: 1600px !important;
  margin: 2rem auto 0 auto;
  height: 100vh;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  /* background: linear-gradient(45deg, #ac8bef, #2ddbdc); */
  /* background: #6b5d50; */
  background:transparent;
}
.wrap h2 {
  font-weight: bold;
  font-size: 24px;
  max-width: 1600px;
  font-family: 'orbitron';
  color: gray;
  letter-spacing: 1px;
  left: 50px;
  top: 70px;
}
.wrap h2 span {
  opacity: 0.8;
  font-size: 18px;
}

/*기본 슬라이드 프레임*/
.wrap .swiper-wrapper {
  width: 100%;

  height: 100%;
}
.wrap .swiper-wrapper .swiper-slide {
  width: 500px;
  height: 500px;
  position: relative;
  top: 50%;
  margin-top: -230px;
}
.wrap .swiper-wrapper .swiper-slide:hover .inner .con img {
  background: rgba(255, 255, 255, 0.13);
  transform: scale(1.05);
  transition: 1.5s;
}
.wrap .swiper-wrapper .swiper-slide .inner {
  /* border: 3px solid aqua; */
  width: 100%;
  height: 100%;
  background: #463c3c83;
  padding: 30px;
  box-sizing: border-box;
  opacity: 1;
  transition: 1s;
}
.wrap .swiper-wrapper .swiper-slide .inner::before,
.wrap .swiper-wrapper .swiper-slide .inner::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  background: #b8b5b5;
}
.wrap .swiper-wrapper .swiper-slide-prev .inner,
.wrap .swiper-wrapper .swiper-slide-next .inner {
  opacity: 0.7;
}
@keyframes ani {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  1% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}
.wrap .swiper-wrapper .swiper-slide-active .inner::before {
  animation: ani 1s ease 1;
}
.wrap .swiper-wrapper .swiper-slide-active .inner::after {
  animation: ani 1s ease 0.3s 1;
}
.wrap .swiper-wrapper .swiper-slide .inner .con {
  height: 100%;
  /* border: 3px solid aqua; */
  position: relative;
  z-index: 10;
  /*    background: aqua;*/
}
.wrap .swiper-wrapper .swiper-slide .inner .con img {
  /* border: 3px solid aqua; */
  width: 50%;
  padding:10px;
  border-radius: 10px;
  margin-left: 27%;
}
.wrap .swiper-wrapper .swiper-slide .inner .con h2 {
  /* border: 3px solid aqua; */
  font-weight: normal;
  font-size: 40px;
  font-family: 'roboto';
  color:white;
  margin-top: 15px;
  margin-bottom: 20px;
}
.wrap .swiper-wrapper .swiper-slide .inner .con h2:hover {
  color: orange;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.555);
  transition: 1.2s;
  cursor: pointer;
}

.wrap .swiper-wrapper .swiper-slide .inner .con h2::after {
  content: '';
  display: block;
  width: 30px;
  height: 2px;
  background-color: #fdf8f8;
  margin-top: 15px;
  transition: 2s;
}
.wrap .swiper-wrapper .swiper-slide-active:hover .con h2::after {
  width: 400px;
  background: rgb(231, 210, 101);
}

.wrap .swiper-wrapper .swiper-slide .inner p {
  font-weight: normal;
  font-size: 18px;
  font-family: 'arial';
  margin: 10px 0 0 0;
  text-align: center;
  line-height: 1.3;
  color: white;
  letter-spacing: 1px;
}
/* 좌우 버튼  */
.wrap .swiper-button-prev {
  left: auto;
  right: 100px;
  top: auto;
  bottom: 50px;
  filter: grayscale(100%) brightness(3);
  transform: scale(0.5);
}
.wrap .swiper-button-next {
  left: auto;
  right: 60px;
  top: auto;
  bottom: 50px;
  filter: grayscale(100%) brightness(3);
  transform: scale(0.5);
}

/* 페이지네이션 */
.swiper-pagination-fraction {
  bottom: auto;
  top: 50px;
  left: auto;
  right: 50px;
  width: auto;
  font-size: 16px;
  font-family: 'orbitron';
  letter-spacing: 1px;
  color: gray;
}
.swiper-pagination-fraction span:nth-of-type(1) {
  font-size: 30px;
  color: #fff;
}
</style>
