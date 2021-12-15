<!--
 * @Author: 柳欢
 * @Date: 2021-12-13 16:15:01
 * @LastEditTime: 2021-12-14 08:56:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\gradeTeacher\GradeAnswer.vue
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计">
      <div class="rightOption float-r">
        <div class="checkPaper float-r" @click="checkPaper()">
          <span class="exportIcon"></span>
          查看试卷对比分析
        </div>
      </div>
    </ArrowTitle>
    <div class="right-long-box">
      <div class="float-l timeText">
        <div
          @click="chooseActiveTime(index)"
          :class="
            index == activeTimeIndex ? 'active-timeItem' : 'normal-timeItem'
          "
          class="timeItem"
          v-for="(item, index) in timeList"
          :key="index"
        >
          {{ item.day }}<br />
          {{ item.date }}
        </div>
      </div>
      <div class="float-l timeLine"></div>
      <div class="float-l paperText">
        <div
          @click="chooseActivePaper(index)"
          :class="
            index == activePaperIndex ? 'active-paperItem' : 'normal-paperItem'
          "
          class="paperItem"
          v-for="(item, index) in paperList"
          :key="index"
        >
          <span
            ><span>{{ item.day }}</span
            ><span style="font-size: 12px">分</span></span
          >
        </div>
      </div>
      <div class="float-r">
        <div class="right-btn clearfix">
          <span class="float-l paper-name">2020南湖实验三校联考卷</span>
          <span class="float-r paper-checkBtn">试卷题型得分分析</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn">学生成绩单</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn">班级成绩对比分析</span>
        </div>
        <div id="responseCharts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTimeIndex: 0,
      activePaperIndex: 0,
      timeList: [
        { day: "星期一", date: "11月28日" },
        { day: "星期一", date: "11月28日" },
        { day: "星期一", date: "11月28日" },
      ],
      paperList: [{ day: "85" }, { day: "85" }, { day: "85" }],
    };
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    chooseActiveTime(i) {
      this.activeTimeIndex = i;
    },
    chooseActivePaper(i) {
      this.activePaperIndex = i;
    },
    drawLine() {
      // let xData2 = [];
      // let seriesData2 = [];
      // let MAX = [];
      // let that = this;
      // let TypeInfoAvgScore = (that.resInfo.TypeInfoAvgScore * 100).toFixed();
      // for (let i = 0; i < that.resInfo.TypeInfoList.length; i++) {
      //   xData2.push(that.resInfo.TypeInfoList[i].TypeName);
      //   var bol = that.resInfo.MinRateGenreName.some(function (element) {
      //     if (element == that.resInfo.TypeInfoList[i].TypeName) {
      //       return element;
      //     }
      //   });
      // }
      var echarts = require("echarts");
      var responseCharts = echarts.init(
        document.getElementById("responseCharts")
      );
      responseCharts.setOption(this.$optionObj.responseOption);
      responseCharts.setOption({});
    },
  },
};
</script>

<style lang="scss" scoped>
.right-long-box {
  width: 1270px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 16px 24px 0 0;
  overflow: hidden;
}

.rightOption {
  .checkPaper {
    background: url("../../assets/img/grade/btn.png") -0px -140px no-repeat;
    width: 150px;
    height: 28px;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
    color: #ffffff;
    cursor: pointer;
    .exportIcon {
      width: 14px;
      height: 14px;
      display: inline-block;
      vertical-align: middle;
      background: url("../../assets/img/grade/查看试卷对比分析.png") center
        center no-repeat;
    }
  }
  .checkPaper:hover {
    background: url("../../assets/img/grade/btn.png") -0px -84px no-repeat;
  }
  .checkPaper:active {
    background: url("../../assets/img/grade/btn.png") -0px -112px no-repeat;
  }
}
</style>