<template>
<div id="main">

  <h1>Login</h1>
  <form action="localhost:8082/login">

    <div class="form-control"><input v-model="cred.username" type="text" placeholder="User Name"></div>
  <div class="form-control"><input v-model="cred.password" type="password" placeholder="Password"></div>
  <div class="form-control"><button @click="login">Login</button></div>
  </form>
</div>
</template>

<script>
import Vue from 'vue';
import VueCookies from 'vue-cookies';

import axios from "axios";
Vue.use(VueCookies);

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
    cred:{username:'', password:''},
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
  created() {

    
  },
  methods: {
    login() {
      var me = this;
      const api = axios.create({
	withCredentials: true
});
      api.post(`http://localhost:8082/doLogin`, me.cred).then(resp => {

        console.log(resp);
        localStorage.setItem('userInfo', resp.data);
        
        
        window.$cookies.set("JSESSIONID", resp.data.sessionId, "1d", "", "www.jaywei.com");
        me.$router.push('/');
      });
    }
  }
};
</script>
<style>
</style>
