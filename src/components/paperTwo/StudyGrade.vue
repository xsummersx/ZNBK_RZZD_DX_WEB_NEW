<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:22:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，学习特点
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">学习特点对比分析</span>
      <span class="float-r title-text"
        >年级平均知识掌握速度：<span class="greenText">{{
          resInfo.GradeAvgSpeed
        }}</span></span
      >
      <span class="float-r lineIcon"></span>
      <span class="float-r title-text"
        >年级平均学习时长：<span class="greenText"
          >{{ resInfo.GradeAvgTime }}h</span
        ></span
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
            data: line1,
          },
          {
            cursor: "default",
            data: line2,
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
