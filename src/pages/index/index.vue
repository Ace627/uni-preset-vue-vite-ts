<template>
  <view class="page-container flex flex-col gap-32rpx p-32rpx">
    <view v-for="item in 99" :key="item">
      <wd-button @click="test">{{ item }}</wd-button>
    </view>
  </view>
</template>

<script setup lang="ts">
const settingStore = useSettingStore()

function test() {
  settingStore.theme = settingStore.theme === 'light' ? 'dark' : 'light'
  console.log(' settingStore.theme: ', settingStore.theme)
  settingStore.saveSetting()
}
</script>

<style lang="scss" scoped></style>
