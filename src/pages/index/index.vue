<template>
  <view class="content">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  padding: 32rpx;
}
</style>
