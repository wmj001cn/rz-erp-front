<template>
 

  <div id="app">
    <v-app>
      <v-content>
         <!--  <div id="header">    <h1>RUIZIOT-ERP 管理系统</h1></div> -->
     <!-- <h1>防拆系统首页</h1> -->
         <!-- <a href="#/devices">设备列表</a>
         <a href="#/AddDevice">设备添加</a>
         <a href="#/Exam">标签绑定</a> -->
 <!--    <img src="@/assets/logo.png"> -->
    <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue'


export default {

  created() {
      
  },
  methods:{
        /* stompClient:{
          monitorIntervalTime: 100,
          stompReconnect: true,
          timeout(orgCmd) {              
            
          }
       } */
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>

