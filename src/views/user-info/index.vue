<script setup>
import { ref, defineProps } from 'vue'
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const userDetailData = ref({})
const getUserDetail = async () => {
  userDetailData.value = await userDetail(props.id)
  console.log(userDetailData.value)
}
getUserDetail()
watchSwitchLang(getUserDetail)

// 局部打印
const printLoading = ref(false)
const printObj = {
  id: 'userInfo',
  popTitle: 'TettyC',
  beforeOpenCallback() {
    printLoading.value = true
  },
  openCallback() {
    printLoading.value = false
  }
}
</script>

<template>
  <el-card class="print">
    <el-button type="primary" :loading="printLoading" v-print="printObj">{{
      $t('msg.userInfo.print')
    }}</el-button>
  </el-card>
  <el-card>
    <div class="userInfo" id="userInfo">
      <!-- 标题 -->
      <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
      <!-- 头部 -->
      <div class="header">
        <!-- 头部表格 -->
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="$t('msg.userInfo.name')">
            {{ userDetailData.username }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.sex')">
            {{ userDetailData.gender }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.nation')">
            {{ userDetailData.nationality }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.mobile')">
            {{ userDetailData.mobile }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.province')">
            {{ userDetailData.province }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.date')">
            {{ $filters.dateFilter(userDetailData.openTime) }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
            <el-tag
              class="remark"
              v-for="(item, index) in userDetailData.remark"
              :key="index"
            >
              {{ item }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
            {{ userDetailData.address }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 头像 -->
        <el-image class="avatar" :src="userDetailData.avatar"></el-image>
      </div>
      <!-- 内容 -->
      <div class="content">
        <el-descriptions :column="1" direction="vertical" border>
          <el-descriptions-item :label="$t('msg.userInfo.experience')">
            <ul>
              <li
                v-for="(item, index) in userDetailData.experience"
                :key="index"
              >
                <span>
                  {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                  ----
                  {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}
                </span>
                <span>{{ item.title }}</span>
                <span>{{ item.desc }}</span>
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.major')">
            {{ userDetailData.major }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.userInfo.glory')">
            {{ userDetailData.glory }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 底部 -->
      <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.print {
  margin-bottom: 20px;
  text-align: right;
}
.userInfo {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    :deep(.el-descriptions) {
      flex-grow: 1;
    }
    .avatar {
      width: 220px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .content {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
