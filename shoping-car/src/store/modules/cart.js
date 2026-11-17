import axios from "axios"
export default {
    namespaced: true,
    state() {
        return {
            // 购物车数据 [{},{}]
            list: []
        }
    },
    mutations: {
        updateList(state, newList) {
            state.list = newList
        },
        // obj:{id: xxx, newCount: xxx}
        updateCount(state, obj) {
            // console.log(obj);
            // 根据 id 找到对应的对象，更新count属性即可
            const goods = state.list.find(item => item.id === obj.id)
            goods.count = obj.newCount

        },
    },
    actions: {
        async getList(context) {
            // 请求方式:get
            // 请求地址:http://localhost:3000/cart
            const res = await axios.get('http://localhost:3000/cart')
            // console.log(res);
            context.commit('updateList', res.data)
        },
        async updateCountAsync(context, obj) {
            // console.log(obj);
            // 将修改更新同步到后台服务器
            const res = await axios.patch(`http://localhost:3000/cart/${obj.id}`, {
                count: obj.newCount
            })
            // 将修改更新同步到 vuex
            context.commit('updateCount', {
                id: obj.id,
                newCount: obj.newCount
            })
            console.log(res);

        }
    },
    getters: {
        // 商品总数量 累加count
        total(state) {
            return state.list.reduce((sum, item) => sum + item.count, 0)
        },

        // 商品总价，累加count * price
        totalPrice(state) {
            return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
        }
    }
}