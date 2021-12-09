<script setup>
import { ref, onActivated } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Export2Excel from './components/Export2Excel.vue'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据
const getListData = async () => {
  const res = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = res.list
  total.value = res.total
}

getListData()
watchSwitchLang(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// excel 导入按钮点击事件
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

// excel 导出按钮点击事件
const exportToExcelVisible = ref(false)
const onToExcel = () => {
  exportToExcelVisible.value = true
}

// 查看按钮 点击事件
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

// 删除用户
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    console.log(row)
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}

onActivated(getListData)
</script>

<template>
  <div class="container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">{{
          $t('msg.excel.importExcel')
        }}</el-button>
        <el-button type="success" @click="onToExcel">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <el-card class="content">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="#" />
        <el-table-column prop="username" :label="$t('msg.excel.name')" />
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')" />
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row?.role?.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="onShowClick(row._id)"
              >{{ $t('msg.excel.show') }}</el-button
            >
            <el-button type="info" size="mini">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{
              $t('msg.excel.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :total="total"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        :current-page="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>

    <export2-excel v-model="exportToExcelVisible"></export2-excel>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  .content {
    ::v-deep .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    ::v-deep .el-tag {
      margin-right: 6px;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
