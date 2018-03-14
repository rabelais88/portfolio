<template>
  <div>
    <navmenua></navmenua>
    <div id="backdrop">
      <p>these are my recent posts on social media</p>
    </div>
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
}
#contPosts{
  display:flex;
  flex-wrap:wrap;
}

</style>