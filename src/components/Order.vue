<template>

  <div style="">
    <v-toolbar flat color="white">
      <v-toolbar-title>订单</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      
      <span style="font-weight:900;">营业额总计:&nbsp;</span> <span style="color:red;font-weight:600;">{{ total / 100 | currency }}</span>
      &nbsp;&nbsp;<span style="font-weight:900;">增值税总计:&nbsp;</span> <span style="color:red;font-weight:600;">{{ total*0.16 / 100 | currency }}</span>
      &nbsp;&nbsp;<span style="font-weight:900;">营业所得总计:&nbsp;</span> <span style="color:red;font-weight:600;">{{ total*(1-0.16) / 100 | currency }}</span>
        
  

      <v-spacer></v-spacer>
     


      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          <router-link to="/OrderEntry">Add New Order</router-link>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="描述" @keypress.enter="alert()"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.orderNum" label="订单号"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.orderNum" label="订单号"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.orderNum" label="订单号"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.orderNum" label="订单号"></v-text-field>
                </v-flex>
               
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    </v-toolbar>
     
    <div> <v-btn-toggle v-model="toggle_multiple">
              <v-btn flat>
                <v-icon small>已下单/待发货</v-icon>
              </v-btn>
               <v-btn flat>
                <v-icon small>已发货/待开票</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>已开票/待收款</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>已收款</v-icon>
              </v-btn>
             
            </v-btn-toggle>
            <div>

             
     </div>
                  
            </div>

    <div class="container">
        <div class="row"><label class="col-sm-2">Date Start:</label><div class="field"><datepicker calendar-button-icon="fa fa-calendar" :clear-button=true   :calendar-button=true  v-model="query.dateStart" name="uniquename" aria-placeholder="Date Start" ></datepicker></div></div>
        <div class="row"><label class="col-sm-2">Order Number:</label><div class="field"><input v-model="query.orderNum" type="text" class="form-control"></div></div>
        <div class="row"><button @click="initialize" class="btn btn-primary">Search</button></div>
    </div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :show-select="true"
      class="elevation-1"
      :loading="loading"
      :total-items="totalm"
      :rows-per-page-items="[20, 10, 30, 40]"

  
      :pagination.sync="pagination"

      
    >

    
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
     
      <template v-slot:items="props">
       <tr @dblclick="props.expanded = !props.expanded;onExpand(props.item.id)" :class="selectedRows.indexOf(props.item.id)>-1?'selected':''" @click="rowClicked(props.item)">
          <td class="text-xs-left">{{ props.item.summary }}</td>
        <td class="text-xs-left">{{ props.item.orderNum }}</td>
        <td class="text-xs-left">{{ props.item.total / 100 | currency }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.status | toText}}</td>
        <td class="justify-center layout px-0">

           <v-icon
            small
            class="mr-2"
            
            @click="toDelivery(props.item)"
          >
            出货
          </v-icon>
           <v-icon
            small
            class="mr-2"
            @click="to(props.item, 'toInvoice')"
          >
            开票
          </v-icon>
           <template>
  <div class="text-xs-center">

    <v-menu  bottom
      origin="center center"
      transition="scale-transition" :open-on-hover=true>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          更新状态
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="editItem(item, props.item)"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
       
        </td>
       </tr>
      </template>
     
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>

      <template v-slot:expand="props">
     
            <table class="detail">
              <!-- <thead>
                  <tr>
                  <td>产品名称</td>  
                  <td>购买数量</td>  
                </tr>    
              </thead> -->
              <tbody>
                <tr v-for="item in curOrderItems" :key="item.id">
                  <td>{{item.name}}</td>  
                  <td style="color:red;">{{item.salePrice | currency}}</td>  
                  <td>  x{{item.qty}}</td>  
                </tr>  
              </tbody>  
            </table>
     
      </template>
    </v-data-table>

    <tr class="v-datatable__expand-row">

          <td class="text-xs-left"></td>
        <td class="text-xs-left"></td>
        <td class="text-xs-left"></td>
        <td class="text-xs-left"></td>
        <td class="text-xs-left"></td>
        <td class="justify-center layout px-0"></td>
     </tr>
  </div>
</template>

<script>

  import axios from 'axios'
  import Qs from 'qs'
  import Datepicker from 'vuejs-datepicker';
  const api = axios.create({
  withCredentials: true
  
});

  export default {
    components:{
      Datepicker
    },
    filters: {
  toText: function (key) {
    var mp = {
      100:'已下单/待发货' ,
      200:'已发货/待开票' ,
      201:'已部分发货/待发余货' ,
      300:'已开票/待收款' ,
      400:'已收款'
      
    }

    console.log(key);
    return mp[key]
  }
},
    data: () => ({

      selectedRows: [],
      query:{pageSize:5, pageNum:0, dateStart: null, sortSpecs:[{direction:'ASC', field:'date'}], status:[100]},
      loading: false,
      toggle_multiple: [0, 1, 2, 3],
      status:[
        '100',
        '200',     
        '300',
        '400'
      ],
      totalm: 0,
      rowsPerPageItems:[5, 10, 20, 30, 50, 80, 100],
      items: [
     
        { title: '已发货' , key:'200'},
        { title: '已部分发货', key:'201'},
        { title: '已开票', key:'300' },
        { title: '已收款', key:'400'}
      ],
      curOrderItems:[],
       expand: false,
      dialog: false,
      totalCount:0,
      pagination:{
        sortBy: 'date',
        descending: true,
        rowsPerPage: 20,
        page:0,
        rowsPerPageItems:[20, 10, 30, 40]
},
      headers: [
        {
          text: '描述',
          align: 'left',
          sortable: false,
          value: 'summary'
        },
        { text: '订单号', value: 'orderNum' },
        { text: '总金额', value: 'total' },
        { text: '下单日期', value: 'date' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'name', sortable: false,   align: 'left',}
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      total () {
        return this.desserts?(this.desserts.length>0?this.desserts.map(it=>it.total).reduce((prev, next)=>prev + next) : 90000):0;
      }
    },
    watch: {
    
      dialog (val) {
        val || this.close()
      },

      toggle_multiple:{
        handler: function () {
                console.log('caught!');
                this.initialize();
            },
            deep: true
      },

      pagination: {
        deep : true,
        handler() {
          this.getdata();
        }
      }

    },
    created () {
      this.initialize()
    },
    methods: {

      rowClicked(row) {
      this.swapSelectionStatus(row.id);
      this.log(row);
    },
    swapSelectionStatus(keyID) {
      if (this.selectedRows.includes(keyID)) {
        this.selectedRows = this.selectedRows.filter(
          selectedKeyID => selectedKeyID !== keyID
        );
      } else {
        this.selectedRows.push(keyID);
      }
    },
    log(logItem) {
      /* eslint-disable no-console */
      console.log(this.selectedRows);
    },
      alert(){
        alert('ok');
      },
      toDelivery(order) {
        this.$router.push({name:'toDelivery', params:order})
      },

      to(p, name){
        this.$router.push({name:name, params:p})
      },
      onExpand (orderId) {
        this.expand = !this.expand;
        api.get(`${basePath}/orderItems?orderId=${orderId}`).then((resp)=>{
      this.curOrderItems = resp.data;
    })

      },
      getdata(){
        
        var st = []

        if(typeof this.toggle_multiple == 'number') {
          st.push(this.status[this.toggle_multiple])
        } else {
           this.toggle_multiple && this.toggle_multiple.forEach(it=>{
            st.push(this.status[it])
        })
        }
       

        console.log(st);
            var stt = st.join(',');


        this.loading = true;
                  this.query.status = st;
                  this.query.pageSize = this.pagination.rowsPerPage;
                  this.query.pageNum = this.pagination.page;
                  this.query.sortSpecs.length = 0;
                  alert(this.pagination.descending);
                  this.query.sortSpecs.push({direction:this.pagination.descending?"DESC":"ASC", field:this.pagination.sortBy?this.pagination.sortBy:"date"})
         api.post(`${basePath}/orders`, this.query,).then((resp)=>{
      this.desserts = resp.data.content;
      this.totalm = resp.data.totalElements
      this.loading = false;
    });
      },
      initialize () {
       this.getdata();
        
      },
      editItem (actionItem, order) {
        /* this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true */
      var toStatus = actionItem.key;
      var orderId = order.id;

      api.post(`${basePath}/order/${orderId}`, {"status":toStatus, "id":order.id})
           .then((resp)=>{
                alert("order status have been successfully updated!");
           });

       
      },
      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
<style>
.detail{

  margin:10px;
}

table.detail tbody td,table.detail thead td {
    font-weight: 600;
    font-size: 12px!important;
    padding: 0 100px!important;
}

table.detail {
      border-collapse: separate;
}

.vdp-datepicker{
  border-bottom: 1px solid lightblue;
}

.selected{
  
    background-color: #d6d6d6;
}
</style>
