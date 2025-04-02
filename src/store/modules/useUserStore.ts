/** 第一个参数是该 store 的唯一 id */
export default defineStore('user', () => {
  /**
   * 用户头像 默认值 src/assets/images/default/default-avatar.gif
   */
  const avatar = ref<string>('../../static/logo.png')

  return { avatar }
})
