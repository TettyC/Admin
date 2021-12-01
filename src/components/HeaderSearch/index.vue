<script setup>
import Fuse from 'fuse.js'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './fuseData'
import { watchSwitchLang } from '@/utils/i18n'

// 检索数据源
const router = useRouter()
let searchPool = computed(() => {
  const filterRoute = filterRoutes(router.getRoutes())
  return generateRoutes(filterRoute)
})

// 搜索库相关
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    // 是否按优先级排序
    shouldSort: true,
    // 匹配长度
    minMatchCharLength: 1,
    // 被搜索的列表
    keys: [
      {
        // 搜索的key
        name: 'title',
        // 权重
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 控制 search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

// search相关
const search = ref('')

// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  query === ''
    ? (searchOptions.value = [])
    : (searchOptions.value = fuse.search(query))
}
// 选中回调
const onSelectChange = (value) => {
  router.push(value.path)
}

// 关闭search时处理事件
const searchSelectRef = ref(null)
const onClose = () => {
  searchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

// 监听search打开，处理close事件
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

watchSwitchLang(() => {
  searchPool = computed(() => {
    const filterRoute = filterRoutes(router.getRoutes())
    return generateRoutes(filterRoute)
  })
  initFuse(searchPool.value)
})
</script>

<template>
  <div class="header-search" :class="{ show: isShow }">
    <el-tooltip :content="$t('msg.navBar.headerSearch')">
      <SvgIcon
        id="guide-search"
        class="search-icon"
        icon="search"
        @click.stop="onShowClick"
      ></SvgIcon>
    </el-tooltip>
    <el-select
      ref="searchSelectRef"
      class="search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :placeholder="$t('msg.guide.searchTitle')"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
