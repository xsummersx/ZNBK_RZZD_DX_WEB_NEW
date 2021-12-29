<!--
 * @Author: your name
 * @Date: 2021-12-10 15:03:34
 * @LastEditTime: 2021-12-14 15:49:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\common\title.vue
-->
<template>
  <div class="title">
    {{ titleStr }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    titleStr: String,
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin-top: 18px;
  height: 35px;
  background: url("~@/assets/img/common/学生认知成绩单标题BG.png") center left no-repeat;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  padding-left: 45px;
}
</style>
