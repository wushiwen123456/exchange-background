<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <scroll-container height="40vh">
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" ref="form" label-width="auto">
          <el-form-item label="锁仓时间：">
            <el-input v-model="form.time" placeholder="请输入锁仓时间" class="text-input"></el-input>
             <span class="tips">* 单位（天）</span>
          </el-form-item>
          <el-form-item label="利率：">
            <el-input
              v-model="form.rate"
              placeholder="请输入利率"
              class="text-input"
              @input="(val) => {
                this.form.rate = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 利率(%)</span>
          </el-form-item>
          <el-form-item label="币种：">
            <el-input
              v-model="form.coin"
              placeholder="请输入币种"
              class="text-input"
              @input="(val) => {
                this.form.coin = val
              .replace(/[^0-9.]/g, '')
              .replace('.', '#*')
              .replace(/\./g, '')
              .replace('#*', '.')
              }"
            ></el-input>
            <span class="tips">* 锁仓币种（大/小写均可）</span>
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
import { editAllGencyList,setLockManager } from '@/api'
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
        time: '',
        rate: '',
        coin: '',
      },
      title: '添加锁仓配置',
    }
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
        this.title = '编辑锁仓配置'
      } else {
        // 添加
        this.title = '添加锁仓配置'
        this.form = {
          time: '',
          rate: '',
          coin: '',
        }
      }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((result) => {
        if (result) {
          setLockManager(this.form).then((res) => {
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