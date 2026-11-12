<template>
    <div class="box">
        <h2>Son2 子组件</h2>
        从vuex中获取的值:<label></label>
        <br>
        <button>值 - 1</button>
    </div>
</template>

<script>
export default {
    name: 'SonTwo'
}
</script>

<style scoped>
.box {
    border: 2px solid black;
    margin: 10px;
    padding: 5px;
}
</style>