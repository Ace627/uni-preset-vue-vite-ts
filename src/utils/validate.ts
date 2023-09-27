// 校验是否为外链
const isExternal = (path: string): boolean => /^(https?:|mailto:|tel:)/.test(path)

// 校验对象是否为空
const isEmptyObject = (obj: object): boolean => Reflect.ownKeys(obj).length === 0
