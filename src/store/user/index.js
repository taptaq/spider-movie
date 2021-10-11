const state = {
    name: window.localStorage.getItem('username') || '',
    isAdmin: window.localStorage.getItem('isAdmin') || false,
    userHead: '',
    isLogin: Boolean(window.localStorage.getItem('isLogin')) || false,
};

const actions = {

};

const mutations = {
    USER_NAME(state, payload) {
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead = payload.userHead;
    },

    changeLoginStatus(state, payload) {
        state.isLogin = payload.isLogin;
    }
};

export default {
    namespaced: true, //使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接(在使用模块中的mutations、getters、actions和获取属性时，要加上模块名)
    state,
    actions,
    mutations
}