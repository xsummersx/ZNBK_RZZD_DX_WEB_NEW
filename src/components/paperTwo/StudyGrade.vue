<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2022-03-16 17:00:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，学习特点
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">学习特点对比分析</span>
      <span class="float-r title-text"
        >年级平均知识掌握速度：<span class="greenText">{{ resInfo.GradeAvgSpeed }}</span></span
      >
      <span class="float-r lineIcon"></span>
      <span class="float-r title-text"
        >年级平均学习时长：<span class="greenText">{{ resInfo.GradeAvgTime }}h</span></span
      >
    </div>
    <div id="learnCharts"></div>
  </div>
</template>

<script>
import { GetGradeStudyFeatureDetail_V3 } from "../../api/paperTwo/gradeQuestion";
export default {
  data() {
    return {
      resInfo: {
        GradeAvgTime: "",
        GradeAvgSpeed: "",
      },
    };
  },
  mounted() {
    this.GetGradeStudyFeatureDetail_V3();
  },
  methods: {
    GetGradeStudyFeatureDetail_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
      };
      GetGradeStudyFeatureDetail_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.drawLine();
      });
    },
    drawLine() {
      let xData = [];
      let line1 = [];
      let line2 = [];
      let that = this;
      // let TypeInfoAvgScore = (that.resInfo.TypeInfoAvgScore * 100).toFixed();
      for (let i = 0; i < that.resInfo.ClassStudyFeatureList.length; i++) {
        xData.push(that.resInfo.ClassStudyFeatureList[i].CourseClassName);
        line1.push(that.resInfo.ClassStudyFeatureList[i].ClassAvgSpeed);
        line2.push(that.resInfo.ClassStudyFeatureList[i].ClassTotalTime);
      }
      var echarts = require("echarts");
      var learnCharts = echarts.init(document.getElementById("learnCharts"));
      learnCharts.setOption(this.$optionObj.learnOption);
      learnCharts.setOption({
        cursor: "default",
        xAxis: {
          data: xData,
        },
        tooltip: {
          formatter: function (params) {
            let name = params[0].axisValueLabel + "<br />";
            let rate0 =
              "<div class='lineBlue'></div>学习时长<b style='margin-left:40px'>" +
              params[0].data +
              "</b><br />";
            let rate1 =
              "<div class='lineYellow'></div>知识掌握速度<b style='margin-left:12px'>" +
              params[1].data +
              "</b><br />";
            return name + rate0 + rate1;
          },
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (5 / xData.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        series: [
          {
            cursor: "default",
            data: line2,
          },
          {
            cursor: "default",
            data: line1,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#learnCharts {
  width: 570px;
  height: 200px;
}
.title-text {
  font-size: 12px;
  color: #a2afcc;
  .greenText {
    color: #00ffd8;
    font-size: 16px;
  }
}
.lineIcon {
  display: inline-block;
  width: 3px;
  margin: 0 10px;
  height: 20px;
  background: url("../../assets/img/head/lineIcon.png") center center no-repeat;
  vertical-align: middle;
}
</style>
<style>
.lineBlue {
  float: left;
  width: 12px;
  height: 3px;
  margin-right: 4px;
  margin-top: 10px;
  background-color: #37eed6;
  border-radius: 4px;
}
.lineYellow {
  float: left;
  width: 12px;
  height: 3px;
  margin-right: 4px;
  margin-top: 10px;
  background-color: #e4e23e;
  border-radius: 3px;
}
</style>
