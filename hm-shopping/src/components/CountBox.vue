<template>
    <div class="count-box">
        <button @click="handleSub" class="minus">-</button>
        <input @change="handleChange" class="inp" type="text" :value="addCount">
        <button @click="handleAdd" class="add">+</button>
    </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    name: 'CountBox',
    props: ['addCount', 'stock_total'],
    methods: {
        handleSub() {
            if (this.addCount <= 1) {
                return Toast('不能小于1')
            }
            this.$emit('update:addCount', this.addCount - 1)
        },
        handleAdd() {
            if (this.addCount >= this.stock_total) {
                return Toast('不能大于库存')
            }
            this.$emit('update:addCount', this.addCount + 1)
        },
        handleChange(e) {
            // console.log(e.target.value);
            const num = +e.target.value.trim() // 转数字处理 (1)数字     (2)NaN
            // 输入了不合法的文本 或 输入了负值，回退成原来的 value值
            if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
                e.target.value = this.addCount
                return Toast('请输入合法整数')
            }
            // 超过库存拦截
            if (num > this.stock_total) {
                e.target.value = this.addCount
                return Toast('不能大于库存')
            }
            this.$emit('update:addCount', num)
        }
    }
}
</script>

<style lang="less" scoped>
.count-box {
    width: 110px;
    display: flex;

    .add,
    .minus {
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #ececec;
    }

    .inp {
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        margin: 0 5px;
        background-color: #ececec;
        text-align: center;
    }
}
</style>