/** 校验是否为外链 */
export const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path)

/** 校验对象是否为空 */
export const isEmptyObject = (obj: object): boolean => Reflect.ownKeys(obj).length === 0

/** 校验是否为手机号 */
export const isPhone = (phone: string): boolean => /^1[3-9]\d{9}$/.test(phone)
