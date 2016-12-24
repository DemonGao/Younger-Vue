/*
	初始化我们的Store
*/
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
	serverurl:'http://123.206.64.165:8000/',
  	map:{},
  	point:{
  		lng:116.404,
  		lat:39.915
  	},
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})