<template>


      <div class="container">

              <input v-model="term" @keyup.enter="search" type="text" class="form-contrl" placeholder="what you want to watch?">


<div>

  
          <video id="videoPlayer" controls="controls" autoplay playsinline>
                <source :src="currentUrl" type="video/mp4">
      </video>
</div>
              <div v-for="vidItem in vidItems" :key="vidItem.id">
                    

                    <a href="javascript:void(0)" @click="play(vidItem.id)">{{vidItem.desc}}</a>

              </div>
      </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from 'timers';

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
    term: '',
    vidItems: [],
    currentUrl: ''
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
    play(id) {
      var me = this;
      axios.get(`${mbaseUrl}/play/${id}`).then(resp => {
            //me.currentUrl = `${mbaseUrl}/video/${id}`
            setTimeout(()=>{
              window.location = `vlc://${mbaseUrl}/video/${id}`
            }, 5000)
      });
        
    },
    search() {
      var url = "";
      axios.get(`${mbaseUrl}/search?term=${this.term}&records=10`).then(resp => {
            this.vidItems = resp.data;
      });
      
    }
  }
};
</script>
<style>
</style>
