<template>
      <div class="container">
          <div class="row">
              <input v-model="entry.name" type="text" class="form-control" placeholder="Enter your name">
              <input v-model="entry.address" type="text" class="form-control" placeholder="Enter your address">
              <input v-model="entry.callNumber" type="text" class="form-control" placeholder="Enter your call number">
              <input v-model="entry.wechatId" type="text" class="form-control" placeholder="Enter your wechat id">
              <input v-model="entry.business" type="text" class="form-control" placeholder="Enter your business">
              <input v-model="entry.coordination" type="text" class="form-control" placeholder="Enter your coordination">
 

          </div>
          <button class="btn btn-primary" @click="upload">upload</button>
          <button class="btn btn-primary" @click="getdata">test</button>
          <!-- <iframe id="myframe" src="https://surl.amap.com/PrOfcbdahW"></iframe> -->
      </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    
  },
  filters: {
    prefix: function(key) {
      return "" + key;
    }
  },
  data: () => ({
    testField: "",
    entry:{
      name:'',
      address:'',
      callNumber:'',
      wechatId:'',
      business:'',
      coordination:'',
    }
  }),
  computed: {
    testComputedValue() {
      return "";
    }
  },
  watch: {
    testField: {
      deep: true,
      handler() {}
    }
  },
  created() {},
  methods: {
    test() {

        //var baseUrl = "bq4kd7.natappfree.cc";
       
    },
    upload(){

      let geolocation = new qq.maps.Geolocation("JKDBZ-QGTKO-GWFWF-SQ2ZZ-5S2GE-S4FVN", "myapp");
      geolocation.getLocation((position)=>{
          console.log(position);
          var lat = position.lat;
          var lon = position.lng;

          var url = `http://zd48w7.natappfree.cc/upload`;

         axios.post(`${url}`, {
           "name": this.entry.name,
           "business": this.entry.business,
           "address": this.entry.address,
           "callNumber": this.entry.callNumber,
           "wechatId": this.entry.wechatId,
           "location": {
               "lat": lat,
               "lon": lon
           }
       }).then(resp => {
             alert(resp.data);
   
         });
      });
        
      
    },
    getdata() {
      axios.post(`http://zd48w7.natappfree.cc/search`, {query:"蛋糕", lat:22.767126, lon:113.558135}).then(resp => {

        
      });
      /* axios
        .get(`${url}`, {
          params: {
            ID: 12345
          }
        })
        .then(resp => {})
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          // always executed
        });

      npm */
    }
  }
};
</script>
<style>
</style>
