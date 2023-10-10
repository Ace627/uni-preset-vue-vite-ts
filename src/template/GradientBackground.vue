<template>
  <view class="components-bgcolor">
    <view class="tips">
      <text>纯色渐变背景</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.components-bgcolor {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  color: #fff;
  animation: color-loop 16s infinite;
  overflow: hidden;
}

.tips {
  position: absolute;
  top: 15%;
  width: 100%;
  font-size: 60rpx;
  letter-spacing: 4rpx;
  text-align: center;
}

@keyframes color-loop {
  0% {
    background: #f15bb5;
  }

  25% {
    background: #00f5d4;
  }

  50% {
    background: #01beff;
  }

  75% {
    background: #9a5ce5;
  }

  100% {
    background: #f15bb5;
  }
}
</style>
