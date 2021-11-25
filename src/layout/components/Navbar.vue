<script setup>
import { Setting } from '@element-plus/icons'
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container" triggle="click">
        <div class="avatar-wrapper">
          <el-avatar
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <el-icon>
            <Setting />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a
              target="__blank"
              href="https://coding.imooc.com/class/542.html#Prchor"
            >
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, $alpha: 0.08);

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
