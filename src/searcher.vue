<template>
  <div class="searchbox">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="22px" height="22px">
        <path style="fill:currentColor;fill-opacity:1;stroke:none"
        d="M 9 3 C 5.6759952 3 3 5.6759952 3 9 C 3 12.324005 5.6759952 15 9 15 C 10.481205 15 11.830584 14.465318 12.875 13.582031 L 18.292969 19 L 19 18.292969 L 13.582031 12.875 C 14.465318 11.830584 15 10.481205 15 9 C 15 5.6759952 12.324005 3 9 3 z M 9 4 C 11.770005 4 14 6.2299952 14 9 C 14 11.770005 11.770005 14 9 14 C 6.2299952 14 4 11.770005 4 9 C 4 6.2299952 6.2299952 4 9 4 z "/>  
      </svg>
      <input type="text" v-model="query" :placeholder="sample" @input="changeHandler"> 
  </div>
</template>
<script>
// usage example:
// <searcher sample="placeholder text goes here" @search="updateEvent"></searcher>
// --> methods: updateEvent(query)
export default {
  props:['sample'],
  data(){
    return {query:''}
  },
  methods:{
    changeHandler:function (){
      this.$emit('search',this.query)
    }
  }
}
</script>
<style lang="scss" scoped>
.searchbox{
  display:flex;
  justify-content:center;
  align-items:center;
  padding-top:20px;
  padding-bottom:20px;
  input{
    outline: none;
    font-size:1.2rem;
    text-align:center;
    border-bottom:solid 1px rgba(0,0,0,0.4);
    background-color:transparent;
    transition:.5s;
    &:focus{
      transition:.5s;
      border-bottom:solid 1px black;
    }
  }
}
</style>