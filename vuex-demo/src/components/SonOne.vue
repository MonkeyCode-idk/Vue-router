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
        <div>{{ $store.state.list }}</div>
        <div>{{ $store.getters.filterList }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'SonOne',
    computed: {
        ...mapState(['count'])
    },
    methods: {
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