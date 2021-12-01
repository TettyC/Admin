<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const store = useStore()
// 刷新
const onRefresh = () => {
  router.go(0)
}
// 关闭右侧所有item
const onCloseRight = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
}
// 关闭其他所有item
const onCloseOther = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}
</script>

<template>
  <div class="container">
    <ul>
      <li @click="onRefresh">{{ $t('msg.tagsView.refresh') }}</li>
      <li @click="onCloseRight">{{ $t('msg.tagsView.closeRight') }}</li>
      <li @click="onCloseOther">{{ $t('msg.tagsView.closeOther') }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: fixed;
  background: #fff;
  z-index: 1000;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba($color: #000000, $alpha: 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    list-style: none;
    &:hover {
      background: #eee;
    }
  }
}
</style>
