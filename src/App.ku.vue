<template>
  <wd-config-provider :theme="settingStore.theme">
    <KuRootView />
  </wd-config-provider>
</template>

<script setup lang="ts">
const settingStore = useSettingStore()
</script>
