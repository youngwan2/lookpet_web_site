<template>
  <main>
    <section class="main_top_section">
      <header>
        <h1>
          <span class="span1">Look</span><br />
          <span class="span2">Pet</span><br />
        </h1>
        <address>2023 DS ACADEMY<br />SENIER PROJECT.</address>
      </header>
      <section class="banner">
        <video
          class="banner_video"
          src="../assets/video/video01.mp4"
          muted
          loop
          autoplay
        ></video>
      </section>
    </section>
    <!-- section -->
    <section class="middle_section">
      <h2>멍냥이 자랑 <span style="font-size: 18px; color:rgb(178, 174, 174)">(BOAST)</span></h2>
      <div class="middle_article_video">
        <!-- 영상 탑 1 -->
        <article
          id="article_video01"
          class="article_video"
          v-on:mouseenter="run"
          v-on:mouseleave="pause"
          v-on:click="aside_on"
        >
          <div class="inner">
            <div class="txt">
              <h2>01</h2>
              <p>HAPPY<br /><br />#1</p>
              <figure>
                <video
                  class="article_figure_video"
                  src="../assets/video/video05.mp4"
                  muted
                  loop
                ></video>
              </figure>
            </div>
          </div>
        </article>

        <article
          id="article_video02"
          class="article_video"
          v-on:mouseenter="run"
          v-on:mouseleave="pause"
          v-on:click="aside_on"
        >
          <div class="inner">
            <div class="txt">
              <h2>02</h2>
              <p>FRIENDLY<br /><br />#2</p>
              <figure>
                <video
                  class="article_figure_video"
                  src="../assets/video/video02.mp4"
                  muted
                  loop
                ></video>
              </figure>
            </div>
          </div>
        </article>

        <article
          id="article_video03"
          class="article_video"
          v-on:mouseenter="run"
          v-on:mouseleave="pause"
          v-on:click="aside_on"
        >
          <div class="inner">
            <div class="txt">
              <h2>03</h2>
              <p>LOVELY<br /><br />#3</p>
              <figure>
                <video
                  class="article_figure_video"
                  src="../assets/video/video03.mp4"
                  muted
                  loop
                ></video>
              </figure>
            </div>
          </div>
        </article>

        <article
          id="article_video04"
          class="article_video"
          v-on:mouseenter="run"
          v-on:mouseleave="pause"
          v-on:click="aside_on"
        >
          <div class="inner">
            <div class="txt">
              <h2>04</h2>
              <p>CUTIE<br /><br />#4</p>
              <figure>
                <video
                  class="article_figure_video"
                  src="../assets/video/video04.mp4"
                  muted
                  loop
                ></video>
              </figure>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- aside -->
    <aside id="aside_video01">
      <div class="txt">
        <h1>01</h1>
        <p>Healing`<br /><br />Movie01</p>
        <span id="close_text" v-on:click="close">CLOSE</span>
      </div>
      <figure id="figure_text">
        <video
          id="aside_video1"
          src="../assets/video/video01.mp4"
          muted
          loop
        ></video>
      </figure>
    </aside>
    <directMenu />
  </main>
</template>

<script>
import directMenu from '../components/directMenu.vue'
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {
    document.title = this.$route.name
  },
  methods: {
    run: function (e) {
      e.currentTarget.querySelector('video').play()
    },
    pause: function (e) {
      e.currentTarget.querySelector('video').pause()
    },
    aside_on: function (e) {
      const aside = document.querySelector('aside')
      const tit = e.currentTarget.querySelector('h2').innerText
      const txt = e.currentTarget.querySelector('p').innerText
      const vidSrc = e.currentTarget.querySelector('video').getAttribute('src')

      aside.querySelector('h1').innerText = tit
      aside.querySelector('p').innerText = txt
      aside.querySelector('video').setAttribute('src', vidSrc)

      aside.querySelector('video').play()
      aside.classList.add('on')
      window.scrollTo(0, 0)
    },
    close: function () {
      const aside = document.querySelector('aside')
      aside.classList.remove('on')
      aside.querySelector('video').pause()
    }
  },
  components: {
    directMenu
  }
}
</script>

<style>
@charset "utf-8";
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:w-ght@100&display=swap') * {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
  outline: 0;
}
main {
  width: 100%;
  height: 100%;
}
/* 애니메이션 */
@keyframes moveIn {
  from {
    right: -100%;
    width: 65%;
    margin-top: 6%;
    opacity: 0;
  }
  to {
    right: 5%;
    width: 65%;
    margin-top: 6%;
    opacity: 1;
  }
}
@keyframes moveIn2 {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes noneShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 0;
  }
}

.main_top_section {
  display: flex;
}
/* header */
main header {
  width: 40%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
  position: relative;
  z-index: 3;
}
main header h1 {
  /*안쪽의 자간 줄높이 초기화*/
  font-size: 0px;
  margin: 0 0 0 6rem;
  width: 60px;
  color: gray;
  font-family: 'Dancing Script', cursive;
}
main header h1 .span1 {
  animation: moveIn2 3s ease;
  font-family: 'Dancing Script', cursive;
}
main header h1 .span2 {
  animation: moveIn2 2s ease;
  font-family: 'Dancing Script', cursive;
}
main header h1 .span3 {
  animation: moveIn2 1s ease;
  font-family: 'Dancing Script', cursive;
}
main header h1::after {
  content: '';
  display: block;
  width: 12vw;
  height: 2px;
  background: #777;
  margin-top: 20px;
  transition: 1.5s;
}

main header h1 span {
  font: normal 3.8vw/2 'arial';
}
/* 주소 */
main header address {
  margin: 8% 0 0 95px;
  color: #949087;
  animation: moveIn2 4s ease-in-out;
  font: normal 1.1vw/1.5 'arial';
}
/* banner */
main .banner {
  padding: 0;
  width: 50%;
}
main .banner .banner_video {
  width: 100%;
  min-height: 300px;
  object-fit: cover;
  filter: saturate(50%);
  -webkit-box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ff0000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 20px 0px -10px #ffffff, 0px -20px 0px -10px #ffffff,
    20px 0px 0px -10px #ffffff, -20px 0px 0px -10px #ffffff,
    0px 0px 0px 10px #ff0000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
@media (max-width: 600px) {
  main header {
    border: 1px solid aqua;
    clear: both;
    display: none;
  }
  main .banner {
    /* border: 1px solid pink; */
    clear: both;
    width: 100%;
  }
  .aside_video01 {
    display: flex;
  }
  #article_video04 {
    display: none;
  }
}
/* nav */
main nav {
  position: absolute;
  top: 10vh;
  right: 5vw;
  z-index: 3;
  /* border:10px solid aqua; */
}
main nav ul {
  /*    border:3px solid aqua;*/
  display: flex;
  margin-top: 0;
}
main nav ul li a {
  font: normal 20px/1.2 'arial';
  color: #3a3636;
  margin-right: 30px;
}

/* section */
/* 섹션 전체 영역에 지정 */
main > section {
  position: relative;
  width: 90%;
  height: 100%;
  display: flex;
  padding-top: 70px;
  margin: 0 auto;
  z-index: 1;
  max-width: 1600px;
}

/* 미들 섹션 */
.middle_section {
  display: flex;
  min-height: 60vh;
  flex-direction: column;
  color: #949087;
}

/* 미들 섹션의 각 아티클 */
.middle_article_video {
  width: 100%;
  display: flex;
}
.middle_article_video article {
  position: relative;
  margin: 10px;
  flex: 1;
  opacity: 0.6;
  transition: flex 1s, opacity 1s;
  z-index: 1;
  cursor: pointer;
}
.middle_article_video article::before {
  content: '';
  display: block;
  width: 80%;
  height: 95%;
  background: #949087;
  position: absolute;
  top: 0px;
  left: -200px;
  opacity: 0;
  transition: 1s;
}
main section article .inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  position: relative;
}
main section article .inner .txt {
  width: 100%;
  transition: 0.5s;
}
main section article .inner .txt h2 {
  font: normal 2.5vw/1 'Alegreya Sans Sc';
  color: #2b2703;
  margin-bottom: 40px;
  padding-top: 70px;
  transition: 1s;
}
main section article .inner .txt h2::after {
  content: '';
  display: block;
  width: 40px;
  height: 2px;
  background: #777;
  margin-top: 20px;
  transition: 1.5s;
}
main section article .inner .txt p {
  font: 14px/1.4 'arial';
  /* color: #999; */
  color: #2b2703;
}
main section article .inner figure {
  width: 100%;
  height: 15vh;
  background: #777;
  transform-origin: left center;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  filter: saturate(10%);
  transition: 1s;
}
main section article .inner figure video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
}

/* article영역에 호버 효과 */
main section article:hover {
  flex: 1.5;
  opacity: 1;
  z-index: 2;
}
main section article:hover::before {
  left: 0px;
  opacity: 1;
}
main section article:hover .inner .txt {
  width: 75%;
}
main section article:hover .inner .txt h2 {
  font-size: 5vw;
  padding-top: 0px;
}
main section article:hover .inner .txt h2::after {
  width: 120px;
  background: rgb(242, 242, 242);
}
main section article:hover .inner figure {
  height: 25vh;
  filter: saturate(120%);
  transform: translateY(3vh);
}

/* aside */
main aside {
  width: 100%;
  height: 100vh;
  background: #222;
  position: absolute;
  top: 0px;
  left: -100%;
  opacity: 0; /*처음에 숨기기*/
  z-index: 2;
  box-sizing: border-box;
  padding: 20vh 7vw 14vh 20vw;
  display: flex;
  justify-content: space-between;
  transition: 1s;
}
main aside.on {
  opacity: 1;
  left: 0%;
  transition: 2s;
}
main aside .txt {
  width: 25%;
  height: 100%;
  position: relative;
  left: 10%;
}
main aside .txt h1 {
  font: normal 6vw/1 'Alegreya Sans Sc';
  color: #ddd;
  margin-bottom: 20px;
}
main aside .txt p {
  font: 3.1vw/0.7 'arial';

  color: #666;
  margin-bottom: 60px;
}
main aside .txt span {
  font-size: 30px;
  cursor: pointer;
  color: white;
  margin-left: 10%;
}
main aside .txt span:hover {
  color: orange;
}
main aside figure {
  width: 72%;
  height: 100%;
  position: relative;
  left: 4%;
}
main aside figure video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
