<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" width="30%">
      <scroll-container>
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-form :model="form" label-width="auto" size="small">
            <el-form-item label="Country：">
              <span>{{form.country}}</span>
            </el-form-item>
            <el-form-item label="State / Province：">
              <span>{{form.province}}</span>
            </el-form-item>
            <el-form-item label="City / Town">
              <span>{{form.town}}</span>
            </el-form-item>
            <el-form-item label="District：">
              <span>{{form.district}}</span>
            </el-form-item>
            <el-form-item label="Building Name / House Number：">
              <span>{{form.house_number}}</span>
            </el-form-item>
            <el-form-item label="Street Name：">
              <span>{{form.street_name}}</span>
            </el-form-item>
            <el-form-item label="Apartment Number：">
              <span>{{form.apartment_number}}</span>
            </el-form-item>
            <el-form-item label="Postal / Zip Code：">
              <span>{{form.code}}</span>
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
        apartment_number: '1',
        code: '1',
        country: 'United Arab Emirates',
        district: '1',
        house_number: '1',
        id: 0,
        province: '23',
        street_name: '1',
        town: '1',
        uid: 25,
      },
      dialogVisible: false,
      type: 2,
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