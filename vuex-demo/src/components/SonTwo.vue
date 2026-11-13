<template>
    <div class="box">
        <h2>Son2 子组件</h2>
        从vuex中获取的值:<label>{{ count }}</label>
        <br>
        <button @click="subCount(1)">值 - 1</button>
        <button @click="subCount(5)">值 - 5</button>
        <button @click="subCount(10)">值 - 10</button>
        <button @click="changeTitle('能量')">改标题</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'SonTwo',
    computed: {
        ...mapState(['count'])
    },
    methods: {
        ...mapMutations(['subCount', 'changeTitle']),
        handleSub(n) {
            this.subCount(n)
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