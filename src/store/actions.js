/*
可以编写异步的逻辑或者是一些逻辑，再去commit
*/
import * as types from './mutation-types'

export default {
  updateMap({ commit }, map) {
    commit(types.UPDATE_MAP, map);
  },
  updatePoint({ commit }, point) {
    commit(types.UPDATE_POINT, point);
  },
};