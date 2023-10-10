<template>
  <view class="page-container">
    <view v-for="(v, i) in menuList" :key="i" class="page-item" @tap="toPage(v.link)">{{ v.text }}</view>
  </view>
</template>

<script setup lang="ts">
const toPage = (url: string) => uni.navigateTo({ url })

const menuList = [
  { text: '登录页面模板1', link: '/template/Login/index1' },
  { text: '登录页面模板2', link: '/template/Login/index2' },
  { text: '登录页面模板3', link: '/template/Login/index3' },
  { text: '纯色背景', link: '/template/BackgroundColor' },
  { text: '渐变背景', link: '/template/GradientBackground' },
]
</script>

<style lang="scss" scoped>
.page-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-content: flex-start;
  gap: 32rpx;
  padding: 32rpx;
}

.page-item {
  display: grid;
  place-items: center;
  width: 100%;
  height: 80rpx;
  border-radius: 20rpx;
  color: #fff;
  background-image: linear-gradient(220.55deg, #867ee6 15.27%, #4a86ff 49.16%);
  box-shadow: 0 10rpx 30rpx -10rpx #2b65d9, -4rpx -4rpx 8rpx 0 #ffffffe5, -2rpx 2rpx 2rpx 0 #ffffffcc inset;
}
</style>
