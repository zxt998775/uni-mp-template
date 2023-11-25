<script setup lang="ts">
import { OrderState, orderStateList } from '@/config/constants'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 定义 porps
const props = defineProps<{
  orderState: number
}>()

// 请求参数
const queryParams: Required<OrderListParams> = {
  page: 1,
  pageSize: 5,
  orderType: props.orderState
}

// 获取订单列表
const orderList = ref<OrderItem[]>([])
// 是否加载中标记，⽤于防⽌滚动触底触发多次请求
const isLoading = ref(false)
const getMemberOrderData = async () => {
  // // 如果数据出于加载中，退出函数
  // if (isLoading.value) return
  // // 退出分⻚判断
  // if (isFinish.value === true) {
  //   return uni.showToast({ icon: 'none', title: '没有更多数据~' })
  // }

  // 发送请求前，标记为加载中
  isLoading.value = true
  // 发送请求
  const res = await getMemberOrderAPI(queryParams)
  // 发送请求后，重置标记
  isLoading.value = false
  // 数组追加
  orderList.value.push(...res.result.list)
  // 分⻚条件
  if (queryParams.page < res.result.pages) {
    // ⻚码累加
    queryParams.page++
  } else {
    // // 分⻚已结束
    // isFinish.value = true
  }
}

onMounted(() => {
  console.log('hello')
  getMemberOrderData()
})

// 订单⽀付
const onOrderPay = async (id: string) => {
  uni.redirectTo({ url: '/pagesOrder/detail/detail?id=' + id })
  // if (import.meta.env.DEV) {
  //   // 开发环境模拟⽀付
  //   await getPayMockAPI(parseInt(id))
  // } else {
  //   // #ifdef MP-WEIXIN
  //   // 正式环境微信⽀付
  //   const res = await getPayWxPayMiniPayAPI({ orderId: id })
  //   await wx.requestPayment(res.result)
  //   // #endif
  //   // #ifdef H5 || APP-PLUS
  //   // H5端 和 App 端未开通⽀付-模拟⽀付体验
  //   await getPayMockAPI(parseInt(id))
  //   // #endif
  // }
  // // 成功提示
  // uni.showToast({ title: '⽀付成功' })
  // // 更新订单状态
  // const order = orderList.value.find((v) => v.id === id)
  // order!.orderState = OrderState.DaiFaHuo
}

// 确认收货
const onOrderConfirm = (id: string) => {
  uni.showModal({
    content: '为保障您的权益，请收到货并确认⽆误后，再确认收货',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await putMemberOrderReceiptByIdAPI(id)
        uni.showToast({ icon: 'success', title: '确认收货成功' })
        // 确认成功，更新为待评价
        const order = orderList.value.find((v) => v.id === id)
        order!.orderState = OrderState.DaiPingJia
      }
    }
  })
}

// 删除订单
const onOrderDelete = (id: string) => {
  uni.showModal({
    content: '你确定要删除该订单？',
    confirmColor: '#27BA9B',
    success: async (res) => {
      if (res.confirm) {
        await deleteMemberOrderAPI([id])
        // 删除成功，界⾯中删除订单
        const index = orderList.value.findIndex((v) => v.id === id)
        orderList.value.splice(index, 1)
      }
    }
  })
}

// // 是否分⻚结束
// const isFinish = ref(false)
// // 是否触发下拉刷新
// const isTriggered = ref(false)
// // ⾃定义下拉刷新被触发
// const onRefresherrefresh = async () => {
//   // 开始动画
//   isTriggered.value = true
//   // 重置数据
//   queryParams.page = 1
//   orderList.value = []
//   isFinish.value = false
//   // 加载数据
//   await getMemberOrderData()
//   // 关闭动画
//   isTriggered.value = false
// }
</script>

<template>
  <scroll-view scroll-y class="orders">
    <view class="card" v-for="order in orderList" :key="order.id">
      <!-- 订单信息 -->
      <view class="status">
        <text class="date">{{ order.createTime }}</text>
        <!-- 订单状态⽂字 -->
        <text>{{ orderStateList[order.orderState].text }}</text>
        <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
        <text v-if="order.orderState >= OrderState.DaiPingJia" class="icon-delete"></text>
      </view>

      <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
      <navigator
        v-for="item in order.skus"
        :key="item.id"
        class="goods"
        :url="`/pagesOrder/detail/detail?id=${order.id}`"
        hover-class="none"
      >
        <view class="cover">
          <image class="image" mode="aspectFit" :src="item.cover"></image>
        </view>
        <view class="meta">
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="type">{{ item.attrsText }}</view>
        </view>
      </navigator>

      <!-- ⽀付信息 -->
      <view
        class="payment"
        style="
          display: flex;
          flex-direction: row;
          margin-top: 10px;
          justify-content: flex-end;
          align-items: center;
          margin-bottom: 10px;
        "
      >
        <text class="quantity" style="font-size: 12px; margin-right: 5px">共{{ order.totalNum }}件商品</text>
        <text>实付</text>
        <text class="amount" style="font-weight: 700">
          <text class="symbol">¥</text>{{ order.payMoney }}</text
        >
      </view>

      <view style="width: 100%; height: 1px; background-color: gray"></view>
      <!-- 订单操作按钮 -->
      <view class="action">
        <div style="display: flex; flex-direction: row; margin-top: 10px; justify-content: flex-end">
          <!-- 待付款状态：显示去⽀付按钮 -->
          <template v-if="order.orderState === OrderState.DaiFuKuan">
            <view class="button primary" @click="onOrderPay(order.id)">去⽀付</view>
          </template>

          <template v-else>
            <navigator
              class="button secondary"
              :url="`/pagesOrder/create/create?orderId=id`"
              hover-class="none"
            >
              再次购买
            </navigator>
            <!-- 待收货状态: 展示确认收货 -->
            <view
              class="button primary"
              v-if="order?.orderState === OrderState.DaiShouHuo"
              @tap="onOrderConfirm(order.id)"
            >
              确认收货
            </view>

            <!-- 待评价状态: 展示去评价 -->
            <view class="button" v-if="order?.orderState === OrderState.DaiPingJia"> 去评价 </view>
            <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
            <view
              class="button delete"
              v-if="order?.orderState === OrderState.DaiPingJia"
              @tap="onOrderDelete(order.id)"
            >
              删除订单
            </view>
          </template>
        </div>
      </view>
    </view>
    <!-- 底部提示⽂字 -->
    <view
      class="loading-text"
      :style="{
        paddingBottom: safeAreaInsets?.bottom + 'px'
      }"
    >
      {{ true ? '没有更多数据~' : '正在加载...' }}
    </view>
  </scroll-view>
</template>

<style lang="scss">
.action {
}

// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 15rpx;

    .date {
      color: #666;
      flex: 1;
    }

    .primary {
      color: #ff9240;
    }

    .icon-delete {
      line-height: 1;
      margin-left: 10rpx;
      padding-left: 10rpx;
      border-left: 1rpx solid #e3e3e3;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;

      .image {
        width: 170rpx;
        height: 170rpx;
      }
    }

    // .quantity {
    //   position: absolute;
    //   bottom: 0;
    //   right: 0;
    //   // line-height: 1;
    //   // padding: 6rpx 4rpx 6rpx 8rpx;
    //   font-size: 24rpx;
    //   color: #fff;
    //   border-radius: 10rpx 0 0 0;
    //   background-color: rgba (0, 0, 0, 0.6);

    // }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
    }

    .type {
      line-height: 1.8;
      padding: 0 15rpx;
      margin-top: 10rpx;
      font-size: 24rpx;
      align-self: flex-start;
      border-radius: 4rpx;
      color: #888;
      background-color: #f7f7f8;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .button-group {
    margin-top: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    width: 180rpx;
    height: 64rpx;
    margin: 0 10rpx;
    text-align: center;
    line-height: 64rpx;
    font-size: 28rpx;
    color: #27ba9b;
    border-radius: 68rpx;
    border: 1px solid #27ba9b;
    background-color: #fff;
  }
}
</style>
