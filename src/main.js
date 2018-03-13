import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import vueSmoothScroll from 'vue-smooth-scroll'
import VueParallaxJs from 'vue-parallax-js'

Vue.use(VueRouter)
Vue.use(vueSmoothScroll)
Vue.use(VueParallaxJs,{})

import articles from './articles.vue'
import index from './index.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import videoback from './videoback.vue'
import navmenu from './navmenu.vue'
import navmenua from './navmenua.vue'

Vue.component('videoback', videoback)
Vue.component('navmenu',navmenu)
Vue.component('navmenua',navmenua)

const routes = [
  { path : '/', component: index },
  { path : '/articles',component: articles }
]

const router = new VueRouter({
  mode:'history',
  routes:routes
})

new Vue({
  el: '#app',
  data:{
  },
  template:
  `<div>
    <transition name="fade">
    <router-view></router-view>
    </transition>
  </div>`,
  components:{
    articles:articles,
    videoback:videoback,
    navmenu:navmenu
  },
  router: router,
  mounted(){
    AOS.init()
  }
})
