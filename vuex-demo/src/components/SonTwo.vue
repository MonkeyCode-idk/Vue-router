<template>
    <div class="box">
        <h2>Son2 子组件</h2>
        从vuex中获取的值:<label>{{ count }}</label>
        <br>
        <button>值 - 1</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'SonTwo',
    computed: {
        ...mapState(['count'])
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