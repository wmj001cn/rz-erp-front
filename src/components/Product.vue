

<template>
<div id="product">
     <button class="btn btn-outline-primary" @click="print">PRINT</button>
      <template>
  <v-container
    fluid
    grid-list-lg
    fill-height
    style="min-height: 434px"
  >
    <v-fade-transition mode="out-in">
      <v-layout v-if="show" key="0" wrap>
        <v-flex xs2 v-for="p in ps" :key="p.id">
          <v-card @click="add(p)">
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="mtitle">{{p.name}}</v-card-title>
          </v-card>
        </v-flex>

      </v-layout>

      <v-layout v-else key="1" justify-center>
        <v-btn flat @click="show = true">Load images</v-btn>
      </v-layout>
    </v-fade-transition>
  </v-container>
      </template>
  
        <div>
  

    <div class="container-fluid well main" id="quotation2">
<h2>广州瑞智科技有限公司</h2>


        <span>联系人：EVA</span>   <span>电话：13630165390</span> <span>日期：2019年4月2号 ~ 2019年4月9号</span>
<div>Email：352883566@qq.com  </div>
<hr><p>Quotation 报价单</p><hr>  
          <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="BILLTO"
            v-model="inquery.billto"
          ></v-text-field>
        </v-flex><span v-show="isPrint">BILL TO：{{inquery.billto}}</span>

          <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="联系人"
            v-model="inquery.contact"
          ></v-text-field>
        </v-flex><span v-show="isPrint">联系人：{{inquery.contact}}</span>


         <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="电话"
            v-model="inquery.tel"
          ></v-text-field>
        </v-flex><span v-show="isPrint">电话：{{inquery.tel}}</span>

          <v-flex v-show="!isPrint" xs12 sm6 md3>
          <v-text-field
            label="邮件"
            v-model="inquery.email"
          ></v-text-field>
        </v-flex><div v-show="isPrint">邮件：{{inquery.email}}</div>
        
        
     


<hr>

<table class="table table-bordered">
  <tr>
    <td>产品名称</td>
    <td规格</td>
    <td>数量</td>
    <td>单价（含税）</td>
    <td>金额（含税）</td>
    <td>备注</td>
  </tr>
  <tbody>

    <tr v-for="product in products" :key="product.id">
    <td>{{product.name}}</td>
    <td{{product.spec}}</td>
    <td><input  v-show="!isPrint" type="number" v-model="product.qty"/><span v-show="isPrint">{{product.qty}}</span></td>
    <td><input  v-show="!isPrint" type="number" v-model="product.salePrice"/><span v-show="isPrint">{{product.salePrice}}</span></td>
    <!-- <td>{{product.salePrice}}</td> -->
    <td>{{product.salePrice * product.qty}}</td>
    <td><input  v-show="!isPrint" type="text" v-model="product.note"/><span v-show="isPrint">{{product.note}}</span></td>
  </tr>
<tr>
   
    <td style="text-align:right;" colspan=3>总计</td>
    <td >{{total | currency}} / ({{total | toDigitUpper}}) （含税）</td>
    <td></td>
  </tr>
  </tbody>

</table>
<div class="terms">

  <p>1，以上设备保修期为一年, 如有任何质量问题包退换</p>
  <p>2，以上报价为含增值税（13%）的人民币报价</p>
  <p>3，免运费</p>
  <p>4，客户须在收到发票后两个月内结清账</p>
  <p>5，本次发货时间为订单确认回签后12小时内</p>
</div>

单位公章： 

   覃媚妹   
   授  权  
 <img src="@/assets/stamp.png" width='130px' height="150">
    </div>
       </div>

</div>

</template>


<script>
import Vue from 'vue'
import vueEasyPrint from "vue-easy-print";
import axios from 'axios'
import Print from 'vue-print-nb'
 
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
      products:[],//[{"id":41,"name":"在线检测软件","salePrice":"7646","costPrice":7600,"loweastPrice":7600,"spec":null,"qty":1},{"id":27,"name":"英频杰阅读器 R220","salePrice":7680,"costPrice":6800,"loweastPrice":7500,"spec":"R220","qty":1},{"id":29,"name":"天线Matchbox","salePrice":1800,"costPrice":1500,"loweastPrice":1800,"spec":"Match Box","qty":1},{"id":42,"name":"天线反馈线","salePrice":100,"costPrice":100,"loweastPrice":100,"spec":null,"qty":1},{"id":45,"name":"GPIO","salePrice":"1147","costPrice":1200,"loweastPrice":1200,"spec":null,"qty":1},{"id":46,"name":"光电开关","salePrice":300,"costPrice":300,"loweastPrice":300,"spec":null,"qty":1},{"id":47,"name":"接近开关","salePrice":100,"costPrice":100,"loweastPrice":100,"spec":null,"qty":1},{"id":48,"name":"USB转网口连接线","salePrice":100,"costPrice":100,"loweastPrice":100,"spec":null,"qty":1},{"id":43,"name":"电源","salePrice":"180","costPrice":500,"loweastPrice":500,"spec":null,"qty":"2"},{"id":44,"name":"继电器","salePrice":100,"costPrice":100,"loweastPrice":100,"spec":null,"qty":1}],
      inquery:{"billto":"艾利苏州","contact":"David Yu","tel":"+86 512 6262 8662","email":"david.yu@ap.averydennison.com"}
    }
  },
  computed:{
    total () {
        return this.products.length>0?this.products.map(it=>it.salePrice*it.qty).reduce((prev, next)=>prev + next) : 0;
      }
  },
  created(){
     axios.get(`${basePath}/products?start=0&size=51`).then((resp)=>{
          this.ps = resp.data.content;
      }).catch((error)=>{
           console.log(error);
      })
  },
  components: {

  },
  methods:{
    hideP(){
      $("#product").hide();
       $("#header").hide();
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
      axios.post(`${basePath}/api/device`, this.device).then((resp)=>{

      }).catch((error)=>{
           console.log(error);
      })
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
    font-weight: 600;
    margin: 0 8px;
    padding: 50px;
}

.main span {
  display: inline-block;
  margin: 5px 20px 5px 0px;
}

.mtitle {
  font-size: 12px;
}

.terms {
  font-style: italic;
   font-size: 15px;

   margin: 10px 0px;
}
</style>

