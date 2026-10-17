<template>
  <view class="page">
    <!-- 模拟表盘 -->
    <view class="analog-clock">
      <view v-for="n in 60" :key="`t${n}`" class="tick" :class="n % 5 === 1 ? 'tick-major' : 'tick-minor'" :style="{ transform: `rotate(${(n - 1) * 6}deg)` }" />
      <view v-for="n in 12" :key="`n${n}`" class="numeral" :style="{ transform: `translate(-50%, -50%) rotate(${n * 30}deg) translateY(-182rpx) rotate(${-n * 30}deg)` }">{{ n }}</view>
      <view class="hand hand-hour" :style="{ transform: `rotate(${hourAngle}deg)` }" />
      <view class="hand hand-minute" :style="{ transform: `rotate(${minuteAngle}deg)` }" />
      <view class="hand hand-second" :style="{ transform: `rotate(${secondAngle}deg)` }" />
      <view class="center-dot">
        <view class="center-dot-inner" />
      </view>
    </view>

    <!-- 数字时间（上滑时吸顶固定，表盘随滚动移出屏幕） -->
    <view class="digital-header">
      <text class="digital-time">{{ localTimeText }}</text>
      <text class="digital-sub">本地时间 {{ localDateText }}</text>
    </view>

    <!-- 城市列表 -->
    <view class="city-list">
      <view v-for="row in cityRows" :key="row.timeZone" class="city-card" @longpress="onRemoveCity(row)">
        <view class="city-left">
          <text class="city-name">{{ row.name }}</text>
          <view class="city-meta">
            <text>{{ row.dateText }}</text>
            <text class="meta-divider">｜</text>
            <text>{{ row.diffText }}</text>
          </view>
        </view>
        <text class="city-time">{{ row.time }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { TipModal } from '@/utils'

/** 城市行渲染结构 */
interface CityRow {
  name: string
  country: string
  timeZone: string
  time: string
  dateText: string
  diffText: string
}

/** 展示城市的名称与国家（固定列表，无添加入口） */
const CITY_MAP: Record<string, { name: string; country: string }> = {
  'Asia/Shanghai': { name: '北京', country: '中国' },
  'Asia/Tokyo': { name: '东京', country: '日本' },
  'Asia/Singapore': { name: '新加坡', country: '新加坡' },
  'Australia/Sydney': { name: '悉尼', country: '澳大利亚' },
  'Europe/London': { name: '伦敦', country: '英国' },
  'Europe/Paris': { name: '巴黎', country: '法国' },
  'America/New_York': { name: '纽约', country: '美国' },
  'America/Los_Angeles': { name: '洛杉矶', country: '美国' },
}

const STORAGE_KEY = 'world-clock-cities-v2'
/** 一天的毫秒数 */
const DAY_MS = 86400000

/**
 * 各时区换算格式化器缓存：key 为时区名，避免每秒 tick 重复创建 Intl 实例。
 * 不用 dayjs.tz：其内部走 toLocaleString 后再 new Date(字符串)，该格式在 iOS/小程序下
 * 大量告警且可能解析失败，故用 Intl formatToParts（iOS 安全）自行换算
 */
const zoneFormatterMap = new Map<string, Intl.DateTimeFormat>()

function getZoneFormatter(timeZone: string) {
  let formatter = zoneFormatterMap.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    zoneFormatterMap.set(timeZone, formatter)
  }
  return formatter
}

/**
 * 将本机时刻换算为目标时区的墙钟时间。
 * 返回按本机时区解析的 dayjs（仅用于取值/格式化），日时分秒即目标时区的真实墙钟
 * @param base 本机当前时刻
 * @param timeZone IANA 时区名
 */
function toZoned(base: Dayjs, timeZone: string): Dayjs {
  const values: Record<string, string> = {}
  for (const part of getZoneFormatter(timeZone).formatToParts(base.toDate())) {
    if (part.type !== 'literal') values[part.type] = part.value
  }
  const hour = String(Number(values.hour) % 24).padStart(2, '0')
  return dayjs(`${values.year}-${values.month}-${values.day}T${hour}:${values.minute}:${values.second}`)
}

/** 当前时间：本地 useNow 每秒刷新（Date），包装为 dayjs 驱动整页时钟 */
const now = computed(() => dayjs(useNow({ interval: 1000 }).value))

/** 已选城市时区（持久化；默认：北京/东京/新加坡/悉尼/伦敦/巴黎/纽约/洛杉矶） */
const selectedTimeZones = ref<string[]>(loadSelected())

function loadSelected(): string[] {
  try {
    const raw = uni.getStorageSync(STORAGE_KEY)
    if (Array.isArray(raw) && raw.length) return raw as string[]
  } catch {
    // 读取失败时使用默认值
  }
  return ['Asia/Shanghai', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney', 'Europe/London', 'Europe/Paris', 'America/New_York', 'America/Los_Angeles']
}

function saveSelected() {
  try {
    uni.setStorageSync(STORAGE_KEY, selectedTimeZones.value)
  } catch {
    // 存储失败时静默忽略
  }
}

/** 本地时间展示串：HH:mm:ss（24 小时制） */
const localTimeText = computed(() => now.value.format('HH:mm:ss'))

/** 本地日期展示串：如 10月18日 */
const localDateText = computed(() => now.value.format('M月D日'))

/** 表盘指针角度 */
const hourAngle = computed(() => {
  const d = now.value
  return ((d.hour() % 12) + (d.minute() + d.second() / 60) / 60) * 30
})
const minuteAngle = computed(() => (now.value.minute() + now.value.second() / 60) * 6)
const secondAngle = computed(() => now.value.second() * 6)

/** 城市行集合：随每秒 tick 重算时间/日期/快慢时差 */
const cityRows = computed<CityRow[]>(() => {
  return selectedTimeZones.value.map((timeZone) => {
    const def = CITY_MAP[timeZone] ?? { name: timeZone, country: '' }
    const zone = toZoned(now.value, timeZone)
    return {
      ...def,
      timeZone,
      time: zone.format('HH:mm'),
      dateText: zone.format('M月D日'),
      diffText: getDiffText(getWallDiffMinutes(zone, now.value)),
    }
  })
})

/**
 * 计算城市墙钟相对本地墙钟的分钟差（相差天数折算 + 当日时刻差，跨换日线的城市也正确）
 * @param zone 城市侧时刻（dayjs.tz 转换后）
 * @param local 本机侧时刻
 */
function getWallDiffMinutes(zone: Dayjs, local: Dayjs) {
  const dayDiff = Math.round((zone.startOf('day').valueOf() - local.startOf('day').valueOf()) / DAY_MS)
  return dayDiff * 1440 + (zone.hour() * 60 + zone.minute() - (local.hour() * 60 + local.minute()))
}

/**
 * 时差展示串：城市比本地早为「快」、晚为「慢」；非整小时时差保留小数
 * @param diffMinutes 城市相对本地的分钟差
 */
function getDiffText(diffMinutes: number) {
  if (diffMinutes === 0) return '同时区'
  const hours = diffMinutes / 60
  return `${hours > 0 ? '快' : '慢'}${parseFloat(Math.abs(hours).toFixed(2))}小时`
}

async function onRemoveCity(row: CityRow) {
  if (selectedTimeZones.value.length <= 1) {
    TipModal.msg('至少保留一个城市')
    return
  }
  const { confirm } = await TipModal.confirm(`确定删除「${row.name}」吗？`)
  if (confirm) {
    selectedTimeZones.value = selectedTimeZones.value.filter((tz) => tz !== row.timeZone)
    saveSelected()
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

/* 模拟表盘 */
.analog-clock {
  position: relative;
  z-index: 20; /* 高于吸顶的数字时间区，避免其背景截断表盘阴影 */
  width: 500rpx;
  height: 500rpx;
  margin: 48rpx auto 0;
  border-radius: 50%;
  background: #323234;
  box-shadow: 0 24rpx 60rpx rgba(0, 0, 0, 0.28);
}

.tick {
  position: absolute;
  top: 12rpx;
  left: 50%;
  transform-origin: 50% 238rpx;
  border-radius: 4rpx;
}

.tick-major {
  width: 8rpx;
  height: 34rpx;
  margin-left: -4rpx;
  background: #fff;
}

.tick-minor {
  width: 4rpx;
  height: 18rpx;
  margin-left: -2rpx;
  background: rgba(255, 255, 255, 0.45);
}

.numeral {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 46rpx;
  font-weight: 600;
  color: #fff;
  line-height: 1;
}

.hand {
  position: absolute;
  left: 50%;
  border-radius: 12rpx;
}

.hand-hour {
  bottom: 50%;
  width: 16rpx;
  height: 140rpx;
  margin-left: -8rpx;
  background: #fff;
  transform-origin: 50% 100%;
}

.hand-minute {
  bottom: 50%;
  width: 12rpx;
  height: 195rpx;
  margin-left: -6rpx;
  background: #fff;
  transform-origin: 50% 100%;
}

.hand-second {
  bottom: calc(50% - 55rpx);
  width: 6rpx;
  height: 275rpx;
  margin-left: -3rpx;
  background: #3d6bf4;
  transform-origin: 50% 220rpx;
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36rpx;
  height: 36rpx;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-dot-inner {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #3d6bf4;
}

/* 数字时间（吸顶区） */
.digital-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding-top: 44rpx;
  padding-bottom: 16rpx;
  background: #f2f2f2;
}

.digital-time {
  display: block;
  text-align: center;
  font-size: 72rpx;
  font-weight: 600;
  color: #000;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2rpx;
  line-height: 1.2;
}

.digital-sub {
  display: block;
  margin-top: 10rpx;
  text-align: center;
  font-size: 28rpx;
  color: #8f8f94;
}

/* 城市列表 */
.city-list {
  margin-top: 56rpx;
  padding: 0 24rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.city-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36rpx 36rpx;
  border-radius: 32rpx;
  background: #fff;
}

.city-left {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.city-name {
  font-size: 34rpx;
  font-weight: 600;
  color: #000;
}

.city-meta {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #8f8f94;
}

.meta-divider {
  margin: 0 8rpx;
  color: #d0d0d0;
}

.city-time {
  font-size: 60rpx;
  font-weight: 600;
  color: #000;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
</style>
