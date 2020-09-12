<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易管理</el-breadcrumb-item>
      <el-breadcrumb-item>市价交易</el-breadcrumb-item>
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
          <el-select v-model="listQuery.pair" class="title-select" placeholder="全部">
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
            v-model="listQuery.startTime"
            type="date"
            placeholder="开始日期"
          ></el-date-picker>
          <span style="margin:0 10px">-</span>
          <el-date-picker
            class="title-date"
            v-model="listQuery.endTime"
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
        <el-table-column type="index" align="center" width="55" label="#"></el-table-column>

        <el-table-column label="账号" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.email}}</div>
          </template>
        </el-table-column>

        <el-table-column label="订单号" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.order_id}}</div>
          </template>
        </el-table-column>

        <el-table-column label="币种" align="center" min-width="70">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.pair | capitalizeUpperCase}}</div>
          </template>
        </el-table-column>

        <el-table-column label="数量" align="center" prop="addTime" min-width="110">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.num}}</div>
          </template>
        </el-table-column>

        <el-table-column label="价格" align="center" prop="addTime" min-width="110">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.price}}</div>
          </template>
        </el-table-column>
        <el-table-column label="剩余数量" align="center" prop="addTime" min-width="110">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.surplus_num}}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.status == 0">待成交</el-tag>
            <el-tag type="success" v-else-if="scope.row.status == 1">已成交</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status == 2">已撤单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" min-width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 0">买入</el-tag>
            <el-tag type="danger" v-else-if="scope.row.type == 1">卖出</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="交易时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.creation_at | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column v-if="isRight == 1" label="操作" align="center" min-width="170">
          <template slot-scope="scope">
            <!-- <el-button
              v-if="scope.row.status == 0"
              type="primary"
              @click="handlePass(scope.row.id)"
              size="mini"
            >通过</el-button>-->
            <!-- <el-button v-if="scope.row.status != 0" type="info" size="mini">通过</el-button> -->
            <el-button
              v-if="scope.row.status == 0"
              type="warning"
              @click="handleCelcel(scope.row.id)"
              size="mini"
            >撤销</el-button>
            <el-button v-if="scope.row.status != 0" type="info" size="mini">撤销</el-button>
            <el-button
              type="danger"
              v-if="scope.row.status != 0"
              @click="handleRemove(scope.row.id)"
              size="mini"
            >删除</el-button>
            <el-button type="info" v-if="scope.row.status == 0" size="mini">删除</el-button>
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
import {
  currencys,
  platformOrderList,
  removeOrder,
  passOrder,
  refuseOrder,
} from '@/api'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  data() {
    return {
      listQuery: {
        email: '',
        pair: '',
        type: -1,
        status: -1,
        startTime: '',
        endTime: '',
        page: 1,
        limit: 7,
        is_deal_type: 1,
      },
      list: [],
      total: 0,
      statusList: [
        {
          id: 0,
          name: '全部',
          value: -1,
        },
        {
          id: 1,
          name: '待成交',
          value: 0,
        },
        {
          id: 2,
          name: '已成交',
          value: 1,
        },
        {
          id: 3,
          name: '已撤单',
          value: 2,
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
          value: -1,
        },
        {
          id: 1,
          name: '买入',
          value: 0,
        },
        {
          id: 2,
          name: '卖出',
          value: 1,
        },
      ],
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['isRight']),
  },
  created() {
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
      if (data.startTime) {
        data.startTime = (new Date(data.startTime) / 1000).toFixed(0)
      }
      if (data.endTime) {
        data.endTime = (new Date(data.endTime) / 1000).toFixed(0)
      }
      platformOrderList(data).then((res) => {
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
    // 撤销
    handleCelcel(id) {
      refuseOrder({ id }).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.getList()
        }
      })
    },
    // 删除
    handleRemove(id) {
      this.$confirm('是否删除此订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeOrder({ id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.getList()
            }
          })
        })
        .catch((err) => err)
    },
    // 交易通过
    handlePass(id) {
      passOrder({ id }).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
          this.getList()
        }
      })
    },
    // 点击查询
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