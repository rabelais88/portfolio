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
    <div class="contCheck">
      <a href="#" @click="toggleSimple">
        <span v-if="simple">Full List View</span>
        <span v-else>Simple List View</span>
      </a>
    </div>
    <transition name="fadeup">
      <div class="contWorks" v-if="!simple">
        <workviewer v-for="(elWork, index) in works" :key="index" :workdata="elWork" :workindex="index">
        </workviewer>
      </div>
    </transition>
    <transition name="fadeup">
      <div class="contSimpleWorks" v-if="simple" >
        <ul>
          <li v-for="(elWork,index) in works" :key="index">
            <a :href="elWork.href">
              <b>{{elWork.title}}</b>
            </a>
          </li>
        </ul>
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
      query:'',
      simple:false,
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
  display:flex;
  justify-content:center;
  transition:.5s;
  ul{
    list-style-type:none;
    margin-left:-40px;
  }
  li{
    text-align:center;
    position:relative;
    padding:40px;
    a{
      color:black;
      transition:.5s;
      &:before{
        content:'';
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:0%;
        background-color:rgba(0,0,0,0.2);
      }

      &:hover{
        transition:.5s;
        font-size:1.5rem;
        &:before{
          transition:.5s;
          height:100%;
        }
      }


    }

  }
}

@media only screen and (max-width: 800px) {

}
@media only screen and (min-width: 800px) {

}
</style>