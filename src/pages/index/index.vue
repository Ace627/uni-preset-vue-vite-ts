<template>
  <view class="page-container bg-red">
    <view v-for="item in 99" :key="item"> {{ item }}</view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
