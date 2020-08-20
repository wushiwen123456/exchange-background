<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易机器人</el-breadcrumb-item>
      <el-breadcrumb-item>机器人配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      class="box-cord"
      v-loading="loading"
      element-loading-text="正在获取机器人配置..."
      element-loading-spinner="el-icon-loading"
    >
      <div class="form-con form1">
        <el-switch
          v-model="form.status"
          active-text="启动自动下单任务"
          inactive-text="停止自动下单任务"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @change="handleChange"
        ></el-switch>
        <el-button v-if="!setStatus" style="margin-left:15px" type="primary" @click="handleSave">保存</el-button>
        <el-button
          v-else-if="setStatus"
          style="margin-left:15px"
          type="info"
          icon="el-icon-loading
"
        >保存</el-button>
      </div>
      <scroll-container height="75vh">
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <div class="form-con">
            <h3 class="form-title">基本信息</h3>
            <el-form :model="form" inline :rules="rules" label-width="auto" ref="form1">
              <el-form-item label="用户邮箱：" prop="email">
                <el-input v-model="form.email" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item label="开放平台密匙：" prop="secretKey">
                <el-input v-model="form.secretKey" disabled></el-input>
              </el-form-item>
              <el-form-item label="开放平台密钥：" prop="secretValue">
                <el-input v-model="form.secretValue" disabled></el-input>
              </el-form-item>-->
            </el-form>
          </div>
          <div class="form-con">
            <h3 class="form-title">参数信息</h3>
            <el-form :model="form" inline :rules="rules" label-width="auto" ref="form2">
              <el-form-item label="币种：" prop="name">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
              <el-form-item label="币种比例：" prop="price">
                <el-input v-model="form.price"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-con">
            <h3 class="form-title">调控参数</h3>
            <el-form :model="form" inline :rules="rules" label-width="auto" ref="form3">
              <el-form-item label="k线趋势" prop="type" style="width:100%">
                <el-radio v-model="form.type" label="0">自动判定</el-radio>
                <el-radio v-model="form.type" label="1">上升趋势</el-radio>
                <el-radio v-model="form.type" label="2">下降趋势</el-radio>
              </el-form-item>
              <el-form-item label="上浮：" prop="top_price">
                <el-input v-model="form.top_price"></el-input>
              </el-form-item>
              <el-form-item label="下浮：" prop="down_price">
                <el-input v-model="form.down_price"></el-input>
              </el-form-item>
              <el-form-item label="最大值" prop="max">
                <el-input v-model="form.max"></el-input>
              </el-form-item>
              <el-form-item label="最小值" prop="min">
                <el-input v-model="form.min"></el-input>
              </el-form-item>
              <el-form-item label="手续费：" prop="fee">
                <el-input v-model="form.fee"></el-input>
              </el-form-item>
              <el-form-item label="正常可控范围：" prop="scope">
                <el-input v-model="form.scope"></el-input>
                <span title="当在不可控范围之后，将启用调控下单" class="el-icon-warning tips"></span>
              </el-form-item>
            </el-form>
          </div>
        </el-scrollbar>
      </scroll-container>
    </el-card>
  </div>
</template>

<script>
import { opeaaRobot, setRobotConfig, getRobotConfig } from '@/api'
import ScrollContainer from '@/components/ScrollContainer'
export default {
  components: {
    ScrollContainer,
  },
  data() {
    var validateNum1 = (rule, value, callback) => {
      if (value == '' || this.form.controlValueMin1 == '') {
        return callback(new Error('请输入数量'))
      }
      return callback()
    }
    var validateNum2 = (rule, value, callback) => {
      if (value == '' || this.form.controlValueMin2 == '') {
        return callback(new Error('请输入数量'))
      }
      return callback()
    }
    var validateNum3 = (rule, value, callback) => {
      if (value == '' || this.form.controlValueMin3 == '') {
        return callback(new Error('请输入数量'))
      }
      return callback()
    }
    var validateNumAuto = (rule, value, callback) => {
      if (value == '' || this.form.autoMin == '') {
        return callback(new Error('请输入数量'))
      }
      return callback()
    }
    return {
      form: {
        status: 0,
        email: '1131634405@qq.com',
        name: 'DAM_USDT',
        price: 1.15,
        top_price: '0.01',
        down_price: '0.01',
        fee: '0.01',
        max: '0.01',
        min: '0.01',
        scope: '0.01',
        type: '0',
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        name: [{ required: true, message: '请输入币种', trigger: 'blur' }],
        scope: [
          { required: true, message: '请输入正常可控范围', trigger: 'blur' },
        ],
        price: [{ required: true, message: '请输入币种比例', trigger: 'blur' }],
        top_price: [
          { required: true, message: '请输入上浮数值', trigger: 'blur' },
        ],
        down_price: [
          { required: true, message: '请输入下浮数值', trigger: 'blur' },
        ],
        max: [{ required: true, message: '请输入最大值', trigger: 'blur' }],
        min: [{ required: true, message: '请输入最小值', trigger: 'blur' }],
        fee: [{ required: true, message: '请输入手续费', trigger: 'blur' }],
        type: [{ required: true, message: '请选择k线趋势', trigger: 'blur' }],
      },
      loading: true,
      setStatus: false,
    }
  },
  created() {
    this.getRobotConfig()
  },
  methods: {
    handleChange(value) {
      const data = {
        type: value,
      }
      const msg = value == 1 ? '启动成功' : '停止成功'
      opeaaRobot(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: msg,
          })
        }
      })
    },
    async handleSave() {
      try {
        const value1 = await this.$refs.form1.validate()
        const value2 = await this.$refs.form2.validate()
        const value3 = await this.$refs.form3.validate()
        this.setStatus = true
        setRobotConfig(this.form).then((res) => {
          this.setStatus = false
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: res.msg,
            })
          }
        })
      } catch (error) {}
    },
    getRobotConfig() {
      this.loading = true
      getRobotConfig().then((res) => {
        setTimeout(() => {
          this.loading = false
        }, 500)
        if (res.code == 200) {
          const form = res.data
          form.type = form.type + ''
          form.status = res.data.robot_status
          this.form = Object.assign({}, form)
        }
      })
    },
  },
}
</script>

<style scoped>
.form-con {
  margin-top: 20px;
}
.form-title {
  color: #404040;
  line-height: 35px;
  border-bottom: 1px solid #eee;
}
.el-form {
  margin: 25px 0;
  display: flex;
  flex-wrap: wrap;
}
.el-form-item {
  width: 48%;
}
.el-input {
  width: 400px;
}
.tips {
  color: #666;
  margin-left: 5px;
}
.wave {
  padding: 0 30px;
}
.input-num {
  width: 100px;
}
.form1 {
  line-height: 40px;
}
</style>