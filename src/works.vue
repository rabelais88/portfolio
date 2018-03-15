<template>
  <div>
    <navmenua></navmenua>
    <div class="title">
      <h1>this is work page</h1>
      <h1>stellar marina</h1>
    </div>
    <div class="contShowcase">
      <div class="tablet">
        <div class="disp"></div>
        <div class="btn"></div>
      </div>
    </div>
    <div class="mobile">
      <div class="disp"></div>
      <div class="btn">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.title{
  text-align:center;
}
@media only screen and (max-width: 800px) {
  .contShowcase{
    width:100%;
    .tablet{
      width:100%;
      .disp{
        width:100%;
        height:600px;
        background-image:url('/dist/work_stellar.jpg');
        background-position:center;
        background-size:contain;
        background-repeat:no-repeat;
      }
    }
  }
}
@media only screen and (min-width: 800px) {
  #contShowcase{
    z-index:1;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    .tablet{
      box-sizing:border-box;
      background-color:#44455a;
      border:solid 1px #585a83;
      border-radius:3%;
      width:80%;
      padding:30px;
      .disp{
        box-sizing:border-box;
        width:100%;
        height:768px;
        background-color:#585a83;
        background-image:url('/dist/work_stellar.jpg');
        background-position:center;
        background-size:cover;
      }
    }
  }
  .mobile{
    position:relative;
    z-index:2;
    float:right;
    margin-top:-320px;
    right:30px;
    width:240px;
    height:400px;
    background-color:#44455a;
    border:solid 1px #585a83;
    border-radius:20px;
    padding:20px;
    box-shadow:-2px 2px 3px rgba(0,0,0,0.5);
    .disp{
      box-sizing:border-box;
      width:100%;
      height:90%;
      background-color:#585a83;
    }
    .btn{
      display:flex;
      justify-content:center;
      >div{
        margin:10px;
        background-color:#585a83;
        width:35px;
        height:35px;
        border-radius:20px;
      }
    }
  }
}
</style>