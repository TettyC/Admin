<script setup>
import { ref, watch } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import DistributePermission from './components/DistributePermission.vue'

const tableData = ref([])
const getRoleList = async () => {
  tableData.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const visible = ref(false)
const selectRoleId = ref('')
const onDistributePermissionClick = (row) => {
  visible.value = true
  selectRoleId.value = row.id
}
watch(visible, (val) => {
  if (!val) {
    selectRoleId.value = ''
  }
})
</script>

<template>
  <el-card>
    <el-table :data="tableData" stripe border>
      <el-table-column type="index" :label="$t('msg.role.index')" width="180" />
      <el-table-column prop="title" :label="$t('msg.role.name')" />
      <el-table-column prop="describe" :label="$t('msg.role.desc')" />
      <el-table-column :label="$t('msg.role.action')">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
            >{{ $t('msg.role.assignPermissions') }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <DistributePermission
      v-model="visible"
      :roleId="selectRoleId"
    ></DistributePermission>
  </el-card>
</template>

<style lang="scss" scoped></style>
