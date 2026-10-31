<template>
  <wd-config-provider :theme="settingStore.theme" custom-class="wh-full">
    <view :class="classes">
      <!-- 为页面提供导航功能，常用于页面顶部 -->
      <Navbar v-if="isDefaultNavbarPage()" />

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
import { isDefaultNavbarPage, isTabbarPage } from '@/router/router.helper.ts'

const settingStore = useSettingStore()

const classes = computed(() => ['app-container', `theme-${settingStore.theme}`, { 'has-tabbar': isTabbarPage() }])
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0–11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 现代标准 */
}
.app-container.has-tabbar {
  /* 兜底：不认 env/constant 的内核至少保住 tabbar 本体高度 */
  padding-bottom: var(--wot-tabbar-height, 50px);
  /* iOS 11.0–11.2 的旧前缀 */
  padding-bottom: calc(var(--wot-tabbar-height, 50px) + constant(safe-area-inset-bottom));
  /* 现代标准 */
  padding-bottom: calc(var(--wot-tabbar-height, 50px) + env(safe-area-inset-bottom));
}
</style>
