<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" width="30%">
      <scroll-container>
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-form :model="form" label-width="auto" size="small">
            <el-form-item label="Account Name：">
              <span>{{form.account}}</span>
            </el-form-item>
            <el-form-item label="Bank Name：">
              <span>{{form.bank_name}}</span>
            </el-form-item>
            <el-form-item label="Bank Address：">
              <span>{{form.bank_address}}</span>
            </el-form-item>
            <el-form-item label="Bank City：">
              <span>{{form.bank_city}}</span>
            </el-form-item>
            <el-form-item label="Bank Country：">
              <span>{{form.bank_country}}</span>
            </el-form-item>
            <el-form-item label="Account Number (or IBAN)：">
              <span>{{form.account_name}}</span>
            </el-form-item>
            <el-form-item label="SWIFT/BIC Code Number：">
              <span>{{form.code_number}}</span>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </scroll-container>
      <span v-if="status == 3" slot="footer" class="dialog-footer">
        <el-button type="danger" @click="noPass">拒 绝</el-button>
        <el-button type="primary" @click="pass">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer'
export default {
  components: {
    ScrollContainer,
  },
  data() {
    return {
      form: {
        account: '1',
        account_name: '1',
        bank_address: '1',
        bank_city: '1',
        bank_country: 'United Arab Emirates',
        bank_name: '1',
        code_number: '1',
        id: 2,
        uid: 16,
      },
      dialogVisible: false,
      type: 3,
      uid: 16,
      status: 0,
    }
  },
  computed: {
    title() {
      return '' + '用户的详情'
    },
  },
  methods: {
    open(status, uid) {
      console.log(status, uid)
      this.dialogVisible = true
      this.status = status
      this.uid = uid
    },
    close() {
      this.dialogVisible = false
    },
    pass() {
      /**调用网络请求 */

      /** ...  */
      this.$message({
        message: '成功',
        type: 'success',
      })
      this.close()
      this.$emit('refresh')
    },
    noPass() {},
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