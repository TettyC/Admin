<script setup>
import { formatData, USER_RELATIONS } from './utils'
import { userBatchImport } from '@/api/user-manage'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}

const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}

    Object.keys(item).forEach((key) => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatData(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })

    arr.push(userInfo)
  })

  return arr
}
</script>

<template>
  <UploadExcel :onSuccess="onSuccess"></UploadExcel>
</template>

<style lang="scss" scoped></style>
