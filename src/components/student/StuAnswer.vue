<!--
 * @Author: your name
 * @Date: 2021-12-30 15:12:49
 * @LastEditTime: 2021-12-30 15:12:50
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\student\StuAnswer.vue
-->
<template>
  <div>
    <ArrowTitle titleStr="历次作答统计"></ArrowTitle>
    <div class="right-long-box" v-show="timeList.length > 0 && !showLoading">
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
      <div class="float-l">
        <div class="right-btn clearfix">
          <span class="float-l paper-name">{{ PaperName }}</span>
          <span class="float-r paper-checkBtn" @click="dialog(1)">查看试卷作答详情</span>
        </div>
        <div style="width: 1040px; height: 184px; border-radius: 6px; margin-top: 10px">
          <div
            style="width: 1040px; overflow-y: hidden"
            :style="{
              'overflow-x': resInfo.QTypeList.length > 10 ? 'scroll' : 'auto',
            }"
          >
            <table
              v-if="resInfo.QTypeList.length != 0"
              class="customTable"
              :style="{
                width: resInfo.QTypeList.length > 9 ? 'max-content' : '100%',
              }"
            >
              <thead>
                <tr>
                  <th
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                  ></th>
                  <th
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                    v-for="(item, index) in resInfo.QTypeList"
                    :key="index"
                  >
                    <span>{{ item.QTypeName }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="TDHead"
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                  >
                    <span>得分率</span>
                  </td>
                  <td
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                    class="ScoreTD ScoreTD2"
                    :class="
                      item.PaperScoreRate >= 0.9
                        ? 'BlueScoreTD'
                        : item.PaperScoreRate >= 0.8
                        ? 'GreenScoreTD'
                        : item.PaperScoreRate >= 0.7
                        ? 'OrangeScoreTD'
                        : 'RedScoreTD'
                    "
                    v-for="(item, index) in resInfo.QTypeList"
                    :key="index"
                  >
                    <!-- @click="
                      openPopUp(item.TypeNo, item.GenreName,item.TypeName, item.GenreID, 1)
                    " -->
                    <span>
                      {{ (item.PaperScoreRate * 100).toFixed() + "%" }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td
                    class="TDHead"
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                  >
                    <span> 班级排名 </span>
                  </td>
                  <td
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                    v-for="(item, index) in resInfo.QTypeList"
                    :key="index"
                  >
                    <span
                      class="IndexRank"
                      :class="
                        item.QTypeClassRank == 1
                          ? 'FirstRank'
                          : item.QTypeClassRank == 2
                          ? 'SecondRank'
                          : item.QTypeClassRank == 3
                          ? 'ThirdRank'
                          : ''
                      "
                      >{{ item.QTypeClassRank > 3 ? item.QTypeClassRank : "" }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <td
                    class="TDHead"
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                  >
                    <span> 年级排名 </span>
                  </td>
                  <td
                    :style="{
                      width:
                        resInfo.QTypeList.length > 9
                          ? '100px'
                          : 100 / (resInfo.QTypeList.length + 1) + '%',
                    }"
                    v-for="(item, index) in resInfo.QTypeList"
                    :key="index"
                  >
                    <span
                      class="IndexRank"
                      :class="
                        item.QTypeGradeRank == 1
                          ? 'FirstRank'
                          : item.QTypeGradeRank == 2
                          ? 'SecondRank'
                          : item.QTypeGradeRank == 3
                          ? 'ThirdRank'
                          : ''
                      "
                      >{{ item.QTypeGradeRank > 3 ? item.QTypeGradeRank : "" }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="width: 1120px" class="tableNoData" v-else></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-long-box" v-show="timeList.length <= 0 && !showLoading">
      <div class="temNoData">暂无试卷得分人数统计数据噢~</div>
    </div>
    <Loading
      v-show="showLoading"
      style="width: 1270px; height: 250px"
      backSize="80%"
    ></Loading>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1000px"
      top="0vh"
    >
      <div v-if="dialogVisible1">
        <StuPaper
          :PaperName="PaperName"
          :PaperID="PaperID"
          v-if="dialogIndex == 1"
        ></StuPaper>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetStuPublishedPaperDaily_V3 } from "@/api/student/right";
import vuescroll from "vuescroll";
import Loading from "../common/Loading.vue";
export default {
  data() {
    return {
      resInfo: {
        QTypeList: [],
      },
      activeTimeIndex: 0,
      activePaperIndex: 0,
      dialogVisible: false, //默认隐藏弹框
      dialogVisible1: false,
      dialogIndex: 1, //弹窗，学生成绩单，
      dialogTitle: "", //弹窗标题
      timeList: [],
      paperList: [],
      PaperID: "",
      PaperName: "",
      showLoading: true,
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
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
    StuPaper: () => import("../../views/dialog/StuPaper.vue"),
    vuescroll,
    Loading,
  },
  mounted() {
    this.GetStuPublishedPaperDaily_V3(this.PaperID, 0);
  },
  methods: {
    GetStuPublishedPaperDaily_V3(PaperID, i) {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        StageNo: this.$store.state.StageNo,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        CourseClassID: this.$store.state.CourseClassID,
        StuID: this.$store.state.StuID,
        PaperID: PaperID,
      };
      GetStuPublishedPaperDaily_V3(params).then((res) => {
        this.showLoading = false;
        this.resInfo = res.Data;
        this.timeList = this.resInfo.ReleasedPaperList;
        if (this.timeList.length > 0) {
          this.paperList = this.timeList[0].ReleasedPaperList;
          if (this.paperList.length > 0) {
            this.PaperName = this.paperList[i].PaperName;
            this.PaperID = this.paperList[i].PaperID;
          }
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
      this.dialogVisible1 = !this.dialogVisible1;
      this.activeTimeIndex = i;
      this.activePaperIndex = 0;
      this.paperList = this.timeList[i].ReleasedPaperList;
      if (this.paperList.length > 0) {
        this.PaperName = this.paperList[0].PaperName;
        this.PaperID = this.paperList[0].PaperID;
      }
      this.GetGradePublishedPaperDaily_V3(this.PaperID, 0);
    },
    chooseActivePaper(i) {
      this.dialogVisible1 = !this.dialogVisible1;
      this.activePaperIndex = i;
      this.PaperID = this.paperList[i].PaperID;
      this.PaperName = this.paperList[i].PaperName;
      this.GetStuPublishedPaperDaily_V3(this.paperList[i].PaperID, i);
    },

    dialog(i) {
      this.dialogVisible1 = true;
      this.dialogVisible = true;
      this.dialogIndex = i;
      switch (i) {
        case 1:
          this.dialogTitle = this.PaperName;
          break;
        case 2:
          this.dialogTitle = "学生成绩单-" + this.PaperName;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/js/dialog/colorGlobal.scss";
@import "../../assets/js/dialog/elementReset_Dialog.scss";
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
  height: 205px;
  background: url("../../assets/img/nodata/暂无试卷得分人数统计数据.png") center center
    no-repeat;
  border-radius: 4px;
  text-align: center;
  line-height: 23.5;
}
.customTable {
  border-collapse: collapse;
  width: max-content;
  th,
  td {
    width: 100px;
    display: inline-block;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border: solid 1px rgba(126, 172, 255, 0.2);
    span {
      display: inline-block;
    }
  }
  th {
    background-color: rgba(126, 172, 255, 0.2);
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;
  }
  .ScoreTD {
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .ScoreTD2 {
    span {
      text-decoration: none;
      cursor: default;
    }
  }
  .IndexRank {
    display: inline-block;
    width: 24px;
    height: 29px;
    line-height: 26px;
    margin-top: 8px;
  }
  .FirstRank {
    background: url("~@/assets/img/grade/第一名.png") center center no-repeat;
  }
  .SecondRank {
    background: url("~@/assets/img/grade/第二名.png") center center no-repeat;
  }
  .ThirdRank {
    background: url("~@/assets/img/grade/第三名.png") center center no-repeat;
  }
  .BlueScoreTD {
    color: #00fff0;
  }
  .GreenScoreTD {
    color: #60ff60;
  }
  .OrangeScoreTD {
    color: #fff600;
  }
  .RedScoreTD {
    color: #ff8080;
  }
}
</style>
