<template>
    <div class="cart">
        <van-nav-bar title="购物车" fixed />

        <div v-if="isLogin && cartList.length > 0">
            <!-- 购物车开头 -->
            <div class="cart-title">
                <span class="all">共<i>{{ cartTotal }}</i>件商品</span>
                <span class="edit" @click="isEdit = !isEdit">
                    <van-icon name="edit" />
                    编辑
                </span>
            </div>

            <!-- 购物车列表 -->
            <div class="cart-list">
                <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
                    <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
                    <div class="show">
                        <img :src='item.goods.goods_image' alt="">
                    </div>
                    <div class="info">
                        <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
                        <span class="bottom">
                            <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
                            <!-- 既希望保留原本的形参，又需要通过调用函数传参 => 箭头函数包装一层 -->
                            <CountBox @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"
                                :value="item.goods_num" :stock="item.goods.stock_total"></CountBox>
                        </span>
                    </div>
                </div>
            </div>
            <div class="footer-fixed">
                <div class="all-check" @click="toggleAllChecked">
                    <van-checkbox :value="isAllChecked" icon-size="18"></van-checkbox>
                    全选
                </div>
                <div class="all-total">
                    <div class="price">
                        <span>合计：</span>
                        <span>¥ <i class="totalPrice"></i>{{ selPrice }}</span>
                    </div>
                    <div v-if="!isEdit" class="goPay" :class="{ disabled: selCount === 0 }">结算({{ selCount }})</div>
                    <div v-else @click="handleDel" class="delete" :class="{ disabled: selCount === 0 }">删除</div>
                </div>
            </div>
        </div>
        <div class="empty-cart" v-else-if="isFirstReady && isLogin && cartList.length === 0">
            <img src="@/assets/empty.png" alt="">
            <div class="tips">
                您的购物车是空的, 去逛逛吧
            </div>
            <div class="btn" @click="$router.push('/')">去逛逛</div>
        </div>
        <div class="empty-cart" v-else-if="isFirstReady && !isLogin">
            <img src="@/assets/empty.png" alt="">
            <div class="tips">
                未登录, 请登录
            </div>
            <div class="btn" @click="$router.push('/login')">去登录</div>
        </div>

    </div>
</template>

<script>
import { changeCount } from '@/api/cart';
import CountBox from '@/components/CountBox.vue';
import { mapGetters, mapState } from 'vuex';
export default {
    name: 'CartPage',
    components: {
        CountBox
    },
    data() {
        return {
            isEdit: false,
            isDelIng: false, // 标记:正在执行删除操作
            isFirstReady: false // 首次数据是否加载完成
        }
    },
    computed: {
        ...mapState('cart', ['cartList']),
        ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllChecked']),
        isLogin() {
            return this.$store.getters.token
        }
    },
    async created() {
        // 必须是登陆过的用户，才能获取购物车列表
        if (this.$store.getters.token) {
            await this.$store.dispatch('cart/getCartAction')
        }
        this.isFirstReady = true // 不管有没有商品，请求结束就标记就绪
    },
    methods: {
        toggleCheck(goodsId) {
            this.$store.commit('cart/toggleCheck', goodsId)
        },
        toggleAllChecked() {
            this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
        },
        changeCount(goodsNum, goodsId, goodsSkuId) {
            // console.log(goods_num, goods_id, goods_sku_id);
            // 调用 vuex 的 action，进行数量的修改
            this.$store.dispatch('cart/changeCountAction', {
                goodsNum,
                goodsId,
                goodsSkuId
            })
        },
        async handleDel() {
            if (this.selCount === 0) return
            console.log('【删除开始】isDelIng 设置为 true')
            this.isDelIng = true
            await this.$store.dispatch('cart/delSelect')
            console.log('【删除请求完成】准备修改 isEdit=false')
            this.isEdit = false
            console.log('【watch已经执行完了】准备把 isDelIng 改为 false')
            this.isDelIng = false
            console.log('【删除流程全部结束】')
        }
    },
    watch: {
        isEdit(value) {
            console.log('【watch触发】isDelIng = ', this.isDelIng)
            if (this.isDelIng) {
                console.log('👉 本次是删除退出编辑，跳过自动全选')
                return
            }
            if (value) {
                this.$store.commit('cart/toggleAllCheck', false)
            } else {
                this.$store.commit('cart/toggleAllCheck', true)
            }
        }
    }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
    padding-top: 46px;
    padding-bottom: 100px;
    background-color: #f5f5f5;
    min-height: 100vh;

    .cart-title {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;

        .all {
            i {
                font-style: normal;
                margin: 0 2px;
                color: #fa2209;
                font-size: 16px;
            }
        }

        .edit {
            .van-icon {
                font-size: 18px;
            }
        }
    }

    .cart-item {
        margin: 0 10px 10px 10px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        border-radius: 5px;

        .show img {
            width: 100px;
            height: 100px;
        }

        .info {
            width: 210px;
            padding: 10px 5px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .bottom {
                display: flex;
                justify-content: space-between;

                .price {
                    display: flex;
                    align-items: flex-end;
                    color: #fa2209;
                    font-size: 12px;

                    span {
                        font-size: 16px;
                    }
                }

                .count-box {
                    display: flex;
                    width: 110px;

                    .add,
                    .minus {
                        width: 30px;
                        height: 30px;
                        outline: none;
                        border: none;
                    }

                    .inp {
                        width: 40px;
                        height: 30px;
                        outline: none;
                        border: none;
                        background-color: #efefef;
                        text-align: center;
                        margin: 0 5px;
                    }
                }
            }
        }
    }
}

.footer-fixed {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    .all-check {
        display: flex;
        align-items: center;

        .van-checkbox {
            margin-right: 5px;
        }
    }

    .all-total {
        display: flex;
        line-height: 36px;

        .price {
            font-size: 14px;
            margin-right: 10px;

            .totalPrice {
                color: #fa2209;
                font-size: 18px;
                font-style: normal;
            }
        }

        .goPay,
        .delete {
            min-width: 100px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: #fa2f21;
            color: #fff;
            border-radius: 18px;

            &.disabled {
                background-color: #ff9779;
            }
        }
    }
}

.empty-cart {
    padding: 80px 30px;

    img {
        width: 140px;
        height: 92px;
        display: block;
        margin: 0 auto;
    }

    .tips {
        text-align: center;
        color: #666;
        margin: 30px;
    }

    .btn {
        width: 110px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: #fa2c20;
        border-radius: 16px;
        color: #fff;
        display: block;
        margin: 0 auto;
    }
}
</style>