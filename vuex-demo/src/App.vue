<template>
  <div id="app">
    <h1>
      根组件
      - {{ $store.state.title }}
      - {{ count }}
    </h1>
    <input type="text">
    <SonOne></SonOne>
    <hr>
    <SonTwo></SonTwo>
  </div>
</template>

<script>
import SonOne from './components/SonOne.vue';
import SonTwo from './components/SonTwo.vue';
import { mapState } from 'vuex'
console.log(mapState(['count', 'title']));

export default {
  name: 'app',
  created() {
    // console.log(this.$router);  没配
    console.log(this.$store.state.count);
  },
  computed: {
    sum() {
      return 1;
    },
    ...mapState(['count', 'title'])
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