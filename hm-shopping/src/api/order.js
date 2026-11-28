import request from '@/utils/request'

// 订单结算确认
// mode: cart => obj {cartIds}
// mode: buyNow => obj {goodsId goodsNum goodsSkuId}
export const checkOrder = (mode, obj) => {
    return request.get('/checkout/submit', {
        params: {
            mode,// cart buyNow
            delivery: 0, // 10 快递配送 20 门店自提
            couponId: 0, // 优惠卷 ID 传零 不使用优惠卷
            isUsePoints: 0, // 积分 传0 不使用积分
            ...obj //将传递过来的参数对象 动态展开
        }
    })
}   