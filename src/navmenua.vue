<template>
   <div class="navBarAlt">
    <router-link to="/" tag="a">BACK</router-link>
    <router-link to="/articles" tag="a">POSTS</router-link>
    <router-link to="/works" tag="a">WORKS</router-link>
    <router-link to="/contact" tag="a">CONTACT</router-link>
  </div>
</template>
<script>
</script>
<style>

.navBarAlt {
  margin:20px;
}

.navBarAlt a{
  text-decoration:none;
  color:black;
  transition:0.2s;
  position: relative;
  margin:20px;
}
.navBarAlt a:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  border-bottom: 2px solid black;
  transition: 0.4s;
}
.navBarAlt a:hover:after {
  width: 100%;
}

</style>