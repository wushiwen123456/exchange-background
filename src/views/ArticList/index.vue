<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文案管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="5" :xl="5" class="col">
          <span class="title-label">文章查询</span>
          <el-input v-model="listQuery.title" class="title-input" placeholder="文章名称"></el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="col query">
          <el-button type="primary" icon="el-icon-edit" @click="handleQuery">查询</el-button>
        </el-col>
        <el-col
          :xs="20"
          :sm="20"
          :md="13"
          :lg="17"
          :xl="17"
          class="col"
          style="justify-content: flex-end;"
        >
          <el-button type="primary" @click="addAgency(null)" icon="el-icon-edit">添加文章</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column align="center" width="55" label="ID" prop="id"></el-table-column>
        <el-table-column label="名称" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.title}}</div>
          </template>
        </el-table-column>
        <el-table-column label="简介" align="center" min-width="170">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.brief}}</div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.add_time | capitalizeTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="是否置顶" align="center" min-width="70">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="isTopChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="handleDetil(scope.row.id)">详情</el-button>
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
    <artic-detail ref="detail" />
  </div>
</template>

<script>
import { articList, changeArticIsTop, articRemove } from '@/api'
import ArticDetail from './cpns/ArticDetail'
import AddAgency from './cpns/AddArtic'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    AddAgency,
    ArticDetail,
  },
  data() {
    return {
      listQuery: {
        title: '',
        page: 1,
        limit: 7,
      },
      list: [],
      total: 0,
      loading: true,
      dialogVisible: false,
    }
  },
  computed: {
    isTop() {
      return (status) => {
        return status == 1 ? '已置顶' : '未置顶'
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
      articList(this.listQuery).then((res) => {
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
      this.$confirm('是否删除这篇文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          articRemove({ id }).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
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
    // 详情
    handleDetil(id) {
      this.$refs.detail.open(id)
    },
    // 改变置顶状态
    isTopChange(row) {
      const data = {
        id: row.id,
        type: row.is_top,
      }
      const msg = data.type == 0 ? '取消置顶成功' : '置顶成功'
      changeArticIsTop(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: msg,
          })
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