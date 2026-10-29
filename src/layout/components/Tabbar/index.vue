<template>
  <wd-tabbar v-show="isTabbarPage" fixed safe-area-inset-bottom :model-value="active" @change="handleChange">
    <wd-tabbar-item v-for="item in tabList" :key="item.name" :name="item.name" :title="item.title">
      <template #icon="{ active: itemActive }">
        <image mode="aspectFit" class="tab-icon" :src="itemActive ? item.selectedIcon : item.icon" />
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'Tabbar' })
import type { TabbarItem, TabbarName } from './types'

/** 底栏页路由 → 标签名映射 */
const tabbarPageMap: Record<string, TabbarName> = {
  'pages/index/index': 'home',
  'pages/mine/index': 'mine',
}

/** 底栏两项配置，复用原生 tabBar 时期的图标资源 */
const tabList: TabbarItem[] = [
  {
    name: 'home',
    title: '首页',
    path: '/pages/index/index',
    icon: '/static/images/tabbar/home.png',
    selectedIcon: '/static/images/tabbar/home-selected.png',
    wdIcon: 'home',
  },
  {
    name: 'mine',
    title: '我的',
    path: '/pages/mine/index',
    icon: '/static/images/tabbar/mine.png',
    selectedIcon: '/static/images/tabbar/mine-selected.png',
    wdIcon: 'user',
  },
]

const currentRoute = getCurrentPages().at(-1)?.route ?? ''
const active = tabbarPageMap[currentRoute]
const isTabbarPage = Boolean(active)

/** 底栏页之间平级替换跳转，路由栈深度不变 */
function handleChange({ value }: { value: string | number }) {
  const target = tabList.find((item) => item.name === value)
  if (!target || target.name === active) return
  uni.redirectTo({ url: target.path })
}
</script>

<style lang="scss" scoped>
.tab-icon {
  width: 42rpx;
  height: 42rpx;
}
</style>
