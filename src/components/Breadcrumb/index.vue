<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const store = useStore()
const route = useRoute()
const router = useRouter()

// hover使用主题色
const linkHoverColor = ref(store.getters.cssVar.menuBg)
// 生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // 当前路由的标准化路由记录
  breadcrumbData.value = route.matched.filter((item) => item?.meta?.title)
}

// 路由跳转点击事件
const onLinkClick = (item) => {
  router.push(item.path)
}

// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <span v-else class="redirect" @click="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: v-bind(linkHoverColor);
    }
  }
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
