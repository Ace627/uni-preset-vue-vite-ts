<template>
  <!-- https://wot-ui.cn/component/navbar.html -->
  <wd-navbar fixed placeholder safe-area-inset-top :title="title" :left-arrow="!isTabbarPage()" @click-left="handleBack"></wd-navbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import pages from '@/pages.json'
import { isTabbarPage } from '@/router/router.helper'

/** 全部页面（主包 + 分包）：分包页面路径 = 分包 root + 页面 path，与完整路由一致 */
// 主包页面列表（pages.json 的 pages 字段）
const allPages = [...(pages.pages ?? [])]
// const allPages = [...pages.pages, ...(pages.subPackages?.flatMap((subPackage) => subPackage.pages.map((page) => ({ ...page, path: `${subPackage.root}/${page.path}` }))) ?? [])]

/** 从 pages.json 提取「页面路由 → navigationBarTitleText」映射，标题只维护一份 */
// 把页面列表转成 { 路由: 标题 } 的对象，方便按路由查标题
const navbarPageMap: Record<string, string> = Object.fromEntries(allPages.map((page) => [page.path, page.style.navigationBarTitleText]))

// 当前页面的路由路径（页面栈中最后一个），取不到则为空字符串
const currentRoute = getCurrentPages().at(-1)?.route ?? ''

// 用当前路由查标题，查不到时用项目名兜底
const title = navbarPageMap[currentRoute] ?? 'uni-preset-vue-vite-ts'

/** 返回上一页；没有上一页时兜底回首页 */
function handleBack() {
  getCurrentPages().length > 1 ? uni.navigateBack({ delta: 1 }) : uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped></style>
