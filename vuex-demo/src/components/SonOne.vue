<template>
    <div class="box">
        <h2>Son1 子组件</h2>
        从vuex中获取的值:<label>{{ count }}</label>
        <br>
        <button @click="handleAdd(1)">值 + 1</button>
        <button @click="handleAdd(5)">值 + 5</button>
        <button @click="handleAdd(10)">值 + 10</button>
        <button @click="handleChange">一秒后修改成666</button>
        <button @click="changeFn">改标题</button>

        <hr>
        <!-- 计算属性getters -->
        <div>{{ $store.state.list }}</div>
        <div>{{ $store.getters.filterList }}</div>

        <hr>
        <!-- 测试访问模块中的state  -->
        <div>{{ $store.state.user.userInfo.name }}</div>
        <button @click="updateUser">更新个人信息</button>
        <button @click="updateUser2">1000ms后更新个人信息</button>
        <div>{{ $store.state.setting.theme }}</div>
        <button @click="updateTheme">更新主题色</button>
        <button @click="updateTheme2">1000ms更新主题色</button>

        <hr>
        <!-- 测试访问模块中的getters - 原生 -->
        <div>{{ $store.getters['user/UpperCaseName'] }}</div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'SonOne',
    created() {
        console.log(this.$store.getters);

    },
    computed: {
        ...mapState(['count'])
    },
    methods: {
        updateUser() {
            // $store.commit('模块名/mutation名',额外传参)
            this.$store.commit('user/setUser', {
                name: 'ZhuangZhuang',
                age: 2
            })
        },
        updateUser2() {
            // 调用action  dispatch
            this.$store.dispatch('user/setUserSecond', {
                name: 'lzr',
                age: 18
            })
        },
        updateTheme() {
            this.$store.commit('setting/setTheme', 'pink')
        },
        updateTheme2() {
            this.$store.dispatch('setting/setThemeSeconed', 'purple')
        },
        handleAdd(n) {
            // 错误代码（vue默认不会监测，检测需要陈本）
            // this.$store.state.count++;
            // console.log(this.$store.state.count);

            // 应该通过 Mutation 核心概念，进行修改数据
            //     // 需要提交调用 mutation
            // this.$store.commit('addCount')
            console.log(n);
            this.$store.commit('addCount', {
                count: n,
                mas: '啧啧'
            })
        },
        handleChange() {
            // 调用action
            // this.$store.dispatch('action名字',额外参数)
            this.$store.dispatch('changeCountAction', 666)
        },

        changeFn() {
            this.$store.commit('changeTitle', '塔利斯塔')
        }
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