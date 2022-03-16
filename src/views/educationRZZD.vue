<!--
 * @Author: 吴涛
 * @Date: 2021-11-29 09:29:13
 * @LastEditTime: 2022-03-16 16:30:36
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
      <Map class="AnimationMap"></Map>
      <Analysis class="AnimationBottom"></Analysis>
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
  animation: leftInit 3s ease-in;
  -ms-animation: leftInit 3s ease-in; /* IE 9 */
  -moz-animation: leftInit 3s ease-in; /* Firefox */
  -webkit-animation: leftInit 3s ease-in; /* Safari 和 Chrome */
  -o-animation: leftInit 3s ease-in; /* Opera */
}
@keyframes leftInit {
  0% {
    opacity: 0;
    transform: translateX(-420px);
    -ms-transform: translateX(-420px); /* IE 9 */
    -moz-transform: translateX(-420px); /* Firefox */
    -webkit-transform: translateX(-420px); /* Safari 和 Chrome */
    -o-transform: translateX(-420px); /* Opera */
  }
  75% {
    opacity: 0;
    transform: translateX(-420px);
    -ms-transform: translateX(-420px); /* IE 9 */
    -moz-transform: translateX(-420px); /* Firefox */
    -webkit-transform: translateX(-420px); /* Safari 和 Chrome */
    -o-transform: translateX(-420px); /* Opera */
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
    -ms-transform: translateX(0px); /* IE 9 */
    -moz-transform: translateX(0px); /* Firefox */
    -webkit-transform: translateX(0px); /* Safari 和 Chrome */
    -o-transform: translateX(0px); /* Opera */
  }
}
.middle-Content {
  width: 950px;
  height: 934px;
}
.right-Content {
  width: 410px;
  height: 934px;
  animation: rightsInit 3s ease-in;
  -ms-animation: rightInit 3s ease-in; /* IE 9 */
  -moz-animation: rightInit 3s ease-in; /* Firefox */
  -webkit-animation: rightInit 3s ease-in; /* Safari 和 Chrome */
  -o-animation: rightInit 3s ease-in; /* Opera */
}
@keyframes rightInit {
  0% {
    opacity: 0;
    transform: translateX(420px);
    -ms-transform: translateX(420px); /* IE 9 */
    -moz-transform: translateX(420px); /* Firefox */
    -webkit-transform: translateX(420px); /* Safari 和 Chrome */
    -o-transform: translateX(420px); /* Opera */
  }
  75% {
    opacity: 0;
    transform: translateX(420px);
    -ms-transform: translateX(420px); /* IE 9 */
    -moz-transform: translateX(420px); /* Firefox */
    -webkit-transform: translateX(420px); /* Safari 和 Chrome */
    -o-transform: translateX(420px); /* Opera */
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
    -ms-transform: translateX(0px); /* IE 9 */
    -moz-transform: translateX(0px); /* Firefox */
    -webkit-transform: translateX(0px); /* Safari 和 Chrome */
    -o-transform: translateX(0px); /* Opera */
  }
}
.AnimationBottom {
  animation: bottomInit 3s ease-in;
  -ms-animation: bottomInit 3s ease-in; /* IE 9 */
  -moz-animation: bottomInit 3s ease-in; /* Firefox */
  -webkit-animation: bottomInit 3s ease-in; /* Safari 和 Chrome */
  -o-animation: bottomInit 3s ease-in; /* Opera */
}
@keyframes bottomInit {
  0% {
    opacity: 0;
    transform: translateY(106px);
    -ms-transform: translateY(106px); /* IE 9 */
    -moz-transform: translateY(106px); /* Firefox */
    -webkit-transform: translateY(106px); /* Safari 和 Chrome */
    -o-transform: translateY(106px); /* Opera */
  }
  50% {
    opacity: 0;
    transform: translateY(53px);
    -ms-transform: translateY(53px); /* IE 9 */
    -moz-transform: translateY(53px); /* Firefox */
    -webkit-transform: translateY(53px); /* Safari 和 Chrome */
    -o-transform: translateY(53px); /* Opera */
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
    -ms-transform: translateY(0px); /* IE 9 */
    -moz-transform: translateY(0px); /* Firefox */
    -webkit-transform: translateY(0px); /* Safari 和 Chrome */
    -o-transform: translateY(0px); /* Opera */
  }
}
.AnimationMap {
  animation: MapInit 3s ease-in;
  -ms-animation: MapInit 3s ease-in; /* IE 9 */
  -moz-animation: MapInit 3s ease-in; /* Firefox */
  -webkit-animation: MapInit 3s ease-in; /* Safari 和 Chrome */
  -o-animation: MapInit 3s ease-in; /* Opera */
}
@keyframes MapInit {
  0% {
    opacity: 0;
    transform: rotate(15deg) scale(0.1);
    -ms-transform: rotate(15deg) scale(0.1); /* IE 9 */
    -moz-transform: rotate(15deg) scale(0.1); /* Firefox */
    -webkit-transform: rotate(15deg) scale(0.1); /* Safari 和 Chrome */
    -o-transform: rotate(15deg) scale(0.1); /* Opera */
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1); /* IE 9 */
    -moz-transform: rotate(0deg) scale(1); /* Firefox */
    -webkit-transform: rotate(0deg) scale(1); /* Safari 和 Chrome */
    -o-transform: rotate(0deg) scale(1); /* Opera */
  }
}
</style>
