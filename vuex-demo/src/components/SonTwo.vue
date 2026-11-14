<template>
    <div class="box">
        <h2>Son2 子组件</h2>
        从vuex中获取的值:<label>{{ count }}</label>
        <br>
        <button @click="subCount(1)">值 - 1</button>
        <button @click="subCount(5)">值 - 5</button>
        <button @click="subCount(10)">值 - 10</button>
        <button @click="changeCountAction(888)">一秒后改成888</button>
        <button @click="changeTitle('能量')">改标题</button>

        <hr>
        <div>{{ filterList }}</div>
        <hr>
        <!-- 访问模块中的state -->
        <div>{{ user.userInfo.name }}</div>
        <div>{{ setting.theme }}</div>
        <hr>
        <!-- 访问模块中的state -->
        <div>{{ userInfo }}</div>
        <button @click="setUser({ name: 'gtg', age: 19 })">更新个人信息</button>
        <button @click="setUserSecond({ name: 'gzm', age: 14 })">一秒后更新个人信息</button>

        <div>setting模块的数据:{{ theme }} - {{ desc }}</div>
        <button @click="setTheme('skyblue')">更新主题</button>
        <hr>
        <!-- 访问模块中的getters -->
        <div>{{ UpperCaseName }}</div>
        <div></div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    name: 'SonTwo',
    computed: {
        // mapState 和 mapGetters 都是映射属性
        ...mapState(['count', 'user', 'setting']),
        ...mapGetters(['filterList']),
        ...mapState('user', ['userInfo']),
        ...mapState('setting', ['theme', 'desc']),
        ...mapGetters('user', ['UpperCaseName'])
    },
    methods: {
        // mapMutations 和 mapActions   都是映射方法
        // 全局级别的映射
        ...mapMutations(['subCount', 'changeTitle']),
        ...mapActions(['changeCountAction']),

        // 分模块的映射
        ...mapMutations('setting', ['setTheme']),
        ...mapMutations('user', ['setUser']),
        ...mapActions('user', ['setUserInfo'])
        // handleSub(n) {
        //     this.subCount(n)
        // },
    }
}
</script>

<style scoped>
.box {
    border: 2px solid black;
    margin: 10px;
    padding: 5px;
}
</style>