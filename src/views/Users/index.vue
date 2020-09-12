<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4.5">
          <span style="margin-right:15px">账号查询</span>
          <el-input v-model="listQuery.username" class="title-input" placeholder="用户账号"></el-input>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">邀请人</span>
          <el-input v-model="listQuery.referrer" class="title-input" placeholder="邀请人"></el-input>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">认证状态</span>
          <el-select v-model="listQuery.authorization" class="title-select" placeholder="全部">
            <el-option
              v-for="item in authorizationList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4.5">
          <span style="margin-right:15px">是否冻结</span>
          <el-select v-model="listQuery.isFreeze" class="title-select" placeholder="全部">
            <el-option
              v-for="item in isFreezeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6.5">
          <span style="margin-right:15px">注册时间</span>
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
        <el-table-column align="center" width="55" label="ID" prop="id"></el-table-column>
        <el-table-column label="账号" align="center" min-width="150">
          <template slot-scope="scope">
            <span :title="scope.row.name" class="text-cut">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="UID" align="center" min-width="200">
          <template slot-scope="scope">
            <div>{{scope.row.uid}}</div>
          </template>
        </el-table-column>
        <el-table-column label="推荐人" align="center" min-width="150">
          <template slot-scope="scope">
            <div>
              <span class="text-cut">{{scope.row.referrer}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="认证状态" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.authorization == 1">待认证</el-tag>
            <el-tag v-if="scope.row.authorization == 2" type="success">已认证</el-tag>
            <el-tag v-if="scope.row.authorization == 3" type="warning">待审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div>
              <span class="text-cut">{{scope.row.addTime | capitalizeTime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" min-width="70">
          <template slot-scope="scope">
            <el-tooltip :content="isFreeze(scope.row.status)" placement="top">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="0"
                :inactive-value="1"
                @change="handleChangeStatus(scope.row)"
                :disabled="isRight == 0"
              ></el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="最后一次登录时间" align="center" min-width="120">
          <template slot-scope="scope">
            <div>
              <span class="text-cut">{{scope.row.lastTime | capitalizeTime}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="220">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="warning" size="mini">详情</el-button>
            <el-button @click="handleAssets(scope.row)" type="primary" size="mini">资产</el-button>
            <!-- <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini">删除</el-button> -->
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
      <user-detail ref="detail" @refresh="refresh" />
      <user-assets ref="assets" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserDetail from './UserDetail'
import UserAssets from './UserAssets'
import { userList, freezeUser } from '@/api'
export default {
  components: {
    UserDetail,
    UserAssets,
  },
  data() {
    return {
      list: [],
      listQuery: {
        username: '',
        authorization: '',
        isFreeze: '',
        startTime: '',
        endTime: '',
        page: 1,
        limit: 7,
        referrer: '',
      },
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
      isFreezeList: [
        {
          id: 0,
          name: '全部',
          value: '',
        },
        {
          id: 1,
          name: '冻结',
          value: 0,
        },
        {
          id: 2,
          name: '未冻结',
          value: 1,
        },
      ],
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['isRight']),
    isFreeze() {
      return (status) => {
        return status == 1 ? '已冻结' : '正常使用'
      }
    },
  },
  created() {
    if (this.$route.query && this.$route.query.email) {
      this.listQuery.referrer = this.$route.query.email
    }
    this.getUserList()
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getUserList()
    },
    handleDetail(item) {
      this.$refs.detail.open(item, item.name)
    },
    handleRemove(id) {},
    handleAssets(item) {
      this.$refs.assets.open(item.id, item.name)
    },
    getUserList() {
      this.loading = true
      const data = Object.assign({}, this.listQuery)
      if (data.startTime) {
        data.startTime = (new Date(data.startTime).getTime() / 1000).toFixed(0)
      }
      if (data.endTime) {
        data.endTime = (new Date(data.endTime).getTime() / 1000).toFixed(0)
      }
      // 请求数据
      userList(data).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    refresh() {
      this.getUserList()
    },
    // 冻结/解冻用户
    handleChangeStatus(row) {
      const data = {
        id: row.id,
        type: row.status,
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
    // 查询点击
    handleQuery() {
      this.listQuery.page = 1
      this.getUserList()
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
