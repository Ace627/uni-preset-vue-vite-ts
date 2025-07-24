<template>
  <view class="content flex flex-col gap-16rpx p-32rpx">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success" @click="toPage">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
  </view>
</template>

<script setup lang="ts">
function toPage() {
  uni.switchTab({ url: '/pages/my/index' })
}
</script>

<style lang="scss" scoped></style>
