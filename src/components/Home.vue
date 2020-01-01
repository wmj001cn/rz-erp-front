

<template>

<div>

<router-link to="/order">Orders</router-link>
  <router-link to="/product">Products</router-link>
</div>
</template>


<script>
import Vue from 'vue'

export default {
  components:{
      
  },
  filters:{
   
  },
  data: function(){
    return {
     
    }
  },
  computed:{
    
  },
  created(){
     /* axios.get(`${basePath}/products?start=0&size=51`).then((resp)=>{
          this.ps = resp.data.content;
      }).catch((error)=>{
           console.log(error);
      }) */
  },
  components: {

  },
  methods:{
 
  }
}
</script>
<style>
</style>

