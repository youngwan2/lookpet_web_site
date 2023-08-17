<template>
  <header class="header">
    <h1>
      <RouterLink to="/">Look Pet</RouterLink>
    </h1>

    <nav>
      <div class="inner">
        <RouterLink to="/dog/breed">강아지</RouterLink>
        <RouterLink to="/cat/breed">고양이</RouterLink>
        <RouterLink to="/community">커뮤니티</RouterLink>
        <RouterLink to="/service">서비스</RouterLink>
      </div>
    </nav>
    <ul class="util">
      <li>Login</li>
      <li>Sign Up</li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ddd;
}

header nav .inner {
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
}

header nav .inner h1 a {
  font: bold 24px/1 'arial';
  color: #444;
}

.header .util {
  position: absolute;
  width: 170px;
  top: 20px;
  right: 5px;

}

.header .util li {
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
