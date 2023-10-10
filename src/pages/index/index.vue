<template>
  <view class="page-container">
    <view class="page-item" @tap="toPage('/template/Login/index1')">登录页面模板1</view>
    <view class="page-item" @tap="toPage('/template/Login/index2')">登录页面模板2</view>
    <view class="page-item" @tap="toPage('/template/Login/index3')">登录页面模板3</view>
  </view>
</template>

<script setup lang="ts">
const toPage = (url: string) => uni.navigateTo({ url })
</script>

<style lang="scss" scoped>
.page-item {
  display: grid;
  place-items: center;
  width: 90%;
  height: 80rpx;
  margin: 0 auto;
  border-radius: 20rpx;
  color: #fff;
  background-image: linear-gradient(220.55deg, #867ee6 15.27%, #4a86ff 49.16%);
  box-shadow: 0 10rpx 30rpx -10rpx #2b65d9, -4rpx -4rpx 8rpx 0 #ffffffe5, -2rpx 2rpx 2rpx 0 #ffffffcc inset;

  &:not(:first-of-type) {
    margin-top: 32rpx;
  }
}
</style>
