<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <scroll-container>
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" :rules="rules" ref="form" label-width="auto">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="form.name" placeholder="请输入币种名称" class="text-input" maxlength="5"></el-input>
            <span class="tips">* 请输入3到5个数字加字母组成的币种名称</span>
          </el-form-item>
          <el-form-item label="价格：" prop="price">
            <el-input v-model="form.price" placeholder="请输入币种价格" class="text-input"></el-input>
            <span
              v-if="form.name"
              class="tips"
            >* 1 {{form.name}} = {{form.price}} USDT (以实际浮动后的价格为准),精确到小数点后4位</span>
          </el-form-item>
          <!-- <el-form-item label="上浮率：" prop="top_price">
            <el-input v-model="form.top_price" placeholder="请输入币种上浮率" class="text-input"></el-input>
            <span class="tips">* 单位:%,精确到小数点后4位</span>
          </el-form-item>
          <el-form-item label="下浮率：" prop="down_price">
            <el-input v-model="form.down_price" placeholder="请输入币种下浮率" class="text-input"></el-input>
            <span class="tips">* 单位:%,精确到小数点后4位</span>
          </el-form-item> -->
          <el-form-item label="手续费：" prop="fee">
            <el-input v-model="form.fee" placeholder="请输入交易手续费" class="text-input"></el-input>
            <span class="tips">* 单位:USDT,精确到小数点后4位</span>
          </el-form-item>
          <!-- <el-form-item label="最大值：" prop="max">
            <el-input v-model="form.max" placeholder="请输入价格最大值" class="text-input"></el-input>
            <span class="tips">* 订单数量的最大值,精确到个位数</span>
          </el-form-item>
          <el-form-item label="最小值：" prop="min">
            <el-input v-model="form.min" placeholder="请输入价格最小值" class="text-input"></el-input>
            <span class="tips">* 订单数量的最小值,精确到个位数</span>
          </el-form-item> -->
          <el-form-item label="可控范围：" prop="scope">
            <el-input v-model="form.scope" placeholder="请输入可控范围" class="text-input"></el-input>
            <span class="tips">* 控制价格上下浮动的范围,精确到小数点后4位</span>
          </el-form-item>
          <el-form-item label="是否开启：">
            <el-tooltip :content="form.status == 1 ? '开启' : '关闭'" placement="top">
              <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-tooltip>
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
import { agencyEdit } from '@/api'
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
        name: '',
        price: '',
        fee: 0.1,
        scope: 5.4,
        status: 1,
      },
      title: '添加代币',
      rules: {
        name: [{ required: true, validator: validateName, trigger: 'blur' }],
        price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
        fee: [{ required: true, message: '请输入手续费', trigger: 'blur' }],
        scope: [{ required: true, message: '请输入可控范围', trigger: 'blur' }],
      },
    }
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
        this.title = '编辑代币'
      } else {
        // 添加
        this.title = '添加代币'
        this.form = {
          name: '',
          price: '',
          top_price: '',
          down_price: '',
          fee: 0.1,
          max: '',
          min: '',
          scope: 5.4,
          status: 1,
        }
      }
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate((result) => {
        if (result) {
          agencyEdit(this.form).then((res) => {
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