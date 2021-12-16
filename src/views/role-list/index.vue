<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'

const tableData = ref([])
const getRoleList = async () => {
  tableData.value = await roleList()
  console.log(tableData.value)
}
getRoleList()
watchSwitchLang(getRoleList)
</script>

<template>
  <el-card>
    <el-table :data="tableData" stripe border>
      <el-table-column type="index" :label="$t('msg.role.index')" width="180" />
      <el-table-column prop="title" :label="$t('msg.role.name')" />
      <el-table-column prop="describe" :label="$t('msg.role.desc')" />
      <el-table-column :label="$t('msg.role.action')">
        <el-button type="primary">{{
          $t('msg.role.assignPermissions')
        }}</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
