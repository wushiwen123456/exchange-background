<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-bottom:15px">
        <el-col :xs="8" :sm="5" :md="7" :lg="13" :xl="13" class="col">
          <el-button type="primary" @click="addAgency(null)" icon="el-icon-edit">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe v-loading="loading" fit>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1 === 0 ? 'bdtop' : '','vcenter']"
              v-for="(item1,i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById()">{{item1.name}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children "
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById()">{{item2.name}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- 渲染三级权限 -->
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById()"
                    >{{item3.name}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" width="50" align="center" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="角色描述" prop="desc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleRemove(scope.row.id)"
            >删除</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row.id)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <edit ref="edit"></edit>
    <add ref="add"></add>
  </div>
</template>

<script>
import Edit from './cpns/Edit'
import Add from './cpns/Add'
import { currencys } from '@/api'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  components: {
    Edit,
    Add,
  },
  data() {
    return {
      list: [
        {
          id: 0,
          name: '超级管理员',
          desc: '这是超级管理员',
          children: [
            {
              id: 101,
              name: '会员管理',
              path: null,
              children: [
                {
                  id: 104,
                  name: '会员列表',
                  path: null,
                },
              ],
            },
            {
              id: 105,
              name: '资产管理',
              path: null,
              children: [
                {
                  id: 106,
                  name: '资产列表',
                  path: null,
                },
              ],
            },
            {
              id: 107,
              name: '交易管理',
              path: null,
              children: [
                {
                  id: 108,
                  name: '市价交易记录',
                  path: null,
                },
                {
                  id: 109,
                  name: '限价交易记录',
                  path: null,
                },
              ],
            },
            {
              id: 110,
              name: '成员管理',
              path: null,
              children: [
                {
                  id: 111,
                  name: '成员列表',
                  path: null,
                },
              ],
            },
            {
              id: 112,
              name: '权限管理',
              path: null,
              children: [
                {
                  id: 113,
                  name: '角色列表',
                  path: null,
                },
                {
                  id: 114,
                  name: '权限列表',
                  path: null,
                },
              ],
            },
            {
              id: 115,
              name: '归集管理',
              path: null,
              children: [
                {
                  id: 116,
                  name: '归集设置',
                  path: null,
                },
              ],
            },
            {
              id: 117,
              name: '币种管理',
              path: null,
              children: [
                {
                  id: 118,
                  name: '币种列表',
                },
              ],
            },
            {
              id: 119,
              name: '文案管理',
              path: null,
              children: [
                {
                  id: 120,
                  name: '文案列表',
                },
              ],
            },
            {
              id: 121,
              name: '交易机器人',
              path: null,
              children: [
                {
                  id: 122,
                  name: '交易机器人管理',
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: '代理商',
          desc: '这是代理商',
          children: [
            {
              id: 101,
              name: '会员管理',
              path: null,
              children: [
                {
                  id: 104,
                  name: '会员列表',
                  path: null,
                },
              ],
            },
            {
              id: 105,
              name: '资产管理',
              path: null,
              children: [
                {
                  id: 106,
                  name: '资产列表',
                  path: null,
                },
              ],
            },
            {
              id: 107,
              name: '交易管理',
              path: null,
              children: [
                {
                  id: 108,
                  name: '市价交易记录',
                  path: null,
                },
                {
                  id: 109,
                  name: '限价交易记录',
                  path: null,
                },
              ],
            },
            {
              id: 110,
              name: '成员管理',
              path: null,
              children: [
                {
                  id: 111,
                  name: '成员列表',
                  path: null,
                },
              ],
            },
            {
              id: 112,
              name: '权限管理',
              path: null,
              children: [
                {
                  id: 113,
                  name: '角色列表',
                  path: null,
                },
                {
                  id: 114,
                  name: '权限列表',
                  path: null,
                },
              ],
            },
            {
              id: 115,
              name: '归集管理',
              path: null,
              children: [
                {
                  id: 116,
                  name: '归集设置',
                  path: null,
                },
              ],
            },
            {
              id: 117,
              name: '币种管理',
              path: null,
              children: [
                {
                  id: 118,
                  name: '币种列表',
                },
              ],
            },
            {
              id: 119,
              name: '文案管理',
              path: null,
              children: [
                {
                  id: 120,
                  name: '文案列表',
                },
              ],
            },
            {
              id: 121,
              name: '交易机器人',
              path: null,
              children: [
                {
                  id: 122,
                  name: '交易机器人管理',
                },
              ],
            },
          ],
        },
      ],
      loading: true,
      setRightDialogVisible: false,
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
    async removeRightById() {
      const confirmResult = await this.$confirm(
        '是否永久删除这个权限',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return
      }
      console.log('确认了删除')
      // 发送网络请求
    },
    showSetRightDialog() {
      this.setRightDialogVisible = true
    },
    addAgency() {
      this.$refs.add.open()
    },
    handleEdit(row) {
      this.$refs.edit.open(row)
    },
    handleRemove(id) {
      this.$confirm('确定要删除这个角色么', '提示', {
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
        .catch((err) => err)
    },
  },
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>