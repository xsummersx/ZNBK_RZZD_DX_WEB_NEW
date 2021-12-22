<!--
 * @Author: 吴涛
 * @Date: 2021-11-29 09:29:13
 * @LastEditTime: 2021-12-20 13:47:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 吴涛=》教育局框架
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
      <Map></Map>
      <Analysis></Analysis>
    </div>
    <div class="right-Content float-l">
      <ScoreDis></ScoreDis>
      <ScoreTrend></ScoreTrend>
    </div>
  </div>
</template>
<script>
export default {
  name: "educationRZZD",
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
    //地图
    Map: () => import("../components/eduSchool/Map.vue"),
    //学校认知情况对比
    Analysis: () => import("../components/eduSchool/Analysis.vue"),
    //认知成绩分布
    ScoreDis: () => import("../components/eduSchool/ScoreDis.vue"),
    //认知成绩走势
    ScoreTrend: () => import("../components/eduSchool/ScoreTrend.vue"),
  },
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
