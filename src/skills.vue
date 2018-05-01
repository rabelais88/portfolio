<template>
  <div>
    <h2>I use {{ skillset.length }} tools</h2>
    <p>search among my skillsets!</p>

    <div class="filterCont">
      <div class="filters" v-for="(el,i) in filters" :key="i">
        <input type="checkbox" :id="el" v-model="addQuery[el]">
        <label :for="el">{{el}}</label>
      </div>
    </div>

    <div class="skillCont">
      <div v-for="(el,i) in filteredSkills" :key="i">
        <img :src="el[1]" />
        <p>{{el[0]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['skillset'],
  data(){
    return{
      querySkill: '',
      addQuery: {
      },
      filters:['frontend','backend','web scraping', 'database', 'graphics','misc']
    }
  },
  computed:{
    filteredSkills(){
      //if no skillset is selected, show everything
      if(Object.values(this.addQuery).includes(true) === false) return this.skillset

      const queries = Object.entries(this.addQuery).filter(el=>el[1])
      //if a skillset is selected, use filter
      return this.skillset.filter(elSkill=>{
        //do not use .forEach in order to return value inside
        for(let i=0;i <queries.length;i++){
          const elQuery = queries[i]
          if(elSkill[2].includes(elQuery[0])) return true
        }
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .filterCont{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    > div{
      padding:10px;
    }
  }
  .skillCont{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    div {
      width:200px;
      height:200px;
      > img{
        max-width:100px;
        max-height:100px;
      }
    }
  }
</style>
