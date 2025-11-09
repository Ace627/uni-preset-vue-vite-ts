import type { App, Component, ComponentOptions } from 'vue'

/**
 * 自定义组件类型（支持 Vue 组件的各种形式）
 * - ComponentOptions：Vue 组件选项对象（如 defineComponent 返回的对象）
 * - Component：Vue 组件实例（如函数式组件、SFC 组件）
 */
type CustomComponent = Component | ComponentOptions

/**
 * 扩展组件类型，添加 install 方法
 * @template T 原始组件类型
 */
type WithInstall<T extends CustomComponent> = T & {
  install: (app: App, options?: Record<string, unknown>) => void
}

/**
 * Vue 组件安装工具函数，给自定义组件添加 install 方法，使其支持 app.use(Component) 全局注册
 * @param component 要处理的自定义组件
 * @param alias 可选，组件挂载到全局的别名（通过 app.config.globalProperties 访问）
 * @returns 增强后的组件（带有 install 方法）
 */
export function withInstall<T extends CustomComponent>(component: T, alias?: string): WithInstall<T> {
  // 给组件添加 install 方法
  ;(component as Record<string, unknown>).install = (app: App, options?: Record<string, unknown>) => {
    // 获取组件名称（优先取 component.name，其次是 displayName）
    const componentName = component.name || (component as ComponentOptions).displayName
    // 组件名称不存在则终止（避免注册无名组件）
    if (!componentName) return console.log(400, '组件注册失败：组件未设置 name 或 displayName 属性')

    // 1. 全局注册组件（支持在模板中使用 <CompName> 标签）
    app.component(componentName, component)

    // 2. 若配置了别名，挂载到全局属性（支持在模板中使用 $alias，或在组件中使用 this.$alias）
    if (alias) {
      // 避免覆盖已存在的全局属性
      if (app.config.globalProperties[alias]) return console.log(400, `全局别名 "${alias}" 已存在，将被覆盖`)
      app.config.globalProperties[alias] = component
    }

    // 可选：支持传入额外配置（如全局属性、指令等）
    if (!options) return
    Object.entries(options).forEach(([key, value]) => (app.config.globalProperties[key] = value))
  }

  // 返回增强后的组件（带有 install 方法）
  return component as WithInstall<T>
}
