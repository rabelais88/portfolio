import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import vueSmoothScroll from 'vue-smooth-scroll'
import VueScrollReveal from 'vue-scroll-reveal'
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';

Vue.use(Tooltip);
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
import searcher from './searcher.vue'
import workdetail from './workdetail.vue'
import myloader from './loadercustom.vue'

import workviewer2 from './components/elwork2.vue'


//global component settings
Vue.component('videoback', videoback)
Vue.component('navmenu',navmenu)
Vue.component('navmenua',navmenua)
Vue.component('postviewer',postviewer)
Vue.component('workviewer2',workviewer2)
Vue.component('searcher',searcher)
Vue.component('myloader',myloader)


const routes = [
  { path : '/', component: index },
  { path : '/articles',component: articles },
  { path : '/works', component: works},
  { path : '/contact', component: contact},
  { path : '/workview/:workid', component: workdetail}
]

const router = new VueRouter({
  mode:'history',
  routes:routes,
  scrollBehavior (to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
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
    works:works,
    contact:contact,
    searcher:searcher,
    workdetail:workdetail
  },
  router: router
})
