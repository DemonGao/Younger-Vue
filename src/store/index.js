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
  	totalTime: 0,
  	map:null,
  	list: []
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})