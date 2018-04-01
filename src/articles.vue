<template>
  <div>
    <navmenua></navmenua>
    <myloader msg="loading..." v-if="isLoading"></myloader>
    <transition name="fadeup" appear>
      <div class="title">
        <h1>Recent posts</h1>
        <p>on</p>
        <h2>social media</h2>
        <div class="vthr"><div class="l"></div><div></div></div>
      </div>
    </transition>
    <searcher sample="keyword" @search="filterPost"></searcher>
    <transition-group name="fadeup" id="contPosts">
      <postviewer v-for="(elPost, index) in filteredPosts" :key="index" :postdata="elPost">
      </postviewer>
    </transition-group>
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
      posts:[],
      query:'',
      isLoading:true
    }
  },
  mounted(){
    Vue.axios.get('/jsonarticles').then((res)=>{
      console.log(res)
      this.posts = res.data
      this.isLoading = false
    })
  },
  methods:{
    filterPost(targetQuery){
      this.query = targetQuery
    }
  },
  computed:{
    filteredPosts(){
      return this.posts.filter(elPost=>{
        const qry = this.query.toLowerCase()
        return elPost.type.toLowerCase().includes(qry) || elPost.content.toLowerCase().includes(qry)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

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