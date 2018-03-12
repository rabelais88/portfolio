<template>
  <div>
    <videoback :sources="['./dist/backdrop.mp4']">
      <navmenu></navmenu>
      <div class="backdrop">
        <p data-aos="zoom-out" data-aos-duration="1000">work & portfolio</p>
        <h1 data-aos="zoom-out" data-aos-duration="1000">Park Sungryeol</h1>
        <hr/>
        <h2 data-aos="zoom-out" data-aos-duration="1000">박성렬</h2>
        <a href="#down" v-smooth-scroll="{duration:1500}">아래로</a>
      </div>
    </videoback>
    <div style="height:500px;">
      <p id="down">testtest</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.backdrop{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  text-align:center;
  width:100%;
  height:100%;
}
.backdrop h1, .backdrop h2, .backdrop p{
  color:white;
  text-shadow:0 2px 2px black;
}
.backdrop h1{
  font-size:5rem;
}
.backdrop h2{
  font-size:3rem;
  font-weight:500;
}

.backdrop hr{
  width:100px;
  border-top:none;
  border-bottom:solid 1px white;
  padding-top:20px;
  margin-bottom:20px;
}

@media only screen and (max-width: 800px) {
  .backdrop h1{
    font-size:3rem;
  }
}
</style>