<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%" @close="cleanForm">
    <scroll-container>
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" :rules="rules" ref="form" label-width="auto" status-icon>
          <el-form-item label="角色">
            <el-select v-model="form.department_id" placeholder="请选择角色">
              <el-option
                v-for="item in permissList"
                :key="item.id"
                :label="item.name"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="email">
            <el-autocomplete
              class="text-input"
              v-model="form.email"
              :fetch-suggestions="querySearch"
              placeholder="请输入账号"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="showPassword">
            <el-input v-model="form.password" class="text-input" placeholder="请输入密码"></el-input>
            <span class="tips">* 请输入输入6-20个字母、数字、下划线组成的密码</span>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword" v-if="showPassword">
            <el-input v-model="form.confirmPassword" class="text-input" placeholder="请输入密码"></el-input>
            <span class="tips">* 请输入输入6-20个字母、数字、下划线组成的密码</span>
          </el-form-item>
          <el-form-item label="代理币种">
            <el-select v-model="form.coin_id" placeholder="请选择币种">
              <el-option
                v-for="item in coinList"
                :key="item.id"
                :label="item.name | capitalizeUpper"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="tips">* 如果没有币种可选请前往--币种管理--添加币种</span>
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
import { noCoin, addAgency, hasEmail } from '@/api'
import ScrollContainer from '@/components/ScrollContainer'
export default {
  filters: {
    capitalizeUpper(name) {
      return (name && name.toUpperCase()) || ''
    },
  },
  components: {
    ScrollContainer,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入账号'))
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        return callback(new Error('请输入正确的邮箱格式规范'))
      }
      return this.hasEmail(value, callback)
    }
    var validatePassword = (rule, value, callback) => {
      if (!this.showPassword) return callback()
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      if (!/^(\w){6,20}$/.test(value)) {
        return callback(
          new Error('请输入输入6-20个字母、数字、下划线组成的密码')
        )
      }
      if (this.form.confirmPassword !== '') {
        this.$refs.form.validateField('confirmPassword')
      }
      return callback()
    }
    var validateConPassword = (rule, value, callback) => {
      if (!this.showPassword) return callback()
      if (value === '') {
        return callback('请再次输入密码')
      }
      if (!/^(\w){6,20}$/.test(value)) {
        return callback(
          new Error('请输入输入6-20个字母、数字、下划线组成的密码')
        )
      }
      if (value !== this.form.password) {
        return callback(new Error('两次输入密码不一致!'))
      }
      callback()
    }
    return {
      dialogVisible: false,
      form: {
        email: '',
        password: '',
        coin_id: '',
        confirmPassword: '',
        department_id: 0,
      },
      coinList: [],
      permissList: [
        {
          id: 1,
          name: '代理商',
          value: 0,
          disabled: false,
        },
        {
          id: 2,
          name: '超级管理员',
          value: 1,
          disabled: true,
        },
      ],
      title: '添加成员',
      rules: {
        email: [
          { required: true, validator: validateUsername, trigger: 'change' },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, validator: validateConPassword, trigger: 'blur' },
        ],
      },
      showPassword: false,
    }
  },
  computed: {},
  beforeDestroy() {
    this.cleanForm()
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
        this.title = '编辑成员'
        this.showPassword = false
      } else {
        // 添加
        this.title = '添加成员'
        this.showPassword = true
      }
      this.dialogVisible = true
      this.getNoCoin()
    },
    // 获取未绑定代理的代币
    getNoCoin() {
      noCoin({ type: 1 }).then((res) => {
        if (res.code == 200) {
          this.coinList = res.data
        }
      })
    },
    querySearch(queryString, cb) {
      const arr = []
      if (!/^[A-Za-z0-9]+$/.test(queryString)) {
        return cb([])
      }
      arr.push({
        value: queryString + '@qq.com',
      })
      arr.push({
        value: queryString + '@163.com',
      })
      var results = queryString ? arr : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    handleSelect(val) {
      console.log(val)
    },
    handleSubmit() {
      console.log(this.$refs.form)
      this.$refs.form.validate((result) => {
        if (result) {
          addAgency(this.form).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg,
              })
              this.dialogVisible = false
            }
          })
        }
      })
    },
    // 清空表单
    cleanForm() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    // 判断账号是否可用
    async hasEmail(value, callback) {
      const data = {
        email: value,
      }
      const res = await hasEmail(data)
      if (res.code == 200) {
        callback()
      } else {
        callback(new Error(res.msg))
      }
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