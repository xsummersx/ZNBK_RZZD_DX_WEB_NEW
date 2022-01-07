<!--
 * @Author: 柳欢
 * @Date: 2021-12-29 09:05:28
 * @LastEditTime: 2021-12-29 09:05:28
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\studentRZZD.vue
-->
<template>
  <div class="clearfix">
    <div class="left-Content float-l">
      <StuNum></StuNum>
      <StuScore></StuScore>
      <StuGrades></StuGrades>
    </div>
    <div class="right-Content float-r">
      <VocabularyStu class="float-l"></VocabularyStu>
      <GrammarStu class="float-l"></GrammarStu>
      <LanguageStu class="float-l"></LanguageStu>
      <StuStudy class="float-l"></StuStudy>
      <StuQuestion class="float-l"></StuQuestion>
      <StuAnswer class="float-l"></StuAnswer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    StuNum: () => import("../components/gradeTeacher/StuNum.vue"),
    StuScore: () => import("../components/gradeTeacher/StuScore.vue"),
    StuGrades: () => import("../components/gradeTeacher/StuGrades.vue"),
    VocabularyStu: () => import("../components/paperTwo/VocabularyStu.vue"),
    GrammarStu: () => import("../components/paperTwo/GrammarStu.vue"),
    LanguageStu: () => import("../components/paperTwo/LanguageStu.vue"),
    StuQuestion: () => import("../components/student/StuQuestion.vue"),
    StuStudy: () => import("../components/student/StuStudy.vue"),
    StuAnswer: () => import("../components/student/StuAnswer.vue"),
  },
};
</script>

<style lang="scss" scoped>
.left-Content {
  width: 400px;
  height: 934px;
}
.right-Content {
  width: 1350px;
  height: 934px;
  padding: 10px 40px 20px;
  background: url("../assets/img/student/内容框bg.png") center center no-repeat;
}
</style>
