<template>
  <div>
    <navmenua></navmenua>
    <myloader msg="loading..." v-if="isLoading"></myloader>
    <transition name="fadeup" appear>
      <div class="title">
        <h1>Works</h1>
        <p>Previous work collections</p>
      </div>
    </transition>
    <transition name="fadeup">
      <div class="contWorks2">
        <workviewer2 v-for="(elWork,index) in works" :key="index" :workdata="elWork" :workindex="index">
        </workviewer2>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
  data(){
    return {
      works:[],
      isLoading:true
    }
  },
  mounted(){
    Vue.axios.get('/jsonworks').then((res)=>{
      console.log(res)
      this.works = res.data
      this.isLoading = false
    })
  },
  methods:{
    toggleSimple(){
      this.simple = !this.simple
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  text-align:center;
  padding:20px;
}

a{
  text-decoration:none;
}
.contWorks2{
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}

@media only screen and (max-width: 800px) {

}
@media only screen and (min-width: 800px) {

}
</style>