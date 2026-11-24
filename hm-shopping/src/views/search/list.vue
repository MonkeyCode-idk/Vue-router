<template>
    <div class="search">
        <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

        <van-search readonly shape="round" background="#ffffff" :value="querySearch || '搜索商品'" show-action
            @click="$router.push('/search')">
            <template #action>
                <van-icon class="tool" name="apps-o" />
            </template>
        </van-search>

        <!-- 排序选项按钮 -->
        <div class="sort-btns">
            <div class="sort-item" @click="changeType('all')" :class="{ active: sortType === 'all' }">综合</div>
            <div class="sort-item" @click="changeType('sales')" :class="{ active: sortType === 'sales' }">销量</div>
            <div class="sort-item" @click="changeType('price')" :class="{ active: sortType === 'price' }">
                价格
                <span v-if="sortType === 'price'">{{ sortPrice === 0 ? '↑' : '↓' }}</span>
            </div>
        </div>


        <div class="goods-list">
            <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
        </div>
    </div>
</template>

<script>
import { getProList } from '@/api/product';
import GoodsItem from '@/components/GoodsItem.vue'
export default {
    name: 'SearchIndex',
    components: {
        GoodsItem
    },
    computed: {
        // 获取地址栏的搜索关键字
        querySearch() {
            return this.$route.query.search
        }
    },
    data() {
        return {
            page: 1,
            proList: [],
            sortType: 'all', //默认是all
            sortPrice: 0, // 0-价格从低到高， 1-价格从高到低
            boolPrice: false
        }
    },
    methods: {
        async getList() {
            // console.log(this.querySearch)
            const { data: { list } } = await getProList({
                sortPrice: this.sortPrice,
                sortType: this.sortType,
                categoryId: this.$route.query.categoryId,
                goodsName: this.querySearch,
                page: this.page
            })

            let newList = list.data.map(item => {
                item.goods_image = item.goods_image.replace(
                    /https?:\/\/localhost:8080/,
                    'https://smart-shop.itheima.net'
                )
                return item
            })
            this.proList = newList
            console.log(this.proList);
        },
        changeType(type) {
            // console.log(type);
            this.sortType = type
            if (this.sortType === 'price') {
                this.boolPrice = !this.boolPrice
                if (this.boolPrice) {
                    this.sortPrice = 1
                } else {
                    this.sortPrice = 0
                }
            }
            this.getList()
            // this.getList(type)
        }
    },
    async created() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.search {
    padding-top: 46px;

    ::v-deep .van-icon-arrow-left {
        color: #333;
    }

    .tool {
        font-size: 24px;
        height: 40px;
        line-height: 40px;
    }

    .sort-btns {
        display: flex;
        height: 36px;
        line-height: 36px;

        .sort-item {
            text-align: center;
            flex: 1;
            font-size: 16px;
        }
    }
}

// 商品样式
.goods-list {
    background-color: #f6f6f6;
}

.sort-item {
    text-align: center;
    flex: 1;
    font-size: 16px;

    &.active {
        color: red;
    }
}
</style>