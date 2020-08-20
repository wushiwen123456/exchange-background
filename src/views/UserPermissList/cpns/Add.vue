<template>
  <el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%">
    <el-form :model="form">
      <el-form-item label="角色名">
        <el-input v-model="form.name" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        desc: '',
      },
      dialogVisible: false,
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
  },
}
</script>

<style>
</style>