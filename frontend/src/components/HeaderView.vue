<template>
  <Header>

    <nav>
      <div class="inner">
        <h1><a href="#">Logo</a></h1>
        <ul id="gnb">
          <li v-for="(item, index) in menulist" :key="index" @click="goToPage(item.link)">
            <button v-html="item.menutext"></button>
          </li>
        </ul>

      </div>
    </nav>
    <ul class="util">
      <li>Login</li>
      <li>Sign Up</li>
    </ul>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        { menutext: '강아지', link: '/menu01' },
        { menutext: '고양이', link: '/menu02' },
        { menutext: '커뮤니티', link: '/menu03' },
        { menutext: '서비스', link: '/menu04' }
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
  max-width: 1180px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
}

header h1 {
  margin-top: 5rem;
}

header nav .inner h1 a {
  font: bold 24px/1 'arial';
  color: #444;
}

header .util {
  position: absolute;
  width: 170px;
  top: 20px;
  right: 5px;

}

header .util li {
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

nav ul>li {
  flex: 1;
  width: 100px;
  text-align: center;
  margin-top: 85px;
}

nav ul>li>button {
  color: #555;
  font-size: 18px;
  font-weight: 700;
  background: none;
  border: none;
}

nav ul>li>button:hover {
  cursor: pointer;
}
</style>
