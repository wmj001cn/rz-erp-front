

<template>

  <div>
   <button class="btn btn-outline-primary" @click="print">PRINT</button>

    <div class="container-fluid well main" id="quotation2">
        <h1>送货单 {{waybillNo}}</h1><span style="font-size:0.8em;">（一式二联：客户一联，供应商一联）</span>
<h2>广州瑞智科技有限公司</h2>


<div>地址:广州市南沙区环盛街2号保利思泰广场9-2#栋1002房
</div>
<div>TEL:13630165039 15918466843 020-86871789</div>
<hr><p>于 <span><input v-if="!isPrint" type="text" v-model="today" size="6"/><span v-else>{{today}}</span></span> 送 订单【{{ $route.params.orderNum }}】 的货至</p><hr>   
          <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="客户名称"
            v-model="deliveryInfo.clientName"
          ></v-text-field>
        </v-flex><span v-show="isPrint"><label style="font-weight:800;">客户名称：</label>{{deliveryInfo.clientName}}</span>

     


         <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="客户电话"
            v-model="deliveryInfo.tel"
          ></v-text-field>
        </v-flex>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span v-show="isPrint"><label style="font-weight:800;">客户电话：</label>{{deliveryInfo.tel}}</span>
        <br/>
          <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="客户地址"
            v-model="deliveryInfo.addr"
          ></v-text-field>
        </v-flex><span v-show="isPrint"><label style="font-weight:800;">客户地址：</label>{{deliveryInfo.addr}}</span>

     <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="联系人"
            v-model="deliveryInfo.contact"
          ></v-text-field>
        </v-flex>&nbsp;&nbsp;&nbsp;<span v-show="isPrint"><label style="font-weight:800;">联系人：</label>{{deliveryInfo.contact}}</span>
        
        
        
     


<hr>

<table class="table table-bordered">
  
        <h4>入库信息:</h4>
  <tr>
    <!-- <td>All <input type="checkbox"/></td> -->
    <td>序号</td>
    <td>物料编码</td>
    <td>物料名称</td>
    <td>单位</td>
    <td>数量</td>
    <td>备注</td>
  </tr>
  <tbody>

    <tr v-for="(product, index) in products" :key="product.id" @mouseover="showDeleteButton(product)" @mouseleave="leave()">
   <!--    <td><input type="checkbox"/></td> -->
    <td>{{index+1}}</td>
     <td><input  v-show="!isPrint" type="text" v-model="product.inventoryCode"/><span v-show="isPrint">{{product.inventoryCode}}</span></td>
      <td><input  v-show="!isPrint" type="text" v-model="product.description"/><span v-show="isPrint">{{product.description}}</span></td>
   <!--  <td>{{product.inventoryCode}}</td>
    <td>{{product.description}}</td> -->
    <td><input  v-show="!isPrint" type="text" v-model="product.unit"/><span v-show="isPrint">{{product.unit}}</span></td>
    <td><input  v-show="!isPrint" type="number" v-model="product.qty"/><span v-show="isPrint">{{product.qty}}</span></td>
    <td><input  v-show="!isPrint" type="text" v-model="product.note"/><span v-show="isPrint">{{product.note}}</span></td>
    <td v-show="!isPrint">   <button  class="btn btn-outline-primary" @click="addAssociatedProd(product.description)">Add Delivery Item</button></td>
  </tr>

  </tbody>

</table>

<table class="table table-bordered">
  
 
        <h4>送货物品列表:</h4>
    <div v-for="(vvalue, kkey) in associateProduct" :key="kkey">
    <span v-show="kkey != 'SEP'">{{kkey}}</span>
     <tbody>
       <tr>
    <td>序号</td>
    <td>物品名称</td>
    <td>单位</td>
    <td>数量</td>
    <td>备注</td>
  </tr>
      <tr v-for="(product, index) in vvalue" :key="product.id">

         <td>{{index + 1}}</td>
         
         <td><input  v-show="!isPrint" type="text" v-model="product.name"/><span v-show="isPrint">{{product.name}}</span></td>
             <td><input  v-show="!isPrint" type="text" v-model="product.unit"/><span v-show="isPrint">{{product.unit}}</span></td>
    <td><input  v-show="!isPrint" type="number" v-model="product.totalQty"/><span v-show="isPrint">{{product.totalQty}}</span></td>
      <td><input  v-show="!isPrint" type="text" v-model="product.note"/><span v-show="isPrint">{{product.note}}</span></td>
            
      </tr>


  </tbody>
  </div>


</table>
<div class="terms">


</div>

<div style="float:left;background-color:#F9FBFC;">
<div v-show="!isPrint"><input  type="checkbox" v-model="useStamp">Use Stamp</input></div>
  <br>
  <br>
送货单位：<br>
经手人（签字）:
 
 <img v-if="useStamp"  src="@/assets/stamp.png" width='150px' height="155">
  <img src="@/assets/dummy.jpg" width='250px' height="150" v-else>
</div>
<div style="float:right">

  <br>
  <br>
收货单位：<br>
经手人（签字）：  
 
 <img src="@/assets/dummy.jpg" width='250px' height="150">
</div>
    </div>

    
       </div>

    
</div>

</template>


<script>
import Vue from 'vue'
import vueEasyPrint from "vue-easy-print";
import axios from 'axios'
import Print from 'vue-print-nb'
const api = axios.create({
	withCredentials: true
});


import VueHtmlToPaper from 'vue-html-to-paper'
Vue.use(Print);
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
     'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ]
}


Vue.use(VueHtmlToPaper, options);
var todayStr = new Date();
var dd = String(todayStr.getDate()).padStart(2, '0');
var mm = String(todayStr.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = todayStr.getFullYear();

todayStr = mm + '/' + dd + '/' + yyyy;

var waybillNo = "D"+yyyy+mm+dd+new Date().getMilliseconds();
 Vue.use(vueEasyPrint);
export default {
  components:{
      vueEasyPrint
  },
  filters:{
     toDigitUpper:function(n){
        var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
     }
  },
  data: function(){
    return {
      isPrint:false,
      ps:[{name:'厕所'},{},{}, {}, {}, {},{},{},{}, {}, {}, {}],
      show:true,
      products:[],
      associateProduct:[],
      deliveryInfo:{
        clientName:'',
        contact:'',
        tel:'',
        addr:''
      },
      useStamp: false,
      today: todayStr,
      waybillNo:waybillNo,
      hoverTime:0
    }
  },
  computed:{
    total () {
        return this.products.length>0?this.products.map(it=>it.salePrice*it.qty).reduce((prev, next)=>prev + next) : 0;
      }
  },
  created(){
    var order = this.$route.params;
    $("title").text(this.$route.params.orderNum + "" + new Date());
     api.get(`${basePath}/deliveryItem?orderId=${order.id}&clientId=${order.clientId}`).then((resp)=>{
          var d = resp.data
          this.products = d.deliveryProducts;
          this.deliveryInfo = d.deliveryInfo
          this.associateProduct = d.associateProducts;

      }).catch((error)=>{
           console.log(error);
      })
  },
  components: {

  },
  methods:{
    addAssociatedProd(id){
        this.associateProduct[id].push({});
    },
    hideP(){
      $("#product").hide();
       $("#header").hide();
       $("title").text(this.$route.params.orderNum + "" + new Date());
    },
    print(){
      this.isPrint = true;
      
      setTimeout(() => {
        this.$htmlToPaper("quotation2")
      }, 300);
    },
    add(p){
      console.log(p);
      this.$set(p, 'qty', 1)
      this.products.push(p);
    },
    addPart: function(){
      this.device.parts.push({count:1})
    },
    save: function(){
      console.log(this.device)
      api.post(`${basePath}/api/device`, this.device).then((resp)=>{

      }).catch((error)=>{
           console.log(error);
      })
    },
    showDeleteButton: function (product) {
       var d = new Date();
       var n = d.getTime();
       this.hoverTime = n;
    },

    leave: function () {
      alert(product.id);
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
.main {
  text-align: left;
    font-size: 1.3em;
    font-weight: 300;
    margin: 0 8px;
    padding: 50px;
}

.main span {
 
  margin: 5px 120px 5px 0px;
}

.mtitle {
  font-size: 12px;
}

.terms {
  font-style: italic;
   font-size: 15px;

   margin: 10px 0px;
}

span{
      text-decoration-line: underline;
      margin-left: 50px;
}
</style>

