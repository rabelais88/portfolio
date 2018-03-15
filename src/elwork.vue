<template>
  <div class="elWork">
    <a :href="workdata.href">
    <div class="photofy">
      <div :style="{ backgroundImage: 'url(' + workdata.photo + ')' }"></div>
    </div>
    <div class="textize">
      <h1>{{ workdata.year }}</h1>
      <h2>{{ workdata.title }}</h2>
      <p>{{ workdata.content }}</p>
    </div>
    </a>
  </div>
</template>
<script>
  export default {
    props:['workdata']
  }
</script>
<style lang="scss" scoped>

.elWork{
  h1{
    font-size:3rem;
  }
  h2{
    font-size:2rem;
  }
  >a{
    text-decoration:none;
    color:black;
  }
  .textize{
    padding:30px;
  }
  &:hover{
    opacity:0.7;
  }
}

.photofy{
  overflow:hidden;
  width:100%;
  height:400px;
  >div{
    width:100%;
    height:400px;
    background-size:cover;
    background-position:center;
    transition:all 0.5s ease;
    &:hover{
      transition:all 0.5s ease;
      transform:scale(1.3);
    }
  }
}

@media only screen and (min-width: 1100px) {
  .elWork{
    margin:10%;
    height:300px;
    &:nth-child(even){
      .textize{
        text-align:right;
      }
      .photofy{
        float:right;
        margin-left:30px;
      }
    }
    &:nth-child(odd){
      .textize{
        text-align:left;
      }
      .photofy{
        float:left;
        margin-right:30px;
      }
    }
  }
  .photofy{
    width:450px;
    height:100%;
    box-shadow:0 0 3px rgba(0,0,0,0.6);
  }
}
</style>
