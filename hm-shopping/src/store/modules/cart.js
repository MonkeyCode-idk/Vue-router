import { changeCountApi, getCartList, delSelect } from "@/api/cart"
import { Toast } from "vant"
import { BASE_URL } from "@/config"

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
        },
        toggleCheck(state, goodsId) {
            // 让对应的 id 的项 状态取反
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.isChecked = !goods.isChecked
        },
        toggleAllCheck(state, flag) {
            // 让所有的小选框，同步设置
            state.cartList.forEach(item => item.isChecked = flag)
        },
        changeCount(state, { goodsId, goodsNum }) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.goods_num = goodsNum
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
                    BASE_URL)
            });
            // console.log(res);
            context.commit('setCartList', data.list)
        },
        async changeCountAction(context, obj) {
            const { goodsId, goodsNum, goodsSkuId } = obj
            // 先本地修改
            context.commit('changeCount', { goodsId, goodsNum })
            // 再同步到后台
            await changeCountApi(goodsId, goodsNum, goodsSkuId)
            // console.log(res);

        },

        // 删除购物车数据
        async delSelect(context) {
            const selCartList = context.getters.selCartList
            const cartIds = selCartList.map(item => item.id)
            // console.log(cartIds);
            await delSelect(cartIds)
            Toast('删除成功')

            // 重新拉取最新的购物车数据（重新渲染）
            await context.dispatch('getCartAction')
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
        selCount(state, getters) {
            return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
        },
        // 选中的总价
        selPrice(state, getters) {
            return getters.selCartList.reduce((sum, item) => {
                return sum + item.goods_num * item.goods.goods_price_min
            }, 0).toFixed(2)
        },
        // 是否全选
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked)
        },
    }
}

