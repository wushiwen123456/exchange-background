<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>归集管理</el-breadcrumb-item>
      <el-breadcrumb-item>归集设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 用户列表区域 -->
      <el-table :data="list" border stripe v-loading="loading" fit>
        <!-- 索引列 -->
        <el-table-column width="50" align="center" label="ID" prop="id"></el-table-column>
        <el-table-column label="币种" align="center" prop="title"></el-table-column>
        <el-table-column label="转出地址" align="center" prop="value"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="visbleDialog" width="50%">
      <el-form ref="editForm" :model="editForm" label-width="auto" :rules="rules">
        <el-form-item label="币种名称" prop="title">
          <el-input v-model="editForm.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="转出地址" prop="value">
          <el-input v-model="editForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visbleDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { collectionList, collectionEdit } from '@/api'
export default {
  filters: {
    capitalizeUpperCase(val) {
      return val.toUpperCase()
    },
  },
  data() {
    return {
      list: [],
      loading: true,
      setRightDialogVisible: false,
      visbleDialog: false,
      editForm: {
        title: '',
        value: '',
        extract_serve: '',
      },
      rules: {
        title: [{ required: true, message: '请输入币种名称', trigger: 'blur' }],
        value: [{ required: true, message: '请输入转出地址', trigger: 'blur' }],
        deal_server: [
          { required: true, message: '请输入交易手续费', trigger: 'blur' },
        ],
        extract_serve: [
          { required: true, message: '请输入提现手续费', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      collectionList().then((res) => {
        this.loading = false
        this.list = res.data
      })
    },
    showSetRightDialog() {
      this.setRightDialogVisible = true
    },
    handleEdit(row) {
      this.visbleDialog = true
      this.editForm = Object.assign({}, row)
    },
    handleSubmit(row) {
      this.$refs.editForm.validate((result) => {
        if (result) {
          collectionEdit(this.editForm).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.getList()
              this.visbleDialog = false
            }
          })
        }
      })
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