<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
</script>

<template>
  <div class="container">
    <div class="header">
      <PanThumb
        image="https://img2.sycdn.imooc.com/5e699b920001eb8d06400426.jpg"
        height="60px"
        width="60px"
      >
        {{ $t('msg.profile.name') }}
      </PanThumb>
      <div class="header-desc">
        <h3>
          {{ $t('msg.profile.name') }}
        </h3>
        <span>
          {{ $t('msg.profile.job') }}
        </span>
      </div>
    </div>
    <div class="info">
      {{ $t('msg.profile.Introduction') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 6px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
