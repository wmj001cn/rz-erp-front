<template>


    <div class="container">
      <div class="row">
          <input class="form-control" type="text" v-model="order.orderNum"  placeholder="Order Number">
      </div>  
      <div class="row">
          <vue-bootstrap-typeahead 
  v-model="clientSearch"
  :serializer="s=>s.name"
  :data="clients"
  @hit="selectedClient = $event"
  placeholder="Type a client's name..."
/>

      </div>  
      <div class="row">
          <div class="container well">

              <div class="col-sm-5">
                  <vue-bootstrap-typeahead 
  v-model="productSearch"
  :serializer="s=>s.name"
  :data="products"
  @hit="selectedProduct = $event"
  placeholder="Type a product's name..."
/>

              </div>
              <div class="col-sm-2">{{selectedProduct.salePrice}}</div>
               <div class="col-sm-2"><input type="number" v-model="productToAdd.qty" class="form-control"></div>
               <button class="btn btn-primary" @click="addProduct">Add</button>
          </div>
      </div>  
      <div class="container">

          <table>
              <tr class="table" v-for="orderItem in order.orderItems" :key="orderItem.id">
                  <td>{{orderItem.name}}</td>
                  <td>{{orderItem.salePrice}}</td>
                  <td>{{orderItem.qty}}</td>
                  

              </tr>
          </table>

      </div>
       <button class="btn btn-primary" @click="createOrder">Create Order</button>

       <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
      
      </v-snackbar>
    </div>


</template>

<script>
import axios from "axios";
import _ from "underscore";
import Vue from "vue";
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
const api = axios.create({
  withCredentials: true
  
});
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)
export default {
  components: {
  
  },
  filters: {
    prefix: function(key) {
      return "" + key;
    }
  },
  data: () => ({
snack:false,
snackColor:'green',
snackText:'',
    productToAdd:{},
    testField: "",
    order:{orderItems:[], orderNum:''},

    selectedClient:{},
    clientSearch:'',
    clients:[{name:'a'}, {name:'b'}],

    selectedProduct:{},
    productSearch:'',
    products:[{name:'a'}, {name:'b'}],
  }),
  computed: {
    testComputedValue() {
      return "";
    }
  },
 
  created() {},
  methods: {
    createOrder:function(){
      var me = this;

      me.order.clientId = me.selectedClient.id;
      api.post("http://localhost:8082/order", me.order).then(()=>{{



              me.snack = true
      me.snackColor = 'success'
      me.snackText = 'Order Created'
      }})
    },
    addProduct:function(){

      

      console.log(this.order.orderItems);
      this.productToAdd.name = this.selectedProduct.name;
      this.productToAdd.productId = this.selectedProduct.id;
      this.productToAdd.salePrice = this.selectedProduct.salePrice;
    
        this.order.orderItems.push(this.productToAdd);
    },
    async getProducts(query) {
      const res = await fetch(`http://localhost:8082/products?name=${query}`, {
        credentials:'include'
      })
      this.products = await res.json()
    },
    async getClients(query) {
      const res = await fetch(`http://localhost:8082/clients?name=${query}`, {
        credentials:'include'
      })
      this.clients = await res.json()
    },
    clientsByNameLike(it) {
      //api/clients?name_like=it
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
  },
   watch: {
    clientSearch: _.debounce(function(name) { this.getClients(name) }, 500),
       productSearch: _.debounce(function(name) { this.getProducts(name) }, 500)
  }
};
</script>
<style>
</style>
