
<template>
  <div class="ml20 mt20 mr20 flex-row flex-align-center flex-justify-between">
    <div class="flex-row">
      <a-button type="primary" @click="sVisible = true">
        点击上传
      </a-button>
      <a-modal :visible="sVisible"
         title="上传固件"
         :closable="false"
         @cancel="onCancel"
         @ok="uploadFile"
         okText="确定"
         cancelText="取消"
         centered>
         <a-form :rules="rules" ref="formRef" :model="uploadParam" :label-col="{ span: 6 }">
          <a-form-item name="status" label="可用" required>
            <a-switch v-model:checked="uploadParam.status" />
          </a-form-item>
          <a-form-item name="device_name" label="设备名称" required>
            <a-select
              style="width: 220px"
              mode="multiple"
              placeholder="可以多选"
              v-model:value="uploadParam.device_name">
              <a-select-option
                v-for="k in DeviceNameEnum"
                :key="k"
                :value="k"
              >
                {{ k }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="release_note" label="发布说明" required>
            <a-textarea v-model:value="uploadParam.release_note" showCount :maxlength="300" />
          </a-form-item>
          <a-form-item label="固件" required>
            <a-upload
              :multiple="false"
              :before-upload="beforeUpload"
              :show-upload-list="true"
              :file-list="fileList"
              :remove="removeFile"
             >
              <a-button type="primary">
                <UploadOutlined />
                上传固件
              </a-button>
            </a-upload>
          </a-form-item>
         </a-form>
      </a-modal>
    </div>
    <div class="flex-row">
      <div class="ml5">
        <a-select
          style="width: 150px"
          v-model:value="param.firmware_status"
          @select="getAllFirmwares(pageParam)">
          <a-select-option
            v-for="(key, value) in FirmwareStatusEnum"
            :key="key"
            :value="value"
          >
            {{ key }}
          </a-select-option>
        </a-select>
      </div>
      <div class="ml5">
        <a-select
          style="width: 150px"
          v-model:value="param.device_name"
          @select="getAllFirmwares(pageParam)">
          <a-select-option
            v-for="item in deviceNameList"
            :key="item.label"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div class="ml5">
        <a-input-search
          :enter-button="true"
          v-model:value="param.product_version"
          placeholder="输入搜索版本"
          style="width: 250px"
          @search="getAllFirmwares(pageParam)"/>
      </div>
    </div>
  </div>
  <div class="table flex-display flex-column">
    <a-table :columns="columns" :data-source="data.firmware" :pagination="paginationProp" @change="refreshData" row-key="firmware_id"
    :rowClassName="(record, index) => ((index % 2) === 0 ? 'table-striped' : null)" :scroll="{ x: '100%', y: 600 }">
      <template #device_name="{ record }">
        <div v-for="text in record.device_name" :key="text">
          {{ text }}
        </div>
      </template>
      <template #file_size="{ record }">
        <div>{{ bytesToSize(record.file_size) }}</div>
      </template>
      <template #firmware_status="{ record }">
        <DeviceFirmwareStatus :firmware="record" />
      </template>
      <template v-for="col in ['file_name', 'release_note']" #[col]="{ text }" :key="col">
        <a-tooltip :title="text">
            <span>{{ text }}</span>
        </a-tooltip>
      </template>

    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { message, notification, PaginationProps } from 'ant-design-vue'
import { TableState } from 'ant-design-vue/lib/table/interface'
import { onMounted, reactive, Ref, ref, UnwrapRef } from 'vue'
import { IPage } from '/@/api/http/type'
import { getFirmwares, importFirmareFile } from '/@/api/manage'
import DeviceFirmwareStatus from '/@/components/devices/DeviceFirmwareStatus.vue'
import { ELocalStorageKey } from '/@/types'
import { UploadOutlined } from '@ant-design/icons-vue'
import { Firmware, FirmwareQueryParam, FirmwareStatusEnum, DeviceNameEnum, FirmwareUploadParam } from '/@/types/device-firmware'
import { commonColor } from '/@/utils/color'
import { bytesToSize } from '/@/utils/bytes'
import moment from 'moment'

interface FirmwareData {
  firmware: Firmware[]
}
const columns = [
  { title: '设备', dataIndex: 'device_name', width: 120, ellipsis: true, className: 'titleStyle', slots: { customRender: 'device_name' } },
  { title: '固件名称', dataIndex: 'file_name', width: 220, ellipsis: true, className: 'titleStyle', slots: { customRender: 'file_name' } },
  { title: '固件版本', dataIndex: 'product_version', width: 180, className: 'titleStyle' },
  { title: '固件大小', dataIndex: 'file_size', width: 150, className: 'titleStyle', slots: { customRender: 'file_size' } },
  { title: '创建人', dataIndex: 'username', width: 100, className: 'titleStyle' },
  { title: '发布日期', dataIndex: 'released_time', width: 160, sorter: (a: Firmware, b: Firmware) => a.released_time.localeCompare(b.released_time), className: 'titleStyle' },
  { title: '发布说明', dataIndex: 'release_note', width: 300, ellipsis: true, className: 'titleStyle', slots: { customRender: 'release_note' } },
  { title: '状态', dataIndex: 'firmware_status', width: 100, className: 'titleStyle', slots: { customRender: 'firmware_status' } },
]

const data = reactive<FirmwareData>({
  firmware: []
})

const paginationProp = reactive({
  pageSizeOptions: ['20', '50', '100'],
  showQuickJumper: true,
  showSizeChanger: true,
  pageSize: 50,
  current: 1,
  total: 0
})

const deviceNameList = ref<any[]>([{ label: '全部', value: '' }])

type Pagination = TableState['pagination']

const pageParam: IPage = {
  page: 1,
  total: 0,
  page_size: 50
}
const workspaceId: string = localStorage.getItem(ELocalStorageKey.WorkspaceId)!

const param = reactive<FirmwareQueryParam>({
  product_version: '',
  device_name: '',
  firmware_status: FirmwareStatusEnum.NONE
})

onMounted(() => {
  getAllFirmwares(pageParam)
  for (const key in DeviceNameEnum) {
    const value = DeviceNameEnum[key]
    deviceNameList.value.push({ label: value, value: value })
  }
})

function refreshData (page: Pagination) {
  pageParam.page = page?.current!
  pageParam.page_size = page?.pageSize!
  getAllFirmwares(pageParam)
}

function getAllFirmwares (page: IPage) {
  getFirmwares(workspaceId, page, param).then(res => {
    const firmwareList: Firmware[] = res.data.list
    data.firmware = firmwareList
    paginationProp.total = res.data.pagination.total
    paginationProp.current = res.data.pagination.page
  })
}

const sVisible = ref(false)
const uploadParam = reactive<FirmwareUploadParam>({
  device_name: [],
  release_note: '',
  status: true
})

const rules = {
  status: [{ required: true }],
  release_note: [{ required: true, message: '请输入发布说明。' }],
  device_name: [{ required: true, message: '请选择此固件所属的型号。' }]
}
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
const fileList = ref<FileItem[]>([])

function beforeUpload (file: FileItem) {
  if (!file.name || !file.name?.endsWith('.zip')) {
    message.error('格式错误。请选择 ZIP 文件。')
    return false
  }
  fileList.value = [file]
  return false
}

const formRef = ref()
function removeFile (file: FileItem) {
  fileList.value = []
}
function onCancel () {
  formRef.value.resetFields()
  fileList.value = []
  sVisible.value = false
}

const uploadFile = async () => {
  if (fileList.value.length === 0) {
    message.error('请至少选择一个文件。')
  }
  let uploading: string
  formRef.value.validate().then(async () => {
    const file: FileItem = fileList.value[0]
    const fileData = new FormData()
    fileData.append('file', file as any, file.name)
    Object.keys(uploadParam).forEach((key) => {
      const val = uploadParam[key as keyof FirmwareUploadParam]
      if (val instanceof Array) {
        val.forEach((value) => {
          fileData.append(key, value)
        })
      } else {
        fileData.append(key, val.toString())
      }
    })
    const timestamp = new Date().getTime()
    uploading = (file.name ?? 'uploding') + timestamp
    notification.open({
      key: uploading,
      message: `Uploading  ${moment().format()}`,
      description: `[${file.name}] 正在上传... `,
      duration: null
    })
    importFirmareFile(workspaceId, fileData).then((res) => {
      if (res.code === 0) {
        notification.success({
          message: `Uploaded  ${moment().format()}`,
          description: `[${file.name}]文件上传成功。耗时：${moment.duration(new Date().getTime() - timestamp).asSeconds()}秒`,
          duration: null
        })
        getAllFirmwares(pageParam)
      } else {
        notification.error({
          message: `上传 [${file.name}] 失败。请检查后重试。`,
          description: `Error message: ${res.message} ${moment().format()}`,
          style: { color: commonColor.FAIL },
          duration: null,
        })
      }
    }).finally(() => {
      notification.close(uploading)
    })
    fileList.value = []
    formRef.value.resetFields()
    sVisible.value = false
  })
}

</script>
<style>

.table {
    background-color: white;
    margin: 20px;
    padding: 20px;
    height: 88vh;
}
.table-striped {
  background-color: #f7f9fa;
}
.ant-table {
  border-top: 1px solid rgb(0,0,0,0.06);
  border-bottom: 1px solid rgb(0,0,0,0.06);
}
.ant-table-tbody tr td {
  border: 0;
}
.ant-table td {
  white-space: nowrap;
}
.ant-table-thead tr th {
  background: white !important;
  border: 0;
}
th.ant-table-selection-column {
  background-color: white !important;
}
.ant-table-header {
  background-color: white !important;
}
</style>
