<template>
  <div>
    <hr />
    <section class="recent_section">
      <h2 class="recent_title">최신글</h2>
      <table class="recent_table">
        <thead>
          <tr class="recent_header">
            <th>번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="post in recentPosts"
            :key="post.id"
            class="recent_body"
            @click="postSwitch(post.id)"
          >
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td style="max-width: 100px">{{ post.date }}</td>
            <td>{{ post.author }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    recentPosts: Array
  },
  methods: {
    postSwitch(i) {
      const id = i
      this.$router.push(`/community/detail/${id}`)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.recent_section {
  min-height: 60vh;
  margin: 2.5rem 0 0 0;
}

.recent_title {
  margin: 0rem 0 2.5rem 0.9rem;
  color: rgb(158, 114, 114);
}

.recent_table {
  text-align: center;
  border: 1px dashed gray;
  padding: 15px;
  border-radius: 5px;
  width: 95%;
  margin: 0 auto;
  background: white;
}

.recent_header th {
  padding: 10px 0;
  background: rgb(170, 141, 141);
  color: white;
  border-radius: 10px;
}

.recent_body td {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 10px;
}

.recent_body:hover {
  box-shadow: 0 0 1px 3px rgb(183, 102, 102);
  border-radius: 5px;
}
.recent_body:nth-of-type(2n) {
  background: rgba(188, 161, 161, 0.704);
}

@media screen and (max-width: 520px) {
  .recent_table {
    font-size: 14px;
  }
}
</style>
