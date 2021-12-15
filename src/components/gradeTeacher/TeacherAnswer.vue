<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:52:21
 * @LastEditTime: 2021-12-14 13:59:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师-历次作答统计
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计"></ArrowTitle>
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
          <span class="float-r paper-checkBtn"  @click="dialog(1)">试卷题型得分分析</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="dialog(2)">学生成绩单</span>
        </div>
        <div id="responseCharts"></div>
      </div>
    </div>
    <el-dialog title="班级成绩对比分析" :visible.sync="dialogVisible" :close-on-click-modal="false" width="720px" top="0vh">
        <div>
          <AnalyseDialog v-if="dialogIndex==1"></AnalyseDialog>
          <StuReport v-else></StuReport>
        </div>
    </el-dialog>
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
      dialogVisible: false, //默认隐藏弹框
      dialogIndex:1,//弹窗，学生成绩单，
    };
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    AnalyseDialog: () => import("../../views/dialog/AnalyseDialog.vue"),
    StuReport: () => import("../../views/dialog/StuReport.vue"),
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
    dialog(i){
      this.dialogVisible = true;
      this.dialogIndex = i;
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
<style lang="scss">
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
</style>
<style lang="scss" scoped>
.right-long-box {
  width: 1270px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 16px 24px 0 0;
  overflow: hidden;
}
</style>