<template>
  <view class="login-container">
    <!-- 页面装饰图片 -->
    <image class="bgc-img-top" src="./img/2.png"></image>
    <image class="bgc-img-bottom" src="./img/3.png"></image>

    <!-- 标题 -->
    <view class="login-title">{{ title }}</view>
    <!-- 副标题 -->
    <view class="login-title-subtitle">少年何妨梦摘星，敢挽桑弓射玉衡。</view>

    <form class="login-form">
      <view class="login-form-item">
        <image src="https://zhoukaiwen.com/img/loginImg/sj.png"></image>
        <view class="line"></view>
        <input type="number" name="phone" placeholder="请输入手机号" maxlength="11" v-model="phone" />
      </view>

      <view class="login-form-item">
        <image src="https://zhoukaiwen.com/img/loginImg/yz.png"></image>
        <view class="line"></view>
        <input type="number" name="code" maxlength="6" placeholder="请输入验证码" v-model="yzm" />
        <view v-if="showText" class="captcha-btn" @tap="getCode()">发送短信</view>
        <view v-else class="captcha-btn" style="background-color: #a7a7a7">重新发送({{ second }})</view>
      </view>

      <button @tap="login()">登 录</button>
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
</template>

<script setup lang="ts">
import { isPhone } from '@/utils/validate'

/** 填写 logo 或者 app 名称，也可以用：欢迎回来，看您需求 */
const title = ref<string>('欢迎回来！')
/** 手机号码 */
const phone = ref<string>('')
/** 短信验证码 */
const yzm = ref<string>('')
/** 判断短信是否发送 */
const showText = ref<boolean>(true)
/** 重新发送倒计时 默认 60s */
const second = ref<number>(60)

/** 获取短信验证码 */
const getCode = () => {
  showText.value = false
  const timer: NodeJS.Timeout = setInterval(() => {
    const tiems = second.value - 1
    second.value = tiems
  }, 1000)
  setTimeout(() => {
    clearInterval(timer)
    second.value = 60
    showText.value = true
  }, 60 * 1000)
  // 这里请求后台获取短信验证码 成功后 showText.value = false
}

/** 登录 */
const login = () => {
  if (!phone.value) return uni.showToast({ title: '请输入手机号', icon: 'none' })
  if (!isPhone(phone.value)) return uni.showToast({ title: '请输入正确手机号', icon: 'none' })
  if (!yzm.value) return uni.showToast({ title: '请输入验证码', icon: 'none' })
  // ....此处省略，这里需要调用后台验证一下验证码是否正确，根据您的需求来
  uni.showToast({ title: '登录成功！', icon: 'none' })
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
  width: 650rpx;
  margin: 0 auto;
  color: #000;
  font-size: 28rpx;

  /** 输入框提示占位符的样式 */
  .uni-input-placeholder {
    color: #999;
  }

  .login-form {
    /** 表单中的所有输入框 */
    input {
      height: 90rpx;
      line-height: 90rpx;
      margin-bottom: 50rpx;
      padding: 0 20rpx 0 120rpx;
      font-size: 28rpx;
      border-radius: 50rpx;
      border: 1px solid #e9e9e9;
      background-color: #f8f7fc;
    }

    /** 表单中的所有按钮 */
    button {
      height: 90rpx;
      line-height: 90rpx;
      font-size: 28rpx;
      color: #fff;
      border-radius: 50rpx;
      background-color: #5677fc;
      box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
    }

    /** 重新发送验证码的按钮样式 */
    .captcha-btn {
      position: absolute;
      right: 22rpx;
      top: 22rpx;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0 25rpx;
      font-size: 24rpx;
      border-radius: 50rpx;
      color: #fff;
      background-color: #5677fc;
    }
  }
}

/** 登录表单项 */
.login-form-item {
  position: relative;

  /* 表单项的前置图标 */
  image {
    position: absolute;
    left: 40rpx;
    top: 28rpx;
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
  }

  /* 表单项前置图标与表单组件的分割竖线 */
  .line {
    position: absolute;
    left: 98rpx;
    top: 28rpx;
    width: 2rpx;
    height: 40rpx;
    background-color: #dedede;
  }
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

/* 顶部页面装饰图片 */
.bgc-img-top {
  position: absolute;
  right: 0;
  top: -150rpx;
  z-index: -1;
  width: 100%;
}

/* 底部页面装饰图片 */
.bgc-img-bottom {
  position: absolute;
  left: -50rpx;
  bottom: 0;
  width: 50%;
}

/* 标题 */
.login-title {
  padding: 300rpx 0 30rpx 0;
  font-size: 46rpx;
  font-weight: bold;
  color: #000;
}

/* 副标题 */
.login-title-subtitle {
  padding: 0rpx 0 120rpx 0;
  font-size: 32rpx;
  color: #aaa;
}
</style>
