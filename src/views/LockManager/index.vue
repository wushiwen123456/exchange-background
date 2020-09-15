<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>锁仓管理</el-breadcrumb-item>
      <el-breadcrumb-item>锁仓配置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button
            icon="el-icon-edit"
            style="margin-right:15px"
            type="primary"
            @click="handleAdd"
          >添加</el-button>
          <el-select
            v-model="listQuery.coin"
            style="width:120px"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="item in coinList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column align="center" width="55" label="ID" prop="id"></el-table-column>
        <el-table-column label="锁仓币种" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.coin | capitalizeUpperCase}}</div>
          </template>
        </el-table-column>
        <el-table-column label="锁仓时间" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.time}} 天</div>
          </template>
        </el-table-column>
        <el-table-column label="利率" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.rate}} %</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.page"
          :page-sizes="[1, 3, 5, 7, 10]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <add-agency ref="addagency" @refresh="getList" />
  </div>
</template>

<script>
import { getLockManager, currencys, removeLockManager } from '@/api'
import AddAgency from './cpns/AddAgency'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    AddAgency,
  },
  data() {
    return {
      listQuery: {
        coin: 'all',
        page: 1,
        limit: 7,
      },
      list: [],
      total: 0,
      loading: true,
      dialogVisible: false,
      coinList: [
        {
          id: 1,
          name: '全部',
          value: 'all',
        },
      ],
    }
  },
  computed: {
    isFreeze() {
      return (status) => {
        return status == 1 ? '正常使用' : '已冻结'
      }
    },
  },
  created() {
    this.getList()
    this.getCurrencys()
  },
  methods: {
    //   获取所有币种
    getCurrencys() {
      currencys().then((res) => {
        if (res.code == 200) {
          const list = res.data.map((item, index) => {
            return {
              id: index + 1,
              name: item.toUpperCase(),
              value: item,
            }
          })
          list.unshift({
            id: 0,
            name: '全部',
            value: 'all',
          })
          this.coinList = list
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      this.loading = true
      getLockManager(this.listQuery).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    addAgency(row) {
      this.$refs.addagency.open(row)
    },
    // 删除
    handleRemove(id) {
      this.$confirm('是否删除此项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeLockManager({ id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.getList()
            }
          })
        })
        .catch(() => {})
    },
    // 编辑
    handleEdit(row) {
      this.$refs.addagency.open(row)
    },
    // 添加
    handleAdd() {
      this.$refs.addagency.open(null)
    },
    handleQuery() {
      this.listQuery.page = 1
      this.getList()
    },
    handleChange() {
      return this.getList()
    },
  },
}
</script>

<style scoped>
.flex-end {
  display: flex;
  justify-content: flex-end;
}
.el-card {
  height: 100%;
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-table-column {
  text-align: center;
}
.user-avatar {
  width: 60px;
  height: 60px;
}
.footer {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title-select {
  width: 60%;
}
.title-date {
  width: 140px;
}
.col {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.title-label {
  margin-right: 15px;
}
.title-input {
  flex: 1;
}
@media only screen and (max-width: 992px) {
  .title-label {
    width: 70px;
    text-align: right;
  }
  .query {
    justify-content: flex-end;
  }
}
</style>