<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>协议管理</el-breadcrumb-item>
      <el-breadcrumb-item>协议列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="5" :xl="5" class="col">
          <span class="title-label">文章查询</span>
          <el-input v-model="listQuery.title" class="title-input" placeholder="文章名称"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="col query">
          <el-button type="primary" icon="el-icon-edit" @click="getList">查询</el-button>
        </el-col>
        <el-col
          :xs="20"
          :sm="20"
          :md="13"
          :lg="17"
          :xl="17"
          class="col"
          style="justify-content: flex-end;"
        ></el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column type="index" align="center" width="55" label="#"></el-table-column>
        <el-table-column label="标题" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" min-width="170">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.brief}}</div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.add_time | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="handleDetil(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-agency ref="addagency" @refresh="getList" />
    <agree-detail ref="detail" />
  </div>
</template>

<script>
import { agreementList } from '@/api'
import AgreeDetail from './cpns/AgreeDetail'
import AddAgency from './cpns/AddArtic'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    AddAgency,
    AgreeDetail,
  },
  data() {
    return {
      listQuery: {
        title: '',
      },
      list: [],
      loading: true,
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
    getList() {
      this.loading = true
      agreementList(this.listQuery).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data
          this.total = res.data
        }
      })
    },
    // 删除
    handleRemove(id) {
      this.$confirm('是否删除此币种?', '提示', {
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
    // 编辑
    handleEdit(row) {
      this.$refs.addagency.open(row)
    },
    // 详情
    handleDetil(id) {
      this.$refs.detail.open(id)
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