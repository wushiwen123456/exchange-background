<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <scroll-container height="30vh">
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" :rules="rules" ref="form" label-width="auto">
          <el-form-item label="协议名称：" prop="title">
            <el-input v-model="form.title" placeholder="请输入协议名称" class="text-input"></el-input>
          </el-form-item>
          <el-form-item label="协议描述：" prop="brief">
            <el-input v-model="form.brief" placeholder="请输入协议描述"></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </scroll-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer'
import { agreementEdit } from '@/api'
export default {
  filters: {
    capitalizeUpper(name) {
      return name.toUpperCase() || ''
    },
  },
  components: {
    ScrollContainer,
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        title: '',
        brief: '',
      },
      title: '添加文章',
      rules: {
        title: [{ required: true, message: '请输入协议名称', trigger: 'blur' }],
        brief: [{ required: true, message: '请输入协议描述', trigger: 'blur' }],
      },
    }
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
        this.title = '编辑协议'
      } else {
        // 添加
        this.title = '添加协议'
        this.form = {
          title: '',
          brief: '',
        }
      }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((result) => {
        if (result) {
          agreementEdit(this.form).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.dialogVisible = false
              this.$emit('refresh')
            }
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.el-form {
  font-size: 14px;
}
.text-input {
  width: 220px;
}
.el-input__icon {
  cursor: pointer;
}
.tips {
  color: #999;
  font-size: 12px;
  margin-left: 15px;
}
</style>