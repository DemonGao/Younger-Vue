import Vue from 'vue'
import VueRouter from 'vue-router'		//路由
/*ajax*/
import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'				//vuex

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/*模板组件*/
import App from './App'
import Home from './components/Home.vue'
import HouseList from './components/map/HouseList'
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
const routes =[
	{
		path:'/',
		component:Home
	},
  {
    path:'/houselist/:id',
    name:'houselist',
    component:HouseList
  }
]
const router = new VueRouter({
	mode:'history',
	routes
})
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})


new Vue({
  el: '#app',
  router,//路由
  store,//vuex
  render: h =>h(App)
})
// Vue.axios.get('http://123.206.64.165:8000/renthouse/commdata/?lat=37.54150168038905&lng=121.32274115458121&distance=1').then((response) => {
//   console.log(response.data)
// })
