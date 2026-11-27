<template>
    <div class="count-box">
        <button @click="handleSub" class="minus">-</button>
        <input :value="value" @change="handleChange" class="inp" type="text">
        <button @click="handleAdd" class="add">+</button>
    </div>
</template>
<script>
import { Toast } from 'vant';

export default {
    props: {
        value: {
            type: Number,
            default: 1
        },
        // 新增库存prop，父组件传进来
        stock: {
            type: Number,
            default: 999
        }
    },
    methods: {
        handleSub() {
            if (this.value <= 1) {
                return
            }
            this.$emit('input', this.value - 1)
        },
        handleAdd() {
            if (this.value >= this.stock) {
                Toast('超出库存啦')
                return
            }
            this.$emit('input', this.value + 1)
        },
        handleChange(e) {
            // console.log(e.target.value);
            const num = +e.target.value.trim() // 转数字处理 (1)数字     (2)NaN
            // 输入了不合法的文本 或 输入了负值，回退成原来的 value值
            if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
                e.target.value = this.value
                return Toast('请输入合法整数')
            }
            // // 超过库存拦截
            if (num > this.stock) {
                e.target.value = this.value
                return Toast('不能大于库存')
            }
            this.$emit('input', num)
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
        background-color: #efefef;
    }

    .inp {
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        margin: 0 5px;
        background-color: #efefef;
        text-align: center;
    }
}
</style>
