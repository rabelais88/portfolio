<template>
  <div>
    <navmenua></navmenua>
    <p>this is an article page</p>
    <h1 v-parallax="0.3">test parallax</h1>
  </div>
</template>

<script>

const samplepost =[
  {type:'facebook',
  title:'Nunc ullamcorper ex ipsum, eget dictum sapien posuere nec. ',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tellus sem, condimentum sit amet rutrum vitae,',
  picture:''},
  {type:'twitter',
  title:'dfkdjfkdjfkfdjkfdkf',
  content:'dfjkdfljkdlfldfkdlfkdfldfkelfkflekflekfle',
  picture:''}
]
export default {
  data(){
    return{
      posts:[]
    }
  }
}
</script>

<style>
</style>