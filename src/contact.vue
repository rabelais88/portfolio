<template>
  <div>
    <navmenua></navmenua>
    <form class="frmContact" @submit.prevent="submit">
      Hello,<br/>
      I am from <input v-model="name" placeholder="Excellent Firm/Studio" required/><br/>
      located at <input v-model="place" placeholder="Gangnam, South Korea" required/><br/>
      I want to ask you about <input v-model="business" placeholder="business" required/><br/>
      You can reach me at<input v-model="contact" placeholder="abc@gmail.com" required/><br/>
      I am looking forward to your reply.<br />
      <div class="contButton">
        <button type="submit">OKAY!</button>
      </div>
    </form>
    <modal v-if="showModal" @close="showModal=false">
      <h3 slot="header">The mail has been sent successfully</h3>
      <p slot="body">Thank you, I'll be back to you in no time!</p>
    </modal>
    <loading :show="isLoading" label="sending the message..."></loading>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import modal from './dialog.vue'
import loading from 'vue-full-loading'
export default {
  data(){
    return{
      name:'',
      place:'',
      business:'',
      contact:'',
      showModal:false,
      isLoading:false
    }
  },
  methods:{
    submit(){
      this.isLoading = true
      axios.post('/contact', {
          name:this.name,
          place:this.place,
          business:this.business,
          contact:this.contact
        })
      .then(res => {
        console.log(res)
        this.showModal = true
        this.isLoading = false
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  components:{
    modal:modal,
    loading:loading
  }
}
</script>
<style lang="scss" scoped>
.frmContact{
  font-size:2rem;
  margin:10%;
  textarea, input, button { outline: none; }
  text-align:center;
  input{
    margin:10px;
    font-size:2rem;
    border-top:none;
    border-left:none;
    border-right:none;
    border-bottom:solid 1px rgba(0,0,0,0.3);
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
    margin-top:30px;
    display:flex;
    width:100%;
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
@media only screen and (max-width: 800px) {
  .frmContact{
    font-size:1.5rem;
    input{
      font-size:1.5rem;
    }
  }
}
</style>