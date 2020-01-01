<template>
  
  <div class="container">
    {{log}}
    <div class="search">
      <div class="row">
        <div class="col-sm-8"><input
        v-model="searchTerm"
        @onblur="search"
        type="text"
        placeholder="输入你想要找的"
        class="form-control"
    
      >
      
      </div>
      <div class="col-sm-4"><i class="fa fa-search" aria-hidden="true" @click="search"></i></div>

      </div>
      
    </div>

    <div id="result" class="container">
      <div v-for="hit in hits" :key="hit._id">
        {{hit._source.name}}
        <a href="#"><i class="fa fa-phone" aria-hidden="true"></i></a>
        - 离我 {{hit.fields.distance[0].toFixed(0)}} 米
        
        <a target="_blank" href="javascript:void(0)" @click="show(hit._source.location)"><i class="fa fa-map-marker" aria-hidden="true"></i></a>
    
        
        <!-- {{result.name}} <span class="addr">金岭南路441-443号 {{result.distance}}  <i class="fa fa-map-marker" aria-hidden="true"></i></span><i class="fa fa-phone" aria-hidden="true"></i>  </a> -->
      </div>
    </div>
    <div id="ctn-map"></div>
  </div>
</template>

<script>
import axios from "axios";
 
export default {
  components: {},
  filters: {
    prefix: function(key) {
      return "" + key;
    }
  },
  data: () => ({
    log: "",
    results: [],
    hits: [],
    searchTerm: ""
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
  created() { },
  mounted() {  },
  
  methods: {
    show(location) {
    
      
      window.open(
  `http://zd48w7.natappfree.cc/map.html?a=${location.lat}&b=${location.lon}`,
  '_blank' // <- This is what makes it open in a new window.
);
     
    },
    search() {
      var me = this;
      let geolocation = new qq.maps.Geolocation("JKDBZ-QGTKO-GWFWF-SQ2ZZ-5S2GE-S4FVN", "myapp");
      geolocation.getLocation((position)=>{
          console.log(position);
          var lat = position.lat;
          var lon = position.lng;
          var url = "zd48w7.natappfree.cc"
          //var url = "localhost:8081"
          me.log = JSON.stringify({query:me.searchTerm, lat:lat, lon:lon});
          axios.post(`http://${url}/search`, {query:me.searchTerm, lat:lat, lon:lon}).then(resp => {

            this.hits = resp.data.hits.hits;
          });
      })

      
      /* navigator.geolocation.getCurrentPosition(position => {
        console.log(position);

        var lon = position.coords.longitude;
        var lat = position.coords.latitude;

        //this.results = mp[this.searchTerm];
        var query = me.searchTerm;
        //var baseUrl = "bq4kd7.natappfree.cc";
       
        var url = `http://${baseUrl}/business/_search`;
        axios
          .post(`${url}`, {
            query: {
              bool: {
                must: {
                  query_string: { query: query }
                },

                filter: {
                  geo_distance: {
                    distance: "1km",
                    location: {
                      lat: lat,
                      lon: lon
                    }
                  }
                }
              }
            },

            stored_fields: ["_source"],
            script_fields: {
              distance: {
                script: {
                  lang: "painless",

                  source: `doc['location'].arcDistance(${lat},${lon})`
                }
              }
            },
            sort: {
              _geo_distance: {
                location: {
                  lat: lat,
                  lon: lon
                },
                order: "asc",
                unit: "km"
              }
            }
          })
          .then(resp => {
            //console.log(resp);
            this.hits = resp.data.hits.hits;
          });
      }); */
    },
    getdata() {
      var url = "";
      axios.get(`${url}`).then(resp => {});
      axios
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

      axios.post(`${url}`, {}).then(resp => {});
    }
  }
};
</script>
<style>
.ctn-business {
  display: flex;
  flex-wrap: wrap;
}
#result {
  margin-left: 0;
}
.addr {
  font-size: smaller;
}
</style>
