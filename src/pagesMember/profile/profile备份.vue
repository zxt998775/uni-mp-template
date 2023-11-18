<template>
  <view>
    <uni-datepicker
      v-model="showPicker"
      :start="startDate"
      :end="endDate"
      :fields="fields"
      @confirm="onDatePickConfirm"
      @cancel="onDatePickCancel"
    ></uni-datepicker>

    <view class="selected-date" @tap="showDatePicker">选择日期时间</view>
    <view class="selected-result">{{ selectedResult }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      startDate: '1900-01-01 00:00:00',
      endDate: this.getNow(), // 结束日期设置为当前时间
      fields: 'second', // 设置精确到秒
      selectedResult: ''
    }
  },
  methods: {
    showDatePicker() {
      this.showPicker = true
    },
    onDatePickConfirm(value) {
      this.showPicker = false
      this.selectedResult = value
    },
    onDatePickCancel() {
      this.showPicker = false
    },
    getNow() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      return `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
      } ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style>
.selected-date {
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #007aff;
}

.selected-result {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #333;
}
</style>
