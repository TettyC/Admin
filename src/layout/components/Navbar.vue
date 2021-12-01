<script setup>
import { Setting } from '@element-plus/icons'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/langSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<template>
  <div class="navbar">
    <Hamburger class="hamburger" />
    <Breadcrumb class="breadcrumb" />

    <div class="right-menu">
      <HeaderSearch class="right-menu-item"></HeaderSearch>
      <Screenfull class="right-menu-item"></Screenfull>
      <ThemeSelect class="right-menu-item"></ThemeSelect>
      <LangSelect class="right-menu-item"></LangSelect>
      <!-- 头像 -->
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
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="https://coding.imooc.com/class/542.html">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
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

  .hamburger {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &:hover {
        cursor: pointer;
      }
    }

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
