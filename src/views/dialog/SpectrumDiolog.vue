<!--
 * @Author: 柳欢
 * @Date: 2021-12-23 10:39:45
 * @LastEditTime: 2021-12-23 10:39:45
 * @LastEditors: 知识谱
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\spectrum.vue
-->
<template>
  <div>
    <div class="bottomBox clearfix">
      <div>
        基于海量题库、常用教材及课程标准，大数据分析历年{{
          $store.state.StageNo == "B" ? "中" : "高"
        }}考共考核知识点{{
          resInfo.FirstTotalCount + resInfo.SecondTotalCount + resInfo.ThirdTotalCount
        }}个:
      </div>
      <ul class="legendBox">
        <li class="firstLeIcon">
          常考知识点<span class="firstLegend">({{ resInfo.FirstTotalCount }}个)</span>
        </li>
        <li class="secondLeIcon">
          次常考知识点<span class="secondLegend">({{ resInfo.SecondTotalCount }}个)</span>
        </li>
        <li class="thirdLeIcon">
          不常考知识点<span class="thirdLegend">({{ resInfo.ThirdTotalCount }}个)</span>
        </li>
      </ul>
      <div class="knownPointBox" id="knownPointBox"></div>
    </div>
  </div>
</template>

<script>
import { GetClassKnowledgeSpectrum } from "../../api/head/header";
export default {
  data() {
    return { resInfo: {} };
  },
  mounted() {
    this.GetClassKnowledgeSpectrum();
  },
  methods: {
    // 获取学生端测试知识点全谱
    GetClassKnowledgeSpectrum() {
      let params = {
        token: this.$store.state.token,
        ZsdArea: "C",
        SchoolID: this.$store.state.SchoolID,
        TID: this.$store.state.TID,
        GlobalGrade: this.$store.state.GlobalGrade,
        CourseClassID: this.$store.state.CourseClassID,
      };

      GetClassKnowledgeSpectrum(params).then((res) => {
        console.log(1);
        this.resInfo = res.Data;
        this.drawLine2(
          this.resInfo.FirstVocabList,
          this.resInfo.SecondVocabList,
          this.resInfo.ThirdVocabList
        );
      });
    },
    drawLine2(list1, list2, list3) {
      var echarts = require("echarts");
      var knownPointBox = echarts.init(document.getElementById("knownPointBox"));
      let fif_line1 = []; //知识点名称·1
      let fif_line2 = []; //知识点名称·2
      let fif_line3 = []; //知识点名称·3
      let fif_data1 = []; //积分线·1
      let fif_data2 = []; //积分线·2
      let fif_data3 = []; //积分线·3
      const fif_oneCol = "#00f0ff"; //数据·1颜色
      const fif_twoCol = "#ffbe61"; //数据·2颜色
      const fif_threeCol = "#ffa0a0"; //数据·3颜色
      const fif_oneShaw = "rgba(0,240,255,0.5)"; //数据·1颜色
      const fif_twoShaw = "rgba(255,190,97,0.5)"; //数据·2颜色
      const fif_threeShaw = "rgba(255,160,160,0.5)"; //数据·3颜色
      const fif_backCol = "transparent"; //背景色
      list1.forEach((item) => {
        fif_line1.push(item.ZsdString);
        fif_data1.push(item.TestRate);
      });
      list2.forEach((item) => {
        fif_line2.push(item.ZsdString);
        fif_data2.push(item.TestRate);
      });
      list3.forEach((item) => {
        fif_line3.push(item.ZsdString);
        fif_data3.push(item.TestRate);
      });
      knownPointBox.setOption({
        color: ["#61e15e"],
        backgroundColor: "rgba(255,255,255,0.1)",
        title: {
          show: false,
          text: "知识点重要性分布",
          left: "center",
          top: 15,
          textStyle: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14,
          },
        },
        grid: [
          {
            x: "5%",
            y: "30%",
            top: 80,
            bottom: 30,
            width: "28%",
          },
          {
            x: "33%",
            y: "30%",
            top: 80,
            bottom: 30,
            width: "28%",
          },
          {
            x: "61%",
            y: "30%",
            top: 80,
            bottom: 30,
            width: "28%",
          },
        ],
        legend: {
          data: ["优秀学生认知积分线"],
          show: false,
          selectedMode: false,
          selected: {
            优秀学生认知积分线: false,
          },
          top: "0",
          right: "5%",
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            gridIndex: 0,
            type: "category",
            data: fif_line1,
            name: "",
            nameLocation: "center",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(224,231,255,0.3)",
              },
              show: true,
            },
            boundaryGap: false,
            axisLabel: {
              color: "transparent",
            },
          },
          {
            gridIndex: 1,
            type: "category",
            data: fif_line2,
            name: "",
            nameLocation: "center",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(224,231,255,0.3)",
              },
              show: true,
            },
            boundaryGap: false,
            axisLabel: {
              color: "transparent",
            },
          },
          {
            gridIndex: 2,
            type: "category",
            data: fif_line3,
            name: "知识点",
            nameTextStyle: {
              fontSize: 12,
              color: "#e0e0e0",
            },
            nameLocation: "end",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(224,231,255,0.3)",
              },
              show: true,
            },
            boundaryGap: false,
            axisLabel: {
              color: "transparent",
            },
          },
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: "value",
            axisLine: {
              lineStyle: {
                color: "rgba(224,231,255,0.3)",
              },
              show: true,
            },
            name: "测试概率",
            nameTextStyle: {
              fontSize: 12,
              color: "#e0e0e0",
              show: true,
            },
            splitLine: {
              interval: 3,
              lineStyle: {
                type: "dotted",
                color: "rgba(128,151,177,0.96)",
              },
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 14,
              color: "#e0e0e0",
              show: true,
            },

            min: 0,
            splitNumber: 2,
            // minInterval:0.25,
            // maxInterval :0.25,
            max: 1,
          },
          {
            gridIndex: 1,
            type: "value",
            name: "",
            nameTextStyle: {
              fontSize: 12,
              color: "#e0e0e0",
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(128,151,177,0.96)",
                opacity: 0.96,
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
                color: "rgba(128,151,177,0.96)",
              },
              show: false,
            },
            min: 0,
            splitNumber: 4,
            minInterval: 0.25,
            maxInterval: 0.25,
            max: 1,
          },
          {
            gridIndex: 2,
            type: "value",
            name: "",
            nameTextStyle: {
              fontSize: 12,
              color: "#e0e0e0",
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(128,151,177,0.96)",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
                color: "rgba(128,151,177,0.96)",
              },
              show: false,
            },
            min: 0,
            splitNumber: 4,
            minInterval: 0.25,
            maxInterval: 0.25,
            max: 1,
          },
        ],
        series: [
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: fif_data1,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "transparent",
                  },
                  {
                    offset: 0.1,
                    color: fif_oneCol,
                  },
                  {
                    offset: 1,
                    color: fif_oneCol,
                  },
                ],
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: fif_backCol,
                  },
                  {
                    offset: 0.5,
                    color: fif_oneShaw,
                  },
                  {
                    offset: 1,
                    color: fif_oneShaw,
                  },
                ],
              },
            },
          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: fif_data2,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: fif_twoCol,
                  },
                  {
                    offset: 1,
                    color: fif_twoCol,
                  },
                ],
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: fif_backCol,
                  },
                  {
                    offset: 0.5,
                    color: fif_twoShaw,
                  },
                  {
                    offset: 1,
                    color: fif_twoShaw,
                  },
                ],
              },
            },
          },
          {
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: fif_data3,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: fif_threeCol,
                  },
                  {
                    offset: 0.9,
                    color: fif_threeCol,
                  },
                  {
                    offset: 1,
                    color: "transparent",
                  },
                ],
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: fif_backCol,
                  },
                  {
                    offset: 0.5,
                    color: fif_threeShaw,
                  },
                  {
                    offset: 1,
                    color: fif_threeShaw,
                  },
                ],
              },
            },
          },
        ],
        tooltip: [
          {
            show: true,
            trigger: "axis",
            axisPointer: {
              type: "line", // 默认为直线，可选为：'line' | 'shadow'
              lineStyle: {
                color: "#fff",
              },
            },
            formatter: function (params) {
              return params[0].name + "<br>" + "测试概率：" + params[0].value.toFixed(2);
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#knownPointBox {
  width: 740px;
  height: 330px;
  margin: 20px 0;
}

.bottomBox {
  position: relative;
  padding: 20px 40px;
  color: #fff;
  .legendBox {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 65px;
    left: 125px;
    font-size: 12px;
    li {
      display: inline-block;
      margin-right: 65px;
      .firstLegend {
        color: #00f0ff;
      }
      .secondLegend {
        color: #ffbe61;
      }
      .thirdLegend {
        color: #ffa0a0;
      }
    }
    li::before {
      content: "";
      display: inline-block;
      width: 12px;
      height: 3px;
      background-color: #00f0ff;
      border-radius: 1px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .secondLeIcon::before {
      background-color: #ffbe61;
    }
    .thirdLeIcon::before {
      background-color: #ffa0a0;
    }
  }
}
</style>
