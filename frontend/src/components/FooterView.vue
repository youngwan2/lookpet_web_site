<template>
  <footer>
    <div class="inner">
      <div class="upper">
        <h1>DS Academy</h1>
      </div>

      <div class="lower">
        <address>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </address>
        <p>2023 LJY&copy;copyright all rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  background: #333;
  padding: 100px 0px;
  border-top: 1px solid #888;
}
footer .inner {
  max-width: 1180px;
  margin: 0px auto;
}
footer .inner .upper {
  width: 100%;
  border-bottom: 1px solid #777;
  padding-bottom: 20px;
}
footer .inner .upper::after {
  content: '';
  display: block;
  clear: both;
}
footer .inner .upper h1 {
  float: left;
  font: bold 24px/1 'arial';
  color: #666;
}
footer .inner .upper ul {
  float: right;
}
footer .inner .upper ul li {
  float: left;
  margin-left: 20px;
}
footer .inner .upper ul li a {
  font: bold 14px/1 'arial';
  color: #666;
}
footer .inner .lower {
  width: 100%;
  padding-top: 20px;
}
footer .inner .lower address {
  width: 100%;
  font: 12px/1.3 'arial';
  color: #777;
  margin-bottom: 20px;
}
footer .inner .lower p {
  width: 100%;
  font: 12px/1 'arial';
  color: #777;
}
</style>
