<!--
 * @Author: 吴涛
 * @Date: 2021-08-09 16:11:24
 * @LastEditTime: 2021-12-03 11:55:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: 测试文件，弹窗例子
-->
<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开弹窗</el-button>
    <el-dialog
      title="添加疑难知识点"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="720px"
      top="0vh"
    >
      <div>
        <div style="height: 400px">此处为内容</div>
        <div class="diaBottom">
          <div class="diaBtnCancal">取消</div>
          <div class="diaBtn">确定</div>
        </div>
      </div>
    </el-dialog>
    <div style="width: 460px; height: 400px">
      <!-- <vuescroll :ops="$global_Ops.ops"> -->
      <el-scrollbar style="height: 100%">
        <div
          style="
            width: 450px;
            height: 2000px;
            background: linear-gradient(#e66465, #9198e5);
          "
        ></div>
      </el-scrollbar>
      <!-- </vuescroll> -->
    </div>
  </div>
</template>
<script>
//按需引入组件，需要用到的地方引入vuescroll组件
// import vuescroll from "vuescroll";
export default {
  name: "",
  data() {
    return {
      dialogVisible: false, //默认隐藏弹框
    };
  },
  // components: {
  //   vuescroll,
  // },
};
</script>
<style lang="scss" scoped>
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
