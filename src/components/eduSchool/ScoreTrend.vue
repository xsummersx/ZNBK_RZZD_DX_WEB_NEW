<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:31:08
 * @LastEditTime: 2021-12-21 10:12:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》认知成绩走势图，图0，图1
-->
<template>
  <div class="Tren">
    <div class="title">认知成绩走势</div>
    <div class="top">
      <div class="TopBox">
        <div class="top3">
          <i class="top3Icon0"></i>
          <span class="top3Text">进步{{ getTitName }}</span>
          <span class="top3SubText">Top3</span>
        </div>
        <ul>
          <li>
            <div class="itemName">·&nbsp;嘉兴一中</div>
            <div class="itemScore0">115分</div>
          </li>
          <li>
            <div class="itemName" title="南湖实验中学高三班级">·&nbsp;南湖实验中学高三班级</div>
            <div class="itemScore0">115分</div>
          </li>
          <li>
            <div class="itemName">·&nbsp;嘉兴一中</div>
            <div class="itemScore0">115分</div>
          </li>
        </ul>
      </div>
      <div class="TopBox">
        <div class="top3">
          <i class="top3Icon1"></i>
          <span class="top3Text">退步{{ getTitName }}</span>
          <span class="top3SubText">Top3</span>
        </div>
        <ul>
          <li>
            <div class="itemName">·&nbsp;嘉兴一中</div>
            <div class="itemScore0">115分</div>
          </li>
          <li>
            <div class="itemName" title="南湖实验中学高三班级">·&nbsp;南湖实验中学高三班级</div>
            <div class="itemScore0">115分</div>
          </li>
          <li>
            <div class="itemName">·&nbsp;嘉兴一中</div>
            <div class="itemScore0">115分</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="button">
      <span @click="checkButton(0)" :class="{ active: activeSpan == 0 }">按月</span>
      <span @click="checkButton(1)" :class="{ active: activeSpan == 1 }">按周</span>
      <span @click="checkButton(2)" :class="{ active: activeSpan == 2 }">按天</span>
    </div>
    <div class="legend">
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
    <div class="cont" id="Tre"></div>
  </div>
</template>
<script>
export default {
  name: "ScoreTrend",
  data() {
    return {
      activeSpan: 0, //0按月，1按周，2按天
      userType: 0, //用户身份，教育局还是校长
      optData0: [], //已作答试卷份数
      optData1: [], //平均得分率
      optData2: [], //高考预估成绩
      xAxisData: [], //X轴
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
  mounted() {
    //统计图初始化
    this.chartData();
  },
  methods: {
    //切换按钮
    checkButton(n) {
      this.activeSpan = n;
    },
    //统计图初始化
    chartData() {
      //统计图效果渲染
      this.optData0 = [1000, 800, 600, 500];
      this.optData1 = [50, 40, 60, 50];
      this.optData2 = [20000, 3000, 10000, 2000];
      this.xAxisData = ["1月", "2月", "3月", "4月"];
      this.optInit();
    },
    //统计图效果渲染
    optInit() {
      let echarts = require("echarts");
      let TreChart = echarts.init(document.getElementById("Tre"));
      let TreOption = {
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
          right: "3%",
          bottom: "15",
          top: "15",
          containLabel: true,
        },
        xAxis: {
          name: "",
          type: "category",
          data: this.xAxisData,
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
            min: 0,
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
            name: "",
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
                  false
                ),
              },
            },
            data: this.optData0,
          },
          {
            name: "",
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
                  false
                ),
              },
            },
            data: this.optData1,
          },
          {
            name: "",
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
                      color: "#00f0ff",
                    },
                    {
                      offset: 0.5,
                      color: "#ffffff",
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
                      color: "rgba(79,231,76,0.5)",
                    },
                    {
                      offset: 1,
                      color: "rgba(79,231,76,0)",
                    },
                  ],
                  false
                ),
              },
            },
            data: this.optData2,
          },
        ],
      };
      TreChart.setOption(TreOption);
    },
  },
};
</script>
<style lang="scss" scoped>
.Tren {
  width: 400px;
  height: 526px;
  margin-left: 10px;
  margin-top: 10px;
  background: url(~@/assets/img/eduSchool/认知成绩走势_bg.png) center center no-repeat;
  overflow: hidden;
}
.title {
  font-family: "YouSheBiaoTiHei";
  font-size: 24px;
  margin-top: 7px;
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
</style>
