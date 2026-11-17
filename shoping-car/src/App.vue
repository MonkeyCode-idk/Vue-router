<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <cart-header></cart-header>

    <!-- 商品 Item 项组件 -->
    <cart-item v-for="item in list" :key="item.id" :item="item"></cart-item>


    <!-- Foote 区域 -->
    <cart-footer></cart-footer>
  </div>
</template>
<!-- 1. 初始化加载（读数据）
App.vue 的 created 钩子触发 dispatch('cart/getList')。在 cart 模块的 actions 中发起 axios 请求，拿到后台数据后，因为 actions 不能直接改 state，
所以 commit 呼叫 updateList 这个 mutation，把新数组直接赋给 state.list。此时 App.vue 通过 mapState 映射拿到最新数据，渲染给子组件。

2. 用户点击修改（写数据）
子组件 cart-item 点击按钮，通过 btnClick 计算出新数量和新 id，打包成对象，dispatch 派发 updateCountAsync。

3. 异步同步与单向闭环
在 action 里，先发 axios.patch 告知后台修改指定 id 的 count，确保后端数据落库。成功之后，再 commit 呼叫 updateCount 这个 mutation。

4. 数据渲染更新
mutation 收到载荷后，用 find 找到对应的商品。由于 JS 中 find 返回的是对象的引用地址，所以变量 goods 和 state.list 里的元素指向同一块内存。
直接修改 goods.count 就能生效，Vue 的响应式系统监听到变化，页面瞬间更新。 -->
<script>
import CartHeader from '@/components/cart-header.vue'
import CartFooter from '@/components/cart-footer.vue'
import CartItem from '@/components/cart-item.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    CartHeader,
    CartFooter,
    CartItem
  },
  created() {
    this.$store.dispatch('cart/getList')
  },
  computed: {
    ...mapState('cart', ['list'])
  }
}
</script>

<style lang="less" scoped>
.app-container {
  padding: 50px 0;
  font-size: 14px;
}
</style>
