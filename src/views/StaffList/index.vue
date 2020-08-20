<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5" class="col">
          <span class="title-label">账号查询</span>
          <el-input v-model="listQuery.email" class="title-input" placeholder="员工账号"></el-input>
        </el-col>
        <el-col :xs="9" :sm="9" :md="4" :lg="2" :xl="2" class="col query">
          <el-button type="primary" icon="el-icon-edit" @click="getList">查询</el-button>
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

        <el-table-column label="推荐人" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.top_email}}</div>
          </template>
        </el-table-column>

        <el-table-column label="业绩" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.performance}}</div>
          </template>
        </el-table-column>

        <el-table-column label="注册时间" align="center" min-width="80">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.created_at | capitalizeTime}}</div>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center" min-width="80">
          <template slot-scope="scope">
            <el-tooltip :content="isFreeze(scope.row.status)" placement="top">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="handleChange(scope.row)"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="最后一次登录时间" align="center" min-width="80">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.last_time | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="170">
          <template slot-scope="scope">
            <!-- <el-button type="danger" @click="handleRemove(scope.row.id)" size="mini">删除</el-button> -->
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
import { staffList, freezeUser } from '@/api'
import UserDetail from './UserDetail'
import UserAssets from './UserAssets'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    UserDetail,
    UserAssets,
  },
  data() {
    return {
      listQuery: {
        email: '',
        page: 1,
        limit: 7,
      },
      list: [
        {
          id: 1,
          email: '1299756312@qq.com',
          pair: 'btc',
          invitaName: '1131634405@qq.com',
          created_at: 1597215564,
          status: 1,
          uid: 123456789,
          invitation: 'OCL7AM',
          lastTime: 1597215564,
          authorization: 1,
          perform: 45.629754,
          personInfoStatus: 0,
          identityStatus: 1,
          addressStatus: -1,
          financeStatus: -2,
        },
        {
          id: 2,
          email: '1299756312@qq.com',
          pair: 'btc',
          invitaName: '1131634405@qq.com',
          created_at: 1597215564,
          status: 1,
          uid: 123456789,
          invitation: 'OCL7AM',
          lastTime: 1597215564,
          authorization: 1,
          perform: 45.629754,
        },
        {
          id: 3,
          email: '1299756312@qq.com',
          pair: 'btc',
          invitaName: '1131634405@qq.com',
          created_at: 1597215564,
          status: 1,
          uid: 123456789,
          invitation: 'OCL7AM',
          lastTime: 1597215564,
          authorization: 1,
          perform: 45.629754,
        },
      ],
      total: 0,
      authorizationList: [
        {
          id: 0,
          name: '全部',
          value: '',
        },
        {
          id: 1,
          name: '待认证',
          value: 1,
        },
        {
          id: 2,
          name: '已认证',
          value: 2,
        },
        {
          id: 3,
          name: '待审核',
          value: 3,
        },
      ],
      loading: false,
      dialogVisible: false,
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
      staffList(this.listQuery).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    handleChange(row) {
      const { id, status } = row
      const data = {
        id,
        type: status,
      }
      freezeUser(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg,
          })
        }
      })
    },
    refresh() {
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
@media only screen and (max-width: 1200px) {
  .query {
    justify-content: flex-end;
  }
}
@media only screen and (min-width: 1200px) and (max-width: 1500px) {
  .col3 {
    width: 53.16667%;
  }
}
</style>