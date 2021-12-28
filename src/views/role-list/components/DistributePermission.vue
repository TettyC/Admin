<script setup>
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { ref, defineProps, defineEmits, watch } from 'vue'

import { watchSwitchLang } from '@/utils/i18n'
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 所有权限
const allPermission = ref([])
const defaultProps = {
  label: 'permissionName',
  children: 'children'
}
const getPermission = async () => {
  allPermission.value = await permissionList()
}
getPermission()
watchSwitchLang(getPermission)

const treeRef = ref(null)
// 当前角色权限
const getRolePermission = async () => {
  const checkedKey = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKey)
}
watch(
  () => props.roleId,
  (val) => {
    if (val) {
      getRolePermission()
    }
  }
)

const i18n = useI18n()
// 取消按钮
const closed = () => {
  emits('update:modelValue', false)
}
// 确定按钮
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

  closed()
}
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    :title="$t('msg.role.assignPermissions')"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    />

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
