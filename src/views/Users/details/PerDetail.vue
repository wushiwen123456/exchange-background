<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" width="40%" append-to-body>
      <scroll-container v-loading="loading">
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-form :model="form" label-width="auto" size="small">
            <el-form-item label="Last Name：">
              <span>{{form.lastname}}</span>
            </el-form-item>
            <el-form-item label="First Name：">
              <span>{{form.firstname}}</span>
            </el-form-item>
            <el-form-item label="Middle Name 1：">
              <span>{{form.middlename}}</span>
            </el-form-item>
            <el-form-item label="Middle Name 2：">
              <span>{{form.middlenames}}</span>
            </el-form-item>
            <el-form-item label="Date Of Birth：">
              <span>{{form.birthday | capitalizeTime}}</span>
            </el-form-item>
            <el-form-item label="Nationality：">
              <span>{{form.country}}</span>
            </el-form-item>
            <el-form-item label="Gender：">
              <span>{{form.gender == 0 ? 'Lady' : 'Men'}}</span>
            </el-form-item>
            <el-form-item label="Telephone Number：">
              <span>{{form.phone}}</span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </scroll-container>
      <span v-if="status == 0" slot="footer" class="dialog-footer">
        <el-button type="danger" @click="noPass" :icon="noPassLoading ? 'el-icon-loading' : ''">拒 绝</el-button>
        <el-button type="primary" @click="pass" :icon="passLoading ? 'el-icon-loading' : ''">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer'
import { aInfo, aPress } from '@/api'

export default {
  components: {
    ScrollContainer,
  },
  data() {
    return {
      form: {},
      type: 0,
      id: 16,
      status: 0,
      dialogVisible: false,
      loading: true,
      passLoading: false,
      noPassLoading: false,
    }
  },
  computed: {
    title() {
      return '' + '用户的认证'
    },
  },
  methods: {
    open(status, id) {
      this.dialogVisible = true
      this.status = status
      this.id = id
      // 请求详情数据
      this.getDetailData()
    },
    close() {
      this.dialogVisible = false
    },
    pass() {
      this.passLoading = true
      const data = {
        type: this.type,
        operation: 0,
        id: this.id,
      }
      /**调用网络请求 */
      aPress(data).then((res) => {
        this.passLoading = false
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
          })
          this.$emit('pass', this.type)
          this.close()
        }
      })
    },
    noPass() {
      this.noPassLoading = true
      const data = {
        type: this.type,
        operation: 1,
        id: this.id,
      }
      /**调用网络请求 */
      aPress(data).then((res) => {
        this.noPassLoading = false
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: 'success',
          })
          this.$emit('noPass', this.type)
          this.close()
        }
      })
    },
    getDetailData() {
      this.loading = true
      const data = {
        type: this.type,
        id: this.id,
      }
      aInfo(data).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.form = res.data
        }
      })
    },
  },
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 15px;
}
.el-tag {
  margin-right: 15px;
}
</style>