<template>
  <div class="hello">
    <el-button @click="()=>isOpen(true)">显示</el-button>
    <custom-dialog :visible.sync="visibleDialog" @opened="isOpen" @confirm="handleConfirm" title="组件封装">
      这是一段内容
    </custom-dialog>
    <el-button type="danger">删除</el-button>
  </div>
</template>

<script>
import customDialog from './custom-dialog'
export default {
  name: 'HelloWorld',
  components: {customDialog},
  data () {
    return {
      visibleDialog: false
    }
  },
  methods: {
    // 确定按钮触发
    handleConfirm () {

    },
    // 取消，隐藏dialog
    isOpen (bool) {
      this.visibleDialog = bool
    }
  }
}
</script>
