<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易机器人</el-breadcrumb-item>
      <el-breadcrumb-item>机器人订单</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4.5">
          <span style="margin-right:15px">订单类型</span>
          <el-select v-model="listQuery.type" class="title-select" placeholder="全部">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="getList">查询</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column align="center" width="55" label="ID" prop="id"></el-table-column>

        <el-table-column label="订单号" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.order_id}}</div>
          </template>
        </el-table-column>

        <el-table-column label="币种" align="center" min-width="70">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.currency | capitalizeUpperCase}}</div>
          </template>
        </el-table-column>

        <el-table-column label="市场价" align="center" min-width="70">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.market_price}}</div>
          </template>
        </el-table-column>

        <el-table-column label="订单价" align="center" min-width="70">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.order_price}}</div>
          </template>
        </el-table-column>

        <el-table-column label="订单数量" align="center" prop="addTime" min-width="110">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.order_num}}</div>
          </template>
        </el-table-column>

        <el-table-column label="订单类型" align="center" prop="addTime" min-width="110">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == 0">限价买单</el-tag>
            <el-tag type="warning" v-if="scope.row.type == 1">限价卖单</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag type="success">成功</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="更新时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.creation_at | capitalizeTime}}</div>
          </template>
        </el-table-column>

        <el-table-column label="失败原因" align="center" min-width="120">
          <template slot-scope="scope">
            <div></div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" min-width="170"></el-table-column>
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
import { robotOrder } from '@/api'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  data() {
    return {
      listQuery: {
        type: '',
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
          name: '成功',
          value: 1,
        },
        {
          id: 2,
          name: '失败',
          value: 2,
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
          name: '限价买单',
          value: 0,
        },
        {
          id: 2,
          name: '限价卖单',
          value: 1,
        },
      ],
      loading: true,
    }
  },
  created() {
    this.getList()
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
      robotOrder(this.listQuery).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 撤销
    handleCelcel() {},
    // 删除
    handleRemove() {},
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
  width: 150px;
}
.title-date {
  width: 140px;
}
</style>