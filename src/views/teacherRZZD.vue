<!--
 * @Author: 教师框架
 * @Date: 2021-11-29 09:29:55
 * @LastEditTime: 2021-12-09 11:14:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 柳欢=》负责教师框架
-->
<template>
  <div class="clearfix">
    <div class="left-Content float-l">
        <PaperNumber></PaperNumber>
        <CognitiveScore></CognitiveScore>
        <PredictedGrades></PredictedGrades>
    </div>
    <div class="right-Content float-r">
      <VocabularyTeach class="float-l"></VocabularyTeach>
      <GrammarTeach class="float-l"></GrammarTeach>
      <MakeQuestion class="float-l"></MakeQuestion>
      <LanguageTeach class="float-l"></LanguageTeach>
      <StudyTeach class="float-l"></StudyTeach>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    PaperNumber: () => import("../components/gradeTeacher/PaperNumber.vue"),
    CognitiveScore: () => import("../components/gradeTeacher/CognitiveScore.vue"),
    PredictedGrades: () => import("../components/gradeTeacher/PredictedGrades.vue"),
    VocabularyTeach: () => import("../components/paperTwo/VocabularyTeach.vue"),
    GrammarTeach: () => import("../components/paperTwo/GrammarTeach.vue"),
    MakeQuestion: () => import("../components/paperTwo/MakeQuestion.vue"),
    LanguageTeach: () => import("../components/paperTwo/LanguageTeach.vue"),
    StudyTeach: () => import("../components/paperTwo/StudyTeach.vue"),
  },
};
</script>

<style lang="scss" scoped>
.left-Content {
  width: 400px;height: 934px
}
.right-Content {
  width: 1350px;height: 934px;padding:0 40px 20px;
  background: url("../assets/img/teacher/右侧BG_教学管理.png") center center
    no-repeat;
}
</style>
