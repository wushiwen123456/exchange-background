<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="用户名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="用户手机号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit">查询</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe fit>
        <el-table-column label="ID" align="center" width="75" prop="id" sortable></el-table-column>
        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="用户头像" align="center" prop="avatar">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="user-avatar" />
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" prop="phone"></el-table-column>
        <el-table-column label="权限等级" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.right == 1">一级</el-tag>
            <el-tag v-if="scope.row.right == 2" type="success">二级</el-tag>
            <el-tag v-if="scope.row.right == 3" type="danger">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center" prop="addTime"></el-table-column>
        <el-table-column label="最后一次登录时间" align="center" prop="lastTime"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row.id)" type="warning" size="mini">编辑</el-button>
            <el-button @click="handleRemove(scope.row.id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
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
          name: "测试员工1号",
          avatar:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595785024052&di=c7905f13cb177df26da28611fec65879&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-6%2F2020617225141628.jpg",
          phone: 16638245952,
          right: 1,
          addTime: "2020-7-26 22:50:07",
          lastTime: "2020-7-27 22:50:07",
          status: 1,
        },
        {
          id: 2,
          name: "测试员工2号",
          avatar:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595785024052&di=c7905f13cb177df26da28611fec65879&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-6%2F2020617225141628.jpg",
          phone: 16638245952,
          right: 1,
          addTime: "2020-7-26 22:50:07",
          lastTime: "2020-7-27 22:50:07",
          status: 1,
        },
        {
          id: 3,
          name: "测试员工3号",
          avatar:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595785024052&di=c7905f13cb177df26da28611fec65879&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-6%2F2020617225141628.jpg",
          phone: 16638245952,
          right: 2,
          addTime: "2020-7-26 22:50:07",
          lastTime: "2020-7-27 22:50:07",
          status: 1,
        },
        {
          id: 4,
          name: "测试员工4号",
          avatar:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595785024052&di=c7905f13cb177df26da28611fec65879&imgtype=0&src=http%3A%2F%2Ftupian.qqw21.com%2Farticle%2FUploadPic%2F2020-6%2F2020617225141628.jpg",
          phone: 16638245952,
          right: 3,
          addTime: "2020-7-26 22:50:07",
          lastTime: "2020-7-27 22:50:07",
          status: 1,
        },
      ],
      currentPage4: 1,
    };
  },
  methods: {
    handleEdit(id) {},
    handleRemove(id) {},
  },
};
</script>

<style scoped>
.flex-end {
  display: flex;
  justify-content: flex-end;
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
</style>
