<template>
  <div>
    <videoback :sources="['./dist/backdrop.mp4']" class="videodrop">
      <navmenu></navmenu>
      <div class="backdrop">
        <p data-aos="zoom-out" data-aos-duration="1000">work & portfolio</p>
        <h1 data-aos="zoom-out" data-aos-duration="1000">Park Sungryeol</h1>
        <hr/>
        <h2 data-aos="zoom-out" data-aos-duration="1000">박성렬</h2>
        <a href="#about" v-smooth-scroll="{duration:1500}" class="clicker">
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
      <h1 data-aos="fade-up">Hello,</h1>
      <h2 data-aos="fade-up">안녕하세요,</h2>
      <hr />
      <p>I am a full stack web developer, web designer, translator</p>
      <p>who works in <b>{{location}}.</b></p>
      <br/>
      <p>I speak <b>{{ languages.length }}</b> languages</p>
      <div class="contBadge marginer">
        <div v-for="(elLang,index) in languages" :key="index" class="badge">
          <div><b>{{elLang[0]}}</b></div>
          <div>{{elLang[1]}}</div>
        </div>
      </div>
      <p>I use <b>{{ programs.length }}</b> tools</p>
      <div class="marginer"> 
        <carousel :navigationEnabled="true" :autoplay="true" :perPage="3" :perPageCustom="[[768, 4]]">
          <slide v-for="(elProg, index) in programs" :key="index" >
            <div class="badgeTool">
              <img v-if="elProg[1]" :src="elProg[1]" class="logoTool"/>
              {{elProg[0]}}
            </div>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  data: () => {
    return {
      location:'Incheon, South Korea',
      languages:[['English','Advanced'],['Korean','Native'],['French','DELF B1'],['Chinese','HSK B1'],['Japanese','JLPT N2'],['Spanish','Intermediate']],
      programs:[
        ['Node.js', '/dist/logo_node.png'],
        ['React.js','/dist/logo_react.png'],
        ['Vue.js','/dist/logo_vue.png'],
        ['webpack','/dist/logo_webpack.jpg'],
        ['Babel','/dist/logo_babel.png'],
        ['Express'],
        ['Linux(CentOS)'],
        ['Express.js'],
        ['PostgreSQL'],
        ['MySQL'],
        ['Python'],
        ['MongoDB'],
        ['JQuery'],
        ['Adobe Photoshop'],
        ['Adobe Illustrator'],
        ['Adobe After Effects']
      ]
    }
  },
  components:{
    Carousel,
    Slide
  }
}
</script>

<style>
.backdrop{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  text-align:center;
  width:100%;
  height:100%;
}
.backdrop h1, .backdrop h2, .backdrop p{
  color:white;
  text-shadow:0 2px 2px black;
}
.backdrop h1{
  font-size:5rem;
}
.backdrop h2{
  font-size:3rem;
  font-weight:500;
}
.backdrop hr{
  width:100px;
  border-top:none;
  border-bottom:solid 1px white;
  padding-top:20px;
  margin-bottom:20px;
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

#about{
  padding-top:100px;
  text-align:center;
}
#about h1{
  font-size:5rem;
}
#about hr{
  margin-top:20px;
  margin-bottom:20px;
  margin-left:calc(50% - 15px);
  margin-right:calc(50% - 15px);
  border-top:solid 1px black;
  border-bottom:solid 1px black;
}

.contBadge{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
}


.badge{
  background-color:black;
  color:white;
  min-width:150px;
  min-height:150px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  border-radius:150px;
  margin:20px;
}

.badgeTool{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}

.logoTool{
  margin-bottom:10px;
  object-fit:cover;
  max-width:100px;
  max-height:100px;
}

.marginer{
  margin:50px;
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