<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:31:08
 * @LastEditTime: 2022-03-14 16:48:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知成绩走势图，图0，图1
-->
<template>
  <div
    class="Tren"
    :class="{
      teacDis:
        $route.name == 'gradeRZZD' || $route.name == 'teacherRZZD' || $route.name == 'studentRZZD',
    }"
  >
    <div
      class="title"
      v-if="
        !(
          $route.name == 'gradeRZZD' ||
          $route.name == 'teacherRZZD' ||
          $route.name == 'studentRZZD'
        )
      "
    >
      认知成绩走势
    </div>
    <div class="top" v-if="userType < 2">
      <div class="TopBox">
        <div class="top3">
          <i class="top3Icon0"></i>
          <span class="top3Text">进步{{ getTitName }}</span>
          <span class="top3SubText">Top3</span>
        </div>
        <ul>
          <li v-for="(item, index) in ProgList" :key="index">
            <div class="itemName" :title="item.SchoolClassName">
              ·&nbsp;{{ item.SchoolClassName }}
            </div>
            <div class="itemScore0">↑{{ item.ChangeScore }}分</div>
          </li>
          <li v-if="ProgList.length == 0" class="noDataIcon">无</li>
        </ul>
      </div>
      <div class="TopBox">
        <div class="top3">
          <i class="top3Icon1"></i>
          <span class="top3Text">异常{{ getTitName }}</span>
          <span class="top3SubText">Top3</span>
        </div>
        <ul>
          <li v-for="(item, index) in BackList" :key="index">
            <div class="itemName" :title="item.SchoolClassName">
              ·&nbsp;{{ item.SchoolClassName }}
            </div>
            <div class="itemScore0" style="color: #ff8080">↓{{ -item.ChangeScore }}分</div>
          </li>
          <li v-if="BackList.length == 0" class="noDataIcon">无</li>
        </ul>
      </div>
    </div>
    <template v-if="chartShow">
      <div class="button">
        <span @click="checkButton(3)" :class="{ active: activeSpan == 3 }">
          <i
            style="display: block"
            :class="{ animate__rubberBand: activeSpan == 3 }"
            class="animate__animated"
            >按月</i
          >
        </span>
        <span @click="checkButton(2)" :class="{ active: activeSpan == 2 }">
          <i
            style="display: block"
            :class="{ animate__rubberBand: activeSpan == 2 }"
            class="animate__animated"
            >按周</i
          >
        </span>
        <span @click="checkButton(1)" :class="{ active: activeSpan == 1 }">
          <i
            style="display: block"
            :class="{ animate__rubberBand: activeSpan == 1 }"
            class="animate__animated"
            >按天</i
          >
        </span>
      </div>
      <div class="legend" v-show="!loading">
        <span>
          <i class="icon0"></i>
          <b class="text">已作答试卷份数</b>
        </span>
        <span>
          <i class="icon1"></i>
          <b class="text">平均得分率</b>
        </span>
        <span>
          <i class="icon2"></i>
          <b class="text">高考预估成绩</b>
        </span>
      </div>
      <div class="cont" id="Tre" v-show="!loading"></div>
    </template>
    <EduNoData v-if="!chartShow" noDataType="2" style="margin-top: 115px"></EduNoData>
    <Loading v-show="loading" style="margin-top: 40px"></Loading>
  </div>
</template>
<script>
import EduNoData from "./eduNoData";
import Loading from "../common/Loading";
//import { greenLine, orangeLine, blueLine } from "@/api/eduSchool/imgPo.js";
import {
  GetTrend,
  GetTrendSchool,
  GetTrendGrade,
  GetTrendTeacher,
  GetTrendStudent,
} from "@/api/eduSchool/right.js";
import "animate.css"; // npm install animate.css --save安装，再引入
export default {
  name: "ScoreTrend",
  data() {
    return {
      activeSpan: 3, //3按月，2按周，1按天
      userType: 0, //用户身份，教育局还是校长,2的年级组长，3教师
      // optData0: [], //已作答试卷份数
      // optData1: [], //平均得分率
      // optData2: [], //高考预估成绩
      // xAxisData: [], //X轴
      BackList: [], //异常班级列表
      ProgList: [], //突出班级列表
      chartShow: true, //是否显示统计图
      loading: true, //是否加载
    };
  },
  computed: {
    getTitName: function () {
      if (this.userType == 0) {
        return "学校";
      } else {
        return "班级";
      }
    },
  },
  created() {
    if (this.$route.name == "schoolRZZD") {
      this.userType = 1;
    } else if (this.$route.name == "gradeRZZD") {
      this.userType = 2;
    } else if (this.$route.name == "teacherRZZD") {
      this.userType = 3;
    } else if (this.$route.name == "studentRZZD") {
      this.userType = 4;
    } else {
      this.userType = 0;
    }
  },
  components: {
    EduNoData,
    Loading,
  },
  mounted() {
    //统计图初始化
    this.chartData(3, "FirstGet"); //3-按月，2-按周，1-按天==>后台的规则
  },
  methods: {
    //切换按钮
    checkButton(n) {
      this.activeSpan = n;
      this.loading = true;
      setTimeout(() => {
        this.chartData(n, "other"); //3-按月，2-按周，1-按天==>后台的规则
      }, 300);
    },
    //统计图初始化
    chartData(flag, getType) {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        PageNum: 7, //显示统计图的数量
        Flag: flag,
        ProgressiveNum: 3, //异常班级显示数量
      };
      if (this.userType == 0) {
        //教育局
        params.ProvinceID = this.$store.state.ProvinceID;
        params.CityID = this.$store.state.CityID;
        params.CountyID = this.$store.state.CountyID;
        //教育局
        GetTrend(params).then((res) => {
          if (res.Code == 1) {
            if (getType == "FirstGet") {
              this.BackList = res.Data.BackwardList;
              this.ProgList = res.Data.ProgressiveList;
            }
            //提取数据渲染统计图
            if (res.Data.TrajectoryChartList.length > 0) {
              this.putDataNext(res);
            } else {
              this.chartShow = false;
            }
          }
          this.loading = false;
        });
      } else if (this.userType == 1) {
        //校长
        params.SchoolID = this.$store.state.SchoolID;
        GetTrendSchool(params).then((res) => {
          if (getType == "FirstGet") {
            this.BackList = res.Data.BackwardList;
            this.ProgList = res.Data.ProgressiveList;
          }
          //提取数据渲染统计图
          if (res.Data.TrajectoryChartList.length > 0) {
            this.putDataNext(res);
          } else {
            this.chartShow = false;
          }
          this.loading = false;
        });
      } else if (this.userType == 2) {
        //年级组长
        params.SchoolID = this.$store.state.SchoolID;
        GetTrendGrade(params).then((res) => {
          //提取数据渲染统计图
          if (res.Data.TrajectoryChartList.length > 0) {
            this.putDataNext(res);
          } else {
            this.chartShow = false;
          }
          this.loading = false;
        });
      } else if (this.userType == 3) {
        //教师
        params.CourseClassID = this.$store.state.CourseClassID;
        params.SchoolID = this.$store.state.SchoolID;
        GetTrendTeacher(params).then((res) => {
          //提取数据渲染统计图
          if (res.Data.TrajectoryChartList.length > 0) {
            this.putDataNext(res);
          } else {
            this.chartShow = false;
          }
          this.loading = false;
        });
      } else if (this.userType == 4) {
        //学生个人
        params.SchoolID = this.$store.state.SchoolID;
        params.StuID = this.$route.query.StuID;
        GetTrendStudent(params).then((res) => {
          //提取数据渲染统计图
          if (res.Data.TrajectoryChartList.length > 0) {
            this.putDataNext(res);
          } else {
            this.chartShow = false;
          }
          this.loading = false;
        });
      }
    },
    //提取数据，并开始渲染统计图
    putDataNext(res) {
      //统计图效果渲染
      let optData0 = [];
      let optData1 = [];
      let optData2 = [];
      let xAxisData = [];
      res.Data.TrajectoryChartList.map((item) => {
        xAxisData.push(item.TimeInfo);
        optData0.push(item.AnsweredPaperNum);
        optData1.push((item.PaperScoreRate * 100).toFixed(0));
        optData2.push(item.PredictedScore.toFixed(0));
      });
      this.optInit(optData0, optData1, optData2, xAxisData);
    },
    //统计图效果渲染
    optInit(optData0, optData1, optData2, xAxisData) {
      let echarts = require("echarts");
      let TreChart = echarts.init(document.getElementById("Tre"));
      let orangeLine =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5OEE1REIzNTdGNDExRUNBMjFFRjE5OTBEMUU1RkJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5OEE1REI0NTdGNDExRUNBMjFFRjE5OTBEMUU1RkJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzk4QTVEQjE1N0Y0MTFFQ0EyMUVGMTk5MEQxRTVGQkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzk4QTVEQjI1N0Y0MTFFQ0EyMUVGMTk5MEQxRTVGQkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5eQAiSAAAAQElEQVR42iSHiRGAIBADNw7DHQId2aNFaV2ePJk8G333+ZDyhRWwirwR3qG0wZWwsdnfgyVBzCzPt1vaLOkXYADStQkEeDUPCQAAAABJRU5ErkJggg==";
      let blueLine =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc0RUE2MUQwNTdGNDExRUNBRThEQTYxODFDMTYyRUMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc0RUE2MUQxNTdGNDExRUNBRThEQTYxODFDMTYyRUMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzRFQTYxQ0U1N0Y0MTFFQ0FFOERBNjE4MUMxNjJFQzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzRFQTYxQ0Y1N0Y0MTFFQ0FFOERBNjE4MUMxNjJFQzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5h4FpQAAAAKklEQVR42mJk+PD/MAMDgw0DPsDIcIRF990cMIuB4T+KDATAxBgZAQIMAHKfB3JZe6mSAAAAAElFTkSuQmCC";
      let greenLine =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAYAAABhYU3QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDRjUxQjczNTdGNDExRUNBQjlGRjY1MEMwOUJFRUZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDRjUxQjc0NTdGNDExRUNBQjlGRjY1MEMwOUJFRUZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0NGNTFCNzE1N0Y0MTFFQ0FCOUZGNjUwQzA5QkVFRkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0NGNTFCNzI1N0Y0MTFFQ0FCOUZGNjUwQzA5QkVFRkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6nqdVXAAAAO0lEQVR42mLkXsp+mIWVxYaNlY2BnZ2dgZODg4GDgxOKgWygGBsb2xEmBhD4DyIYIfg/lEYBjIwAAQYADTAFQDZMdP4AAAAASUVORK5CYII=";
      //重新绘制
      TreChart.resize();
      TreChart.setOption(
        {
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
              let name = params[0].axisValueLabel + "<br />";
              let rate0 =
                "<img class='imgWidth' src=" +
                blueLine +
                " />已作答试卷份数（份）<b style='margin-left:10px'>" +
                params[0].data +
                "</b><br />";
              let rate1 =
                "<img class='imgWidth' src=" +
                orangeLine +
                " />平均得分率（%）<b style='margin-left:41px'>" +
                params[1].data +
                "</b><br />";
              let rate2 =
                "<img class='imgWidth' src=" +
                greenLine +
                " />高考预估成绩（分）<b style='margin-left:25px'>" +
                params[2].data +
                "</b>";
              return name + rate0 + rate1 + rate2;
            },
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "13",
            top: "15",
            containLabel: true,
          },
          xAxis: {
            name: "",
            type: "category",
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: "rgba(224,231,255,0.3)",
                width: "1",
              },
            },
            axisTick: { show: false },
            axisLabel: {
              interval: 0, //强制显示文字
              textStyle: {
                color: "#ffffff",
                fontSize: 12,
              },
              formatter: (val) => {
                if (val.length > 6) {
                  return val.slice(0, 6) + "...";
                } else {
                  return val;
                }
              },
            },
          },
          yAxis: [
            {
              type: "value",
              min: 0,
              max: Math.max(...optData0) + Math.max(...optData0) * 0.8,
              splitNumber: 5,
              //max: this.optData0.sort((x, y) => y - x)[0],
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(128,151,177,0.3)",
                  type: "dotted",
                },
              },
              axisTick: {
                show: false,
              },
              position: "left",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#rgba(224,231,255,0.3)",
                },
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#a2afcc",
                },
              },
            },
            {
              type: "value",
              min: 0,
              max: Math.max(...optData1) + Math.max(...optData1) * 0.5,
              splitNumber: 5,
              //max: this.optData1.sort((x, y) => y - x)[0],
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(128,151,177,0.3)",
                  type: "dotted",
                },
              },
              axisTick: {
                show: false,
              },
              position: "left",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#rgba(224,231,255,0.3)",
                },
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#a2afcc",
                },
              },
            },
            {
              type: "value",
              min: 0,
              max: Math.max(...optData2) + Math.max(...optData2) * 0.2,
              splitNumber: 5,
              //max: this.optData2.sort((x, y) => y - x)[0],
              splitLine: {
                show: false,
                lineStyle: {
                  color: "rgba(128,151,177,0.3)",
                  type: "dotted",
                },
              },
              axisTick: {
                show: false,
              },
              position: "left",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#rgba(224,231,255,0.3)",
                },
              },
              axisLabel: {
                show: false,
                textStyle: {
                  color: "#a2afcc",
                },
              },
            },
          ],
          series: [
            {
              name: "已作答试卷份数（份）",
              yAxisIndex: 0,
              type: "line",
              barWidth: "16px",
              color: "#00f0ff",
              itemStyle: {
                normal: {
                  color: function () {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00f0ff",
                      },
                      {
                        offset: 0.5,
                        color: "#fff",
                      },
                      {
                        offset: 1,
                        color: "#00f0ff",
                      },
                    ]);
                  },
                  barBorderRadius: [4, 4, 0, 0],
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(0,240,255,0.5)",
                      },
                      {
                        offset: 1,
                        color: "rgba(0,240,255,0)",
                      },
                    ],
                    false,
                  ),
                },
              },
              data: optData0,
            },
            {
              name: "平均得分率（%）",
              type: "line",
              yAxisIndex: 1,
              barWidth: "16px",
              color: "#fe8f0a",
              itemStyle: {
                normal: {
                  color: function () {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#ffd46f",
                      },
                      {
                        offset: 1,
                        color: "#fe8f0a",
                      },
                    ]);
                  },
                  barBorderRadius: [4, 4, 0, 0],
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(254,143,10,0.5)",
                      },
                      {
                        offset: 1,
                        color: "rgba(254,143,10,0)",
                      },
                    ],
                    false,
                  ),
                },
              },
              data: optData1,
            },
            {
              name: "高考预估成绩（分）",
              type: "line",
              yAxisIndex: 2,
              barWidth: "16px",
              color: "#4fe74c",
              itemStyle: {
                normal: {
                  color: function () {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#4fe74c",
                      },
                      {
                        offset: 0.5,
                        color: "#ffffff",
                      },
                      {
                        offset: 1,
                        color: "#4fe74c",
                      },
                    ]);
                  },
                  barBorderRadius: [4, 4, 0, 0],
                },
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(79,231,76,0.5)",
                      },
                      {
                        offset: 1,
                        color: "rgba(79,231,76,0)",
                      },
                    ],
                    false,
                  ),
                },
              },
              data: optData2,
            },
          ],
        },
        true,
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.Tren {
  width: 400px;
  height: 526px;
  margin-left: 10px;
  margin-top: 20px;
  background: url(~@/assets/img/eduSchool/认知成绩走势_bg.png) center center no-repeat;
}
.teacDis {
  background-image: none !important;
  background: rgba(0, 0, 51, 0.2) !important;
  margin: 0 auto;
  height: 340px;
  padding-top: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.title {
  font-family: "YouSheBiaoTiHei";
  font-size: 24px;
  padding-top: 7px;
  text-align: center;
}
.top {
  width: 400px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  padding: 0 12px;
  .TopBox {
    width: 180px;
    height: 137px;
    background-image: linear-gradient(90deg, #172882 0%, transparent 80%);
    border-radius: 4px;
    margin-top: 22px;
    .top3 {
      padding-top: 10px;
      padding-left: 10px;
      margin-bottom: 6px;
      .top3Icon0 {
        display: inline-block;
        margin-top: 2px;
        float: left;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        background: url(~@/assets/img/eduSchool/进步学校.png) center center no-repeat;
      }
      .top3Icon1 {
        display: inline-block;
        margin-top: 2px;
        float: left;
        width: 16px;
        height: 16px;
        margin-right: 2px;
        background: url(~@/assets/img/eduSchool/异常学校.png) center center no-repeat;
      }
      .top3Text {
        font-family: "YouSheBiaoTiHei";
        font-size: 16px;
        color: #00aaff;
        float: left;
      }
      .top3SubText {
        font-family: "YouSheBiaoTiHei";
        font-size: 12px;
        color: #0088cc;
      }
    }
    .itemName {
      color: #fff;
      font-size: 14px;
      float: left;
      width: 105px;
      margin-left: 20px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .itemScore0 {
      color: #60ff60;
      font-size: 14px;
      float: left;
      line-height: 32px;
    }
    .itemScore1 {
      color: #ff8080;
      font-size: 14px;
      float: left;
      line-height: 32px;
    }
  }
}
.button {
  text-align: right;
  margin-right: 16px;
  margin-top: 20px;
  span {
    display: inline-block;
    width: 48px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    color: #333;
    background: #7088c7;
    cursor: pointer;
    margin-right: -3px;
    border-radius: 3px;
    i {
      font-style: normal;
    }
  }
  span:hover {
    color: #fff;
  }
  .active {
    color: #fff;
    position: relative;
    background-image: linear-gradient(266deg, #0060ff 0%, #00a2ff 100%);
  }
}
.legend {
  width: 400px;
  height: 40px;
  display: flex;
  justify-content: center;
  span {
    line-height: 40px;
    padding: 0 10px;
    .icon0 {
      width: 10px;
      height: 2px;
      margin-bottom: 4px;
      display: inline-block;
      background: url(~@/assets/img/eduSchool/已作答试卷份数.png) center center no-repeat;
    }
    .icon1 {
      width: 10px;
      height: 2px;
      margin-bottom: 4px;
      display: inline-block;
      background: url(~@/assets/img/eduSchool/平均得分率.png) center center no-repeat;
    }
    .icon2 {
      width: 10px;
      height: 2px;
      margin-bottom: 4px;
      display: inline-block;
      background: url(~@/assets/img/eduSchool/高考预估成绩.png) center center no-repeat;
    }
    .text {
      font-size: 12px;
      color: #e0e0e0;
      margin-left: 3px;
      font-weight: normal;
    }
  }
}
.cont {
  width: 400px;
  height: 240px;
}
.noDataIcon {
  width: 100%;
  height: 24px;
  text-align: center;
  margin-top: 12px;
  padding-right: 30px;
  font-size: 12px;
}
</style>
<style>
.imgWidth {
  margin-right: 4px;
  margin-bottom: 3px;
}
</style>
