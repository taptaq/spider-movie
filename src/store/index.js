import { createStore } from 'vuex'
import city from './city'
import user from './user'

export default createStore({
  state: {  //定义了应用状态的数据结构，可以在这里设置默认的初始状态。
  },
  mutations: {  //是唯一更改 store 中状态的方法，且必须是同步函数。
  },
  actions: {  //用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
  },
  modules: {  //可以将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
    city,
    user
  }
})
