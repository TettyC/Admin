<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Close } from '@element-plus/icons'
import ContextMenu from './ContextMenu.vue'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

// 是否选中
const isActive = (tag) => tag.path === route.path

// 关闭tag的点击事件
const onClose = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index
  })
}

// 鼠标右键打开菜单
const visible = ref(false)
const selectedIndex = ref(0)
const menuStyle = ref({
  left: 0,
  top: 0
})
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.value.left = x + 'px'
  menuStyle.value.top = y + 'px'
  selectedIndex.value = index

  visible.value = true
}

// 关闭菜单
const closeMenu = () => {
  visible.value = false
}

// 监听visible
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<template>
  <div class="tags-view-container">
    <router-link
      v-for="(item, index) in $store.getters.tagsViewList"
      :key="item.fullPath"
      class="tags-view-item"
      :class="isActive(item) ? 'active' : ''"
      :to="{ path: item.fullPath }"
      :style="{
        backgroundColor: isActive(item) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(item) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ item.title }}
      <el-icon
        class="close"
        v-show="!isActive(item)"
        @click.prevent.stop="onClose(index)"
      >
        <Close />
      </el-icon>
    </router-link>
    <ContextMenu
      v-show="visible"
      :style="menuStyle"
      :index="selectedIndex"
    ></ContextMenu>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    .close {
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 10px;
      vertical-align: -4px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &::before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
