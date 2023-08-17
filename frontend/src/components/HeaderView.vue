<template>
  <header class="header">
    <div class="header_inner">
      <h1>
        <RouterLink to="/">Look Pet</RouterLink>
      </h1>

      <nav class="menu">
        <RouterLink to="/dog/breed">강아지</RouterLink>
        <RouterLink to="/cat/breed">고양이</RouterLink>
        <RouterLink to="/community">커뮤니티</RouterLink>
        <RouterLink to="/service">서비스</RouterLink>
      </nav>
      <ul class="util">
        <li>Login</li>
        <li>Sign Up</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

li {
  list-style: none;
}

.header {
  width: 100%;
  padding: 20px 0;
  background-color: burlywood;
}
.header .header_inner {
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.menu a {
  margin: 10px;
}
</style>
