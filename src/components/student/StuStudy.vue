<!--
 * @Author: your name
 * @Date: 2021-12-30 14:39:12
 * @LastEditTime: 2021-12-30 14:39:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\student\Question.vue
-->
<template>
  <div class="right-Long-Box">
    <div class="box-title clearfix">
      <span class="float-l title">做题特点</span>
    </div>
    <div class="legend" v-show="showData">
      <span class="maxScore" v-show="maxTypeName"
        >正确率最高题型: <span>{{ maxTypeName }}</span></span
      >
      <span class="minScore" v-show="minTypeName"
        >正确率最低题型: <span>{{ minTypeName }}</span></span
      >
    </div>
    <div id="questionCharts"></div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1000px"
      top="0vh"
    >
      <div v-if="dialogVisible">
        <QuestionDiolog
          :TypeNo="TypeNo"
          :GenreID="GenreID"
          v-if="dialogIndex == 1"
        ></QuestionDiolog>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetStuExerciseTrait_V3 } from "../../api/student/right";
export default {
  data() {
    return {
      resInfo: {
        TypeInfoList: [],
        PaperCorrectRateList: [],
      },
      showData: false,
      maxTypeName: "",
      minTypeName: "",
      TypeNo: "",
      GenreID: "",
      dialogTitle: "", //弹窗标题
      dialogVisible: false, //默认隐藏弹框
      dialogIndex: 1, //弹窗，学生成绩单，
    };
  },
  components: {
    QuestionDiolog: () => import("../../views/dialog/QuestionDiolog.vue"),
  },
  created() {},
  mounted() {
    this.GetStuExerciseTrait_V3();
  },
  methods: {
    // 教师
    GetStuExerciseTrait_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        StageNo: this.$store.state.StageNo,
        SchoolID: this.$store.state.SchoolID,
        CourseClassID: this.$store.state.CourseClassID,
        StuID: this.$store.state.StuID,
      };
      GetStuExerciseTrait_V3(params).then((res) => {
        this.resInfo = res.Data;
        if (this.resInfo.MaxRateGenreName.length > 2) {
          this.maxTypeName =
            this.resInfo.MaxRateGenreName[0] +
            "、" +
            this.resInfo.MaxRateGenreName[1] +
            "等";
        } else {
          this.maxTypeName = this.resInfo.MaxRateGenreName.join("、");
        }
        if (this.resInfo.MinRateGenreName.length > 2) {
          this.minTypeName =
            this.resInfo.MinRateGenreName[0] +
            "、" +
            this.resInfo.MinRateGenreName[1] +
            "等";
        } else {
          this.minTypeName = this.resInfo.MinRateGenreName.join("、");
        }
        this.drawLine();
        this.showData = true;
      });
    },
    dialog(i) {
      this.dialogVisible = true;
      this.dialogIndex = i;
      this.dialogTitle =
        this.$route.name == "gradeRZZD" ? "班级" : "学生" + "做题特点对比分析";
    },
    //统计图最大标注
    markPontMax() {
      let xAxisData = [];
      let that = this;
      this.resInfo.TypeInfoList.map((item) => {
        xAxisData.push(item.TypeName);
      });
      let legend = xAxisData;
      let markMaxData = [];
      for (let i = 0; i < this.resInfo.TypeInfoList.length; i++) {
        var bol = that.resInfo.MaxRateGenreName.some(function (element) {
          if (element == that.resInfo.TypeInfoList[i].TypeName) {
            return element;
          }
        });
        if (bol) {
          let obj = {};
          obj.xAxis = legend[i];
          obj.yAxis = (this.resInfo.TypeInfoList[i].TypeScoreRate * 100).toFixed(2);
          markMaxData.push(obj);
        }
      }
      return markMaxData;
    },
    //统计图最小标注
    markPontMin() {
      let xAxisData = [];
      let that = this;
      this.resInfo.TypeInfoList.map((item) => {
        xAxisData.push(item.TypeName);
      });
      let legend = xAxisData;
      let markMinData = [];
      for (let i = 0; i < this.resInfo.TypeInfoList.length; i++) {
        var bol = that.resInfo.MinRateGenreName.some(function (element) {
          if (element == that.resInfo.TypeInfoList[i].TypeName) {
            return element;
          }
        });
        if (bol) {
          let obj = {};
          obj.xAxis = legend[i];
          obj.yAxis = (this.resInfo.TypeInfoList[i].TypeScoreRate * 100).toFixed(2);
          markMinData.push(obj);
        }
      }
      return markMinData;
    },
    drawLine() {
      let xData2 = [];
      let seriesData2 = [];
      let MAX = [];
      let that = this;
      // let TypeInfoAvgScore = (that.resInfo.TypeInfoAvgScore * 100).toFixed();
      for (let i = 0; i < that.resInfo.TypeInfoList.length; i++) {
        xData2.push(that.resInfo.TypeInfoList[i].TypeName);
        var bol = that.resInfo.MinRateGenreName.some(function (element) {
          if (element == that.resInfo.TypeInfoList[i].TypeName) {
            return element;
          }
        });
        if (bol) {
          MAX.push(100.01);
          seriesData2.push((that.resInfo.TypeInfoList[i].TypeScoreRate * 100).toFixed(2));
        } else {
          MAX.push(100);
          seriesData2.push((that.resInfo.TypeInfoList[i].TypeScoreRate * 100).toFixed(2));
        }
      }
      var echarts = require("echarts");
      var questionCharts = echarts.init(document.getElementById("questionCharts"));
      questionCharts.setOption(this.$optionObj.questionOptionTwo);
      questionCharts.setOption({
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
            data: MAX,
          },
          {
            cursor: "default",
            data: seriesData2,
            markPoint: {
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI0RDg3OTYxNTgwMTExRUM4MDMxRUZDMUVCRjFGRDU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI0RDg3OTYyNTgwMTExRUM4MDMxRUZDMUVCRjFGRDU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjREODc5NUY1ODAxMTFFQzgwMzFFRkMxRUJGMUZENTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjREODc5NjA1ODAxMTFFQzgwMzFFRkMxRUJGMUZENTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz42oWljAAAAp0lEQVR42mJk+H+XAQpCgTgHiI2h/DNAPBWIV4M4jECFjEB6FhCnMGAHc4A4DaQwAciYz4AfJDEBiVwkAZA7HKH4LpJ4FkihFpJAFxAfgOIuJHEdkMLXSAKWYHdDsCWS+GuQG6cDGRlIgldgpiCJTQcpVIRKcuHwyDeY1feBOA+Pj0Fy95mgnLlAXAHE/5EU/IeKzYUFOLJuP6hvQZ4pBeJNMAmAAAMAo6snWyk96pQAAAAASUVORK5CYII=",
              symbolSize: [10, 10],
              symbolOffset: [0, -15], //偏移位置
              cursor: "default",
              itemStyle: {
                color: "red",
              },
              emphasis: {
                label: {
                  show: false,
                  color: "transparent",
                },
              },
              label: {
                show: false,
              },
              data: this.markPontMax(),
            },
          },
          {
            data: MAX,
            cursor: "default",
            markPoint: {
              symbol:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE2RjFEQjc2NTgwMTExRUM5RTFCRTIzRDAyOUYzNTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE2RjFEQjc3NTgwMTExRUM5RTFCRTIzRDAyOUYzNTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTZGMURCNzQ1ODAxMTFFQzlFMUJFMjNEMDI5RjM1NjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTZGMURCNzU1ODAxMTFFQzlFMUJFMjNEMDI5RjM1NjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz49eoCiAAAAs0lEQVR42mL8UtPMAAWhQJwDxMZQ/hkgngrEq0EcJiBmBOLZQLwKiO2AmBuK7aFiIDlGFiARD8QpDLgBSO4YyMRcJMG7QOwIxXeRxLNACrWQBLqA+AAUdyGJ64AUvkYSsIS6mRHKhoHXIIVbkQQSgPgSFCcgiW9hglrxDdkaKIYBkFw3SOF9IM7D42uQ3H0mKGcuEFcA8X8kBf+hYiA5BhYkiU4gvg51CsgzpUC8CSYJEGAAT/cjWt241fUAAAAASUVORK5CYII=",
              symbolSize: [10, 10],
              symbolOffset: [0, -15], //偏移位置
              cursor: "default",
              itemStyle: {
                color: "red",
              },
              emphasis: {
                label: {
                  show: false,
                  color: "transparent",
                },
              },
              label: {
                show: false,
              },
              data: this.markPontMin(),
            },
          },
        ],
      });
      // questionCharts.off("click");
      // questionCharts.on("click", function (params) {
      //   that.dialogVisible = false;
      //   that.dialogIndex = 1;
      //   that.GenreID = that.resInfo.TypeInfoList[params.dataIndex].GenreID;
      //   that.TypeNo = that.resInfo.TypeInfoList[params.dataIndex].TypeNo;
      //   that.dialogVisible = true;
      //   that.dialogTitle = params.name + "对比分析";
      //   //
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.right-Long-Box {
  display: inline-block;
  width: 840px;
  height: 260px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px 0px 4px 4px;
  margin: 20px 20px 0 0;
  padding: 18px 20px 0 30px;
}
#questionCharts {
  width: 780px;
  height: 205px;
}

.legend {
  margin: 0 auto;
  text-align: center;
  color: #e0e0e0;
  font-size: 12px;
  .maxScore {
    display: inline-block;
    margin-right: 45px;
    background: url("../../assets/img/teacher/最高最好标识.png") center left no-repeat;
    padding-left: 14px;
    span {
      color: #99ff50;
    }
  }
  .minScore {
    background: url("../../assets/img/teacher/最低最弱标识.png") center left no-repeat;
    padding-left: 14px;
    span {
      color: #ff8080;
    }
  }
}
</style>
