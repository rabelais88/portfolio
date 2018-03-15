<template>
  <div>
    <navmenua></navmenua>
    <form class="frmContact" @submit.prevent="submit">
      Hello,<br/>
      I am <input v-model="name" placeholder="Excellent Firm" />,<br/>
      my office is at <input v-model="place" placeholder="Gangnam, South Korea" /><br/>
      I want to ask you about <input v-model="business" placeholder="business" /><br/>
      You can reach me at<input v-model="contact" placeholder="abc@gmail.com" /><br/>
      I am looking forward to your reply.<br />
      <div class="contButton">
        <button type="submit">OKAY!</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name:'',
      place:'',
      business:'',
      contact:''
    }
  },
  methods:{
    submit(){
      alert(this.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  .frmContact{
    font-size:2rem;
    margin:10%;
    textarea, input, button { outline: none; }

    input{
      margin:10px;
      font-size:2rem;
      border-top:none;
      border-left:none;
      border-right:none;
      border-bottom:solid 1px rgba(0,0,0,0.4);
      transition:.5s;
      max-width:100%;
      box-sizing:content-box;
      &:focus{
        background-color:rgba(0,0,0,0.2);
        border-bottom:solid 1px black;
        transition:.5s;
      }
    }
    .contButton{
      display:flex;
      width:100%;
      margin:20px;
      justify-content:center;
      button{
        background-color:transparent;
        border:solid 1px black;
        transition: .5s;
        border-radius:2px;    
        font-size:3rem;
        color:black;
        &:hover{
          background-color:black;
          color:white;
        }
      }
    }
  }
</style>