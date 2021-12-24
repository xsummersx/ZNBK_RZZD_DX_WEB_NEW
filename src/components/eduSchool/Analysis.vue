<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:28:29
 * @LastEditTime: 2021-12-21 17:10:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教育局、学校校长=》学校&班级认知情况对比分析，图0，图1
-->
<template>
  <div class="analysis">
    <div class="title">学校认知情况对比</div>
    <div class="button">
      <span :class="{ active: activeSpan == 0 }" @click="checkButton(0)">作答试卷份数</span>
      <span :class="{ active: activeSpan == 1 }" @click="checkButton(1)">平均得分率</span>
      <span :class="{ active: activeSpan == 2 }" @click="checkButton(2)">认知分</span>
      <span :class="{ active: activeSpan == 3 }" @click="checkButton(3)">预估成绩</span>
    </div>
    <div id="optID"></div>
  </div>
</template>
<script>
export default {
  name: "Analysis",
  data() {
    return {
      optData: [], //统计图数据
      xAxisData: [], //统计图数据
      yAxisName: "", //统计图X轴数据
      seiresName: "", //统计图数据
      activeSpan: 0, //选中的按钮
    };
  },
  mounted() {
    this.AnaData();
  },
  methods: {
    //初始化统计图
    OptInit() {
      let echarts = require("echarts");
      let anaCharts = echarts.init(document.getElementById("optID"));
      anaCharts.setOption({
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
            name: this.yAxisName,
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
            name: this.seiresName,
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
            data: this.optData,
          },
        ],
      });
    },
    //渲染统计图数据
    AnaData() {
      this.optData = [1000, 800, 600, 500, 400, 300, 200];
      this.xAxisData = ["南湖中学", "嘉兴一中", "施恩中学", "嘉兴市实验中学", "南湖实验中学", "海盐中学", "湘潭中学"];
      this.yAxisName = "份数（份）";
      this.seiresName = "份数";
      this.OptInit();
    },
    //切换统计图
    checkButton(n) {
      this.activeSpan = n;
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
</style>
