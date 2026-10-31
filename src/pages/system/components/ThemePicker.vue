<template>
  <wd-picker v-model="value" v-model:visible="show" :columns="columns" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
defineOptions({ name: 'ThemePicker' })

const settingStore = useSettingStore()

const show = ref(false)
const value = ref<string[]>([])

const columns = ref([
  { label: '浅色模式', value: 'light' },
  { label: '深色模式', value: 'dark' },
])

function open() {
  show.value = true
}

function handleConfirm(data: any) {
  settingStore.theme = data.value[0]
  settingStore.saveSetting({ showTip: false })
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
