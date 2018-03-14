<template>
  <div class="elPost">
    <a :href="postdata.href">
      <b>{{postdata.type}}</b>
      <h1 v-if="postdata.title">{{postdata.title}}</h1>
      <p>{{postdata.content}}</p>
      <div class="photofy" v-if="postdata.photo" :style="{ backgroundImage: 'url(' + postdata.photo + ')' }"></div>
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
  max-width:300px;
  max-height:300px;
  box-shadow:0 0 3px rgba(0,0,0,0.4);
  padding:30px;
  a{
    text-decoration:none;
    color:black;
  }
  &:hover{
    background-color:rgb(240,240,240);
    transition:0.5s ease;
  }
  .photofy{
    background-size:cover;
    background-position:center;
    width:100%;
    height:200px;
  }
}

@media only screen and (max-width: 800px) {
  .elPost{
    max-width:100%;
    width:100%;
  }
}
</style>