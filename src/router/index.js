import Vue from 'vue'
import Router from 'vue-router'
import DeviceList from '@/components/HelloWorld'
import Exam from '@/components/Exam'
import Test from '@/components/Test'
import Home from '@/components/Home'
import Product from '@/components/Product'
import order from '@/components/Order'
import Delivery from '@/components/Delivery'
import Invoice from '@/components/Invoice'
import OrderEntry from '@/components/OrderEntry'
import Search from '@/components/Search'
import ServicePointEntry from '@/components/ServicePointEntry'
import Videos from '@/components/Videos'
import Login from '@/components/Login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/delivery/:orderId',
      name: 'toDelivery',
      component: Delivery
    },

    {
      path: '/invoice/:orderId',
      name: 'toInvoice',
      component: Invoice
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/AddDevice',
      name: 'HellWorld',
      component: Test
    },
    {
      path: '/exam',
      name: 'Exam',
      component: Exam
    },
    {
      path: '/devices',
      name: 'devices',
      component: DeviceList
    },

    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/OrderEntry',
      name: 'OrderEntry',
      component: OrderEntry
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/ServicePointEntry',
      name: 'ServicePointEntry',
      component: ServicePointEntry
    },
    {
      path: '/Videos',
      name: 'Videos',
      component: Videos
    }
  ]
})
