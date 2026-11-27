import { getCartList } from "@/api/cart"

export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        // 提供一个设置 cartList 的 mutation
        setCartList(state, newList) {
            // console.log(newList);
            state.cartList = newList


        }
    },
    actions: {
        async getCartAction(context) {
            const { data } = await getCartList()
            // 后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
            // 需要手动维护数据，给每一项，添加一个 isChecked 状态（标记当前商品是否选中）
            console.log(data.list);

            /** 
             图片URL replace替换
             两边 / / 是正则的包裹标记，不是字符串！
             http：匹配字面 http
             s?：? 代表前面这个字符 s 可选
             既能匹配 http://，也能匹配 https://
             : 就是冒号
             \/：**转义斜杠**
            正则里 / 是结束符，如果你想代表文本里的 /，必须写成 \/
            所以 \/\/ 就是匹配 //
            localhost:8080：字面匹配这串域名
             */
            data.list.forEach(item => {
                item.isChecked = true
                item.goods.goods_image = item.goods.goods_image.replace(/https?:\/\/localhost:8080/,
                    'https://smart-shop.itheima.net')
            });
            // console.log(res);
            context.commit('setCartList', data.list)
        }
    },
    getters: {
        // 求所有的商品累加总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
        },

        // 选中的商品项
        selCartList(state) {
            return state.cartList.filter(item => item.isChecked)
        },

        // 选中的总数

        // 选中的总价
    }
}