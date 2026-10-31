<template>
  <view class="page-container">
    <wd-cell-group>
      <wd-cell is-link clickable title="系统主题" :value="themeName" @click="themePickerRef?.open()" />
    </wd-cell-group>

    <ThemePicker ref="themePickerRef" />
  </view>
</template>

<script setup lang="ts">
defineOptions({ name: 'Setting' })
import ThemePicker from './components/ThemePicker.vue'

const settingStore = useSettingStore()

const themeName = computed(() => (settingStore.theme === 'light' ? '浅色模式' : '深色模式'))

const themePickerRef = shallowRef<InstanceType<typeof ThemePicker>>()
</script>

<style lang="scss" scoped></style>
