/** 复制文本到剪贴板 */
export const coypText = (data: string) => uni.setClipboardData({ data, success: () => uni.showToast({ icon: 'success', title: '文本复制成功' }) })

/** 获取随机布尔值 */
export const randomBoolean = (): boolean => Math.random() > 0.5

/** 反转字符串 */
export const reverseString = (str: string): string => str.split('').reverse().join('')

/** 随机生成十六进制颜色 */
export const randomHexColor = (): string => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
