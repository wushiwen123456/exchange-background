<template>
  <div class="container">
    <div class="logon-box">
      <div class="avatar_box">
        <img class="logo" src="~@/assets/img/logo-1.png" />
      </div>
      <el-form ref="form" :model="form" label-width="0px" class="login-form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username">
            <i style="font-size:16px" slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password>
            <i style="font-size:16px" slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" v-if="loginStatus" @click="loginIn">登录</el-button>
          <el-button type="info" v-else icon="el-icon-loading">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      loginStatus: true,
    }
  },
  created() {
    const data = JSON.parse(window.localStorage.getItem('loginInfo-bgSafex'))
    if (data) {
      this.form.username = data.email
      this.form.password = data.password
    }
  },
  methods: {
    loginIn() {
      this.$refs.form.validate((result) => {
        if (result) {
          this.loginStatus = false
          const data = {
            email: this.form.username,
            password: this.form.password,
          }
          this.$store.dispatch('login', {
            data,
            fn: () => {
              this.loginStatus = true
            },
          })
        }
      })
    },
    reset() {
      this.form = {
        username: '',
        password: '',
      }
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  background-color: #2b4b6b;
  position: relative;
  background: url('~@/assets/img/bg.png');
  background-size: 100% 100%;
}
.logon-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border-radius: 50%;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
