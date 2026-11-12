// 这里面存放的就是 vuex  相关的核心代码
import Vue from "vue"
import Vuex from 'vuex'

// 插件安装
Vue.use(Vuex)
// 创建仓库
const store = new Vuex.Store()

// 导出给main.js使用
export default store