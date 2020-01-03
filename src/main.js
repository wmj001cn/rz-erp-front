// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueCurrencyFilter from 'vue-currency-filter'

import SockJS from  'sockjs-client';  
import  Stomp from 'stompjs';

var stompClient = null;

Vue.use(require('vue-moment'));
Vue.use(Vuetify)
Vue.use(VueCurrencyFilter,
  {
    symbol : '',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
  })
Vue.config.productionTip = false
//window.basePath = "http://hxb9h4.natappfree.cc"

window.basePath = "http://localhost:8082"
window.baseUrl = "localhost:9200";
window.mbaseUrl = "https://so.cross.echosite.cn";


//window.baseUrl = "zcb334.natappfree.cc";
/* window.basePath = "" */
/* eslint-disable no-new */

router.beforeEach((from, to, next)=>{
 
  var ok = false;

  if (to.path == '/test') {
    next();
    return;
  }  

  var userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
   next();
  } else {

    console.log(from.path)
     if (from.path !== '/') {
       
       next();
     } else {
      
      //alert(to.path)
      next('/Login');
     }
  }
})


while (stompClient == null) {
  var socket = new SockJS('http://localhost:8082/endpoint');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    console.log("Connected!");
      stompClient.subscribe('/topic/aut_failure', function(message) {
         router.push('/Login')
});

  },

  function(error) {
    console.log(error);
  });
}


var japp = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


window.app = japp;


