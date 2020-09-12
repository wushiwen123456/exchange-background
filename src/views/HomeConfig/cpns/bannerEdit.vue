<template>
  <el-dialog title="轮播图编辑" :visible.sync="dialogVisible" width="40%">
    <scroll-container>
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <el-form :model="form" ref="form" label-width="auto">
          <el-form-item label="PC/移动：">
            <div>
              <el-radio v-model="form.type" :label="0" border size="medium"
                >PC端</el-radio
              >
              <el-radio v-model="form.type" :label="1" border size="medium" @change="handleChange"
                >移动端</el-radio
              >
            </div>
          </el-form-item>
          <el-form-item :label="myTips">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :headers="header"
              name="image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              list-type="picture"
            >
              <img v-if="form.url" :src="image(form.url)" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="链接：">
            <el-input
              v-model="form.link"
              class="form-input"
              placeholder="图片链接地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序（值越大越靠前）：">
            <el-input
              v-model.number="form.sort"
              class="form-input"
              placeholder="排序"
            ></el-input>
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
import { setBanner } from '@/api'
export default {
  filters: {
    capitalizeUpper(name) {
      return name.toUpperCase() || ''
    }
  },
  components: {
    ScrollContainer
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        sort: '',
        url: '',
        link: '',
        type:0
      }
    }
  },
  computed: {
    action() {
      return this.$baseUrl + 'user/uploadFile'
    },
    header() {
      return {
        token: this.$store.getters.loginStatus
      }
    },
    image() {
      return url => {
        return this.$baseUrl + url
      }
    },
    myTips(){
      return this.form.type == 0 ? '推荐尺寸：1903*590：' : '推荐尺寸：375*165：'
    }
  },
  methods: {
    open(row) {
      if (row) {
        // 编辑
        this.form = Object.assign({}, row)
      } else {
        // 添加
        this.form = {
          sort: '',
          url: '',
          link: '',
          type:0
        }
      }
      this.dialogVisible = true
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.form.url = res.data
      }
    },
    handleSubmit() {
      setBanner(this.form).then(res => {
        if(res.code == 200){
          this.dialogVisible = false
          this.$message({
            type:'success',
            message:res.msg
          })
          this.$emit('refresh')
        }
      })
    },
    handleChange(){
      console.log(this.form)
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 243px;
  height: 75px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 243px;
  height: 75px;
  display: block;
}
.form-input {
  width: 50%;
}
</style>
