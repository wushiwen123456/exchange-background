<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>其他设置</el-breadcrumb-item>
      <el-breadcrumb-item>其他</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header" class="card-header">
            <h3 class="header-title"># 提币设置</h3>
            <el-button type="text" class="save-btn">
              <span @click="handleSave">保存</span>
              <i v-if="submitLoading" class="el-icon-loading"></i>
            </el-button>
          </div>
          <el-form :model="form" class="my-form">
            <el-form-item :label="form.title">
              <el-input v-model="form.value" size="small" class="my-input"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMinWithdraw,setMinWithdraw} from '@/api'
export default {
  data() {
    return {
      form: {
        value: '',
      },
      label:'',
      submitLoading: false,
    }
  },
  created(){
    this.getMinWithdraw()
  },
  methods: {
    handleSave() {
      this.submitLoading = true
      setMinWithdraw(this.form).then(res => {
        this.submitLoading = false
        if(res.code == 200){
          this.$message({
            type:'success',
            message:res.msg
          })
        }
      })
    },
    getMinWithdraw(){
      getMinWithdraw().then(res => {
        if(res.code == 200){
         this.form = Object.assign({},res.data)
        }
      })
    }
  },
}
</script>

<style scoped>
.header-title {
  color: #1f2f3d;
  font-size: 22px;
  font-weight: 400;
}
.my-form {
  margin-top: 15px;
}
.my-input {
  width: 240px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.save-btn {
  font-size: 16px;
}
</style>