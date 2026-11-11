import Article from '@/views/Article.vue';
import ArticleDetail from '@/views/ArticleDetail.vue';
import Collect from '@/views/Collect.vue';
import Like from '@/views/Like.vue';
import User from '@/views/User.vue';
import Layout from '@/views/Layout.vue';
import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/', component: Layout,
      redirect: '/article',
      // 通过 children 配置项，可以配置嵌套子路由
      // 1.在 children配置项中，配规则
      // 2。准备二级路由出口
      children: [
        { path: '/article', component: Article },
        { path: '/collect', component: Collect },
        { path: '/like', component: Like },
        { path: '/user', component: User },
      ]
    },
    { path: '/detail/:id', component: ArticleDetail },

  ]
})

export default router