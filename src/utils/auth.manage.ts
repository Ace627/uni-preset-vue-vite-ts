export abstract class AuthManage {
  private static _ACCESS_TOKEN_KEY = `client:token:access`

  static setAccessToken(token: string) {
    uni.setStorageSync(this._ACCESS_TOKEN_KEY, token)
  }

  static getAccessToken(): string {
    return uni.getStorageSync(this._ACCESS_TOKEN_KEY)
  }

  static removeAccessToken() {
    uni.removeStorageSync(this._ACCESS_TOKEN_KEY)
  }
}
