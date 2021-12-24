<!--
 * @Author: 柳欢
 * @Date: 2021-12-13 16:15:01
 * @LastEditTime: 2021-12-16 15:37:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\gradeTeacher\GradeAnswer.vue
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计">
      <div class="rightOption float-r">
        <div class="checkPaper float-r" @click="checkPaper()">
          <span class="exportIcon"></span>
          查看试卷对比分析
        </div>
      </div>
    </ArrowTitle>
    <div class="right-long-box">
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
          <span class="float-r paper-checkBtn" @click="dialog(3)">试卷题型得分分析</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="dialog(2)">学生成绩单</span>
          <span class="float-r paper-line"></span>
          <span class="float-r paper-checkBtn" @click="dialog(1)">班级成绩对比分析</span>
        </div>
        <div id="responseCharts"></div>
      </div>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1000px"
      top="0vh"
    >
      <div>
        <HistoryDialog v-if="dialogIndex == 1"></HistoryDialog>
        <StuReport v-else-if="dialogIndex == 2"></StuReport>
        <AnalyseDialog v-else></AnalyseDialog>
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
  computed: {},
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    HistoryDialog: () => import("../../views/dialog/HistoryDialog.vue"),
    AnalyseDialog: () => import("../../views/dialog/AnalyseDialog.vue"),
    StuReport: () => import("../../views/dialog/StuReport.vue"),
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
        this.paperList = this.timeList[0].ReleasedPaperList;
        this.PaperName = this.paperList[i].PaperName;
        this.drawLine(this.resInfo.StuPaperScoreMap);
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
      console.log(days);
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
    dialog(i) {
      this.dialogVisible = true;
      this.dialogIndex = i;
      switch (i) {
        case 1:
          this.dialogTitle = "试卷对比分析";
          break;
        case 2:
          this.dialogTitle = "学生成绩单" + this.PaperName;
          break;
        case 3:
          this.dialogTitle = "试卷题型得分分析" + this.PaperName;
          break;
        default:
          break;
      }
    },
    // 选择日期
    chooseActiveTime(i) {
      this.activeTimeIndex = i;
      this.paperList = this.timeList[i].ReleasedPaperList;
    },
    // 选择试卷
    chooseActivePaper(i) {
      this.activePaperIndex = i;
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
