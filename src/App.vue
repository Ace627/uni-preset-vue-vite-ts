<script setup lang="ts">
/** 当 uni-app 初始化完成时触发（全局只触发一次） */
onLaunch(() => {
  console.log('App Launch')
})

/** 当 uni-app 启动，或从后台进入前台显示 */
onShow(() => {
  console.log('App Show')
})

/** 当 uni-app 从前台进入后台 */
onHide(() => {
  console.log('App Hide')
})
</script>
<style></style>
