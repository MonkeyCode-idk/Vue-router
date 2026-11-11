<template>
  <div class="article-detail-page" v-if="newRes">
    <nav class="nav"><span @click=$router.back() class="back">&lt;</span> 面经详情</nav>
    <header class="header">
      <h1>{{ newRes.title }}</h1>
      <p>{{ newRes.time }} | {{ newRes.review }} 浏览量 |{{ newRes.great }} 点赞数</p>
      <p>
        <img :src="avatar" alt="" />
        <span>{{ newRes.other }}</span>
      </p>
    </header>
    <main class="body">
      {{ newRes.content }}
    </main>
  </div>
</template>

<script>
// 请求地址: https://mock.boxuegu.com/mock/3083/articles/:id
// 请求方式: get
import avatar from '@/assets/官方默认头像@2x.png'
export default {
  name: "ArticleDetailPage",
  async created() {
    // console.log(this.$route.query.id);
    console.log(this.$route.params.id);
    const res = await this.$axios.get('/list.json')
    // console.log(res);
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.newRes = res.data.find(item => item.id == this.$route.params.id)
      console.log(this.newRes);
    }, 200)


  },
  data() {
    return {
      avatar,
      newRes: ''
    }
  },

}
</script>

<style lang="less" scoped>
.article-detail-page {
  .nav {
    height: 44px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 44px;
    text-align: center;

    .back {
      font-size: 18px;
      color: #666;
      position: absolute;
      left: 10px;
      top: 0;
      transform: scale(1, 1.5);
      cursor: pointer;
    }
  }

  .header {
    padding: 0 15px;

    p {
      color: #999;
      font-size: 12px;
      display: flex;
      align-items: center;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .body {
    padding: 0 15px;
  }
}
</style>