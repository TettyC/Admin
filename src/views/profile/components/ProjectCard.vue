<script setup>
import { defineProps } from 'vue'
import PanThumb from '@/components/PanThumb/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <el-card class="user-container">
    <template #header>
      <span>{{ $t('msg.profile.introduce') }}</span>
    </template>

    <div class="user-profile">
      <!-- 头像 -->
      <div class="box-center">
        <PanThumb
          :image="$store.getters.userInfo.avatar"
          height="100px"
          width="100px"
        >
          <p>{{ $t('msg.profile.welcome') }}</p>
          {{ $store.getters.userInfo.title }}
        </PanThumb>
      </div>

      <!-- 姓名和角色 -->
      <div class="box-center">
        <div class="user-name text-center">
          {{ $store.getters.userInfo.username }}
        </div>
        <div class="user-role text-center text-muted">
          {{ $store.getters.userInfo.title }}
        </div>
      </div>
    </div>

    <!-- 简介 -->
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <SvgIcon icon="introduce" class="svg-icon"></SvgIcon>
          <span>{{ $t('msg.profile.projectIntroduction') }}</span>
        </div>
        <div class="project-bio-section-content">
          <div class="text-muted">
            {{ $t('msg.profile.muted') }}
          </div>
        </div>
      </div>
      <!-- 功能 -->
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <SvgIcon icon="reward" class="svg-icon"></SvgIcon>
          <span>{{ $t('msg.profile.projectFunction') }}</span>
        </div>
        <div class="project-bio-section-content">
          <div class="progress-item" v-for="item in features" :key="item.id">
            <p>{{ item.title }}</p>
            <el-progress
              status="success"
              :percentage="item.percentage"
            ></el-progress>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }
  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }
    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
    .box-center {
      padding-top: 10px;
    }
  }
  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }
    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe5ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
        .svg-icon {
          display: inline-block;
        }
      }
      .project-bio-section-content {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
