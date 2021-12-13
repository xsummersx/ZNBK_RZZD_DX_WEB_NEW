<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-10 11:20:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，语法认知
-->
<template>
  <div class="right-small-box">
      
      <div class="box-title clearfix">
        <span class="float-l title">语法认知</span>
        <span  class="float-r check-icon"><i></i>薄弱语法诊断</span>
      </div>
      <div id="grammerCharts"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    
    drawLine() {
      // let xData2 = [];
      // let seriesData2 = [];
      // let MAX = [];
      // let that = this;
      // let TypeInfoAvgScore = (that.resInfo.TypeInfoAvgScore * 100).toFixed();
      // for (let i = 0; i < that.resInfo.TypeInfoList.length; i++) {
      //   xData2.push(that.resInfo.TypeInfoList[i].TypeName);
      //   var bol = that.resInfo.MinRateGenreName.some(function (element) {
      //     if (element == that.resInfo.TypeInfoList[i].TypeName) {
      //       return element;
      //     }
      //   });
      // }
      let barData = [44, 55, 11, 22, 88, 44, 66, 77, 55];
      let TypeInfoAvgScore = 66;
      var echarts = require("echarts");
      var grammerCharts = echarts.init(document.getElementById("grammerCharts"));
      grammerCharts.setOption(this.$optionObj.gramOption);
      grammerCharts.setOption({
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (5 / barData.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        series: [
          {
            name: "平均答对率",
            type: "line",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#009cff",
                  },
                  {
                    offset: 1,
                    color: "#009cff",
                  },
                ]),
                barBorderRadius: [2, 2, 0, 0],
              },
            },
            
            markLine: {
              silent: "true",
              symbol: "none",
              label: {
                show: true,
                position: "end",
                fontSize: 12,
                color:"#00ffdd",
                formatter: "{a|平均答对率}{b|" + TypeInfoAvgScore + "%}",
                rich: {
                  a: {
                    color: "#00ffdd",
                    fontSize: 12,
                    fontFamily: "MicrosoftYaHei",
                    opacity: 1,
                    padding: [5, 0, 20, -50],
                  },
                  b: {
                    fontSize: 14,
                    color: "#00ffdd",
                    padding: [-13, 0, 0, 0],
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
                    color: "#00ccff",
                  },
                  label: {
                    color: "#00ccff",
                  },
                },
              ],
            },
            // markPoint: {
            //   symbol:
            //     "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1QzVGODVEQkQ0ODExRUI4MEFFODA2NjZFN0ExOTZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1QzVGODVFQkQ0ODExRUI4MEFFODA2NjZFN0ExOTZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTVDNUY4NUJCRDQ4MTFFQjgwQUU4MDY2NkU3QTE5NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTVDNUY4NUNCRDQ4MTFFQjgwQUU4MDY2NkU3QTE5NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6LeDRxAAAAs0lEQVR42mL8UtPMAAWhQJwDxMZQ/hkgngrEq0EcJiBmBOLZQLwKiO2AmBuK7aFiIDlGFiARD8QpDLgBSO4YyMRcJMG7QOwIxXeRxLNACrWQBLqA+AAUdyGJ64AUvkYSsIS6mRHKhoHXIIVbkQQSgPgSFCcgiW9hglrxDdkaKIYBkFw3SOF9IM7D42uQ3H0mKGcuEFcA8X8kBf+hYiA5BhYkiU4gvg51CsgzpUC8CSYJEGAAT/cjWt241fUAAAAASUVORK5CYII=",
            //   symbolSize: [10, 10],
            //   symbolOffset: [0, -15], //偏移位置
            //   cursor: "default",
            //   itemStyle: {
            //     color: "red",
            //   },
            //   emphasis: {
            //     label: {
            //       show: false,
            //       color: "transparent",
            //     },
            //   },
            //   label: {
            //     show: false,
            //   },
            //   data: this.markPontMin(),
            // },
            data: [40, 40, 30, 30, 30, 40, 40, 40, 30],
          },
        ],
      });
    },
  },
}
</script>

<style lang="scss" scoped>
#grammerCharts{
  width: 580px;
  height: 220px;

}
</style>
