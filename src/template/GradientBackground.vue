<template>
  <view class="components-bggrad">
    <view class="tips">
      <text>渐变背景变化</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.components-bggrad {
  margin: 0;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: linear-gradient(45deg, #00f5d4, #01beff, #9a5ce5, #f15bb5);
  background-size: 500% 500%;
  animation: gradientBG 6s ease infinite;
}

.tips {
  position: absolute;
  top: 15%;
  width: 100%;
  font-size: 60rpx;
  letter-spacing: 4rpx;
  text-align: center;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
