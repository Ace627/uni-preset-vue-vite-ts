技术栈：UniApp、TypeScript、Vue3、WotUI、Sass

## 自动导入

项目通过 `unplugin-auto-import` 配置了按需自动导入（见 `build/plugins/auto-import-plugin.ts`），`src/pages/index/index.vue` 等文件中的 Vue/uni-app API 无需手写 import：

- 覆盖范围：`vue`（ref、computed、onMounted 等）、`pinia`、`uni-app`（onShow、onLoad 等生命周期）、`src/store/modules` 与 `src/hooks` 目录下的组合式函数（如 useTheme、useSettingStore）
- 类型声明自动生成在 `src/types/auto-generate/auto-import.d.ts`
- 编码约定：不要手写这些 import，直接使用 API 即可

## 命名约定

- 禁止缩写参数/变量名，使用完整单词：如回调参数用 `callback` 而不是 `cb`、`interval` 而不是 `itv` 等

## 提示与弹窗

- 统一使用 `src/utils/tip-modal.ts` 的 `TipModal`（从 `@/utils` 导入，不在自动导入范围，需手写 import），禁止直接调用 `uni.showToast` / `uni.showModal` / `uni.showLoading`：
  - 消息提示：`TipModal.msg / msgSuccess / msgError / msgWarning`
  - 提示弹窗：`TipModal.alert / alertSuccess / alertError / alertWarning`
  - 确认弹窗：`await TipModal.confirm(content, config)`，返回 `{ confirm, cancel }`，取消也是正常结果，无需 success 回调
  - 加载遮罩：`TipModal.showLoading / hideLoading`
