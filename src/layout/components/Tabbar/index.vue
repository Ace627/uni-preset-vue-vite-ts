<template>
  <!-- https://wot-ui.cn/component/tabbar.html -->
  <wd-tabbar v-show="isTabbarPage()" fixed bordered safe-area-inset-bottom :model-value="active" @change="handleChange">
    <wd-tabbar-item v-for="item in TabbarPages" :key="item.path" :name="item.path" :title="item.title" :icon="item.icon"> </wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'Tabbar' })
import { isTabbarPage } from '@/router/router.helper'
import { TabbarPages } from '@/router/router.database'

// 当前栈顶路由（补前导 / 对齐配置格式），作为当前选中项，与 wd-tabbar-item 的 name（item.path）同构
const active = '/' + (getCurrentPages().at(-1)?.route ?? '')

/** 底栏页之间平级替换跳转，路由栈深度不变 */
function handleChange({ value }: { value: string | number }) {
  console.log('value: ', value) // /pages/mine/index
  const target = TabbarPages.find((item) => item.path === value)
  if (!target || target.path === active) return
  uni.redirectTo({ url: target.path })
}
</script>

<style lang="scss" scoped>
.tab-icon {
  width: 42rpx;
  height: 42rpx;
}
</style>
