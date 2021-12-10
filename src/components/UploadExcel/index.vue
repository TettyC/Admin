<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { UploadFilled } from '@element-plus/icons'
import { getHeaderRow, isExcel } from './utils'
import { ElMessage } from 'element-plus'
const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

const loading = ref(false)
const excelUploadInput = ref(null)

const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) {
    return
  }
  upload(rawFile)
}

// 拖拽上传事件
const handleDrop = (e) => {
  if (loading.value) {
    return
  }
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须上传一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('必须是.xlsx、.xls、.csv格式的文件')
    return
  }
  upload(rawFile)
}

const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

// 点击上传事件
const upload = (file) => {
  excelUploadInput.value.value = null

  if (!props.beforeUpload) {
    parseData(file)
    return
  }

  const before = props.beforeUpload(file)
  if (before) {
    parseData(file)
  }
}

// 解析excel文件数据
const parseData = (file) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 读取操作完成时触发
    reader.onload = (e) => {
      // 获取数据
      const data = e.target.result
      // XLSX对数据解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 读取第一张表格名称
      const firstSheetName = workbook.SheetNames[0]
      // 读取第一张表格数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 解析数据表头
      const header = getHeaderRow(workSheet)
      // 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 传入解析后的数据
      generateData({ header, results })
      // 处理loading
      loading.value = false
      // 成功回调
      resolve()
    }

    reader.readAsArrayBuffer(file)
  })
}

// 根据导入内容，生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>
    <input
      class="excel-upload-input"
      ref="excelUploadInput"
      type="file"
      accept=".xlsx,.xls"
      @change="handleChange"
    />

    <!-- 拖拽 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <el-icon>
        <UploadFilled />
      </el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    :deep(.el-icon) {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
