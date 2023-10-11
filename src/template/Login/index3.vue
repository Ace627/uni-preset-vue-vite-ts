<template>
  <view class="login-bg">
    <image class="bgc-img-top" src="./img/bg1.png"></image>

    <view class="login-form-container">
      <view class="form-title">登 录</view>

      <form class="form">
        <view class="form-item">
          <image src="/static/images/user.png"></image>
          <input type="number" name="phone" placeholder="请输入手机号码" maxlength="11" v-model="phone" />
        </view>
        <view class="form-item">
          <image src="/static/images/pwd.png"></image>
          <input type="password" name="code" maxlength="6" placeholder="请输入密码" v-model="password" />
        </view>
        <view class="forgot-password" @tap="forgotPassword()">忘记密码</view>
        <button @tap="login()">登 录</button>
      </form>
    </view>

    <view class="cardBox">
      <!-- <view @click="registerAccount"> 注册新账号 </view> -->
      <navigator url="/pages/index/index" hover-class="navigator-hover" open-type="navigate"> 此处原为注册，点我返回首页 </navigator>
    </view>
    <image class="bgc-img-bottom" src="./img/bg2.png"></image>
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

/** 忘记密码 */
const forgotPassword = () => {
  uni.showToast({ title: '忘记密码', icon: 'none' })
}

/** 注册新账号 */
const registerAccount = () => {
  uni.showToast({ title: '注册跳转', icon: 'none' })
}
</script>

<style lang="scss" scoped>
/** 登录页面渐变背景 */
.login-bg {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #ff6a9a, #fe7d76);
  overflow: hidden;
}

.login-form-container {
  position: relative;
  z-index: 9;
  width: 700rpx;
  margin: 0 auto;
  margin-top: -100rpx;
  padding: 55rpx;
  font-size: 28rpx;
  border-radius: 20rpx;
  background-color: #fff;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);

  .uni-input-placeholder {
    color: #aeaeae;
  }

  .form-title {
    margin: 0 0 50rpx 20rpx;
    font-size: 46rpx;
    font-weight: bold;
    color: #ff939b;
  }

  input {
    height: 90rpx;
    line-height: 90rpx;
    margin-bottom: 50rpx;
    padding: 0 20rpx 0 120rpx;
    font-size: 28rpx;
    border: 1px solid #f6f6f6;
    border-radius: 50rpx;
    background-color: #f6f6f6;
  }

  button {
    height: 90rpx;
    line-height: 90rpx;
    font-size: 28rpx;
    color: #fff;
    border-radius: 50rpx;
    background-image: linear-gradient(to right, #ff8f77, #fe519f);
  }

  .forgot-password {
    text-align: right;
    color: #c0c0c0;
    margin: -20rpx 30rpx 40rpx 0;
  }

  .form-item {
    position: relative;
    image {
      position: absolute;
      left: 40rpx;
      top: 28rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
}

.cardBox {
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 600rpx;
  height: 70rpx;
  line-height: 70rpx;
  margin: 0 auto;
  padding: 5rpx;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -webkit-box-align: center;
  opacity: 0.9;
  border-radius: 0 0 20rpx 20rpx;
  text-align: center;
  font-size: 28rpx;
  color: #aaa;
  background-color: #fff;

  .txt {
    margin-left: 10rpx;
  }
}

.bgc-img-top {
  width: 100%;
}
.bgc-img-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
}
</style>
