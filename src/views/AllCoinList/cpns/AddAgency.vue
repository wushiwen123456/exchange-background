<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <scroll-container>
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" ref="form" label-width="auto">
          <el-form-item label="简介：">
            <el-input v-model="form.title" placeholder="请输入币种名称" class="text-input" disabled></el-input>
          </el-form-item>
          <el-form-item label="数量：">
            <el-input
              v-model="form.random_num"
              placeholder="请输入数量"
              class="text-input"
              @input="(val) => {
                this.form.random_num = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 浮动的最大值(%)</span>
          </el-form-item>
          <el-form-item label="上浮率：">
            <el-input
              v-model="form.come_up"
              placeholder="请输入上浮率"
              class="text-input"
              @input="(val) => {
                this.form.come_up = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 浮动的最大值(%)</span>
          </el-form-item>
          <el-form-item label="下浮率：">
            <el-input
              v-model="form.come_next"
              placeholder="请输入下浮率"
              class="text-input"
              @input="(val) => {
                this.form.come_next = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 浮动的最小值(%)</span>
          </el-form-item>
          <el-form-item label="交易手续费：">
            <el-input
              v-model="form.deal_server"
              placeholder="交易手续费"
              class="text-input"
              @input="(val) => {
                this.form.deal_server = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 单位(%)</span>
          </el-form-item>
          <el-form-item label="提现手续费：">
            <el-input
              v-model="form.extract_serve"
              placeholder="提现手续费"
              class="text-input"
              @input="(val) => {
                this.form.extract_serve = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 单位(%)</span>
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
import { editAllGencyList } from '@/api'
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
    var validateName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入币种名称'))
      }
      if (!/^[A-Za-z]{3,5}$/.test(value)) {
        return callback(new Error('请输入3到5字母组成的币种名称'))
      }
      return callback()
    }
    return {
      dialogVisible: false,
      form: {
        value: '',
        title: '',
        deal_server: '0.00',
        extract_serve: '0.00',
      },
      title: '添加币种',
    }
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
        this.title = '编辑币种'
      } else {
        // 添加
        this.title = '添加币种'
        this.form = {
          value: '',
          title: '',
          deal_server: '0.00',
          extract_serve: '0.00',
        }
      }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((result) => {
        if (result) {
          editAllGencyList(this.form).then((res) => {
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