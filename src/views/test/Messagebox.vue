<!--
 * @Author: your name
 * @Date: 2021-08-09 15:25:56
 * @LastEditTime: 2021-09-27 15:16:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lancooui\src\components\HelloWorld.vue
-->
<template>
  <div>
    <div>
      <el-button type="text" @click="openBig('success')">大打钩</el-button>
      <el-button type="text" @click="openBig('error')">大打叉</el-button>
      <el-button type="text" @click="openBig('warning')">大叹号</el-button>
      <el-button type="text" @click="openBig('info')">大问号</el-button>
    </div>
    <div>
      <el-button type="text" @click="openMessage('success')">打钩</el-button>
      <el-button type="text" @click="openMessage('error')">打叉</el-button>
      <el-button type="text" @click="openMessage('warning')">叹号</el-button>
      <el-button type="text" @click="openMessage('info')">问号</el-button>
    </div>
    <div>
      <el-button type="text" @click="openSuccess">打钩</el-button>
      <el-button type="text" @click="openError">打叉</el-button>
      <el-button type="text" @click="openWarning">叹号</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "messagebox",
  data() {
    return {};
  },
  methods: {
    //大的提示框
    openBig(type) {
      this.$messagebox
        .confirm("此操作将永久删除该文件, 是否继续?", "课件保存失败", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: type, //蓝色叹号-warning， //warning,问号-info，绿色打钩-success，//红色错误-error
          center: true,
          customClass: "MessageBig",
        })
        .then(() => {})
        .catch(() => {});
    },
    //小的提示框
    openMessage(type) {
      this.$messagebox
        .confirm("此操作将永久删除该文件, 是否继续?", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: type, //蓝色叹号-warning， //warning,问号-info，绿色打钩-success，//红色错误-error
        })
        .then(() => {})
        .catch(() => {});
    },
    //打钩
    openSuccess() {
      this.$message({
        type: "success",
        message: "删除成功!",
        duration: 150000,
      });
    },
    //打叉
    openError() {
      this.$message({
        type: "error",
        message: "删除成功!",
        duration: 150000,
      });
    },
    //叹号
    openWarning() {
      this.$message({
        type: "warning",
        message: "删除成功!",
        duration: 150000,
      });
    },
  },
};
</script>
