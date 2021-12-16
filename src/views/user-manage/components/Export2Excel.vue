<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filters'

const emits = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

// 导出文件名
const i18n = useI18n()
const excelName = ref(i18n.t('msg.excel.defaultName'))
watchSwitchLang(() => {
  excelName.value = i18n.t('msg.excel.defaultName')
})

// 关闭
const closed = () => {
  emits('update:modelValue', false)
}

// 确定导出
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 获取数据
  const { list: allUserList } = await getUserManageAllList()
  // 导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUserList)
  excel.export_json_to_excel({
    header: Object.keys(USER_RELATIONS),
    data,
    filename: excelName.value
  })
  closed()
}

const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 'role' 需要特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      // 时间
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" :loading="loading" @click="onConfirm">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
