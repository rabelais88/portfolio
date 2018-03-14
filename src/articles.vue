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

const sampleposts =[
  {type:'facebook',
  title:'',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus sem, condimentum sit amet rutrum vitae,',
  photo:'',date:'', href:'/'},
  {type:'twitter',
  title:'',
  content:'dfjkdfljkdlfldfkdlfkdfldfkelfkflekflekfle',
  photo:'https://scontent-icn1-1.cdninstagram.com/vp/cd83e638cbe28768080be5ac58ea55b7/5AAC3FDE/t51.2885-15/s320x320/e35/28434248_189586531805588_7004851592578990080_n.jpg',date:'', href:'/'},
  {type:'random',
  title:'가나다라마바사아자차카',
  content:'동해물과 백두산이 마르고 닳도록 하느님이 보우하사',
  photo:'',date:'',href:'/'}
]

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