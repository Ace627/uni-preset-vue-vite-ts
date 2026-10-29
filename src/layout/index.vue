<template>
  <wd-config-provider :theme="settingStore.theme" custom-class="wh-full">
    <view :class="classes">
      <!-- 为页面提供导航功能，常用于页面顶部 -->
      <Navbar />

      <slot></slot>

      <!-- 底部导航栏，用于在不同页面之间进行切换 -->
      <Tabbar />
    </view>
  </wd-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import Navbar from './components/Navbar/index.vue'
import Tabbar from './components/Tabbar/index.vue'

const settingStore = useSettingStore()

const classes = computed(() => ['app-container', `theme-${settingStore.theme}`])
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
