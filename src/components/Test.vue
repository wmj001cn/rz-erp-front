

<template>
    <div class="container-fluid well">
       <div class="container-fluid well">
       test

    </div>
    <div class="container-fluid well">
       test

    </div>
    </div>

</template>


<script>

import axios from 'axios'

export default {

  
  data: function(){
    return {
      device:{
        parts:[

          
        ]
      }
    }
  },
  components: {

  },
  methods:{
    addPart: function(){
      this.device.parts.push({count:1})
    },
    save: function(){
      console.log(this.device)
       axios.get(`${basePath}/echo?msg=ere`).then((resp)=>{
              alert(resp);
            })
    }
  }
}
</script>
<style>
table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

div {
  border: 1px solid red;
}
</style>

