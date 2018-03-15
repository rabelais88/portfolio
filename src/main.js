import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import vueSmoothScroll from 'vue-smooth-scroll'

import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueRouter)
Vue.use(vueSmoothScroll)


Vue.use(VueScrollReveal),{
  duration:800,
  scale:1,
  distance:'10px',
  mobile:false
}

import articles from './articles.vue'
import index from './index.vue'
import videoback from './videoback.vue'
import navmenu from './navmenu.vue'
import navmenua from './navmenua.vue'
import postviewer from './element.vue'
import works from './works.vue'
import contact from './contact.vue'
import workviewer from './elwork.vue'

Vue.component('videoback', videoback)
Vue.component('navmenu',navmenu)
Vue.component('navmenua',navmenua)
Vue.component('postviewer',postviewer)
Vue.component('workviewer',workviewer)


const routes = [
  { path : '/', component: index },
  { path : '/articles',component: articles },
  { path : '/works', component: works},
  { path : '/contact', component: contact}
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
    navmenu:navmenu,
    postviewer:postviewer,
    works:works,
    contact:contact,
    workviewer:workviewer
  },
  router: router
})
