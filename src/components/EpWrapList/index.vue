<template>
  <view class="ep-wraplist">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
defineOptions({ name: 'EpWrapList' })

interface EpWrapListProps {
  gap?: number | string
  minWidth?: number | string
  columns?: number
}

const props = withDefaults(defineProps<EpWrapListProps>(), {
  gap: 16,
  minWidth: 320,
  columns: 0,
})

const gap = computed(() => {
  return typeof props.gap === 'string' ? props.gap : `${props.gap}rpx`
})

const templateColumns = computed(() => {
  let minWidth = typeof props.minWidth === 'string' ? props.minWidth : `${props.minWidth}rpx`
  if (props.columns > 0) minWidth = `calc((100% - ${gap.value} * ${props.columns - 1}) / ${props.columns})`
  return `repeat(auto-fill, minmax(${minWidth}, 1fr))`
})
</script>

<style lang="scss" scoped>
.ep-wraplist {
  --ep-wraplist-gap: v-bind(gap);
  --ep-wraplist-template-columns: v-bind(templateColumns);
  display: grid;
  grid-template-columns: var(--ep-wraplist-template-columns);
  gap: var(--ep-wraplist-gap);
}
</style>
