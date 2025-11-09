<template>
  <wd-navbar title="首页" fixed placeholder safeAreaInsetTop :bordered="false"></wd-navbar>

  <view class="p-32rpx">
    <wd-card title="功能测试">
      <view class="grid cols-2 gap-16rpx">
        <wd-button :round="false" @click="TipModal.alert('警告提示框')">警告提示框</wd-button>
        <wd-button :round="false" @click="handleConfirm">确认操作框</wd-button>
        <wd-button :round="false" type="info" @click="TipModal.msg('默认提示信息')">默认提示信息</wd-button>
        <wd-button :round="false" type="success" @click="TipModal.msgSuccess('成功提示信息')">成功提示信息</wd-button>
        <wd-button :round="false" type="error" @click="TipModal.msgError('危险提示信息')">危险提示信息</wd-button>
        <wd-button :round="false" @click="toggleTheme()">切换主题</wd-button>
      </view>
    </wd-card>
  </view>

  <Tabbar />
</template>

<script setup lang="ts">
import { TipModal } from '@/utils'
import Tabbar from '@/layout/Tabbar/index.vue'

const { toggleTheme } = useTheme()

async function handleConfirm() {
  const { cancel } = await TipModal.confirm('确认要执行该操作吗？')
  if (cancel) return TipModal.msg('操作取消')
  TipModal.msgSuccess('操作成功')
}
</script>

<style lang="scss" scoped>
:deep(.wd-button) {
  border-radius: 8rpx;
}
</style>
