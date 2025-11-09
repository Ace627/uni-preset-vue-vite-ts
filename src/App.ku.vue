<template>
  <!-- <wd-config-provider :theme="theme" :theme-vars="themeVars"> -->
  <!-- https://wot-ui.cn/component/config-provider.html -->
  <wd-config-provider :theme="theme" :theme-vars="themeVars">
    <view :class="classes">
      <KuRootView />
    </view>
  </wd-config-provider>

  <wd-toast />
  <wd-message-box />
</template>

<script setup lang="ts">
defineOptions({ name: 'AppKu' })

const { theme, themeVars } = useTheme()

const classes = computed(() => [`${theme.value}-theme`, 'app-container'])
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--lx-bg-color-page);
}
</style>
