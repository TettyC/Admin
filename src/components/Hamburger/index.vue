<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '../SvgIcon/index.vue'

const store = useStore()
const icon = computed(() =>
  store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
)

const toggleClick = () => {
  store.commit('app/triggerSidebarOpened')
}
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <SvgIcon id="guide-hamburger" class="hamburger" :icon="icon"></SvgIcon>
  </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
