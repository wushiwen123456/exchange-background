<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" width="30%">
      <scroll-container>
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-form :model="form" label-width="auto" size="small">
            <el-form-item label="Upload file：">
              <img :src="myAvatar" class="avatar" />
            </el-form-item>
            <el-form-item label="Passport Issuing Country：">
              <span>{{form.country}}</span>
            </el-form-item>
            <el-form-item label="Passport Number：">
              <span>{{form.number}}</span>
            </el-form-item>
            <el-form-item label="Expiration Date：">
              <span>{{form.time | capitalizeTime}}</span>
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
        card_url: 'images/topic/20200731/fb5a692fc7216ffd1c3cf8c50dae1e71.jpg',
        country: 'Angola',
        id: 2,
        number: '1',
        time: 1594828800,
        uid: 16,
      },
      dialogVisible: false,
      type: 1,
      uid: 16,
      status: 0,
    }
  },
  computed: {
    title() {
      return '' + '用户的详情'
    },
    myAvatar() {
      return this.$baseUrl + this.form.card_url
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
.avatar {
  width: 178px;
  height: 178px;
}
</style>