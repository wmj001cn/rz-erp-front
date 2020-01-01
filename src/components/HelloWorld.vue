

<template>
    <div class="container-fluid well">
         <h2>设备列表</h2>
         

          <div class="row form-group">
           <!-- <label class="col-sm-1 form-label">部件名称</label>
           <input type="text" v-model="device.name" class="form-control col-sm-3"/>   
           <input type="number" v-model="device.name" class="form-control col-sm-1" placeholder="1" value="1"/> -->

           <div class="col-sm-12">
             <table>
             <tr>
               <th>名称</th>
               <th>安装数</th>
             
             </tr>

             <tbody>
               <tr v-for="device in devices" :key="device.id">
                 <td>{{device.name}}</td>
                 <td><div class="part" v-for="part in device.parts" :key="part.id">
                    <span>{{part.name}}</span>
                    <span class="part-count">{{part.count}}</span>
                   </div></td>
               </tr>

             </tbody>

           </table></div>
         </div>

/
    </div>

</template>


<script>

import axios from 'axios'

export default {
  data: function(){
    return {
      devices:[],
      searchName:''
    }
  },
  components: {

  },
  methods:{
    addPart: function(){
      this.device.parts.push({count:1})
    },
   
  },
  created(){
    axios.get(`${basePath}/api/devices?searchName=${this.searchName}`).then((resp)=>{
            this.devices = resp.data;
      }).catch((error)=>{
           console.log(error);
      })
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

tr:nth-child(even) {
  background-color: #f0f2f2;
}

.part{
     border: 2px solid #e8a6a6;
    display: inline-block;
    border-radius: 5px;
    background-color: #f2dada;
    margin: 2px;
}

.part-count{
      border-left: 1px solid #e8a6a6;
    background-color: #da8b8b;
    border-radius: 11px;
    padding: 0px 4px;
}
</style>

