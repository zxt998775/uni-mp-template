<script setup lang="ts">
// 导⼊列表组件
import OrderList from './components/OrderList.vue'
import { OrderState } from '@/config/constants'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([
    () => {
      console.log('refresh!!!!!!')
    }
  ])
  isLoading.value = false
})
/**
 * 下拉刷新
 */
// 是否触发下拉刷新
const isTriggered = ref(false)
// ⾃定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  console.log('refresh!!!!!!')
  // router.push(router.currentRoute.value.fullPath);
  uni.redirectTo({ url: '/pagesOrder/list/list?type=0' })
  await Promise.all([
    () => {
      console.log('refresh-over!!!!!!')
    }
  ]) // 关闭动画
  // 关闭动画
  isTriggered.value = false
}
// 滚动触底事件
const onScrolltolower = () => {
  console.log('下拉刷新')
  router.push(router.currentRoute.value.fullPath)
}

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部' },
  { orderState: 1, title: '待付款' },
  { orderState: 2, title: '待发货' },
  { orderState: 3, title: '待收货' },
  { orderState: 4, title: '待评价' }
])

// 获取⻚⾯参数
const query = defineProps<{
  type: string
  id: string
}>()

// ⾼亮下标
const activeIndex = ref(orderTabs.value.findIndex((v) => v.orderState === Number(query.type)))

// 获取订单详情
const order = ref<OrderResult>()

// 确认收货
const onOrderConfirm = () => {
  // 二次确认弹窗
  uni.showModal({
    content: '为保障您的权益，请收到货并确认无误后，再确认收货',
    success: async (success) => {
      if (success.confirm) {
        const res = await putMemberOrderReceiptByIdAPI(query.id)
        // 更新订单状态
        order.value = res.result
      }
    }
  })
}

// 删除订单
const onOrderDelete = () => {
  // 二次确认
  uni.showModal({
    content: '是否删除订单',
    confirmColor: '#27BA9B',
    success: async (success) => {
      if (success.confirm) {
        await deleteMemberOrderAPI([query.id])
        uni.redirectTo({ url: '/pagesOrder/list/list' })
      }
    }
  })
}
</script>

<template>
  <view>
    <scroll-view
      refresher-enabled
      @scrolltolower="onScrolltolower"
      @refresherrefresh="onRefresherrefresh"
      scroll-y
      :refresher-triggered="isTriggered"
    >
      <view>
        <view class="viewport">
          <!-- tabs -->
          <view class="tabs">
            <text
              class="item"
              v-for="(item, index) in orderTabs"
              :key="item.title"
              @tap="activeIndex = index"
            >
              {{ item.title }}
            </text>
            <!-- 游标 -->
            <view class="cursor" :style="{ left: activeIndex * 20 + '%' }"></view>
          </view>
        </view>

        <!-- 滑动容器 -->
        <swiper class="swiper" :current="activeIndex" @change="activeIndex = $event.detail.current">
          <!-- 滑动项 -->
          <swiper-item v-for="item in orderTabs" :key="item.title">
            <!-- 订单列表 -->
            <OrderList :order-state="item.orderState" />

            <!-- 订单信息 -->
            <view class="status">
              <text class="date">2023-04-14 13:14:20</text>
              <!-- 订单状态⽂字 -->
              <text>待付款</text>
              <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
              <text class="icon-delete"></text>
            </view>

            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator
              v-for="sku in 2"
              :key="sku"
              class="goods"
              :url="`/pagesOrder/detail/detail?id=1`"
              hover-class="none"
            >
              <view class="cover">
                <image
                  mode="aspectFit"
                  src="//yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg"
                ></image>
              </view>
              <view class="meta">
                <view class="name ellipsis">ins⻛⼩碎花泡泡袖衬110-160cm</view>
                <view class="type">藏⻘⼩花 130</view>
              </view>
            </navigator>

            <!-- ⽀付信息 -->
            <view class="payment">
              <text class="quantity">共5件商品</text>
              <text>实付</text>
              <text class="amount"> <text class="symbol">¥</text>99</text>
            </view>

            <!-- 订单操作按钮 -->
            <view class="action">
              <!-- 待付款状态：显示去⽀付按钮 -->
              <template v-if="true">
                <view class="button primary">去⽀付</view>
              </template>
              <template v-else>
                <view class="cusview">
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
                    @tap="onOrderConfirm"
                  >
                    确认收货
                  </view>
                  <!-- 待评价状态: 展示去评价 -->
                  <view class="button" v-if="order?.orderState === OrderState.DaiPingJia"> 去评价 </view>
                  <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
                  <view
                    class="button delete"
                    v-if="order?.orderState === OrderState.DaiPingJia"
                    @tap="onOrderDelete"
                  >
                    删除订单
                  </view>
                </view>
              </template>
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
          </swiper-item>
        </swiper>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
.page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba (240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #262626;
  }

  .cursor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 20%;
    height: 6rpx;
    padding: 0 50rpx;
    background-color: #27ba9b;
    transition: all 0.4s;
  }
}

// swiper
.swiper {
  background-color: pink;
  height: 550px;
}

// 订 单 列 表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    .cover {
      width: 170rpx;
      height: 170rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }
  }
}
</style>
