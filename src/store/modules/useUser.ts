import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default defineStore('user', {
  state() {
    return {
      token: getToken(),
    }
  },

  actions: {
    /** 登录 */
    async login() {
      const token = 'mock_token'
      this.token = token
      setToken(token)
    },

    /** 登出 */
    async logout() {
      this.$reset()
      removeToken()
    },
  },
})
