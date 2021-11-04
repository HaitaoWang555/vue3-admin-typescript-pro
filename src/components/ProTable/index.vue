<script setup lang="ts">
import { computed, reactive, ref, watch, Ref } from 'vue'
import Pagination from '@/components/Pagination/index.vue' // secondary package based on el-pagination
import TableSetting from '@/components/ProTable/table-setting.vue' // TableSetting
import { useStore } from 'vuex'
import type { ProItem } from '@/components/type'
import { ProTableList, ResponseBodyType } from '@/types/api'
import { AxiosResponse } from 'axios'

const prop = defineProps({
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  queryParam: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as () => Record<string, any>,
    default: () => {
      return {}
    },
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  showSelection: {
    type: Boolean,
    default: false,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Function,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
  columns: {
    type: Array as () => Array<ProItem>,
    default: () => {
      return []
    },
  },
})

const ProElTable = ref()
const key = ref(0)
const list = ref()
const listLoading = ref(false)

const localPagination = reactive({
  total: 0,
  page: 1,
  pageSize: 20,
})
const tableColumns: Ref<Array<ProItem>> = ref([])

const store = useStore()

const device = computed(() => store.state.app.device)

function initColumns() {
  tableColumns.value = prop.columns
    .filter((i) => !i.noTable)
    .map((i) => {
      i.fieldVisible = true
      return i
    })
}

function loadData() {
  listLoading.value = true
  const result = prop.data(localPagination)
  // r.page, r.totalCount, r.data
  if (
    (typeof result === 'object' || typeof result === 'function') &&
    typeof result.then === 'function'
  ) {
    result
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((r: AxiosResponse<ResponseBodyType<ProTableList<any>>>) => {
        if (r.data.data.items.length === 0) {
          return null
        }
        list.value = r.data.data.items // Table Data
        localPagination.total = r.data.data.total || 0
      })
      .finally(() => {
        listLoading.value = false
      })
  }
}
function refresh(bool = false) {
  if (bool) {
    localPagination.page = 1
  }
  loadData()
}

function updateTable() {
  key.value = key.value += 1
}

if (!prop.lazyLoad) {
  initColumns()
  loadData()
}

watch(
  () => prop.lazyLoad,
  () => {
    if (!prop.lazyLoad) {
      initColumns()
      loadData()
    }
  }
)
</script>
<template>
  <div class="pro-table" :class="sticky ? 'sticky' : ''">
    <ProSearchForm
      :search-list="columns.filter((i) => i.isSearch)"
      :query-param="queryParam"
      :loading="listLoading"
      @search="refresh"
    ></ProSearchForm>
    <div class="table-operator">
      <div class="solt"><slot name="btn"></slot></div>
      <TableSetting
        v-model:columns="tableColumns"
        @refresh="refresh(true)"
        @reRender="updateTable"
      />
    </div>
    <el-table
      ref="ProElTable"
      :key="key"
      v-loading="listLoading"
      :data="list"
      v-bind="$attrs"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        :align="'center'"
        width="55"
      />
      <el-table-column
        v-if="showIndex"
        label="#"
        :align="'center'"
        type="index"
      />
      <el-table-column
        v-for="item in tableColumns.filter((i) => i.fieldVisible)"
        :key="item.dataIndex"
        :label="item.title"
        :min-width="item.minWidth"
        :width="item.width"
        :fixed="device === 'mobile' ? false : item.fixed"
        :align="item.align ? item.align : 'center'"
        :sortable="item.sortable || false"
        :prop="item.sortable ? item.dataIndex : ''"
      >
        <template #default="scope">
          <span v-if="!item.scopedSlots">{{ scope.row[item.dataIndex] }}</span>
          <span v-else-if="item.scopedSlots.customRender === 'date'">
            {{ $filters.parseTime(scope.row[item.dataIndex]) }}
          </span>
          <slot
            v-else
            :name="item.scopedSlots.customRender"
            :row="scope.row"
            :index="scope.$index"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="showPagination && localPagination.total"
      v-model:page="localPagination.page"
      v-model:pageSize="localPagination.pageSize"
      :total="localPagination.total"
      @pagination="loadData"
    />
  </div>
</template>
