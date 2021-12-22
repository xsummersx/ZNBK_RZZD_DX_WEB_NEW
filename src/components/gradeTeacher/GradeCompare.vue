<!--
 * @Author: 柳欢
 * @Date: 2021-12-14 15:36:48
 * @LastEditTime: 2021-12-15 14:21:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 班级认知情况对比分析
-->
<template>
  <div>
    <ArrowTitle titleStr="班级认知情况对比分析"></ArrowTitle>
    <div id="compareCharts"></div>
  </div>
</template>

<script>
import { GetGradeClassCongnitiveTrastAnalysis_V3 } from "@/api/gradeTeacher/right";
export default {
  data() {
    return {
      resInfo: {},
    };
  },
  created() {
    let params = {
      Token: this.$store.state.Token,
      TID: this.$store.state.TID,
      ProvinceID: this.$store.state.ProvinceID,
      CityID: this.$store.state.CityID,
      CountyID: this.$store.state.CountyID,
      GlobalGrade: this.$store.state.GlobalGrade,
      SchoolID: this.$store.state.SchoolID,
      ZsdArea: this.$store.state.ZsdArea,
    };
    GetGradeClassCongnitiveTrastAnalysis_V3(params).then((res) => {
      this.resInfo = res.Data;
      this.drawLine();
    });
  },
  mounted() {},
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
  },
  methods: {
    drawLine() {
      // let xDate = ["高三(2)班", "高三(2)班", "高三(2)班", "高三(2)班", "高三(2)班"];
      // let paper = [100, 111, 240, 50, 60];
      // let score = [88, 64, 66, 70, 90];
      // let score2 = [8888, 4444, 6666, 7421, 1111];
      // let score3 = [100, 85, 66, 44, 15];

      let xDate = [];
      let paper = [];
      let score = [];
      let score2 = [];
      let score3 = [];
      for (let i = 0; i < this.resInfo.length; i++) {
        xDate.push(this.resInfo[i].CourseClassName);
        paper.push(this.resInfo[i].FinishedPaperNum);
        score.push((this.resInfo[i].AvgRate * 100).toFixed());
        score2.push(this.resInfo[i].AvgIndex);
        score3.push(this.resInfo[i].AvgScore);
      }
      var echarts = require("echarts");
      var compareCharts = echarts.init(document.getElementById("compareCharts"));
      compareCharts.setOption(this.$optionObj.compareOption);
      compareCharts.setOption({
        tooltip: {
          backgroundColor: "rgba(0,32,92,0)",
          borderColor: "rgba(0,242,255,0)",
          borderWidth: 0,
          textStyle: {
            color: "#a2afcc",
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0);",
          padding: [20, 20, 20, 20],
          formatter: function (param) {
            var resultTooltip =
              "<div class='toolImg clearfix' style=''>" +
              "<div class='float-l' style='line-height:25px'>" +
              "<div style=''> " +
              param[0].seriesName +
              "</div>" +
              "<div style=''> " +
              param[1].seriesName +
              "</div>" +
              "<div style=''> " +
              param[2].seriesName +
              "</div>" +
              "<div style=''> " +
              param[3].seriesName +
              "</div>" +
              "</div>" +
              "<div  class='float-r' style='text-align:right;line-height:23px''>" +
              "<div style='color: #00ccff;font-family: ArialMT;font-size: 18px;'> " +
              param[0].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>份</span>" +
              "</div>" +
              "<div style='color: #00ffd8;font-family: ArialMT;font-size: 18px;'> " +
              param[1].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>%</span>" +
              "</div>" +
              "<div style='color: #ff8900;font-family: ArialMT;font-size: 18px;'> " +
              param[2].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
              "</div>" +
              "<div style='color: #3fff3f;font-family: ArialMT;font-size: 18px;'> " +
              param[3].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
              "</div>" +
              "</div>" +
              "</div>";
            return resultTooltip;
          },
        },
        xAxis: {
          data: xDate,
        },
        series: [
          {
            name: "作答试卷分数",
            cursor: "default",
            data: paper,
          },

          {
            name: "平均得分率",
            data: score,
            cursor: "default",
            yAxisIndex: 1,
          },
          {
            name: "认知分",
            data: score2,
            cursor: "default",
            yAxisIndex: 2,
          },
          {
            name: "预估成绩",
            data: score3,
            cursor: "default",
            yAxisIndex: 3,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#compareCharts {
  width: 1270px;
  height: 335px;
}
</style>
<style>
.toolImg {
  width: 200px;
  height: 120px;
  padding-left: 20px;
  padding-right: 25px;
  background: url("../../assets/img/grade/柱状图弹窗BG.png") center center no-repeat;
}
</style>
