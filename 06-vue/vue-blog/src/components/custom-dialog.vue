<template>
  <el-dialog :visible.sync="visibleDialog" v-bind="$attrs" v-on="$listeners">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button @click="()=>isOpen(false)">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  // 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)，将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
  inheritAttrs: false,
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // el-dialog 中传入visible属性，且通过改变值来隐藏，然而，子组件不能改变父组件属性，因此，需要计算属性实现。计算属性的set通过$emit改变父组件visible的值
    visibleDialog: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    // 对外抛出isOpen事件，通过参数决定显示隐藏
    isOpen (bool) {
      this.$emit('opened', bool)
    },
    // 对外抛出 confirm事件
    handleConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>
