const screenWidth = uni.getSystemInfoSync().screenWidth

export function px2rpx(px: number): number {
  return (750 / screenWidth) * px
}

export function rpx2px(rpx: number): number {
  return (rpx * screenWidth) / 750
}
