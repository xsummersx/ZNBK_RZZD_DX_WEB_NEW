<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2022-03-16 15:56:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，学习特点
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">学习特点</span>
    </div>
    <div v-show="moduleState == 'hasData'" class="main">
      <div class="left">
        <div class="masteredCount">
          <span>平均学习时长</span>
          <br />
          <span class="count">
            <span class="number">{{ resInfo.ClassStudyTimes.GradeAvgStudyTimes.toFixed(2) }}</span
            >h</span
          >
        </div>
        <div class="masteredCount">
          <span>平均知识掌握速度</span>
          <span class="count"
            ><span class="number">{{
              resInfo.ClassStudySpeeds.GradeAvgStudySpeeds.toFixed(2)
            }}</span></span
          >
        </div>
      </div>
      <div v-show="!noDataShow1" class="right">
        <div class="pieChart" id="pieChart1"></div>
        <span>学习时长分布</span>
      </div>
      <div v-show="noDataShow1" class="noData1">暂无学习时长分布数据噢~</div>
      <div v-show="!noDataShow2" class="right">
        <div class="pieChart" id="pieChart2"></div>
        <span>知识掌握速度</span>
      </div>
      <div v-show="noDataShow1" class="noData2">暂无知识掌握速度数据噢~</div>
    </div>
    <div v-show="moduleState == 'noData'" class="graImg">
      <img class="graImgii" src="../../assets/img/nodata/learnNoData1.png" />
      <span>暂无学习时长数据噢~</span>
    </div>
    <Loading
      v-show="moduleState == 'loading'"
      style="width: 550px; height: 220px"
      backSize="80%"
    ></Loading>
  </div>
</template>

<script>
import { GetClassStudyFeature_V3 } from "../../api/paperTwo/gradeQuestion";
import Loading from "../common/Loading.vue";
import "echarts-gl";
export default {
  data() {
    return {
      resInfo: {
        ClassStudyTimes: {
          GradeAvgStudyTimes: 0,
        },
        ClassStudySpeeds: {
          GradeAvgStudySpeeds: 0,
        },
      },
      moduleState: "loading",
      noDataShow1: false,
      noDataShow2: false,
      option1: {},
      option2: {},
    };
  },
  mounted() {
    this.init();
  },
  components: {
    Loading,
  },
  computed: {
    optionData1: function () {
      let arr = [
        {
          name: "学习时长优秀学生",
          value:
            (this.resInfo.ClassStudyTimes.ExceStuCount /
              (this.resInfo.ClassStudyTimes.ExceStuCount +
                this.resInfo.ClassStudyTimes.BetterStuCount +
                this.resInfo.ClassStudyTimes.NormalStuCount +
                this.resInfo.ClassStudyTimes.NotLearningStuCount)) *
            100,
          count: this.resInfo.ClassStudyTimes.ExceStuCount,
          itemStyle: {
            color: "rgba(249,169,74,1)",
          },
        },
        {
          name: "学习时长较好学生",
          value:
            (this.resInfo.ClassStudyTimes.BetterStuCount /
              (this.resInfo.ClassStudyTimes.ExceStuCount +
                this.resInfo.ClassStudyTimes.BetterStuCount +
                this.resInfo.ClassStudyTimes.NormalStuCount +
                this.resInfo.ClassStudyTimes.NotLearningStuCount)) *
            100,
          count: this.resInfo.ClassStudyTimes.BetterStuCount,
          itemStyle: {
            color: "rgba(37,216,187,1)",
          },
        },
        {
          name: "学习时长一般学生",
          value:
            (this.resInfo.ClassStudyTimes.NormalStuCount /
              (this.resInfo.ClassStudyTimes.ExceStuCount +
                this.resInfo.ClassStudyTimes.BetterStuCount +
                this.resInfo.ClassStudyTimes.NormalStuCount +
                this.resInfo.ClassStudyTimes.NotLearningStuCount)) *
            100,
          count: this.resInfo.ClassStudyTimes.NormalStuCount,
          itemStyle: {
            color: "rgba(251,122,122,1)",
          },
        },
        {
          name: "未学习学生",
          value:
            (this.resInfo.ClassStudyTimes.NotLearningStuCount /
              (this.resInfo.ClassStudyTimes.ExceStuCount +
                this.resInfo.ClassStudyTimes.BetterStuCount +
                this.resInfo.ClassStudyTimes.NormalStuCount +
                this.resInfo.ClassStudyTimes.NotLearningStuCount)) *
            100,
          count: this.resInfo.ClassStudyTimes.NotLearningStuCount,
          itemStyle: {
            color: "rgba(193,193,193,1)",
          },
        },
      ];
      return arr;
    },

    optionData2: function () {
      let arr = [
        {
          name: "知识掌握速度较快",
          value:
            (this.resInfo.ClassStudySpeeds.GoodStuCount /
              (this.resInfo.ClassStudySpeeds.GoodStuCount +
                this.resInfo.ClassStudySpeeds.NormalStuCount +
                this.resInfo.ClassStudySpeeds.BadStuCount)) *
            100,
          count: this.resInfo.ClassStudySpeeds.GoodStuCount,
          itemStyle: {
            color: "rgba(41,176,38,1)",
          },
        },
        {
          name: "知识掌握速度一般",
          value:
            (this.resInfo.ClassStudySpeeds.NormalStuCount /
              (this.resInfo.ClassStudySpeeds.GoodStuCount +
                this.resInfo.ClassStudySpeeds.NormalStuCount +
                this.resInfo.ClassStudySpeeds.BadStuCount)) *
            100,
          count: this.resInfo.ClassStudySpeeds.NormalStuCount,
          itemStyle: {
            color: "rgba(0,170,255,1)",
          },
        },
        {
          name: "知识掌握速度较差",
          value:
            (this.resInfo.ClassStudySpeeds.BadStuCount /
              (this.resInfo.ClassStudySpeeds.GoodStuCount +
                this.resInfo.ClassStudySpeeds.NormalStuCount +
                this.resInfo.ClassStudySpeeds.BadStuCount)) *
            100,
          count: this.resInfo.ClassStudySpeeds.BadStuCount,
          itemStyle: {
            color: "rgba(251,122,122,1)",
          },
        },
      ];
      return arr;
    },
  },
  methods: {
    GetClassStudyFeature_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        CourseClassID: this.$store.state.CourseClassID,
      };
      GetClassStudyFeature_V3(params).then((res) => {
        this.resInfo = res.Data;
        if (
          this.resInfo.ClassStudyTimes.ExceStuCount == 0 &&
          this.resInfo.ClassStudyTimes.BetterStuCount == 0 &&
          this.resInfo.ClassStudyTimes.NormalStuCount == 0 &&
          this.resInfo.ClassStudyTimes.NotLearningStuCount == 0
        ) {
          this.noDataShow1 = true;
        }
        if (
          this.resInfo.ClassStudySpeeds.GoodStuCount == 0 &&
          this.resInfo.ClassStudySpeeds.NormalStuCount == 0 &&
          this.resInfo.ClassStudySpeeds.BadStuCount == 0
        ) {
          this.noDataShow2 = true;
        }
        if (this.resInfo.ClassStudyTimes.GradeAvgStudyTimes == 0) {
          this.moduleState = "noData";
        } else {
          this.moduleState = "hasData";
        }
        this.drawInit();
      });
    },
    init() {
      this.GetClassStudyFeature_V3();
    },
    drawInit() {
      //构建3d饼状图
      let myChart1 = this.$echarts.init(document.getElementById("pieChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("pieChart2"));
      // 传入数据生成 option
      this.option1 = this.getPie3D(this.optionData1, 0);
      this.option2 = this.getPie3D(this.optionData2, 0.6);
      myChart1.setOption(this.option1);
      myChart2.setOption(this.option2);
      // this.bindListen(myChart1);
      // this.bindListen(myChart2);
    },
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      // let legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name: typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
          type: "surface",

          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: k,
          },
          itemStyle: {
            opacity: 1,
          },
        };
        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {};
          typeof pieData[i].itemStyle.color != "undefined"
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != "undefined"
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;
          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          series[i].pieData.value,
        );

        startValue = endValue;

        // legendData.push(series[i].name);
      }
      let boxHeight = "";
      if (internalDiameterRatio == 0) {
        boxHeight = this.getHeight3D(series, 40); //通过传参设定3d饼/环的高度
      } else {
        boxHeight = this.getHeight3D(series, 20); //通过传参设定3d饼/环的高度
      }
      // 配置
      let option = {};
      if (internalDiameterRatio == 0) {
        option = {
          tooltip: {
            borderColor: "#fff",
            trigger: "item",
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                return `${
                  params.seriesName
                }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  params.color
                };"></span>${this.getCount1(params.seriesName)}人 (${option.series[
                  params.seriesIndex
                ].pieData.value.toFixed(2)}%)`;
              }
            },
          },
          xAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          yAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          zAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          grid3D: {
            show: false,
            boxHeight: boxHeight,
            viewControl: {
              distance: 230,
              alpha: 20,
              beta: 150,
              rotateSensitivity: [1, 0],
              zoomSensitivity: 0, //设置为0无法缩放
              panSensitivity: 0, //设置为0无法平移
            },
          },
          series: series,
        };
      } else {
        option = {
          tooltip: {
            borderColor: "#fff",
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                return `${
                  params.seriesName
                }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  params.color
                };"></span>${this.getCount2(params.seriesName)}人 (${option.series[
                  params.seriesIndex
                ].pieData.value.toFixed(2)}%)`;
              }
            },
          },
          xAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          yAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          zAxis3D: {
            min: -1.3,
            max: 1.3,
          },
          grid3D: {
            show: false,
            boxHeight: boxHeight,
            viewControl: {
              distance: 140,
              alpha: 20,
              beta: 150,
              rotateSensitivity: [1, 0],
              zoomSensitivity: 0, //设置为0无法缩放
              panSensitivity: 0, //设置为0无法平移
            },
          },
          series: series,
        };
      }
      return option;
    },

    //获取3d丙图的最高扇区的高度
    getHeight3D(series, height) {
      series.sort((a, b) => {
        return b.pieData.value - a.pieData.value;
      });
      return (height * 25) / series[0].pieData.value;
    },

    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;
      // 如果只有一个扇形，则不实现选中效果。
      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;
      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;
      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },
        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },
        x: function (u, v) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
      };
    },
    // bindListen(myChart) {
    //   // 监听点击事件，实现弹窗
    //   myChart.on("click", function (params) {
    //     console.log(params);
    //   });
    // },
    getCount1(d) {
      return this.optionData1.filter((item) => item.name === d)[0].count;
    },
    getCount2(d) {
      return this.optionData2.filter((item) => item.name === d)[0].count;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 80%;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  .left {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    .masteredCount {
      width: 136px;
      height: 74px;
      padding: 0 0 0 10px;
      background: url(~@/assets/img/teacher/list.png) center center no-repeat;
      .count {
        display: block;
        margin-top: 10px;
        color: #4bf3f9;
        font-size: 14px;
        font-weight: bold;
        .number {
          font-family: "Oswald";
          font-size: 28px;
          font-weight: normal;
        }
      }
    }
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    #pieChart1,
    #pieChart2 {
      width: 188px;
      height: 180px;
      background: url(~@/assets/img/teacher/底座.png) center 75px no-repeat;
      // margin-bottom: 10px;
    }
  }
  .noData1,
  .noData2 {
    width: 188px;
    height: 180px;
    line-height: 292px;
    text-align: center;
    background: url("../../assets/img/nodata/暂无学习时长分布数据.png") center 40px no-repeat;
  }
  .noData2 {
    background: url("../../assets/img/nodata/暂无知识掌握速度数据.png") center 40px no-repeat;
  }
}
.graImg {
  width: 100%;
  height: 80%;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .graImgii {
    width: 88px;
    height: 88px;
    margin: 0 0 10px 0;
  }
}
</style>
<style>
#pieChart1 > div > canvas:hover {
  cursor: default;
}
#pieChart2 > div > canvas:hover {
  cursor: default;
}
</style>
