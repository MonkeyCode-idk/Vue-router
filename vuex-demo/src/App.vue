<template>
  <div id="app">
    <h1>根组件</h1>
    <input type="text">
    <SonOne></SonOne>
    <hr>
    <SonTwo></SonTwo>
  </div>
</template>

<script>
import SonOne from './components/SonOne.vue';
import SonTwo from './components/SonTwo.vue';

export default {
  name: 'app',
  created() {
    console.log(this.$store);

  },
  components: {
    SonOne,
    SonTwo
  }
}
</script>

<style scoped>
#app {
  /* background-color: pink;
   */
  border: 2px solid black;
  padding: 10px;
}
</style>