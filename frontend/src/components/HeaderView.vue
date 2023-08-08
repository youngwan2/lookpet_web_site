<template>
  <Header>
    <nav>
      <div class="inner">
        <h1><a href="#">Logo</a></h1>
        <ul id="gnb">
          <li
            v-for="(item, index) in menulist"
            :key="index"
            @click="goToPage(item.link)"
          >
            <button v-html="item.menutext"></button>
          </li>
        </ul>
        <ul class="util">
          <li>Login</li>
          <li>Sign Up</li>
        </ul>
      </div>
    </nav>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        { menutext: 'menu01', link: '/menu01' },
        { menutext: 'menu02', link: '/menu02' },
        { menutext: 'menu03', link: '/menu03' },
        { menutext: 'menu04', link: '/menu04' },
        { menutext: 'menu05', link: '/menu05' }
      ]
    }
  },
  methods: {
    goToPage(target) {
      if (this.$router.currentRoute.path !== target) {
        this.$router.push(target)
      }
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  border-bottom: 1px solid #ddd;
}
header nav .inner {
  width: 1180px;
  height: 120px;
  margin: 0px auto;
  position: relative;
}
header nav .inner h1 {
  position: absolute;
  left: 0px;
  bottom: 15px;
}
header nav .inner h1 a {
  font: bold 24px/1 'arial';
  color: #444;
}
header nav .inner .util {
  position: absolute;
  top: 20px;
  right: 30px;
}
header nav .inner .util li {
  float: left;
  display: block;
  font: 15px/1 'arial';
  color: #999;
  padding: 0px 15px;
}
nav {
  padding: 8px;
}
nav .inner #gnb {
  display: flex;
  position: relative;
}
nav ul > li {
  flex: 1;
  text-align: center;
  padding-top: 85px;
}
nav ul > li > button {
  color: #555;
  font-size: 18px;
  font-weight: 700;
  background: none;
  border: none;
}
nav ul > li > button:hover {
  cursor: pointer;
}
</style>
