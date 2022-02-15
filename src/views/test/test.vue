<!--
 * @Author: 吴涛
 * @Date: 2021-07-30 14:36:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-30 13:59:10
 * @Description: 测试文件，调用接口例子 
-->
<template>
  <div>
    <div id="knownPointBox"></div>
    <div class="flexBox">
      <li v-for="item in list" :key="item.index">
        <div>姓名：{{ item.name }}</div>
        <div>年龄：{{ item.age }}</div>
        <div>性别：{{ item.gender }}</div>
      </li>
    </div>
  </div>
</template>
<script>
// import { getUserInfo } from "./../../api/head/test.js";
// import { saveInfo } from "./../../api/head/test.js";
export default {
  data() {
    return {
      list: [
        { name: "张三", index: 0, age: 18, gender: "男" },
        { name: "李四", index: 1, age: 111, gender: "男" },
        { name: "王五", index: 2, age: 222, gender: "男" },
        { name: "赵六", index: 3, age: 33, gender: "男" },
        { name: "张麻子", index: 4, age: 11, gender: "男" },
        { name: "李四字", index: 5, age: 22, gender: "男" },
        { name: "星星", index: 6, age: 33, gender: "男" },
      ],
    };
  },
  mounted() {
    this.drawline();
    //get 接口
    // let params = {
    //   Token: "402cf056-f4e2-4ca1-9b6b-0949a57b8787",
    //   UserID: "J112602",
    // };
    // getUserInfo(params).then((res) => {
    //   console.log(res);
    // });
    // let data = {
    //   CourseClassID: "A2F60AAA-9D61-4F32-A33C-A8D09ADA699F",
    //   ImagePath: "",
    //   Layer: "7",
    //   PaperID: "Paperf8d44e14f3994329bcb6f23dc8659b23",
    //   QuesID: "b86f031214b44aa7b85e5cb082970ae1",
    //   SchoolID: "S2-000040-0E73",
    //   SolutionContent: "",
    //   State: 1,
    //   TID: "J112602",
    // };
    // //post接口
    // saveInfo(params, data).then((res) => {
    //   console.log(res);
    // });
  },
  methods: {
    drawline() {
      var echarts = require("echarts");
      var knownPointBox = echarts.init(document.getElementById("knownPointBox"));
      knownPointBox.setOption({
        backgroundColor: "#fff",
        title: {
          text: "",
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 20,
          },
          top: "5%",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "none",
          },
        },
        grid: {
          top: "8%",
          left: "5%",
          right: "5%",
          bottom: "60px",
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 0, 0, 0.2)",
              },
            },
            axisLabel: {
              color: "#718096",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            boundaryGap: false,
            data: [
              "2022-01-12 08:00:00",
              "2022-01-12 08:00:00",
              "2022-01-12 08:00:00",
              "2022-01-12 08:00:00",
              "2022-01-12 08:00:00",
              "2022-01-12 08:00:00",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: this.lineCount,
            splitNumber: 1,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              margin: 20,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            showAllSymbol: true,
            symbol: "circle",
            hoverAnimation: false,
            symbolSize: (data) => {
              var size = 10;
              if (data.dataIndex == this.lastIndex) {
                size = 20;
              }
              return size;
            },
            stack: true,
            zlevel: 1,
            lineStyle: {
              color: "gray",
              width: 1,
              type: "dashed",
              normal: {
                opacity: 1,
              },
            },
            itemStyle: {
              color: "#6c50f3",
            },
            tooltip: {
              show: true,
              formatter: function () {
                let text =
                  "告警时间：2022-01-12 16:00:00<br>告警标题：XXX<br>告警描述：XXXXXXXXXX";
                return text;
              },
            },
            data: [1, "", 1, 1, 1, ""],
          },
          {
            name: "",
            type: "line",
            stack: true,
            showAllSymbol: true,
            zlevel: 1,
            symbol: "circle",
            hoverAnimation: false,
            symbolSize: (data) => {
              var size = 10;
              if (data.dataIndex == this.lastIndex) {
                size = 20;
              }
              return size;
            },
            lineStyle: {
              normal: {
                opacity: 0,
              },
            },
            itemStyle: {
              color: "#00ca95",
            },
            tooltip: {
              show: true,
              formatter: function () {
                let text =
                  "告警时间：2022-01-12 16:00:00<br>告警标题：XXX<br>告警描述：XXXXXXXXXX";
                return text;
              },
            },
            data: ["", "", 1, 1, 1, 1],
          },
          {
            name: "",
            type: "line",
            stack: true,
            zlevel: 1,
            showAllSymbol: true,
            symbol: "circle",
            hoverAnimation: false,
            symbolSize: (data) => {
              var size = 10;
              if (data.dataIndex == this.lastIndex) {
                size = 20;
              }
              return size;
            },
            lineStyle: {
              normal: {
                opacity: 0,
              },
            },
            itemStyle: {
              color: "#00ca95",
            },
            tooltip: {
              show: true,
              formatter: function () {
                let text =
                  "告警时间：2022-01-12 16:00:00<br>告警标题：XXX<br>告警描述：XXXXXXXXXX";
                return text;
              },
            },
            data: ["", "", 1, 1, 1, 1],
          },
          {
            name: "",
            type: "line",
            stack: true,
            showAllSymbol: true,
            zlevel: 1,
            symbol: "circle",
            hoverAnimation: false,
            symbolSize: (data) => {
              var size = 10;
              if (data.dataIndex == this.lastIndex) {
                size = 20;
              }
              return size;
            },
            lineStyle: {
              normal: {
                opacity: 0,
              },
            },
            itemStyle: {
              color: "#00ca95",
            },
            tooltip: {
              show: true,
              formatter: function () {
                let text =
                  "告警时间：2022-01-12 16:00:00<br>告警标题：XXX<br>告警描述：XXXXXXXXXX";
                return text;
              },
            },
            data: ["", "", 1, 1, 1, 1],
          },
        ],
        dataZoom: {
          type: "slider",
          xAxisIndex: 0,
          showDetail: false,
          showDataShadow: false,
          minValueSpan: 5,
          bottom: 0,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#knownPointBox {
  width: 740px;
  height: 331px;
  margin: 0 auto;
}
.flexBox {
  display: flex;
  align-content: center;
  flex-direction: row;
  width: 900px;
  height: 150px;
  li {
    width: 400px;
    height: 150px;
    margin: 0 25px;
    background-color: aqua;
  }
}
</style>
