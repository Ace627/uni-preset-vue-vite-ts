const Token_Key = 'Admin_Token'

/** 从本地缓存中同步获取指定 key 对应的内容 */
export const getToken = (): string => uni.getStorageSync(Token_Key)

/** 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容 */
export const setToken = (token: string) => uni.setStorageSync(Token_Key, token)

/** 从本地缓存中同步移除指定 key */
export const removeToken = () => uni.removeStorageSync(Token_Key)
