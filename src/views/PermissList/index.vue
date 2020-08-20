<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe v-loading="loading" style="font-size:14px">
        <el-table-column type="index" align="center" width="55" label="#"></el-table-column>

        <el-table-column label="权限名称" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.name}}</div>
          </template>
        </el-table-column>

        <el-table-column label="路径" min-width="150">
          <template slot-scope="scope">
            <div class="text-cut">{{scope.row.path}}</div>
          </template>
        </el-table-column>
        <el-table-column label="权限等级" min-width="150">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.right == 1">一级</el-tag>
            <el-tag type="warning" v-if="scope.row.right == 2">二级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          path: 'users',
          name: '会员管理',
          right: 1,
        },
        {
          id: 2,
          path: 'product',
          name: '资产管理',
          right: 1,
        },
        {
          id: 3,
          path: 'gift',
          name: '交易管理',
          right: 1,
        },
        {
          id: 4,
          path: 'agent',
          name: '成员管理',
          right: 2,
        },
        {
          id: 5,
          path: 'staff',
          name: '员工管理',
          right: 1,
        },
        {
          id: 6,
          path: 'norms',
          name: '权限管理',
          right: 2,
        },
        {
          id: 7,
          path: 'collection',
          name: '归集管理',
          right: 2,
        },
        {
          id: 8,
          path: 'coin',
          name: '币种管理',
          right: 2,
        },
        {
          id: 9,
          path: 'articEdit',
          name: '文案管理',
          right: 2,
        },
        {
          id: 10,
          path: 'robot',
          name: '机器人管理',
          right: 2,
        },
      ],
      loading: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
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