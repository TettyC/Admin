<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { validatePassword } from './rules'
import LangSelect from '@/components/langSelect/index.vue'
import { useI18n } from 'vue-i18n'
// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const i18n = useI18n()
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 处理密码框文本显示
const passwordType = ref('password')
const onChangePasswordType = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}

// 处理登录
const loading = ref(false)
const store = useStore()
const loginFormRef = ref(null)
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch((err) => {
        loading.value = false
        console.log(err)
      })
  })
}
</script>

<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" />
      </div>

      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user"></SvgIcon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password"></SvgIcon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        ></el-input>
        <span class="show-password">
          <span class="svg-container" @click="onChangePasswordType">
            <SvgIcon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            ></SvgIcon>
          </span>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #899aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }

    .tips {
      color: #fff;
      font-size: 16px;
      line-height: 20px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: #fff;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-password {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
