<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="75%"
    customClass="customWH"
    @close="cleanEditor"
  >
    <scroll-container height="50vh">
      <el-scrollbar style="height:100%" wrap-class="default-scrollbar__wrap">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </el-scrollbar>
    </scroll-container>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { agreementDetail, agreementEdit } from '@/api'
// Import the editor
import ScrollContainer from '@/components/ScrollContainer'

import { quillEditor } from 'vue-quill-editor' //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor,
    ScrollContainer,
  },
  data() {
    return {
      dialogVisible: false,
      title: '文章详情',
      content: ``,
      editorOption: {},
      data: {},
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
  },
  methods: {
    open(id) {
      this.dialogVisible = true
      if (id) {
        this.getDetailData(id)
      }
    },
    getDetailData(id) {
      this.loading = true
      agreementDetail({ id }).then((res) => {
        this.loading = false
        if (res.code == 200) {
          this.data = res.data
          this.content = res.data.content
        }
      })
    },
    cleanEditor() {
      this.content = ''
    },
    handleSubmit() {
      const data = this.data
      data.content = this.content
      agreementEdit(data).then((res) => {
        if (res.code == 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: res.msg,
          })
        }
      })
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
  },
}
</script>