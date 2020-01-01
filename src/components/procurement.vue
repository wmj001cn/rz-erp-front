<template>

  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>订单</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      
      <span style="font-weight:900;">总计:&nbsp;</span> <span style="color:red;font-weight:600;">{{ total / 100 | currency }}</span>
        
      <v-spacer></v-spacer>
     


      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="描述"></v-text-field>
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
    
    <div> <v-btn-toggle v-model="toggle_multiple" multiple>
              <v-btn flat>
                <v-icon small>待发货</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>部分发货</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>待开票</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>待收款</v-icon>
              </v-btn>
              <v-btn flat>
                <v-icon small>已收齐款</v-icon>
              </v-btn>
            </v-btn-toggle></div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :loading="true"
      :pagination.sync="pageSetting"
    >

    
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
       <tr @click="props.expanded = !props.expanded;onExpand(props.item.id)">
          <td class="text-xs-left">{{ props.item.summary }}</td>
        <td class="text-xs-left">{{ props.item.orderNum }}</td>
        <td class="text-xs-left">{{ props.item.total / 100 | currency }}</td>
        <td class="text-xs-left">{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.status | toText}}</td>
        <td class="justify-center layout px-0">

           <v-icon
            small
            class="mr-2"
            :disabled="!(props.item.status == '000')"
            @click="editItem(props.item)"
          >
            出货
          </v-icon>
           <v-icon
            small
            class="mr-2"
            :disabled="!(props.item.status == '100')"
            @click="editItem(props.item)"
          >
            开票
          </v-icon>
           <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
            :disabled="!(props.item.status == '110')"
          >
            收款
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
          @click="editItem"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
         <!--  <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon> -->
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


  export default {

    filters: {
  toText: function (key) {
    var mp = {
     '000':'待发货' ,
      100:'待开票' ,
      110:'待收款' ,
      111:'已收齐款' ,
      200:'部分发货' ,
      
    }

    console.log(key);
    return mp[key]
  }
},
    data: () => ({
      toggle_multiple: [0, 1, 2, 3, 4],
      status:[
        '000',
        '200',
        '100',
        '110',
        '111',
      
      ],
      items: [
        { title: '已发货' },
        { title: '部分发货' },
        { title: '已开票' },
        { title: '已收款' },
        
      ],
      curOrderItems:[],
       expand: false,
      dialog: false,
      pageSetting:{
  descending: true,
  page: 1,
  rowsPerPage: 12, // -1 for All
  sortBy: 'date',
  totalItems: 25
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
        return this.desserts.length>0?this.desserts.map(it=>it.total).reduce((prev, next)=>prev + next) : 90000;
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
      }
    },
    created () {
      this.initialize()
    },
    methods: {
      onExpand (orderId) {
        this.expand = !this.expand;
        axios.get(`${basePath}/orderItems?orderId=${orderId}`).then((resp)=>{
      this.curOrderItems = resp.data;
    })

      },
      initialize () {

        var st = []
        this.toggle_multiple.forEach(it=>{
            st.push(this.status[it])
        })
            var stt = st.join(',');
        axios.get(`${basePath}/procurement?page=0&size=30&searchName=&status=${stt}`).then((resp)=>{
      this.desserts = resp.data.content;
    })
        /* this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
          }
        ] */


      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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
</style>
