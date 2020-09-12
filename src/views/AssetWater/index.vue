<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资产管理</el-breadcrumb-item>
      <el-breadcrumb-item>资产列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4.5">
          <span style="margin-right:15px">账号查询</span>
          <el-input v-model="listQuery.email" class="title-input" placeholder="用户账号"></el-input>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">币种</span>
          <el-select v-model="listQuery.coin" class="title-select" placeholder="全部">
            <el-option
              v-for="item in pairList"
              :key="item.id"
              :label="item.name | capitalizeUpperCase"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">类型</span>
          <el-select v-model="listQuery.type" class="title-select" placeholder="全部">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">状态</span>
          <el-select v-model="listQuery.status" class="title-select" placeholder="全部">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6.5">
          <span style="margin-right:15px">时间搜索</span>
          <el-date-picker
            class="title-date"
            v-model="listQuery.begin_at"
            type="date"
            placeholder="开始日期"
          ></el-date-picker>
          <span style="margin:0 10px">-</span>
          <el-date-picker
            class="title-date"
            v-model="listQuery.end_at"
            type="date"
            placeholder="结束日期"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="handleQuery">查询</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column align="center" width="55" label="ID" prop="id"></el-table-column>

        <el-table-column label="账号" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.email}}</div>
          </template>
        </el-table-column>

        <el-table-column label="币种" align="center" min-width="80">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.symbol | capitalizeUpperCase}}</div>
          </template>
        </el-table-column>

        <el-table-column label="钱包地址" align="center" min-width="170">
          <template slot-scope="scope">
            <div>{{scope.row.address}}</div>
          </template>
        </el-table-column>

        <el-table-column label="数量" align="center" prop="addTime" min-width="140">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.amount}}</div>
          </template>
        </el-table-column>

         <el-table-column label="估值" align="center" prop="addTime" min-width="140">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.probably}}</div>
          </template>
        </el-table-column>

        <el-table-column label="类型" align="center" prop="addTime" min-width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 0">充币</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type == 1">提币</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" min-width="80">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status == 1">等待中</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 2">已取消</el-tag>
            <el-tag type="success" v-if="scope.row.status == 3">已完成</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 4">申请中</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 5">已支付</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status == 6">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.created_at | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="isRight == 1" label="操作" align="center" min-width="170">
          <template slot-scope="scope">
            <div v-if="orderStatus(scope.row)">
              <el-button type="success" @click="handlePass(scope.row.id)" size="mini">通过</el-button>
              <el-button type="warning" @click="handleRefuse(scope.row.id)" size="mini">拒绝</el-button>
            </div>
            <div v-else>
              <el-button type="info" size="mini">通过</el-button>
              <el-button type="info" size="mini">拒绝</el-button>
            </div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currencys, getAssetsList, AssetsOpera } from '@/api'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return (val && val.toUpperCase()) || val
    },
  },
  data() {
    return {
      listQuery: {
        email: '',
        coin: '',
        type: '',
        status: '',
        begin_at: '',
        end_at: '',
        page: 1,
        limit: 7,
      },
      list: [],
      total: 0,
      statusList: [
        {
          id: 0,
          name: '全部',
          value: '',
        },
        {
          id: 1,
          name: '申请中',
          value: 4,
        },
        {
          id: 2,
          name: '已支付',
          value: 5,
        },
        {
          id: 3,
          name: '已拒绝',
          value: 6,
        },
      ],
      pairList: [
        {
          id: 0,
          name: '全部',
          value: '',
        },
      ],
      typeList: [
        {
          id: 0,
          name: '全部',
          value: '',
        },
        {
          id: 1,
          name: '充币',
          value: 1,
        },
        {
          id: 2,
          name: '提币',
          value: 2,
        },
      ],
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['isRight']),
    orderStatus() {
      return (row) => {
        return row.type == 1 && row.status == 4
      }
    },
  },
  created() {
    const query = this.$route.query
    if (query.email) this.listQuery.email = query.email
    if (query.pair) this.listQuery.coin = query.pair
    this.getList()
    this.getCurrencys()
  },
  methods: {
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
      const data = Object.assign({}, this.listQuery)
      if (data.begin_at) {
        data.begin_at = (new Date(data.begin_at).getTime() / 1000).toFixed(0)
      }
      if (data.end_at) {
        data.end_at = (new Date(data.end_at).getTime() / 1000).toFixed(0)
      }
      getAssetsList(data).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 获取所有币种
    getCurrencys() {
      currencys().then((res) => {
        if (res.code == 200) {
          const list = res.data
          const pairList = list.map((item, index) => {
            return {
              id: index + 1,
              name: item,
              value: item,
            }
          })
          pairList.unshift({
            id: 0,
            name: '全部',
            value: '',
          })
          this.pairList = pairList
        }
      })
    },
    handlePass(id) {
      const data = {
        id,
        type: 1,
      }
      AssetsOpera(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.getList()
        }
      })
    },
    handleRefuse(id) {
      const data = {
        id,
        type: 0,
      }
      AssetsOpera(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.getList()
        }
      })
    },
    handleQuery() {
      this.listQuery.page = 1
      this.getList()
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
.title-input {
  width: 220px;
}
.title-select {
  width: 120px;
}
.title-date {
  width: 140px;
}
</style>