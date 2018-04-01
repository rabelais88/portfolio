<template>
  <div>
    <navmenua></navmenua>
    <p> {{ $route.params.workid }}</p>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

export default {
  data(){
    return {
      workdetail:{}
    }
  },
  mounted(){
    Vue.axios.get('/jsonworkdetail/' + this.$route.params.workid).then((res)=>{
      console.log(res)
      this.workdetail = res.data
    })
  },
  watch: {
    '$route'(to, from){

    }
  }
}
</script>
<style lang="scss" scoped>

</style>