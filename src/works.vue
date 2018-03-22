<template>
  <div>
    <navmenua></navmenua>
    <transition name="fadeup" appear>
      <div class="title">
        <h1>Works</h1>
        <p>Previous work collections</p>
      </div>
    </transition>
    <div class="contCheck">
      <a href="#" @click="toggleSimple">
        <span v-if="simple">Complicated List View</span>
        <span v-else>Simple List View</span>
      </a>
    </div>
    <div class="contWorks" v-if="!simple">
      <workviewer v-for="(elWork, index) in works" :key="index" :workdata="elWork">
      </workviewer>
    </div>
    <div class="contSimpleWorks" v-if="simple" >
      <ul>
        <li v-for="(elWork,index) in works" :key="index">
          <a href="#" ><b>{{elWork.title}}</b></a>
        </li>
      </ul>
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
      works:[],
      query:'',
      simple:false
    }
  },
  mounted(){
    Vue.axios.get('/jsonworks').then((res)=>{
      console.log(res)
      this.works = res.data
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
.contCheck{
  display:flex;
  justify-content:center;
  a{
    padding:10px;
    color:black;
    transition:.5s;
    border:solid 1px black;
    border-radius:2px;
    margin:20px;
    &:hover{
      background-color:black;
      color:white;
      transition:.5s;
      border:solid 1px transparent;
    }
  }
}

a{
  text-decoration:none;
}

.contSimpleWorks{
  ul{
    list-style-type:none;
    margin-left:-40px;
  }
  li{
    padding:10px;
    border-bottom:solid 1px rgba(0,0,0,0.3);
    text-align:center;
    a{
      color:black;
    }
    &:hover{
      background-color:rgba(0,0,0,0.5);
    }
  }
}

@media only screen and (max-width: 800px) {

}
@media only screen and (min-width: 800px) {

}
</style>