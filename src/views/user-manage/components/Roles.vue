<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

import { roleList } from '@/api/role'
import { userRoles, updateRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])

// 所有角色
const allRoleList = ref([])
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 当前用户角色
const currentUserRoleList = ref([])
const getUserRoles = async () => {
  const { role } = await userRoles(props.userId)
  currentUserRoleList.value = role.map((item) => item.title)
}
watch(
  () => props.userId,
  (val) => {
    if (val) {
      getUserRoles()
    }
  }
)

// 取消按钮
const i18n = useI18n()
const closed = () => {
  emits('update:modelValue', false)
}
// 确定按钮
const onConfirm = async () => {
  const roles = currentUserRoleList.value.map((title) =>
    allRoleList.value.find((role) => role.title === title)
  )

  await updateRoles(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  // 角色更新成功
  emits('updateRole')

  closed()
}
</script>

<template>
  <el-dialog :model-value="modelValue" :title="$t('msg.excel.roleDialogTitle')">
    <el-checkbox-group v-model="currentUserRoleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      />
    </el-checkbox-group>

    <template #footer>
      <div class="dialog-footer">
        <!-- 取消按钮 -->
        <el-button @click="closed">
          {{ $t('msg.universal.cancel') }}
        </el-button>
        <!-- 确定按钮 -->
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
