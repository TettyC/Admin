<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
import SvgIcon from '../SvgIcon/index.vue'

// 是否全屏
const isFullscreen = ref(false)

const onToggle = () => {
  screenfull.toggle()
}

// 监听screenfull 的变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// on:绑定监听
onMounted(() => {
  screenfull.on('change', change)
})

// off:取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.screenfull')">
      <SvgIcon
        id="guide-full"
        :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="onToggle"
      ></SvgIcon
    ></el-tooltip>
  </div>
</template>

<style lang="scss" scoped></style>
