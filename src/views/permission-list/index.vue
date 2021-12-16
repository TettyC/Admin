<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const tableData = ref([])
const getPermissionList = async () => {
  tableData.value = await permissionList()
}
getPermissionList()
watchSwitchLang(getPermissionList)
</script>

<template>
  <el-card>
    <el-table
      :data="tableData"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      stripe
      default-expand-all
    >
      <el-table-column
        prop="permissionName"
        :label="$t('msg.permission.name')"
      />
      <el-table-column
        prop="permissionMark"
        :label="$t('msg.permission.mark')"
      />
      <el-table-column
        prop="permissionDesc"
        :label="$t('msg.permission.desc')"
      />
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
