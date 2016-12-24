/*
	注册我们各种数据变化的方法
*/
import * as types from './mutation-types'

export default {
  //更新地图
  [types.UPDATE_MAP](state,map){
  	state.map=map;
  },
  //更新当前坐标
  [types.UPDATE_POINT](state,point){
    state.point=point;
  }
};