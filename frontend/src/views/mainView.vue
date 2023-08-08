<template>
  <div>
    <figure>
      <video
        src="../../public/img/video_preview_h264.mp4"
        autoplay
        muted
        loop
      ></video>
      <div class="figure_inner">
        <h1>Cat`s Land</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
          Id praesentium molestias similique quaerat magni facere in a?
          Adipisci, possimus reprehenderit!
        </p>
        <a href="#">view detail</a>
      </div>
    </figure>
    <section>
      <div class="inner">
        <h1>Cat`s News</h1>
        <div class="wrap">
          <article>
            <div class="pic">
              <img src="../../public/img/cat01.jpg" alt="1번째 콘테츠 이미지" />
            </div>
            <h2><a href="#"></a>Lorem ipsum dolor, sit</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </article>

          <article>
            <div class="pic">
              <img src="img/cat05.jpg" alt="2번째 콘텐츠 이미지" />
            </div>
            <h2><a href="#"></a>Lorem ipsum dolor, sit</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </article>

          <article>
            <div class="pic">
              <img src="img/cat03.jpg" alt="3번째 콘텐츠 이미지" />
            </div>
            <h2><a href="#"></a>Lorem ipsum dolor, sit</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </article>

          <article>
            <div class="pic">
              <img src="img/cat04.jpg" alt="4번째 콘텐츠 이미지" />
            </div>
            <h2><a href="#"></a>Lorem ipsum dolor, sit</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'mainView',
  components: {}
}
</script>

<style scoped>
figure {
  width: 100%;
  height: calc(100vh - 120px);
  background: #000;
  position: relative;
  overflow: hidden;
  padding-top: 250px;
}
figure video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  position: absolute;
  top: 0px;
  left: 0px;
}
figure .figure_inner {
  /* border: 3px solid aqua; */
  width: 1180px;
  margin: 0px auto;
  position: relative;
}
figure .figure_inner h1 {
  /* border: 3px solid aqua; */
  font: normal 120px/1 'arial';
  color: #fff;
  margin-bottom: 20px;
}
figure .figure_inner p {
  font: 16px/1.4 'arial';
  color: #888;
  margin-bottom: 60px;
}
figure .figure_inner a {
  display: block;
  width: 400px;
  height: 30px;
  border: 1px solid #ddd;
  font: bold 11px/30px 'arial';
  color: #fff;
  text-align: center;
  letter-spacing: 1pxx;
  transition: all 0.5s;
}
figure .figure_inner a:hover {
  background: #fff;
  color: #555;
}

/*news*/
section {
  width: 100%;
  padding: 200px 0px;
}
section .inner {
  width: 1180px;
  margin: 0px auto;
}
section .inner h1 {
  font: bold 24px/1 'arial';
  color: #555;
  text-align: center;
  margin-bottom: 50px;
}
section .inner .wrap {
  width: 100%;
}
section .inner .wrap::after {
  content: '';
  display: block;
  clear: both;
}
section .inner .wrap article {
  width: 280px;
  float: left;
  margin-right: 20px;
}
section .inner .wrap article:last-child {
  margin-right: 0px;
}
section .inner .wrap article h2 {
  margin-bottom: 10px;
}
section .inner .wrap article h2 a {
  font: bold 16px/1 'arial';
  color: #555;
}
section .inner .wrap article .pic {
  width: 100%;
  height: 120px;
  background: #333;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}
section .inner .wrap article .pic img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
