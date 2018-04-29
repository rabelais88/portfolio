<template>
  <div>
    <h2>I use {{ skillset.length }} tools</h2>
    <p>search among my skillsets!</p>
    <searcher sample="js, graphic, language..." @search="skillSearch"></searcher>

    <div class="filterCont">
      <div class="filters" v-for="(el,i) in filters" :key="i">
        <input type="checkbox" :id="el" v-model="anotherQuery[el]">
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
      anotherQuery: {
      },
      filters:['frontend','backend','programming language','web scraping', 'database', 'graphics']
    }
  },
  methods:{
    skillSearch(query){
      this.querySkill = query
    }
  },
  computed:{
    filteredSkills(){
        const secondCondition = Object.keys(this.anotherQuery).filter(el=>this.anotherQuery[el]).join(' ').split(' ').forEach(el=>{
          
        })

        return this.skillset.filter(elSkill=>{
          let subCondition = false
          const query = this.querySkill.toLowerCase()
          if(elSkill.length >= 3){
            subCondition = elSkill[2].toLowerCase().includes(query)
          }
          return elSkill[0].toLowerCase().includes(query) || subCondition
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
