<script setup>
import { filterRoutes, generateMenus } from '@/utils/route'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})

// 默认激活
const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<template>
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.subMenuActiveText"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<style lang="scss" scoped></style>
