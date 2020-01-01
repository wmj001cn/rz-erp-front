

<template>
    <div class="container-fluid well">
         <h2>添加设备</h2>
         <div class="row form-group">
           <label class="col-sm-1 form-label">设备名称</label>
           <input type="text" v-model="device.name" class="form-control col-sm-3"/>   
           <div class="col-sm-2">

             <button @click="addPart" class="btn btn-primary">添加部件</button>
             
           </div>
           <div class="col-sm-1">

             <button @click="save" class="btn btn-primary">保存</button>

           </div>
         </div>

         <div class="row form-group">
           <!-- <label class="col-sm-1 form-label">部件名称</label>
           <input type="text" v-model="device.name" class="form-control col-sm-3"/>   
           <input type="number" v-model="device.name" class="form-control col-sm-1" placeholder="1" value="1"/> -->

           <div class="col-sm-12">
             <table>
             <tr>
               <th>部件名称</th>
               <th>安装数</th>
             
             </tr>

             <tbody>
               <tr v-for="part in device.parts" :key="part.id">
                 <td><input type="text" v-model="part.name" class="form-control"></td>
                 <td><input type="number" v-model="part.count" class="form-control"></td>
               </tr>

             </tbody>

           </table></div>
         </div>
         <div class="row form-cotrol">
           <div class="col-sm-2">


           </div>
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


</style>

