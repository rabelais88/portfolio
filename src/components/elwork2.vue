<template>
  <a class="elWork" :href="workdata.href">
    <div class="photofy">
      <div :style="{ backgroundImage: 'url(' + workdata.photo + ')' }"></div>
    </div>
    <div class="textize">
      <h1>{{ workdata.year }}</h1>
      <h2>{{ workdata.title }}</h2>
      <p>click to see details</p>
    </div>
  </a>
</template>
<script>
export default {
  props:['workdata','workindex']
}
</script>
<style lang="scss" scoped>
.elWork{
  text-decoration:none;
  border:3px solid transparent;
  .photofy {
    box-shadow:0 0 3px rgba(0,0,0,0.6);
    overflow:hidden;
    > div{
      background-size:cover;
      background-position:center;
      transition:.5s ease;
    }
  }
  .textize{
    background-color:black;
    color:white;
    padding:20px;
  }
}
@media only screen and (min-width: 600px) {
  .elWork{
    position:relative;
    .photofy{
      width:450px;
      height:450px;
      >div{
        width:450px;
        height:450px;
      }
    }
    .textize {
      position:absolute;
      display:none;
      left:0;
      bottom:0;
    }
    &:hover{
      border:3px solid black;
      .photofy > div {
        transform:scale(1.5);
        transition:.5s ease;
      }
      .textize{
        display:initial;
        z-index:2;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .elWork{
    width:100%;
    .photofy{
      width: 100%;
      height:400px;
      >div{
        width: 100%;
        height:400px;
      }
    }
  }
}

</style>
