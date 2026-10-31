<template>
  <!-- https://wot-ui.cn/component/navbar.html -->
  <wd-navbar fixed placeholder safe-area-inset-top :title="title" :left-arrow="!isTabbarPage()" @click-left="handleBack"></wd-navbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import { pages } from '@/router/router.database'
import { isTabbarPage, getCurrentPage } from '@/router/router.helper'

// 当前页标题：按路由查 pages 表，查不到用项目名兜底
const title = pages.find((page) => page.path === getCurrentPage())?.title ?? 'uni-preset-vue-vite-ts'

/** 返回上一页；没有上一页时兜底回首页 */
function handleBack() {
  getCurrentPages().length > 1 ? uni.navigateBack({ delta: 1 }) : uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped></style>
