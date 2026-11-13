// 这里面存放的就是 vuex  相关的核心代码
import Vue from "vue"
import Vuex from 'vuex'

// 插件安装
Vue.use(Vuex)
// 创建仓库
const store = new Vuex.Store({
    // 严格模式(有利于初学者，检测不规范的代码 => 上线时需要关闭)
    strict: true,
    // 1. 通过state 可以提供数据 (所有组件共享的数据)
    state: {
        title: '大标题',
        count: 100
    },

    // 2.通过 Mutations 可以提供修改数据的方法
    // 注意点:mutation参数有且只能有一个，如果需要多个参数，包装成一个对象
    mutations: {
        // 所有mutation函数，第一个参数，都是 state
        addCount(state, obj) {
            console.log(obj);

            // 修改数据
            state.count += obj.n
        },

        changeTitle(state, newTitle) {
            state.title = newTitle
        }
    }
})

// 导出给main.js使用
export default store