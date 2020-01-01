

<template>
    <div class="container-fluid well">
         <h2>标签关联部件</h2>
         <div class="row">

          
         </div>
         <div class="row form-group">
           <label class="col-sm-1 form-label">关联部件</label>
           <div class="col-sm-2"><input class="form-control" type="text" v-model="searchName" @input="search" placeholder="按名称搜索"></div>
           <div class="col-sm-2">
            <select v-model="partId" id="" class="form-control">
            <option :value="part.id" v-for="part in parts" :key="part.id">{{part.name}}</option>   
          </select>  
            </div> 
           <div class="col-sm-2">

             <button @click="doBinding" class="btn btn-primary">关联天线下的所有标签</button>
             
           </div>
          
         </div>
         <div class="row">
           <h5>成功关联总数：{{bindingResults.length}}</h5>
           <div class="col-sm-12 ctn-result" v-for="bindingResult in bindingResults" :key="bindingResult.tid" 
                :class="{ok:bindingResult.ok, failed:!bindingResult.ok}">
            {{bindingResult.tid}}
           </div>
         </div>


    </div>

</template>


<script>

import axios from 'axios'

export default {
  data: function(){
    return {
      partId:'',
      searchName:'',
      bindingResults:[

          
      ],
      parts:[]
    }
  },
  components: {

  },
  created(){

    axios.get(`${basePath}/api/parts?searchName=${this.searchName}`).then((resp)=>{
      this.parts = resp.data;
    })
   
  },
  methods:{
    doBinding: function(){
  


       var partId = this.partId;
       var url = `${basePath}/api/bind?partId=${partId}`;
       console.log(url);
      axios.get(url).then((resp)=>{
         console.log("ok");
        })
    },

    search: function(){
        axios.get(`${basePath}/api/parts?searchName=${this.searchName}`).then((resp)=>{
          this.parts = resp.data;
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

.ok {
  background-color: #67aa5b;
}

.failed {
  background-color:#e46565;
}

.ctn-result {
  
  
  border: 2px solid #a8de97;
  border-radius: 10px;
  
}

.ctn-result p {
  padding: 1px;
}
</style>

