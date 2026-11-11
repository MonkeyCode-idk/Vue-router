<template>
  <div class="article-page">
    <!-- 查询参数传参 -->
    <!-- @click="$router.push(`/detail?id=${item.id}`)" -->
    <div class="article-item" v-for="item in list" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
      <div class=" head">
        <img :src="avatar" alt="" />
        <div class="con">
          <p class="title">{{ item.title }}</p>
          <p class="other"><span>{{ item.other }}</span> | {{ item.time }}</p>
        </div>
      </div>
      <div class="body">
        {{ item.content }}
      </div>
      <div class="foot"><span>点赞{{ item.great }}</span> | 浏览 {{ item.review }}</div>
    </div>
  </div>
</template>

<script>
// 请求地址: https://mock.boxuegu.com/mock/3083/articles
// 请求方式: get
import avatar from '@/assets/官方默认头像@2x.png'
// 首页请求渲染
// 1.安装axios
// 2.看接口文档，确认请求方式，请求地址，请求参数
// 3.created中发请求，获取数据，存起来
// 4.页面动态渲染

// 跳转详情页传参
// 1.查询参数传参 (更适合多个参数)
//  ?参数=参数值    =>this.$route.query.参数名
// 2.动态路由传参 （单个参数更优雅方便）
//  改造路由 => /路由/参数  =>  this.$route.params.参数名
// (1)访问 / 重定向到 / article (redirect)
// (2)返回上一页 $router.back()
export default {
  name: 'ArticlePage',
  data() {
    return {
      avatar,
      list: []
    }
  },
  activated() {
    console.log('您好，欢迎回到首页,我是Article组件');

  },
  async created() {
    const res = await this.$axios.get('/list.json')
    console.log(res);
    this.list = res.data
  }
}
</script>

<style lang="less" scoped>
.article-page {
  background: #f5f5f5;
}

.article-item {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px 15px;

  .head {
    display: flex;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }

    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 15px;

      p {
        margin: 0;
        line-height: 1.5;

        &.title {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }

        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }

  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}
</style>