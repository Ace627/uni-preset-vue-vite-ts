<template>
  <view class="content flex flex-col gap-16rpx p-32rpx">
    <wd-button @click="TipModal.alert('警告提示框')">警告提示框</wd-button>
    <wd-button @click="handleConfirm">确认操作框</wd-button>
    <wd-button type="info" @click="TipModal.msg('默认提示信息')">默认提示信息</wd-button>
    <wd-button type="success" @click="TipModal.msgSuccess('成功提示信息')">成功提示信息</wd-button>
    <wd-button type="warning" @click="TipModal.msgWarning('警告提示信息')">警告提示信息</wd-button>
    <wd-button type="error" @click="TipModal.msgError('危险提示信息')">危险提示信息</wd-button>
  </view>
</template>

<script setup lang="ts">
const TipModal = useTipModal()

async function handleConfirm() {
  const { cancel } = await TipModal.confirm('确认要执行该操作吗？')
  if (cancel) return TipModal.msg('操作取消')
  TipModal.msgSuccess('操作成功')
}
</script>

<style lang="scss" scoped></style>
