const state = {
  curMovieId: '' || localStorage.getItem('curMovieId'),
  curMovieName: '' || localStorage.getItem('curMovieName'),
  curSelectSeats: '' || localStorage.getItem('curSelectSeats'), //选定的座位
  sum: '' || localStorage.getItem('sum'), //订单总价
};

const actions = {

};

const mutations = {
  changeCurMovieMsg(state, payload) {
    state.curMovieId = payload.curMovieId;
    state.curMovieName = payload.curMovieName;
  },

  changeCurSelectSeats(state, payload) {
    state.curSelectSeats = payload.curSelectSeats;
  },

  changeSum(state, payload) {
    state.sum = payload.sum;
  }
};

export default {
  namespaced: true, //使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接(在使用模块中的mutations、getters、actions和获取属性时，要加上模块名)
  state,
  actions,
  mutations
}