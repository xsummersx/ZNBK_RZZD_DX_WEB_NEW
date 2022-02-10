<!--
 * @Author: your name
 * @Date: 2021-12-14 13:56:07
 * @LastEditTime: 2022-02-09 15:24:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\StuReport.vue
-->
<template>
  <div class="bottom-box">
    <div v-show="showList.length > 0" class="clearfix">
      <div @click="ExportReport()" class="exportBtn float-r">
        <span class="exportIcon"></span>
        导出学生成绩单
      </div>
    </div>
    <div v-show="showList.length > 0 && !showLoading" class="table">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>班级</th>
            <th>总分</th>
            <th>年级排名</th>
            <th>班级排名</th>
            <th class="oneTH" v-for="item in ObjectiveQTypeList" :key="item.QTypeName">
              <div class="oneTH1">{{ item.QTypeName }}</div>
              <div class="oneTH2">
                <span class="oneSpan1">得分率</span
                ><span class="oneSpan2">年级排名/班级排名</span>
              </div>
            </th>
            <th class="oneTH" v-for="item in SubjectiveQTypeList" :key="item.QTypeName">
              <div class="oneTH1">{{ item.QTypeName }}</div>
              <div class="oneTH2">
                <span class="oneSpan1">得分率</span
                ><span class="oneSpan2">年级排名/班级排名</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in showList" :key="item.QTypeName">
            <td>{{ item.Index }}</td>
            <td>{{ item.StuName }}</td>
            <td>{{ item.CourseClassName }}</td>
            <td>{{ item.StuPaperScore }}</td>
            <td>{{ item.GradeRank }}</td>
            <td>{{ item.ClassRank }}</td>
            <td
              class="borderTD"
              v-for="item2 in item.ObjectiveQTypeList"
              :key="item2.QTypeName"
            >
              <span class="oneSpan1">{{ toPersent(item2.PaperScoreRate) }}</span>
              <span class="oneSpan2">{{
                toLine(item2.QTypeClassRank) + "/" + toLine(item2.QTypeGradeRank)
              }}</span>
            </td>
            <td
              class="borderTD"
              v-for="item2 in item.SubjectiveQTypeList"
              :key="item2.QTypeName"
            >
              <span class="oneSpan1">{{ toPersent(item2.PaperScoreRate) }}</span>
              <span class="oneSpan2">{{
                toLine(item2.QTypeClassRank) + "/" + toLine(item2.QTypeGradeRank)
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="showList.length <= 0 && !showLoading" class="temNoData">
      <span>暂无学生成绩单统计数据噢~</span>
    </div>

    <Loading
      v-show="showLoading"
      style="width: 960px; height: 330px"
      backSize="80%"
    ></Loading>
    <div class="paginationBox" v-if="StuCount > 5">
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="PageSize"
        layout=" prev, pager, next,total,  jumper"
        :total="StuCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { GetGradePaperScoreReport_V3 } from "@/api/diolog/stuReportDiolog";
import { GetClassPaperScoreReport_V3 } from "@/api/diolog/stuReportDiolog";
import { GetExportGradePaperScoreReport_V3 } from "@/api/diolog/stuReportDiolog";
import { GetExportClassPaperScoreReport_V3 } from "@/api/diolog/stuReportDiolog";
import Loading from "../../components/common/Loading.vue";
export default {
  props: {
    PaperName: String,
    PaperID: String,
  },
  data() {
    return {
      StuCount: 0,
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageNum: 1,
      PageSize: 5,
      SearchText: "",
      emptyText: "",
      showList: [],
      showLoading: true,
      ObjectiveQTypeList: [],
      SubjectiveQTypeList: [],
    };
  },
  components: {
    Loading,
  },
  mounted() {
    if (this.$route.name == "gradeRZZD") {
      this.GetGradePaperScoreReport_V3();
    } else {
      this.GetClassPaperScoreReport_V3();
    }
  },
  computed: {},
  methods: {
    // // 获取年级历次已发布试卷
    GetGradePaperScoreReport_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        PaperID: this.PaperID,
        PaperName: this.PaperName,
        PageNum: this.PageNum,
        PageSize: this.PageSize,
        SearchText: this.SearchText,
      };
      GetGradePaperScoreReport_V3(params).then((res) => {
        this.showLoading = false;
        this.StuCount = res.Data.PageStuCount;
        this.showList = res.Data.PaperStuScoreReportDetailList;
        if (this.showList.length > 0) {
          this.ObjectiveQTypeList = this.showList[0].ObjectiveQTypeList;
          this.SubjectiveQTypeList = this.showList[0].SubjectiveQTypeList;
        }
      });
    },
    // // 获取班级历次已发布试卷
    GetClassPaperScoreReport_V3() {
      console.log(this.PaperID);
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        CourseClassID: this.$store.state.CourseClassID,
        PaperID: this.PaperID,
        PaperName: this.PaperName,
        PageNum: this.PageNum,
        PageSize: this.PageSize,
        SearchText: this.SearchText,
      };
      GetClassPaperScoreReport_V3(params).then((res) => {
        this.showLoading = false;
        this.StuCount = res.Data.PageStuCount;
        this.showList = res.Data.PaperStuScoreReportDetailList;
        if (this.showList.length > 0) {
          this.ObjectiveQTypeList = this.showList[0].ObjectiveQTypeList;
          this.SubjectiveQTypeList = this.showList[0].SubjectiveQTypeList;
        }
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      if (this.$route.query.str == "gradeLeader") {
        this.PageSize2 = val;
      }
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.PageNum = val;
      this.emptyText = "加载中...";
      if (this.$route.name == "gradeRZZD") {
        this.GetGradePaperScoreReport_V3();
      } else {
        this.GetClassPaperScoreReport_V3();
      }
      // this.showList = [];
    },
    // 表格头部
    renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    }, // 文本分别添加到p,span标签中
    ExportReport() {
      if (this.$route.name == "gradeRZZD") {
        let params = {
          token: this.$store.state.token,
          TID: this.$store.state.TID,
          SchoolID: this.$store.state.SchoolID,
          GlobalGrade: this.$store.state.GlobalGrade,
          PaperID: this.PaperID,
          PaperName: this.PaperName,
        };
        GetExportGradePaperScoreReport_V3(params).then((res) => {
          window.open(res.Data, "_self");
        });
      } else {
        let params = {
          token: this.$store.state.token,
          TID: this.$store.state.TID,
          SchoolID: this.$store.state.SchoolID,
          CourseClassID: this.$store.state.CourseClassID,
          PaperID: this.PaperID,
          PaperName: this.PaperName,
        };
        GetExportClassPaperScoreReport_V3(params).then((res) => {
          window.open(res.Data, "_self");
        });
      }
    },
    toPersent(params) {
      if (params == "/") {
        return "-";
      } else {
        return (params * 100).toFixed() + "%";
      }
    },
    toLine(params) {
      if (params == "/") {
        return "-";
      } else {
        return params;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";
.bottom-box {
  padding: 10px 20px;
  .exportBtn {
    width: 182px;
    height: 28px;
    line-height: 28px;
    margin-bottom: 0;
    background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -28px
      no-repeat;
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    .exportIcon {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("../../assets/img/common/exportIcon.png") center center no-repeat;
      position: relative;
      top: 2px;
    }
    &:active {
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -0px
        no-repeat;
    }
    &:hover {
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -56px
        no-repeat;
    }
  }
}

.table {
  height: 330px;
  overflow-x: scroll;
  margin: 10px 0 20px;
  table {
    border-collapse: collapse;
    border: solid 1px rgba(255, 255, 255, 0.2);
    width: max-content;
    tr {
      height: 48px;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    tr:nth-of-type(even) {
      background-color: rgba(87, 166, 255, 0.08);
    }
    tr:hover {
      background-color: rgba(87, 166, 255, 0.3);
    }
    th {
      color: #fff;
      font-weight: bold;
      background-color: rgba(126, 172, 255, 0.2);
      border: solid 1px rgba(255, 255, 255, 0.1);
    }
    th:nth-child(1) {
      width: 90px;
    }
    th:nth-child(2) {
      width: 130px;
    }
    th:nth-child(3) {
      width: 80px;
    }
    th:nth-child(4) {
      width: 100px;
    }
    td:nth-child(5) {
      border-left: solid 1px rgba(255, 255, 255, 0.1);
    }
    .borderTD {
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }
    td {
      width: 100px;
      color: rgba(255, 255, 255, 0.6);
      span {
        display: inline-block;
      }
      .oneSpan1 {
        width: 80px;
        color: #fff600;
      }
      .oneSpan2 {
        width: 160px;
      }
    }
    td:nth-child(1) {
      color: rgba(255, 255, 255, 0.6);
    }
    td:nth-child(2),
    td:nth-child(3) {
      color: rgba(255, 255, 255, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    td:nth-child(4) {
      color: #51f0ff;
    }
  }
}
.temNoData {
  width: 940px;
  height: 320px;
  background: url("../../assets/img/nodata/ChartsNoData.png") center center no-repeat;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  span {
    display: inline-block;
    margin-top: 212px;
  }
}
.oneTH {
  width: 250px;
  height: 64px;
  .oneTH1,
  .oneTH2 {
    height: 32px;
    line-height: 32px;
  }
  .oneTH1 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .oneTH2 {
    span {
      display: inline-block;
    }
    .oneSpan1 {
      width: 80px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    .oneSpan2 {
      width: 160px;
    }
  }
}
.paginationBox {
  margin: 0 0 10px;
}
</style>
<style>
.stuPhoto {
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 5px;
  vertical-align: middle;
}
.stu-rank {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 100%;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 5px;
  vertical-align: middle;
}
.rank1,
.rank2,
.rank3 {
  display: inline-block;
  width: 22px;
  height: 29px;
  margin-right: 5px;
  background: url("~@/assets/img/grade/第一名.png") center center no-repeat;
}
.rank2 {
  background: url("~@/assets/img/grade/第二名.png") center center no-repeat;
}
.rank3 {
  background: url("~@/assets/img/grade/第三名.png") center center no-repeat;
}
</style>
