<!--
 * @Author: 柳欢
 * @Date: 2021-11-30 14:52:21
 * @LastEditTime: 2021-12-14 13:59:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 年级组长，教师-历次作答统计
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计"></ArrowTitle>
    <div class="right-long-box" v-if="timeList.length > 0">
      <div class="float-l timeText">
        <vuescroll :ops="ops">
          <div
            @click="chooseActiveTime(index)"
            :class="index == activeTimeIndex ? 'active-timeItem' : 'normal-timeItem'"
            class="timeItem"
            v-for="(item, index) in timeList"
            :key="index"
          >
            {{ dataToDays(item.DayTime) }}<br />
            {{ dateToDate(item.DayTime) }}
          </div>
        </vuescroll>
      </div>
      <div class="float-l timeLine"></div>
      <div class="float-l paperText">
        <vuescroll :ops="ops">
          <div
            @click="chooseActivePaper(index)"
            :class="index == activePaperIndex ? 'active-paperItem' : 'normal-paperItem'"
            class="paperItem"
            v-for="(item, index) in paperList"
            :key="index"
          >
            <span
              ><span>{{ item.PaperFullScore }}</span
              ><span style="font-size: 12px; position: relative; top: -2px"
                >分</span
              ></span
            >
          </div>
        </vuescroll>
      </div>
      <div class="float-r">
        <div v-show="!noDataShow" class="right-btn clearfix">
          <span class="float-l paper-name">{{ PaperName }}</span>
          <span class="float-r paper-checkBtn" @click="dialog(1)">试卷题型得分分析</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="dialog(2)">学生成绩单</span>
        </div>
        <div v-show="noDataShow" class="noData"></div>
        <div v-show="!noDataShow" id="responseCharts"></div>
      </div>
    </div>
    <div class="right-long-box" v-else>
      <div class="temNoData"></div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1000px"
      top="0vh"
    >
      <div v-if="dialogVisible">
        <TeachQuesDia
          :PaperName="PaperName"
          :PaperID="PaperID"
          v-if="dialogIndex == 1"
        ></TeachQuesDia>
        <StuReport :PaperName="PaperName" :PaperID="PaperID" v-else></StuReport>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetPublishedPaperDaily_V3 } from "@/api/gradeTeacher/right";
import vuescroll from "vuescroll";
export default {
  data() {
    return {
      resInfo: [],
      activeTimeIndex: 0,
      activePaperIndex: 0,
      dialogVisible: false, //默认隐藏弹框
      dialogIndex: 1, //弹窗，学生成绩单，
      dialogTitle: "", //弹窗标题
      timeList: [],
      paperList: [],
      PaperID: "",
      PaperName: "",
      noDataShow: false,
      ops: {
        scrollPanel: {
          scrollingX: false,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: false,
          keepShow: false,
          background: "#9cd1ff",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "5px",
          disable: false,
        },
      },
    };
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    TeachQuesDia: () => import("../../views/dialog/TeachQuesDia.vue"),
    StuReport: () => import("../../views/dialog/StuReport.vue"),
    vuescroll,
  },
  created() {
    this.GetPublishedPaperDaily_V3(this.PaperID, 0);
  },
  mounted() {},
  methods: {
    GetPublishedPaperDaily_V3(PaperID, i) {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        CourseClassID: this.$store.state.CourseClassID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        StageNo: this.$store.state.StageNo,
        PaperID: PaperID,
      };
      GetPublishedPaperDaily_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.timeList = this.resInfo.ReleasedPaperList;
        this.paperList = this.timeList[this.activeTimeIndex].ReleasedPaperList;
        if (this.paperList.length > 0) {
          this.PaperName = this.paperList[i].PaperName;
          this.PaperID = this.paperList[i].PaperID;
          this.noDataShow = false;
          this.drawLine(this.resInfo.StuPaperScoreMap);
        } else {
          this.noDataShow = true;
        }
      });
    },
    // 转换星期几
    dataToDays(date) {
      var day = new Date(date).getDay();
      var days = "";
      switch (day) {
        case 1:
          days = "星期一";
          break;
        case 2:
          days = "星期二";
          break;
        case 3:
          days = "星期三";
          break;
        case 4:
          days = "星期四";
          break;
        case 5:
          days = "星期五";
          break;
        case 6:
          days = "星期六";
          break;
        case 0:
          days = "星期日";
          break;
      }
      return days;
    },
    // 转换年月日
    dateToDate(date) {
      var month = new Date(date).getMonth() + 1; //月
      var day = new Date(date).getDate(); //日
      var str = month + "月" + day + "日";
      return str;
    },
    // 选择日期
    chooseActiveTime(i) {
      this.activeTimeIndex = i;
      this.activePaperIndex = 0;
      this.paperList = this.timeList[i].ReleasedPaperList;
      if (this.paperList.length > 0) {
        this.PaperName = this.paperList[0].PaperName;
        this.PaperID = this.paperList[0].PaperID;
      }
      this.GetPublishedPaperDaily_V3(this.PaperID, 0);
    },
    chooseActivePaper(i) {
      this.activePaperIndex = i;
      this.PaperID = this.paperList[i].PaperID;
      this.PaperName = this.paperList[i].PaperName;
      this.GetPublishedPaperDaily_V3(this.paperList[i].PaperID, i);
    },
    dialog(i) {
      this.dialogVisible = true;
      this.dialogIndex = i;
      switch (i) {
        case 1:
          this.dialogTitle = "试卷题型得分分析-" + this.PaperName;
          break;
        case 2:
          this.dialogTitle = "学生成绩单-" + this.PaperName;
          break;
        default:
          break;
      }
    },
    drawLine(list) {
      let xData2 = [];
      let seriesData2 = [];
      for (let i = 0; i < list.length; i++) {
        xData2.push(list[i].RangeMinScore + "~" + list[i].RangeMaxScore + "分");
        seriesData2.push(list[i].StuCount);
      }
      var echarts = require("echarts");
      var responseCharts = echarts.init(document.getElementById("responseCharts"));
      responseCharts.setOption(this.$optionObj.responseOption);
      responseCharts.setOption({
        cursor: "default",
        xAxis: {
          data: xData2,
        },
        series: [
          {
            data: seriesData2,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
</style>
<style lang="scss" scoped>
.right-long-box {
  width: 1270px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 16px 24px 0 0;
  overflow: hidden;
}
.temNoData {
  width: 1270px;
  height: 250px;
  background: url("../../assets/img/nodata/ChartsNoData.png") center center no-repeat;
  border-radius: 4px;
  padding: 16px 24px 0 0;
}
.noData {
  width: 1040px;
  height: 210px;
  background: url("../../assets/img/nodata/ChartsNoData.png") center center no-repeat;
}
</style>
