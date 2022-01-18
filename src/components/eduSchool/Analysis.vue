<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:28:29
 * @LastEditTime: 2022-01-18 14:08:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》学校&班级认知情况对比分析，图0，图1
-->
<template>
  <div class="analysis">
    <div class="title">学校认知情况对比</div>
    <template v-if="showData">
      <div class="button" v-show="!loading">
        <span :class="{ active: activeSpan == 0 }" @click="checkButton(0)">作答试卷份数</span>
        <span :class="{ active: activeSpan == 1 }" @click="checkButton(1)">平均得分率</span>
        <span :class="{ active: activeSpan == 2 }" @click="checkButton(2)">认知分</span>
        <span :class="{ active: activeSpan == 3 }" @click="checkButton(3)">预估成绩</span>
      </div>
      <div id="optID" v-show="!loading"></div>
    </template>
    <EduNoData v-if="!showData" noDataType="0" style="margin-top: 70px"></EduNoData>
    <Loading v-if="loading" style="margin-top: 30px"></Loading>
  </div>
</template>
<script>
import { GetAreaSchoolTrastAnalysis } from "@/api/eduSchool/right.js";
import EduNoData from "./eduNoData";
import Loading from "../common/Loading";
export default {
  name: "Analysis",
  data() {
    return {
      activeSpan: 0, //选中的按钮
      List: [],
      showData: true, //是否有数据
      loading: true,
    };
  },
  components: {
    EduNoData,
    Loading,
  },
  mounted() {
    let params = {
      Token: this.$store.state.token,
      TID: this.$store.state.TID,
      ProvinceID: this.$store.state.ProvinceID,
      CityID: this.$store.state.CityID,
      CountyID: this.$store.state.CountyID,
      GlobalGrade: this.$store.state.GlobalGrade,
      ZsdArea: this.$store.state.ZsdArea,
    };
    GetAreaSchoolTrastAnalysis(params).then((res) => {
      this.loading = false;
      if (res.Code == 1) {
        this.List = res.Data;
        this.AnaData();
      }
    });
  },
  methods: {
    //初始化统计图
    OptInit(xAxisData, yAxisName, seiresName, optData) {
      let echarts = require("echarts");
      let anaCharts = echarts.init(document.getElementById("optID"));
      anaCharts.setOption(
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
          },
          grid: {
            left: "3%",
            right: "5%",
            bottom: "0",
            top: "35",
            containLabel: true,
          },
          xAxis: {
            name: "学校",
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
              name: yAxisName,
              nameTextStyle: {
                color: "#a2afcc",
              },
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
              splitNumber: 4,
              position: "left",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#rgba(224,231,255,0.3)",
                },
              },
              axisLabel: {
                show: true,
                formatter: "{value}", //右侧Y轴文字显示
                textStyle: {
                  color: "#a2afcc",
                },
              },
            },
          ],
          dataZoom: [
            {
              type: "slider",
              show: false,
              height: 30,
              xAxisIndex: [0],
              bottom: 40,
              start: 0,
              end: 100,
            },
            {
              type: "inside",
              show: true,
              zoomLock: true, //禁用鼠标滚轮
              height: 15,
              xAxisIndex: [0],
              start: 1,
              end: 100,
            },
          ],
          series: [
            {
              name: seiresName,
              type: "bar",
              barWidth: "16px",
              itemStyle: {
                normal: {
                  color: function () {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00f0ff",
                      },
                      {
                        offset: 1,
                        color: "#0036ff",
                      },
                    ]);
                  },
                  barBorderRadius: [4, 4, 0, 0],
                },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: "{c}",
                  distance: 3,
                  position: "top",
                  color: function () {
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "#00f0ff",
                      },
                      {
                        offset: 1,
                        color: "#0036ff",
                      },
                    ]);
                  },
                },
              },
              data: optData,
            },
          ],
        },
        true
      );
    },
    //渲染统计图数据
    AnaData() {
      let xAxisData = [];
      let yAxisName = "";
      let seiresName = "";
      let optData = [];
      if (this.List.length > 0) {
        this.List.map((item) => {
          xAxisData.push(item.SchoolName);
          if (this.activeSpan == 0) {
            yAxisName = "份数（份）";
            seiresName = "份数";
            optData.push(item.FinishedPaperNum);
          } else if (this.activeSpan == 1) {
            yAxisName = "得分率（%）";
            seiresName = "得分率（%）";
            optData.push((item.AvgRate * 100).toFixed(0));
          } else if (this.activeSpan == 2) {
            yAxisName = "认知分（分）";
            seiresName = "认知分";
            optData.push(item.AvgIndex);
          } else if (this.activeSpan == 3) {
            yAxisName = "预估成绩（分）";
            seiresName = "预估成绩";
            optData.push(item.AvgScore);
          }
        });
      } else {
        this.showData = false;
      }
      this.OptInit(xAxisData, yAxisName, seiresName, optData);
    },
    //切换统计图
    checkButton(n) {
      this.activeSpan = n; //切换按钮
      this.AnaData(); //重新绘制统计图
    },
  },
};
</script>
<style lang="scss" scoped>
.analysis {
  width: 940px;
  height: 298px;
  background: url(~@/assets/img/eduSchool/学校认知情况对比BG.png) center center no-repeat;
  margin: 0 10px;
  overflow: hidden;
}
#optID {
  width: 920px;
  height: 215px;
}
.title {
  font-size: 16px;
  color: #fff;
  text-align: left;
  margin-left: 32px;
  padding-top: 10px;
  font-weight: 700;
}
.button {
  display: flex;
  justify-content: center;
  span {
    color: #a2afcc;
    font-size: 14px;
    padding: 7px 20px;
    cursor: pointer;
  }
  span:hover {
    color: #fffefe;
  }
  span.active {
    font-weight: bold;
    color: #fffefe;
    background: url(~@/assets/img/eduSchool/activeLine.png) no-repeat center bottom;
  }
}
.noData {
}
</style>
