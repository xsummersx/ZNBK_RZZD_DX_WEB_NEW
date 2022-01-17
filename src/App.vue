<!--
 * @Author: your name
 * @Date: 2021-11-24 09:50:11
 * @LastEditTime: 2021-12-24 16:38:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\App.vue
-->
<template>
  <div
    id="app"
    :class="$route.name == 'educationRZZD' ? 'eduBack' : 'backRepeat'"
    v-title
    data-title="学生大数据认知诊断报告"
  >
    <router-view />
  </div>
</template>

<style lang="scss">
.backRepeat {
  min-width: 1920px;
  background: url("../src/assets/img/head/MainBack.png") center center no-repeat,
    url("../src/assets/img/head/背景右1.png") center center repeat;
}
.eduBack {
  min-width: 1920px;
  background: url("../src/assets/img/head/整体大BG.png") center center no-repeat;
  background-size: cover;
}
</style>
