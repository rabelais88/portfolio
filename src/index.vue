<template>
  <div>
    <videoback :sources="['./dist/backdrop.mp4']" class="videodrop">
      <navmenu></navmenu>
      <div class="backdrop">
        <p>work & portfolio</p>
        <transition name="fadeup" appear>
          <h1>Park Sungryeol</h1>
        </transition>
          <hr/>
        <transition name="fadeup" appear>
          <h2>박성렬</h2>
        </transition>
        <a href="#about" v-smooth-scroll="{duration:1000}" class="clicker">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="35px" height="20px" viewBox="0 0 960 560" enable-background="new 0 0 960 560" xml:space="preserve">
            <path fill="#ffffff" d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
              c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
              c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
          </svg>
        </a>
      </div>
    </videoback>
    <div id="about">
      <h1 v-scroll-reveal.reset>Hello,</h1>
      <h2 v-scroll-reveal.reset>안녕하세요,</h2>
      <hr />
      <p>I am a full stack web developer, web designer, translator<br/>
        who works in <b>{{location}}.</b></p>
      <br/>
      <h2>I speak {{ languages.length }} languages</h2>
      <div class="badgeLang margin40px">
        <div v-for="(elLang,index) in languages" :key="index">
          <div><b>{{elLang[0]}}</b></div>
          <div>{{elLang[1]}}</div>
        </div>
      </div>
      <h2>I use {{ programs.length }} tools</h2>
      <div class="margin40px">
      <carousel :navigationEnabled="true" :autoplay="true" :perPage="3" :perPageCustom="[[768, 4]]">
        <slide v-for="(elProg, index) in programs" :key="index" >
          <div class="badgeTool">
            <img v-if="elProg[1]" :src="elProg[1]"/>
            {{elProg[0]}}
          </div>
        </slide>
      </carousel>
      </div>
      <router-link to="/works" tag="a">MY PORTFOLIO</router-link>
      <div class="spacer"></div>
      <img src="/dist/engine.jpg" />
      <h2 v-scroll-reveal.reset>Engine behind the wheel</h2>
      <hr />
      <p>
        This portfolio runs on<br/> <b>Linux(CentOS 7) + nginx</b><br/><br/>
        Created with<br/> <b>Node.js + Vue + Webpack(Babel) + SASS</b><br/><br/>
        Some text datas are fetched from<br/> <b>PostgreSQL DB</b><br/><br />
        but most importantly, made with ♥<br/><br/>
      </p>
      <router-link to="/contact" tag="a">CONTACT ME</router-link>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { Carousel, Slide } from 'vue-carousel'
export default {
  data: () => {
    return {
      location:'',
      languages:[],
      programs:[]
    }
  },
  components:{
    Carousel,
    Slide
  },
  mounted(){
    Vue.axios.get('/jsonindex').then((res)=>{
      console.log(res)
      this.location = res.data.location
      this.languages = res.data.languages
      this.programs = res.data.programs
    })
  }
}
</script>

<style lang="scss" scoped>

.backdrop{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  text-align:center;
  width:100%;
  height:100%;
  
  h1, h2, p{
    color:white;
    text-shadow:0 2px 2px black;
  }

  h1{
    font-size:5rem;
  }

  h2{
    font-size:3rem;
    font-weight:500;
  }

  hr{
    width:100px;
    border-top:none;
    border-bottom:solid 1px white;
    padding-top:20px;
    margin-bottom:20px;
  }
}

.videodrop{
    box-shadow:0 3px 3px rgba(0,0,0,0.4);
}

.clicker {
  transition:0.5s;
  padding:10px;
}
.clicker:hover{
  opacity:0.4;
  transition:0.5s;
}

.margin40px{
  margin:40px;
}

#about{
  padding-top:100px;
  text-align:center;

  h1{
    font-size:5rem;
  }

  hr{
    margin-top:20px;
    margin-bottom:20px;
    margin-left:calc(50% - 15px);
    margin-right:calc(50% - 15px);
    border-top:solid 1px black;
    border-bottom:solid 1px black;
  }
  p{
    margin:20px;
  }
  img{
    max-width:80%;
    object-fit:cover;
    margin:20px;
  }
  a{
    margin-top:30px;
    display:inline-block;
    padding:10px;
    border-radius:2px;
    border:solid 1px black;
    text-decoration:none;
    color:black;
    transition:.5s;
    font-weight: bold;
    &:hover{
      background-color:black;
      color:white;
      transition:.5s;
    }
  }
}

.badgeLang{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;

  > div{
    background-color:black;
    color:white;
    min-width:130px;
    min-height:130px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:150px;
    margin:20px;
  }
}

.badgeTool{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  min-width:150px;
  min-height:150px;

  img{
    margin-bottom:10px;
    object-fit:cover;
    max-width:100px;
    max-height:100px;
  }
}

.spacer{
  background-color:transparent;
  height:200px;
}

@media only screen and (max-width: 800px) {
  .backdrop h1{
    font-size:3rem;
  }
  .marginer{
    margin:30px;
  }
}
</style>