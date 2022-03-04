<!--
 * @Author: 柳欢
 * @Date: 2021-11-29 09:29:43
 * @LastEditTime: 2022-03-04 15:43:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 柳欢负责=》年级组长框架  gradeRZZD
-->
<template>
  <div class="clearfix">
    <div class="left-Content float-l">
      <PaperNumber></PaperNumber>
      <CognitiveScore></CognitiveScore>
      <PredictedGrades></PredictedGrades>
    </div>
    <div class="right-Content float-r" :class="switchToShow ? 'right-Content1' : 'right-Content2'">
      <div class="switchTab">
        <span @click="switchTo(1)">年级教学管理</span>
        <span @click="switchTo(0)">年级认知详情</span>
      </div>
      <div v-show="!switchToShow">
        <VocabularyGrade class="float-l"></VocabularyGrade>
        <GrammarGrade class="float-l"></GrammarGrade>
        <MakeQuestion class="float-l"></MakeQuestion>
        <LanguageGrade class="float-l"></LanguageGrade>
        <StudyGrade class="float-l"></StudyGrade>
      </div>
      <div v-show="switchToShow">
        <GradeTop></GradeTop>
        <GradeCompare></GradeCompare>
        <GradeAnswer></GradeAnswer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      switchToShow: true,
    };
  },
  methods: {
    switchTo(boolean) {
      this.switchToShow = boolean;
    },
  },
  components: {
    PaperNumber: () => import("../components/gradeTeacher/PaperNumber.vue"),
    CognitiveScore: () => import("../components/gradeTeacher/CognitiveScore.vue"),
    PredictedGrades: () => import("../components/gradeTeacher/PredictedGrades.vue"),
    VocabularyGrade: () => import("../components/paperTwo/VocabularyGrade.vue"),
    GrammarGrade: () => import("../components/paperTwo/GrammarGrade.vue"),
    MakeQuestion: () => import("../components/paperTwo/MakeQuestion.vue"),
    LanguageGrade: () => import("../components/paperTwo/LanguageGrade.vue"),
    StudyGrade: () => import("../components/paperTwo/StudyGrade.vue"),
    GradeTop: () => import("../components/gradeTeacher/GradeTop.vue"),
    GradeCompare: () => import("../components/gradeTeacher/GradeCompare.vue"),
    GradeAnswer: () => import("../components/gradeTeacher/GradeAnswer.vue"),
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
  padding: 0 40px 20px;
  background: url("../assets/img/teacher/右侧BG.png") -0px -934px no-repeat;
}
.right-Content1 {
  background: url("../assets/img/teacher/右侧BG.png") -0px -0px no-repeat;
}
.right-Content2 {
  background: url("../assets/img/teacher/右侧BG.png") -0px -934px no-repeat;
}
.switchTab {
  height: 44px;
  line-height: 44px;
  font-family: "YouSheBiaoTiHei";
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  span {
    width: 200px;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
