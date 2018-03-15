<template>
  <div>
    <navmenua></navmenua>
    <transition name="fadeup" appear>
      <div class="title">
        <h1>Recent posts</h1>
        <p>on</p>
        <h2>social media</h2>
        <div class="vthr"><div class="l"></div><div></div></div>
      </div>
    </transition>
    <div id="contPosts">
      <postviewer v-for="(elPost, index) in posts" :key="index" :postdata="elPost">
      </postviewer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

export default {
  data(){
    return{
      posts:[]
    }
  },
  mounted(){
    Vue.axios.get('/jsonarticles').then((res)=>{
      console.log(res)
      this.posts = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
#backdrop{
  * {font-family: 'Permanent Marker', cursive;}
  z-index:-1;
  position:fixed;
  font-size:9rem;
  top:0;
  opacity:0.1;
  color:rgba(0,0,0,0.3);
}
#contPosts{
  display:flex;
  flex-wrap:wrap;
}
.title{
  padding:20px;
  text-align:center;
}
.vthr{
  padding:20px;
  >div{
    width:50%;
    height:25px;
  }
  .l{
    border-right:solid 1px black;
  }
}
</style>