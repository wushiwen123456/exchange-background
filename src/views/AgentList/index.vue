<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>成员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="5" :xl="5" class="col">
          <span class="title-label">账号查询</span>
          <el-input v-model="listQuery.email" class="title-input" placeholder="代理商账号"></el-input>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4" class="col">
          <span class="title-label">币种</span>
          <el-select v-model="listQuery.coin_id" class="title-input" placeholder="全部">
            <el-option
              v-for="item in pairList"
              :key="item.id"
              :label="item.name | capitalizeUpperCase"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :xs="20" :sm="19" :md="3" :lg="2" :xl="2" class="col query">
          <el-button type="primary" icon="el-icon-edit" @click="handleQuery">查询</el-button>
        </el-col>
        <el-col
          :xs="8"
          :sm="5"
          :md="7"
          :lg="13"
          :xl="13"
          class="col"
          style="justify-content: flex-end;"
        >
          <el-button type="primary" @click="addAgency(null)" icon="el-icon-edit">添加成员</el-button>
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

        <el-table-column label="代理币种" align="center" min-width="80">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.name | capitalizeUpperCase}}</div>
          </template>
        </el-table-column>

        <el-table-column label="邀请地址" align="center" min-width="170">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.invitation_code}}</div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.created_at | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="角色" align="center" min-width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.department_id == 0">代理商</el-tag>
            <el-tag type="success" v-if="scope.row.department_id == 1">超级管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="120">
          <template slot-scope="scope">
            <el-tooltip :content="isFreeze(scope.row.status)" placement="top">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="0"
                :inactive-value="1"
              ></el-switch>
            </el-tooltip>
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
    <add-agency ref="addagency" />
  </div>
</template>

<script>
import { noCoin, memberList } from '@/api'
import AddAgency from './cpns/AddAgency'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return (val && val.toUpperCase()) || val
    },
  },
  components: {
    AddAgency,
  },
  data() {
    return {
      listQuery: {
        email: '',
        coin_id: '',
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
          value: 1,
        },
        {
          id: 2,
          name: '已支付',
          value: 2,
        },
        {
          id: 3,
          name: '已拒绝',
          value: 3,
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
      dialogVisible: false,
    }
  },
  computed: {
    isFreeze() {
      return (status) => {
        return status == 0 ? '正常使用' : '已冻结'
      }
    },
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
      memberList(this.listQuery).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 获取所有币种
    getCurrencys() {
      noCoin({ type: 0 }).then((res) => {
        if (res.code == 200) {
          const list = res.data
          const pairList = list.map((item, index) => {
            return {
              id: index + 1,
              name: item.name,
              value: item.id,
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
    addAgency(row) {
      this.$refs.addagency.open(row)
    },
    // 删除代理商
    handleRemove(id) {
      this.$confirm('是否删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    // 查询
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