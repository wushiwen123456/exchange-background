<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" top="6vh" :before-close="close">
      <scroll-container v-loading="loading">
        <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
          <el-form :model="form" label-width="auto" size="small">
            <el-form-item label="账号：">
              <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="UID：">
              <span>{{form.uid}}</span>
            </el-form-item>
            <el-form-item label="用户名：">
              <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item label="邀请码：">
              <span>{{form.invitation}}</span>
            </el-form-item>
            <el-form-item label="个人信息：">
              <el-tag v-if="form.personInfoStatus > 0" type="success">已认证</el-tag>
              <el-tag v-if="form.personInfoStatus == -2" type="danger">未通过</el-tag>
              <el-tag v-if="form.personInfoStatus == 0" type="warning">审核中</el-tag>
              <el-tag v-if="form.personInfoStatus == -1" type="info">未认证</el-tag>
              <el-button v-if="form.personInfoStatus != -1" @click="handleCheck(0)">查看</el-button>
              <el-button
                v-if="form.personInfoStatus == 0"
                :icon="perLoading ? 'el-icon-loading':''"
                @click="aPress(0)"
                type="primary"
              >通过</el-button>
              <el-button
                v-if="form.personInfoStatus == 0"
                :icon="perLoading1 ? 'el-icon-loading':''"
                @click="noAPress(0)"
                type="warning"
              >拒绝</el-button>
            </el-form-item>
            <el-form-item label="证件信息：">
              <el-tag v-if="form.identityStatus > 0" type="success">已认证</el-tag>
              <el-tag v-if="form.identityStatus == -2" type="danger">未通过</el-tag>
              <el-tag v-if="form.identityStatus == 0" type="warning">审核中</el-tag>
              <el-tag v-if="form.identityStatus == -1" type="info">未认证</el-tag>
              <el-button v-if="form.identityStatus != -1" @click="handleCheck(1)">查看</el-button>
              <el-button
                v-if="form.identityStatus == 0"
                :icon="ideLoading?'el-icon-loading':''"
                type="primary"
                @click="aPress(1)"
              >通过</el-button>
              <el-button
                v-if="form.identityStatus == 0"
                :icon="ideLoading1?'el-icon-loading':''"
                type="warning"
                @click="noAPress(1)"
              >拒绝</el-button>
            </el-form-item>
            <el-form-item label="地址信息：">
              <el-tag v-if="form.addressStatus > 0" type="success">已认证</el-tag>
              <el-tag v-if="form.addressStatus == -2" type="danger">未通过</el-tag>
              <el-tag v-if="form.addressStatus == 0" type="warning">审核中</el-tag>
              <el-tag v-if="form.addressStatus == -1" type="info">未认证</el-tag>
              <el-button v-if="form.addressStatus != -1" @click="handleCheck(2)">查看</el-button>
              <el-button
                v-if="form.addressStatus == 0"
                :icon="addLoading?'el-icon-loading':''"
                @click="aPress(2)"
                type="primary"
              >通过</el-button>
              <el-button
                v-if="form.addressStatus == 0"
                :icon="addLoading1?'el-icon-loading':''"
                @click="noAPress(2)"
                type="warning"
              >拒绝</el-button>
            </el-form-item>
            <el-form-item label="支付信息：">
              <el-tag v-if="form.financeStatus > 0" type="success">已认证</el-tag>
              <el-tag v-if="form.financeStatus == -2" type="danger">未通过</el-tag>
              <el-tag v-if="form.financeStatus == 0" type="warning">审核中</el-tag>
              <el-tag v-if="form.financeStatus == -1" type="info">未认证</el-tag>
              <el-button v-if="form.financeStatus != -1" @click="handleCheck(3)">查看</el-button>
              <el-button
                v-if="form.financeStatus == 0"
                :icon="finLoading?'el-icon-loading':''"
                @click="aPress(3)"
                type="primary"
              >通过</el-button>
              <el-button
                v-if="form.financeStatus == 0"
                :icon="finLoading1?'el-icon-loading':''"
                @click="noAPress(3)"
                type="warning"
              >拒绝</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </scroll-container>
    </el-dialog>
    <add-detail ref="add" @pass="pass" @noPass="noPass"></add-detail>
    <fin-detail ref="fin" @pass="pass" @noPass="noPass"></fin-detail>
    <ide-detail ref="ide" @pass="pass" @noPass="noPass"></ide-detail>
    <per-detail ref="per" @pass="pass" @noPass="noPass"></per-detail>
  </div>
</template>

<script>
import ScrollContainer from '@/components/ScrollContainer'
import * as cpns from './details'
import { aPress } from '@/api'

export default {
  components: {
    ScrollContainer,
    ...cpns,
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      perLoading: false,
      ideLoading: false,
      addLoading: false,
      finLoading: false,

      perLoading1: false,
      ideLoading1: false,
      addLoading1: false,
      finLoading1: false,
      loading: false,
      name: '',
    }
  },
  computed: {
    title() {
      return '用户资料'
    },
  },
  methods: {
    open(item, name) {
      this.form = item
      this.name = name
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    pass(type) {
      switch (type) {
        case 0:
          this.form.personInfoStatus = 1
          this.$emit('refresh')
          break
        case 1:
          this.form.identityStatus = 1
          this.$emit('refresh')
          break
        case 2:
          this.form.addressStatus = 1
          this.$emit('refresh')
          break
        case 3:
          this.form.financeStatus = 1
          this.$emit('refresh')
          break
      }
    },
    noPass(type) {
      switch (type) {
        case 0:
          this.form.personInfoStatus = -2
          this.$emit('refresh')
          break
        case 1:
          console.log('111')
          this.form.identityStatus = -2
          this.$emit('refresh')
          break
        case 2:
          this.form.addressStatus = -2
          this.$emit('refresh')
          break
        case 3:
          this.form.financeStatus = -2
          this.$emit('refresh')
          break
      }
    },
    handleCheck(status) {
      const {
        personInfoStatus,
        identityStatus,
        addressStatus,
        financeStatus,
        id,
      } = this.form
      switch (status) {
        case 0:
          this.$refs.per.open(personInfoStatus, id)
          break
        case 1:
          this.$refs.ide.open(identityStatus, id)
          break
        case 2:
          this.$refs.add.open(addressStatus, id)
          break
        case 3:
          this.$refs.fin.open(financeStatus, id)
          break
        default:
          break
      }
    },
    // 认证通过
    aPress(num, status) {
      switch (num) {
        case 0:
          this.perLoading = true
          break
        case 1:
          this.ideLoading = true
          break
        case 2:
          this.addLoading = true
          break
        case 3:
          this.finLoading = true
          break
      }
      const data = {
        id: this.form.id,
        operation: status,
        type: num,
      }
      aPress(data).then((res) => {
        if (res.code == 200) {
          switch (num) {
            case 0:
              this.perLoading = false
              this.form.personInfoStatus = 1
              this.$emit('refresh')
              break
            case 1:
              this.ideLoading = false
              this.form.identityStatus = 1
              this.$emit('refresh')
              break
            case 2:
              this.addLoading = false
              this.form.addressStatus = 1
              this.$emit('refresh')
              break
            case 3:
              this.finLoading = false
              this.form.financeStatus = 1
              this.$emit('refresh')
              break
          }
        }
      })
    },
    // 认证拒绝
    noAPress(num) {
      switch (num) {
        case 0:
          this.perLoading1 = true
          break
        case 1:
          this.ideLoading1 = true
          break
        case 2:
          this.addLoading1 = true
          break
        case 3:
          this.finLoading1 = true
          break
      }
      const data = {
        id: this.form.id,
        operation: 1,
        type: num,
      }
      aPress(data).then((res) => {
        if (res.code == 200) {
          switch (num) {
            case 0:
              this.perLoading1 = false
              this.form.personInfoStatus = -2
              this.$emit('refresh')
              break
            case 1:
              this.ideLoading1 = false
              this.form.identityStatus = -2
              this.$emit('refresh')
              break
            case 2:
              this.addLoading1 = false
              this.form.addressStatus = -2
              this.$emit('refresh')
              break
            case 3:
              this.finLoading1 = false
              this.form.financeStatus = -2
              this.$emit('refresh')
              break
          }
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