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
  margin:10px;
  width:calc(100% / 3 - 10);
  max-height:300px;
  box-shadow:0 0 3px rgba(0,0,0,0.4);
  padding:30px;
  a{
    text-decoration:none;
    color:black;
    display:flex;
    align-items:center;
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
  }
  .textize{
    flex-shrink: 100;
    margin-left:20px;
    flex-grow:1;
  }
  p,h1{
    word-wrap: break-word;
    word-break:break-all;
  }
}

@media only screen and (max-width: 800px) {
  .elPost{
    max-width:100%;
    width:100%;
  }
}
</style>