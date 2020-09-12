<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>首页管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播设置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="col query">
          <el-button type="primary" icon="el-icon-edit" @click="addImage">添加图片</el-button>
        </el-col>
        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="col query">
          <el-select v-model="type" placeholder="类型" @change="handleChange">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit v-loading="loading">
        <el-table-column align="center" width="75" label="排序" prop="sort" sortable></el-table-column>
        <el-table-column label="图片" align="center" width="243">
          <template slot-scope="scope">
            <div class="img-box">
              <img :src="image(scope.row.url)" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="链接" align="center" min-width="220">
          <template slot-scope="scope">
            <div class="text-cut">{{ scope.row.link }}</div>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" min-width="220">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type == 0">PC端</el-tag>
            <el-tag v-if="scope.row.type == 1" type="warning">移动端</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleRemove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <banner-edit ref="banner-edit" @refresh="getList"></banner-edit>
  </div>
</template>

<script>
import { getBanner, delBanner } from '@/api'
import bannerEdit from './cpns/bannerEdit'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    bannerEdit,
  },
  data() {
    return {
      list: [],
      total: 0,
      loading: true,
      dialogVisible: false,
      type: '-1',
      typeList: [
        {
          id: 1,
          name: '全部',
          value: '-1',
        },
        {
          id: 2,
          name: 'PC端',
          value: '0',
        },
        {
          id: 3,
          name: '移动端',
          value: '1',
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
    image() {
      return (url) => {
        return this.$baseUrl + url
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getBanner({ type: this.type }).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.list = res.data
        }
      })
    },
    // 删除
    handleRemove(id) {
      this.$confirm('是否删除此项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delBanner({ id }).then((res) => {
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
      this.$refs['banner-edit'].open(row)
    },
    addImage() {
      this.$refs['banner-edit'].open(null)
    },
    // 切换类型触发
    handleChange(val) {
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
.img-box {
  height: 75px;
}
.img-box img {
  width: 100%;
  height: 100%;
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
