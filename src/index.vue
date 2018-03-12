<template>
  <div>
    <video-bg :sources="['./dist/backdrop.mp4']">
      <div class="backdrop">
      <transition name="title" appear>
        <div>
          <h1>Park Sungryeol</h1>
          <hr/>
          <h1>박성렬</h1>
        </div>
      </transition>
      </div>
    </video-bg>
      <p>testtest</p>
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
  text-align:center;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.2);
}
.backdrop h1{
  color:white;
  text-shadow:0 2px 2px black;
  font-size:5rem;
}
.backdrop hr{
  width:400px;
  border-top:none;
  border-bottom:solid 1px white;
  margin-top:20px;
  margin-bottom:20px;
}

@media only screen and (max-width: 800px) {
  .backdrop h1{
    font-size:3rem;
  }
}
</style>