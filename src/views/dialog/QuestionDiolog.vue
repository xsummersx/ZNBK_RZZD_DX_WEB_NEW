<!--
 * @Author: 柳欢
 * @Date: 2021-12-15 15:08:54
 * @LastEditTime: 2022-01-21 16:23:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\QuestionDiolog.vue
-->
<template>
  <div id="questionDiologCharts"></div>
</template>

<script>
import { GetClassSingleTypeRate_V3 } from "../../api/diolog/questionDiolog";
import { GetGradeSingleTypeRate_V3 } from "../../api/diolog/questionDiolog";
export default {
  props: {
    GenreID: String,
    TypeNo: String,
  },
  data() {
    return {
      resInfo: {},
    };
  },
  mounted() {
    //
    if (this.$route.name == "gradeRZZD") {
      this.GetGradeSingleTypeRate_V3();
    } else if (this.$route.name == "teacherRZZD") {
      this.GetClassSingleTypeRate_V3();
    }
  },
  methods: {
    // 获取教师端初始化认知评估文案内容
    GetClassSingleTypeRate_V3() {
      //
      let params = {
        token: this.$route.query.token,
        TID: this.$store.state.TID,
        StageNo: this.$store.state.StageNo,
        SchoolID: this.$store.state.SchoolID,
        CourseClassID: this.$store.state.CourseClassID,
        TypeNo: this.TypeNo,
        GenreID: this.GenreID,
      };

      GetClassSingleTypeRate_V3(params).then((res) => {
        this.resInfo = res.Data;
        let xData = [];
        let seriesData = [];
        let TypeInfoAvgScore = (this.resInfo.TypeAvgRate * 100).toFixed();
        for (let i = 0, arr = this.resInfo.StuList; i < arr.length; i++) {
          xData.push(arr[i].StuName);
          seriesData.push((arr[i].TypeRate * 100).toFixed());
        }
        this.drawLine(xData, seriesData, TypeInfoAvgScore);
      });
    },
    // 获取年级组长端初始化认知评估文案内容
    GetGradeSingleTypeRate_V3() {
      //
      let params = {
        token: this.$route.query.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        TypeNo: this.TypeNo,
        GenreID: this.GenreID,
      };

      GetGradeSingleTypeRate_V3(params).then((res) => {
        this.resInfo = res.Data;
        let xData = [];
        let seriesData = [];
        let TypeInfoAvgScore = (this.resInfo.TypeAvgRate * 100).toFixed();
        for (let i = 0, arr = this.resInfo.ClassCompareList; i < arr.length; i++) {
          xData.push(arr[i].CourseClassName);
          seriesData.push((arr[i].ScoreAvgRate * 100).toFixed());
        }
        this.drawLine(xData, seriesData, TypeInfoAvgScore);
      });
    },
    drawLine(xData, seriesData, TypeInfoAvgScore) {
      var echarts = require("echarts");
      var questionDiologCharts = echarts.init(
        document.getElementById("questionDiologCharts")
      );
      questionDiologCharts.setOption(this.$optionObj.questionDiologOption);
      questionDiologCharts.setOption({
        cursor: "default",
        xAxis: {
          data: xData,
          name: "学生",
        },
        grid: {
          left: 60,
          right: 80,
          top: 40,
          bottom: 40,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (8 / xData.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        series: {
          cursor: "default",
          data: seriesData,
          markLine: {
            silent: "true",
            symbol: "none",
            label: {
              show: true,
              position: "end",
              formatter: "{a|平均得分率}\n{b|" + TypeInfoAvgScore + "%}",
              fontSize: 14,
              fontWeight: "bold",
              rich: {
                a: {
                  color: "#00ffdd",
                  fontSize: 12,
                  fontFamily: "MicrosoftYaHei",
                  opacity: 1,
                  padding: [5, 0, 0, 0],
                },
                b: {
                  color: "#00ffdd",
                  padding: [1, 0, 0, 10],
                },
              },
            },
            lineStyle: {
              type: "dotted",
            },
            data: [
              {
                yAxis: TypeInfoAvgScore,
                lineStyle: {
                  color: "#00ffdd",
                },
                label: {
                  color: "rgba(0,255,221, 1)",
                },
              },
            ],
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#questionDiologCharts {
  width: 960px;
  height: 518px;
  margin: 20px auto;
  background-color: rgba(0, 0, 51, 0.2);
  -webkit-border-image-source: url("../../assets/img/common/内容高光1.png"); /* Safari 5 */
  -o-border-image-source: url("../../assets/img/common/内容高光1.png"); /* Opera */
  border-image-source: url("../../assets/img/common/内容高光1.png");
}
</style>
