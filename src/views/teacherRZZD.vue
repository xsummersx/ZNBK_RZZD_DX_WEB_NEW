<!--
 * @Author: 教师框架
 * @Date: 2021-11-29 09:29:55
 * @LastEditTime: 2021-12-27 19:15:27
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
    <div
      class="right-Content float-r"
      :class="switchToShow ? 'right-Content2' : 'right-Content1'"
    >
      <div class="switchTab">
        <span @click="switchTo(1)">班级教学管理</span>
        <span @click="switchTo(0)">班级认知详情</span>
      </div>
      <div v-show="!switchToShow">
        <VocabularyTeach class="float-l"></VocabularyTeach>
        <GrammarTeach class="float-l"></GrammarTeach>
        <MakeQuestion class="float-l"></MakeQuestion>
        <LanguageTeach class="float-l"></LanguageTeach>
        <StudyTeach class="float-l"></StudyTeach>
      </div>
      <div v-show="switchToShow">
        <TeachTop></TeachTop>
        <PaperReport></PaperReport>
        <TeacherAnswer></TeacherAnswer>
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
    VocabularyTeach: () => import("../components/paperTwo/VocabularyTeach.vue"),
    GrammarTeach: () => import("../components/paperTwo/GrammarTeach.vue"),
    MakeQuestion: () => import("../components/paperTwo/MakeQuestion.vue"),
    LanguageTeach: () => import("../components/paperTwo/LanguageTeach.vue"),
    StudyTeach: () => import("../components/paperTwo/StudyTeach.vue"),
    TeachTop: () => import("../components/gradeTeacher/TeachTop.vue"),
    PaperReport: () => import("../components/gradeTeacher/PaperReport.vue"),
    TeacherAnswer: () => import("../components/gradeTeacher/TeacherAnswer.vue"),
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
}
.right-Content1 {
  background: url("../assets/img/teacher/右侧BG.png") -0px -934px no-repeat;
}
.right-Content2 {
  background: url("../assets/img/teacher/右侧BG.png") -0px -0px no-repeat;
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
