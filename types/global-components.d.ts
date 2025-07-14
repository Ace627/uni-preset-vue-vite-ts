export {}

declare module 'vue' {
  export interface GlobalComponents {
    EpWrapList: typeof import('../src/components/EpWrapList/index.vue')['default']
  }
}
