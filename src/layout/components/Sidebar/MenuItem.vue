<script setup>
import { defineProps } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- element icon -->
  <!-- TODO 此种方式暂时无效，待改进 -->
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <!-- 非element icon -->
  <SvgIcon v-else :icon="icon"></SvgIcon>
  <!-- 文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<style lang="scss" scoped></style>
