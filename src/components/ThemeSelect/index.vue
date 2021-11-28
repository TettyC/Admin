<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref } from 'vue-demi'
import SelectColor from './components/SelectColor.vue'

// dialog
const selectColorVisible = ref(false)

const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>

<template>
  <el-dropdown
    v-bind="$attrs"
    class="theme"
    trigger="click"
    @command="handleSetTheme"
  >
    <!-- 图标 -->
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <SvgIcon icon="change-theme"></SvgIcon>
    </el-tooltip>
    <!-- menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">{{
          $t('msg.theme.themeColorChange')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <!-- 弹出层 -->
    <SelectColor v-model="selectColorVisible"></SelectColor>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
