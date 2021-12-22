<!--
 * @Author: 吴涛
 * @Date: 2021-11-29 09:29:31
 * @LastEditTime: 2021-12-21 19:04:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 吴涛=》校长框架
-->
<template>
  <div class="clearfix">
    <!-- 左边 -->
    <div class="left-Content float-l">
      <PaperNumber></PaperNumber>
      <CognitiveScore></CognitiveScore>
      <PredictedGrades></PredictedGrades>
    </div>
    <div class="middle-Content float-l">
      <AnalysisTable></AnalysisTable>
    </div>
    <div class="right-Content float-l">
      <ScoreDis></ScoreDis>
      <ScoreTrend></ScoreTrend>
    </div>
  </div>
</template>
<script>
export default {
  name: "schoolRZZD",
  data() {
    return {};
  },
  components: {
    //累计作答试卷
    PaperNumber: () => import("../components/eduSchool/PaperNumber.vue"),
    //认知平均分
    CognitiveScore: () => import("../components/eduSchool/CognitiveScore.vue"),
    //高考预估成绩
    PredictedGrades: () => import("../components/eduSchool/PredictedGrades.vue"),
    //班级认知情况对比分析
    AnalysisTable: () => import("../components/eduSchool/AnalysisTable.vue"),
    //认知成绩分布
    ScoreDis: () => import("../components/eduSchool/ScoreDis.vue"),
    //认知成绩走势
    ScoreTrend: () => import("../components/eduSchool/ScoreTrend.vue"),
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.left-Content {
  width: 400px;
  height: 934px;
}
.middle-Content {
  width: 950px;
  height: 934px;
}
.right-Content {
  width: 410px;
  height: 934px;
}
</style>
