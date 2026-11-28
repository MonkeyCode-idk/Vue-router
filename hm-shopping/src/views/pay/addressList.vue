<template>
    <div>
        <van-nav-bar fixed title="地址列表" left-arrow @click-left="$router.go(-1)" />

        <van-address-list v-model="chosenAddressId" :list="list" :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="onSelect" />
    </div>
</template>

<script>
import { Toast } from 'vant' // 引入Toast！
export default {
    name: 'addressList',
    data() {
        return {
            chosenAddressId: '1',
            list: [
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ],
            disabledList: [
                {
                    id: '3',
                    name: '王五',
                    tel: '1320000000',
                    address: '浙江省杭州市滨江区江南大道 15 号',
                },
            ],
        };
    },
    methods: {
        onAdd() {
            Toast('新增地址');
        },
        onEdit(item, index) {
            Toast('编辑地址:' + index);
        },
        // 选中地址条目触发
        onSelect(item, index) {
            console.log('选中的地址：', item)
            Toast('选中：' + item.name)
            // 回退到结算页，并且把选中地址传过去
            // this.$router.back()
            // 👉 方案：用路由传参给pay页面接收
            // this.$router.push({ path: '/pay', query: { addr: JSON.stringify(item) } })
        }
    },
}
</script>

<style></style>
