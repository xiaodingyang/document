<template>
  <div id="app">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* primary 主要按钮 */
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #2dc84d;
  border-color: #2dc84d;
  color: #ffffff;
}

.el-button--primary {
  background-color: #2dc84d;
  border-color: #2dc84d;
  color: #ffffff;
}

/* danger 删除按钮 */
.el-button--danger:focus,
.el-button--danger:hover {
  background-color: #ec4758;
  border-color: #ec4758;
  color: #ffffff;
}

.el-button--danger {
  background-color: #ed5565;
  border-color: #ed5565;
  color: #ffffff;
}
</style>
