import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import articles from './articles.vue'
import index from './index.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import videoBack from './videoback.vue'

Vue.component('video-bg', videoBack)

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
    <div class="navBar" data-aos="zoom-in">
      <router-link to="/" tag="a">INDEX</router-link>
      <router-link to="/articles" tag="a">POSTS</router-link>
    </div>
    <router-view></router-view>
  </div>`,
  components:{
    articles:articles,
    'video-bg':videoBack
  },
  router: router,
  mounted(){
    AOS.init()
  }
})
