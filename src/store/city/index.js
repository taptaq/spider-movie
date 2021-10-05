const state={
    nm:window.localStorage.getItem('nowCitynm') || '成都',
    id:window.localStorage.getItem('nowCityid') || '028'
};

const actions={

};

const mutations={
    CITY_INFO(state,payload){
        state.nm=payload.nm;
        state.id=payload.id;
    }
};

export default {
    namespaced:true,  //使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接(在使用模块中的mutations、getters、actions和获取属性时，要加上模块名)
    state,
    actions,
    mutations
}