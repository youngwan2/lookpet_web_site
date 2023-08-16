<template>
  <header>
    <h1>menu05</h1>
  </header>
  <main>
    <ul>
      <li><button>검색</button></li>
      <li><input type="text" /></li>
    </ul>
    <section>
      <article class="d" v-for="(v, i) in imgdata_d" :key="i">
        <div>
          <img :src="v.src" />
          <h2>{{ v.name }}</h2>
          <p>{{ v.subdec }}</p>
        </div>
      </article>

      <article class="jpeg" v-for="(v, i) in imgdata_jpg" :key="i">
        <div>
          <img :src="v.src" />
          <h2>{{ v.name }}</h2>
          <p>{{ v.subdec }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  neme: 'catsGallery',
  data() {
    return {
      imgdata_d: [
        {
          src: '/img/cats_3d/cats_3d_01.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_02.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_03.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_04.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_05.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_06.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_07.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_08.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_3d/cats_3d_09.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        }
      ],
      imgdata_jpg: [
        {
          src: '/img/cats_jpg/cat-jpg_01.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_02.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_03.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_04.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_05.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_06.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_07.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_08.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_09.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        },
        {
          src: '/img/cats_jpg/cat-jpg_10.jpg',
          name: 'Lorem, ipsum dolor.',
          subdec: 'Lorem ipsum dolor,sitamet consetetur adipisicing.'
        }
      ]
    }
  },
  mounted() {}
}
</script>

<style scoped>
@charset "utf-8";
* {
  margin: 0px;
  padding: 0px;
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
body {
  background: #efefef;
}
header {
  width: 200px;
  height: 100%;
  background: linear-gradient(45deg, aqua, royalblue);
  position: fixed;
  top: 0px;
  left: 0px;
}
main {
  margin-left: 300px;
  box-sizing: border-box;
  padding: 20px;
}

/*header*/
header h1 {
  font: bold 50px/1 'orbitron';
  color: #fff;
  left: 50px;
  top: 50%;
  transform: translateY(200%);
}
header h1::before {
  content: 'UI/UX DELOPMENT';
  display: block;
  font: 14px/1 'orbitron';
  color: #fff;
  letter-spacing: 2px;
  position: absolute;
  left: 0px;
  top: 140px;
  opacity: 0.8;
}
header h1::after {
  content: '';
  display: block;
  width: 150px;
  height: 2px;
  background: #fff;
  margin-top: 20px;
}

/*main*/
main ul {
  width: 100%;
  margin-bottom: 10px;
  margin-right: 20px;
}
main ul::after {
  content: '';
  display: block;
  clear: both;
}
main ul li {
  float: right;
  margin-right: 20px;
  width: 200px;
  height: 26px;
}
main ul li button {
  background: #58abf8;
  border: none;
  border-radius: 5px;
  width: 50px;
  cursor: pointer;
  color: white;
}
main ul li a {
  display: block;
  width: 100%;
  height: 100%;
  font: bold 7px/26px 'orbitron';
  color: #aaa;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  background: #fff;
}
main ul li.on a {
  background: linear-gradient(45deg, #67faf3, #58abf8);
  box-shadow: 0px 5px 20px rgab(0, 255, 255, 0.527);
  color: #fff;
}

main section::after {
  content: '';
  display: block;
  clear: both;
}
main section article {
  width: 20%;
  float: left;
  box-sizing: border-box;
  padding: 12px;
}
main section article div {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 14px;
}
main section article div img {
  width: 100%;
}
main section article div h2 {
  margin-top: 15px;
  font: bold 11px/1 'orbitron';
  letter-spacing: 1px;
  color: #444;
  margin-bottom: 5px;
}
main section article div p {
  font: 10px/1.2 'arial';
  margin-bottom: 15px;
}

/*반응형*/
@media screen and (max-width: 1599px) {
  header {
    width: 350px;
  }
  main {
    margin-left: 350px;
  }
  main section article {
    width: 25%;
  }
}

@media screen and (max-width: 1199px) {
  header {
    width: 100%;
    height: 80px;
    position: relative;
  }
  header h1 {
    font: bold 24px/1 'orbitron';
    transform: translateY(0%);
  }
  header h1::before,
  #header h1::after {
    display: none;
  }
  header ul {
    left: 83%;
    bottom: 25px;
  }
  header ul li {
    margin-right: 20px;
  }
  header ul li a {
    font-size: 20px;
  }
  header ul li a span {
    display: none;
  }
  main {
    width: 100%;
    margin-left: 0px;
  }
  main section article {
    width: 25%;
  }
}

@media screen and (max-width: 899px) {
  header ul {
    left: 80%;
  }
  main section article {
    width: 33.333%;
  }
}

@media screen and (max-width: 679px) {
  header ul {
    left: 70%;
  }
  main section article {
    width: 50%;
  }
}

@media screen and (max-width: 539px) {
  header ul {
    display: none;
  }
  main ul {
    margin-right: 0px;
    box-sizing: border-box;
    padding: 0px 13px;
  }
  main ul li {
    margin-right: 2%;
    width: 32%;
  }
  main ul li:nth-of-type(1) {
    margin-right: 0%;
  }
  main section article {
    width: 100%;
  }
}
</style>
