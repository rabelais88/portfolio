<template>
  <div>
    <navmenua></navmenua>
    <transition name="fadeup" appear>
      <div class="title">
        <h1>Works</h1>
        <p>Previous work collections</p>
      </div>
    </transition>
    <div class="contWorks">
      <workviewer v-for="(elWork, index) in works" :key="index" :workdata="elWork">
      </workviewer>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  data(){
    return {
      works:[]
    }
  },
  mounted(){
    Vue.axios.get('/jsonworks').then((res)=>{
      console.log(res)
      this.works = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.title{
  text-align:center;
  padding:20px;
}
.contWorks{

}
@media only screen and (max-width: 800px) {

}
@media only screen and (min-width: 800px) {

}
</style>