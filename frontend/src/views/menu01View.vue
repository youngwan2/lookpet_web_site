<template>
  <header>
      <h1>menu01</h1>
  </header>

</template>

<style scoped>
@charset "utf-8";
*{
  margin:0px;
  padding:0px;
}
ul,ol,li{
  list-style:none;
}
a{
  text-decoration:none;
}
body{
  background:#efefef;
}

/*header*/
header{
  width:200px;
  height:100%;
  background:linear-gradient(45deg,aqua,royalblue);
  position:fixed;
  top:0px;
  left:0px;
}
header h1{
  font:bold 50px/1 'orbitron';
  color:#fff;
  left:50px;
  top:50%;
  transform:translateY(200%);
}
header h1::before{
  content:'UI/UX DELOPMENT';
  display:block;
  font:14px/1 'orbitron';
  color:#fff;
  letter-spacing:2px;
  position:absolute;
  left:0px;
  top:140px;
  opacity:0.8;
}
header h1::after{
  content:'';
  display:block;
  width:150px;
  height:2px;
  background:#fff;
  margin-top:20px;
}
</style>
