<!--
 * @Author: 柳欢
 * @Date: 2021-12-13 16:15:01
 * @LastEditTime: 2021-12-28 11:12:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\gradeTeacher\GradeAnswer.vue
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计">
      <div class="rightOption float-r">
        <div class="checkPaper float-r" @click="showDialog(4)">
          <span class="exportIcon"></span>
          查看试卷对比分析
        </div>
      </div>
    </ArrowTitle>
    <div class="right-long-box" v-show="timeList.length > 0">
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
        <div class="right-btn clearfix">
          <span class="float-l paper-name">{{ PaperName }}</span>
          <span class="float-r paper-checkBtn" @click="showDialog(3)"
            >试卷题型得分分析</span
          >
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="showDialog(2)">学生成绩单</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="showDialog(1)"
            >班级成绩对比分析</span
          >
        </div>
        <div v-show="noDataShow" class="noData"></div>
        <div v-show="!noDataShow" id="responseCharts"></div>
      </div>
    </div>
    <div class="right-long-box" v-show="timeList.length <= 0">
      <div class="temNoData">暂无试卷得分人数统计数据噢~</div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1000px"
      top="0vh"
    >
      <div v-if="dialogVisible">
        <HistoryDialog v-if="dialogIndex == 4"></HistoryDialog>
        <StuReport
          :PaperName="PaperName"
          :PaperID="PaperID"
          v-else-if="dialogIndex == 2"
        ></StuReport>
        <AnalyseDialog
          :PaperName="PaperName"
          :PaperID="PaperID"
          v-else-if="dialogIndex == 3"
        ></AnalyseDialog>
        <GradeScoreDia :PaperName="PaperName" :PaperID="PaperID" v-else></GradeScoreDia>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetGradePublishedPaperDaily_V3 } from "@/api/gradeTeacher/right";
import vuescroll from "vuescroll";
export default {
  data() {
    return {
      resInfo: [],
      activeTimeIndex: 0,
      activePaperIndex: 0,
      dialogVisible: false, //默认隐藏弹框
      dialogIndex: 1, //弹窗显示
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
          background: "transparent",
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
  computed: {},
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    HistoryDialog: () => import("../../views/dialog/HistoryDialog.vue"),
    AnalyseDialog: () => import("../../views/dialog/AnalyseDialog.vue"),
    StuReport: () => import("../../views/dialog/StuReport.vue"),
    GradeScoreDia: () => import("../../views/dialog/GradeScoreDia.vue"),
    vuescroll,
  },
  created() {
    this.GetGradePublishedPaperDaily_V3(this.PaperID, 0);
  },
  mounted() {},
  methods: {
    GetGradePublishedPaperDaily_V3(PaperID, i) {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        PaperID: PaperID,
      };
      GetGradePublishedPaperDaily_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.timeList = this.resInfo.ReleasedPaperList;
        if (this.timeList.length > 0) {
          this.paperList = this.timeList[this.activeTimeIndex].ReleasedPaperList;
        }
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
    // 弹窗显示
    showDialog(i) {
      this.dialogVisible = true;
      this.dialogIndex = i;
      switch (i) {
        case 1:
          this.dialogTitle = "班级成绩对比分析-" + this.PaperName;
          break;
        case 2:
          this.dialogTitle = "学生成绩单-" + this.PaperName;
          break;
        case 3:
          this.dialogTitle = "试卷题型得分分析" + this.PaperName;
          break;
        case 4:
          this.dialogTitle = "试卷对比分析";
          break;
        default:
          break;
      }
    },
    // 选择日期
    chooseActiveTime(i) {
      this.activeTimeIndex = i;
      this.activePaperIndex = 0;
      this.paperList = this.timeList[i].ReleasedPaperList;
      if (this.paperList.length > 0) {
        this.PaperID = this.paperList[0].PaperID;
        this.PaperName = this.paperList[0].PaperName;
      }
      this.GetGradePublishedPaperDaily_V3(this.PaperID, 0);
    },
    // 选择试卷
    chooseActivePaper(i) {
      this.activePaperIndex = i;
      this.PaperID = this.paperList[i].PaperID;
      this.PaperName = this.paperList[i].PaperName;
      this.GetGradePublishedPaperDaily_V3(this.paperList[i].PaperID, i);
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
  text-align: center;
  line-height: 372px;
}
.rightOption {
  .checkPaper {
    background: url("../../assets/img/grade/btn.png") -0px -140px no-repeat;
    width: 150px;
    height: 28px;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
    color: #ffffff;
    cursor: pointer;
    .exportIcon {
      width: 14px;
      height: 14px;
      display: inline-block;
      vertical-align: middle;
      background: url("../../assets/img/grade/查看试卷对比分析.png") center center
        no-repeat;
    }
  }
  .checkPaper:hover {
    background: url("../../assets/img/grade/btn.png") -0px -84px no-repeat;
  }
  .checkPaper:active {
    background: url("../../assets/img/grade/btn.png") -0px -112px no-repeat;
  }
}
</style>
