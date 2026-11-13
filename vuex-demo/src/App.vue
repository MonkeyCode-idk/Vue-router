<template>
  <div id="app">
    <h1>
      根组件
      - {{ $store.state.title }}
      - {{ count }}
    </h1>
    <input :value="count" @input="handleInput" type="text">
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
  components: {
    SonOne,
    SonTwo
  },
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
  methods: {
    handleInput(e) {
      // 1. 先拿到原始字符串，不要着急加 +
      const val = e.target.value;

      // 2. 用正则判断：必须是纯数字才往下走
      // /^\d+$/ 的意思是：从头到尾只能有数字
      if (!/^\d+$/.test(val)) {
        e.target.value = this.$store.state.count
        return alert('输入不合法，请输入数字'); // 有字母或特殊符号，直接拦住，不提交
      }

      // 1. 实时获取输入框的值
      // console.log(+e.target.value);
      const num = +val
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // console.log(+e.target.value);
        this.$store.commit('changeCount', num)
      }, 300)
    }
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