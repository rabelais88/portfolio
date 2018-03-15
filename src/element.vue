<template>
  <div class="elPost">
    <a :href="postdata.href">
      <div class="photofy" v-if="postdata.photo" :style="{ backgroundImage: 'url(' + postdata.photo + ')' }">&nbsp;</div>
      <div class="textize">
      <b>{{postdata.type}}</b>
      <h1 v-if="postdata.title">{{postdata.title}}</h1>
      <p>{{postdata.content}}</p>
      </div>
    </a>
  </div>
</template>
<script>
export default{
  props:['postdata']
}
</script>
<style lang="scss" scoped>
.elPost{
  transition:0.5s ease;
  background-color:white;
  width:calc( 33.1% - 60px );
  max-height:300px;
  padding:30px;
  border-right:solid 2px black;
  a{
    text-decoration:none;
    color:black;
    display:flex;
    align-items:center;
    word-wrap: break-word;
    word-break:break-all;
  }
  &:hover{
    background-color:rgb(240,240,240);
    transition:0.5s ease;
  }
  .photofy{
    background-size:cover;
    background-position:center;
    width:80px;
    height:80px;
    display:block;
    border-radius:5px;
    flex-shrink:0;
    margin-right:20px;
  }
  .textize{
    flex-shrink: 100;
    flex-grow:1;
  }
  b{
    font-size:0.8rem;
  }
}

@media only screen and (max-width: 800px) {
  .elPost{
    max-width:100%;
    width:100%;
    border-right:none;
  }
}
</style>