<template>
  <wd-tabbar v-model="tabbar" fixed safeAreaInsetBottom placeholder @change="onTabbarChange">
    <wd-tabbar-item :title="item.title" :icon="item.icon" :name="item.icon" v-for="(item, index) in tabbars" :key="index"></wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'Tabbar' })
import { HOME_PAGE_URL, MINE_PAGE_URL } from '@/router/router.constant'

const tabbar = ref('home')

const tabbars = ref([
  { title: '首页', icon: 'home', url: HOME_PAGE_URL },
  { title: '我的', icon: 'user', url: MINE_PAGE_URL },
])

function onTabbarChange(event: { value: string }) {
  const record = tabbars.value.find((item) => item.icon === event.value)
  if (!record) return
  tabbar.value = event.value
  uni.switchTab({ url: record.url })
}

// 获取当前页面路径
function getCurrentPageUrl() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const currentPageUrl = `/${currentPage.route}`
  const tabItem = tabbars.value.find((item) => currentPageUrl.includes(item.url))
  if (tabItem?.icon) tabbar.value = tabItem.icon
}

onShow(() => {
  getCurrentPageUrl()
})
</script>

<style lang="scss" scoped></style>
