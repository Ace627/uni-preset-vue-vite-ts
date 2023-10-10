<template>
  <view class="login-container">
    <view class="bgc-img-top">
      <view class="login-title">
        您好，
        <br />
        少年何妨梦摘星，敢挽桑弓射玉衡。
      </view>
    </view>

    <view class="login-view">
      <view class="login-form-container">
        <form class="login-form">
          <view class="login-form-item">
            <text class="label">手机号</text>
            <input type="number" name="phone" placeholder="请输入您的手机号" maxlength="11" v-model="phone" />
          </view>
          <view class="login-form-item">
            <text class="label">密码</text>
            <input type="password" name="code" maxlength="18" placeholder="请输入您的密码" v-model="password" />
          </view>
          <button @tap="login()">登 录</button>
          <view class="register" @tap="register()">注 册</view>
        </form>

        <view class="third-login-tips">
          <text>————— 第三方账号登录 —————</text>
        </view>

        <view class="third-login-form">
          <view class="third-login-form-item" @tap="wxLogin()">
            <image src="/static/images/wx.png"></image>
          </view>
          <view class="third-login-form-item" @tap="qqLogin()">
            <image src="/static/images/qq.png"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isPhone } from '@/utils/validate'

/** 手机号码 */
const phone = ref<string>('')
/** 密码 */
const password = ref<string>('')

/** 登录 */
const login = () => {
  if (!phone.value) return uni.showToast({ title: '请输入手机号', icon: 'none' })
  if (!isPhone(phone.value)) return uni.showToast({ title: '请输入正确手机号', icon: 'none' })
  if (!password.value) return uni.showToast({ title: '请输入您的密码', icon: 'none' })
  // ....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
  uni.showToast({ title: '登录成功！', icon: 'none' })
}

/** 注册 */
const register = () => {
  uni.showToast({ title: '注册跳转', icon: 'none' })
}

/** 等三方微信登录 */
const wxLogin = () => {
  uni.showToast({ title: '微信登录', icon: 'none' })
}

/** 第三方 QQ 登录 */
const qqLogin = () => {
  uni.showToast({ title: 'QQ 登录', icon: 'none' })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.bgc-img-top {
  width: 100%;
  height: 450rpx;
  // background-image: url('../../static/images/bg-head.png');
  background-image: url('https://zhoukaiwen.com/img/loginImg/head.png');
  background-size: 100%;
}

.login-view {
  position: relative;
  width: 100%;
  margin-top: -120rpx;
  border-radius: 8% 8% 0% 0;
  background-color: #fff;
}

.login-form-container {
  width: 600rpx;
  margin: 0 auto;
  padding-top: 80rpx;
  font-size: 28rpx;
}
.login-form {
  /** 表单中的所有输入框 */
  input {
    height: 90rpx;
    line-height: 90rpx;
    margin-bottom: 50rpx;
    font-size: 28rpx;
    border-bottom: 1px solid #e9e9e9;
  }

  /** 表单中的所有按钮 */
  button {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #fff;
    border-radius: 50rpx;
    background-color: #2796f2;
  }

  .login-form-item {
    position: relative;
    .label {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }

  &::after {
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
    content: '\20';
  }
}

/* 标题 */
.login-title {
  line-height: 70rpx;
  padding: 130rpx 0 0 70rpx;
  font-size: 42rpx;
  font-weight: bold;
  color: #ffffff;
}

/* 第三方账号登录的提示横线 */
.third-login-tips {
  margin: 200rpx 0 0 0;
  text-align: center;
  color: #666;

  text {
    margin-left: 20rpx;
    color: #aaa;
    font-size: 27rpx;
  }
}

/** 第三方登录项 */
.third-login-form {
  width: 250rpx;
  margin: 80rpx auto 0;
  text-align: center;

  .third-login-form-item {
    float: left;
    width: 50%;

    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}

.register {
  height: 90rpx;
  line-height: 90rpx;
  margin-top: 30rpx;
  text-align: center;
  font-size: 28rpx;
  font-weight: bold;
  border-radius: 50rpx;
  color: #000;
  background-color: #f5f6fa;
}
</style>
