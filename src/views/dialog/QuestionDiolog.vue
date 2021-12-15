<!--
 * @Author: 柳欢
 * @Date: 2021-12-15 15:08:54
 * @LastEditTime: 2021-12-15 16:10:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\QuestionDiolog.vue
-->
<template>
  <div id="questionDiologCharts"></div>
</template>

<script>
export default {
    mounted() {
        this.drawLine()
    },
    methods: {
        
    drawLine() {
      let xData2 = ['高三一班'];
      let seriesData2 = [10];
      let TypeInfoAvgScore = 60;
      var echarts = require("echarts");
      var questionDiologCharts = echarts.init(
        document.getElementById("questionDiologCharts")
      );
      questionDiologCharts.setOption(this.$optionObj.questionDiologOption);
      questionDiologCharts.setOption({
        xAxis: {
          data: xData2,
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (8 / xData2.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        series: [
          {
            cursor: "default",
            data: seriesData2,
            markLine: {
              silent: "true",
              symbol: "none",
              label: {
                show: true,
                position: "end",
                formatter: "{a|平均正确率}\n{b|" + TypeInfoAvgScore + "%}",
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
            }
          },
        ],
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
    background-color: rgba(0,0,51,0.2);
}
</style>