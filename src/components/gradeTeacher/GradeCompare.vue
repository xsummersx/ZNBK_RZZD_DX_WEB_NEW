<!--
 * @Author: 柳欢
 * @Date: 2021-12-14 15:36:48
 * @LastEditTime: 2022-03-14 16:08:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 班级认知情况对比分析
-->
<template>
  <div>
    <ArrowTitle titleStr="班级认知情况对比分析"></ArrowTitle>
    <div v-show="!showLoading" id="compareCharts"></div>
    <Loading v-show="showLoading" style="width: 1270px; height: 370px" backSize="80%"></Loading>
  </div>
</template>

<script>
import { GetGradeClassCongnitiveTrastAnalysis_V3 } from "@/api/gradeTeacher/right";
import Loading from "../common/Loading.vue";
export default {
  data() {
    return {
      resInfo: {},
      showLoading: true,
    };
  },
  created() {
    let params = {
      token: this.$store.state.token,
      TID: this.$store.state.TID,
      ProvinceID: this.$store.state.ProvinceID,
      CityID: this.$store.state.CityID,
      CountyID: this.$store.state.CountyID,
      GlobalGrade: this.$store.state.GlobalGrade,
      SchoolID: this.$store.state.SchoolID,
      ZsdArea: this.$store.state.ZsdArea,
    };
    GetGradeClassCongnitiveTrastAnalysis_V3(params).then((res) => {
      this.showLoading = false;
      this.resInfo = res.Data;
      this.drawLine();
    });
  },
  mounted() {},
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    Loading,
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

      let pointerImg0 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5QzIyNzMyNTdGQzExRUNBQUZCRTZEQzFDQzIzNUM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5QzIyNzMzNTdGQzExRUNBQUZCRTZEQzFDQzIzNUM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTlDMjI3MzA1N0ZDMTFFQ0FBRkJFNkRDMUNDMjM1QzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTlDMjI3MzE1N0ZDMTFFQ0FBRkJFNkRDMUNDMjM1QzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zQm2cAAAAb0lEQVR42mJk+PDfk4GBYS4QSzKAACMQ/2dABs+BOJmR4en/Z2BFMElMhWDFjAxX/iOEkRUjA6A4C8MbBqIAC8MrNBHsVgMVviTWxJfkWo1T4VtgOP2HhiE2AHHzCxaG9wwp0ACXwKH0KRCnAQQYACC1HauS/NgNAAAAAElFTkSuQmCC";
      let pointerImg1 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEQjJDNUEzNTdGQzExRUM5NDFCREJFNkJCNjhDMDc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEQjJDNUE0NTdGQzExRUM5NDFCREJFNkJCNjhDMDc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NURCMkM1QTE1N0ZDMTFFQzk0MUJEQkU2QkI2OEMwNzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NURCMkM1QTI1N0ZDMTFFQzk0MUJEQkU2QkI2OEMwNzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz46dAnCAAAArUlEQVR42mxQ2w3CMAz0SRmC7IHEDMwBYqvuxBcbQOCHvwRaPg6bOmkqkYfjxOc7O9g9L3sRGUQYpQ3opp+S1D9g+zjfSIn2Bs7hBofdzTCFz3uMbGHobExdEmOYXqWTckHOSQQ9AgljUSCVCXSZjgtVgwrMWRlQ1RzHpb6fNcZcKkb4ryFPDpNJr8bSTO9bM0mpowhdZNVt5bzb9xzVH/S6qTXZwlLKVe3pK8AAiDNV79zKRRwAAAAASUVORK5CYII=";
      let pointerImg2 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMzg4QjBDNTdGQzExRUNCQUI1ODQyNjdFNTNCQzVGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyMzg4QjBENTdGQzExRUNCQUI1ODQyNjdFNTNCQzVGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjIzODhCMEE1N0ZDMTFFQ0JBQjU4NDI2N0U1M0JDNUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjIzODhCMEI1N0ZDMTFFQ0JBQjU4NDI2N0U1M0JDNUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4adSxSAAAAo0lEQVR42mRQwQ3CMAz0SR6CDMKDEZgDxFZdgw/zQBigUHAiGadpSdI4j8jn0/nO0NvhSEQDgRylUtqWt9kJ8bp/2NBZU+pPXkCo5zgFlwGdB2oPnSgch7d0cKKikQaxjF/7TUnnr1mvyDsaYjNdlSqc5bUQtY9bAiXiKNkVVlfapkemcpjEm5pD5VM3d7JoT46fcLZ+MHBXTof6mHfzffkJMAAwlkcDcRbvKwAAAABJRU5ErkJggg==";
      let pointerImg3 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1Q0JFQTFDNTdGQzExRUM5RkRGRUVENzI3NTNDRkQzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1Q0JFQTFENTdGQzExRUM5RkRGRUVENzI3NTNDRkQzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjVDQkVBMUE1N0ZDMTFFQzlGREZFRUQ3Mjc1M0NGRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjVDQkVBMUI1N0ZDMTFFQzlGREZFRUQ3Mjc1M0NGRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6xrMHAAAAAkElEQVR42mxQUQqDMAx9gRxiPZK3EDZ2K2+n6L9sTO1aU5UmVQPte+Glr0moblER0ABwUS7hOeIOvZwnB78X4SgKB0bFpDX8n+HIKtZOc8dhKZ9v9GQZBdlP2kwSCCpad/Y/zakcoohcSOZrXAcCLx8hNxZ0cuZp3PbkblWNgecvXmnhoj9sC3lDhE7IexVgAEcsOS6hIDj+AAAAAElFTkSuQmCC";
      var echarts = require("echarts");
      var compareCharts = echarts.init(document.getElementById("compareCharts"));
      compareCharts.setOption(this.$optionObj.compareOption);
      compareCharts.setOption({
        cursor: "default",
        legend: {
          itemWidth: 11,
          itemHeight: 11,
          align: "left",
          selectedMode: false,
          orient: "horizontal",
          itemGap: 20,
          textStyle: {
            color: "#a2afcc",
            fontSize: 12,
          },
          data: [
            {
              name: "作答试卷份数",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00f0ff",
                  },
                  {
                    offset: 1,
                    color: "#0036ff",
                  },
                ]),
              },
            },
            {
              name: "平均得分率",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#37eed6",
                  },
                  {
                    offset: 1,
                    color: "#009880",
                  },
                ]),
              },
            },
            {
              name: "认知分",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#ffbb39",
                  },
                  {
                    offset: 1,
                    color: "#cf5c00",
                  },
                ]),
              },
            },
            {
              name: "预估成绩",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#61e400",
                  },
                  {
                    offset: 1,
                    color: "#389500",
                  },
                ]),
              },
            },
          ],
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (4 / xDate.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        grid: {
          bottom: 30,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: "rgba(0,0,0,0.1)",
            },
          },
          formatter: function (params) {
            // console.log(params);
            let name = params[0].axisValueLabel + "<br />";
            let zhu0 =
              "<img class='imgWi' src=" +
              pointerImg0 +
              "><p style='float:left'>" +
              params[0].seriesName +
              "</p><b style='margin-left:25px;float:left'>" +
              params[0].data +
              "</b><br />";
            let zhu1 =
              "<img class='imgWi' src=" +
              pointerImg1 +
              "><p style='float:left'>" +
              params[1].seriesName +
              "</p><b style='margin-left:39px;float:left'>" +
              params[1].data +
              "</b><br />";
            let zhu2 =
              "<img class='imgWi' src=" +
              pointerImg2 +
              "><p style='float:left'>" +
              params[2].seriesName +
              "</p><b style='margin-left:67px;float:left'>" +
              params[2].data +
              "</b><br />";
            let zhu3 =
              "<img class='imgWi' src=" +
              pointerImg3 +
              "><p style='float:left'>" +
              params[3].seriesName +
              "</p><b style='margin-left:52px;float:left'>" +
              params[3].data +
              "</b>";
            return name + zhu0 + zhu1 + zhu2 + zhu3;
          },
          // backgroundColor: "rgba(0,32,92,0)",
          // borderColor: "rgba(0,242,255,0)",
          // borderWidth: 0,
          // textStyle: {
          //   color: "#a2afcc",
          // },
          // extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0);",
          // padding: [20, 20, 20, 20],
          // formatter: function (param) {
          //   var resultTooltip =
          //     "<div class='toolImg clearfix' style=''>" +
          //     "<div class='float-l' style='line-height:25px'>" +
          //     "<div style=''> " +
          //     param[0].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[1].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[2].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[3].seriesName +
          //     "</div>" +
          //     "</div>" +
          //     "<div  class='float-r' style='text-align:right;line-height:23px''>" +
          //     "<div style='color: #00ccff;font-family: ArialMT;font-size: 18px;'> " +
          //     param[0].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>份</span>" +
          //     "</div>" +
          //     "<div style='color: #00ffd8;font-family: ArialMT;font-size: 18px;'> " +
          //     param[1].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>%</span>" +
          //     "</div>" +
          //     "<div style='color: #ff8900;font-family: ArialMT;font-size: 18px;'> " +
          //     param[2].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
          //     "</div>" +
          //     "<div style='color: #3fff3f;font-family: ArialMT;font-size: 18px;'> " +
          //     param[3].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
          //     "</div>" +
          //     "</div>" +
          //     "</div>";
          //   return resultTooltip;
          // },
        },
        xAxis: {
          data: xDate,
          axisLabel: {
            interval: 0,
            fontSize: 14,
          },
        },
        series: [
          {
            name: "作答试卷份数",
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
  height: 370px;
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

#compareCharts > div > canvas:hover {
  cursor: default;
}
.imgWi {
  margin-top: 6px;
  margin-right: 4px;
  float: left;
}
</style>
