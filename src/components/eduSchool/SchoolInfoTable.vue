<!--
 * @Author: your name
 * @Date: 2022-02-22 19:44:50
 * @LastEditTime: 2022-03-24 13:59:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\eduSchool\SchoolInfoTable.vue
-->
<template>
  <div style="padding: 20px">
    <div
      class="exportScore float-r"
      @click="exoprtExcel"
      style="margin-bottom: 10px; margin-right: 0px; color: #fff"
    >
      <span class="exportIcon"></span>
      导出成绩单
    </div>
    <el-table
      :empty-text="emptyText"
      :data="showList"
      height="278"
      style="width: 100%; height: 305px"
      class="bueatyScroll"
    >
      <el-table-column prop="SchoolName" label="学校名称" width="160">
        <template slot-scope="scope">
          <span class="gray noWrap">
            {{ scope.row.SchoolName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="PaperNum" label="累计作答试卷" width="110">
        <template slot-scope="scope">
          <span class="gray" style="color: #51f0ff">
            {{ scope.row.PaperNum }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="ScoreRate" label="平均正确率" width="108">
        <template slot-scope="scope">
          <span class="gray" style="color: #fff600"> {{ scope.row.ScoreRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <el-table-column prop="CognitiveScore" label="认知平均分" width="110">
        <template slot-scope="scope">
          <span class="gray" style="color: #60ff60"> {{ scope.row.CognitiveScore }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="FirstRate" label="A+" width="58">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.FirstRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <el-table-column prop="SecondRate" label="B+" width="58">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.SecondRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <el-table-column prop="ThirdRate" label="C+" width="58">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.ThirdRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <el-table-column prop="FourthRate" label="D+" width="58">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.FourthRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <el-table-column prop="FifthRate" label="E+" width="58">
        <template slot-scope="scope">
          <span class="gray"> {{ scope.row.FifthRate | toPercent }}% </span>
        </template>
      </el-table-column>
      <template slot="empty" v-if="emptyText == '加载中...'">
        <div class="table-loading-block"></div>
      </template>
      <template slot="empty" v-else>
        <div class="table-empty-block">暂无认知情况数据噢~</div>
      </template>
    </el-table>
    <div class="paginationBox">
      <!--v-if="StuCount > 5"-->
      <el-pagination
        class="pagination"
        style="margin-top: 10px"
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
import { ExportSchool, AllSchoolInfo } from "@/api/eduSchool/right.js";
export default {
  data() {
    return {
      emptyText: "加载中...",
      showList: [],
      //总数
      StuCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
    };
  },

  mounted() {
    this.getSchoolInfo();
  },

  methods: {
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";
      this.getTable(val, 5, "");
    },
    getTable(nowNum, isAll) {
      this.showList = this.TabListList.slice((nowNum - 1) * isAll, nowNum * isAll);
    },
    //获取学校表格信息
    getSchoolInfo() {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        ProvinceID: this.$store.state.ProvinceID,
        CityID: this.$store.state.CityID,
        CountyID: this.$store.state.CountyID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
        PageNum: -1,
        PageSize: -1,
        SearchText: "",
      };
      AllSchoolInfo(params).then((res) => {
        this.emptyText = "加载中...";
        let List = res.Data.SchoolReportDetailInfoList;
        this.TabListList = List;
        this.showList = List.slice(0, 5);
        this.StuCount = List.length;
      });
    },
    //导出excel
    exoprtExcel() {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        ProvinceID: this.$store.state.ProvinceID,
        CityID: this.$store.state.CityID,
        CountyID: this.$store.state.CountyID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
      };
      ExportSchool(params).then((res) => {
        window.open(res.Data, "_self");
      });
    },
  },
};
</script>
<style scoped>
.el-table ::v-deep .el-table__cell {
  padding: 11px 0 !important;
}
.noWrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-loading-block {
  background: url("../../assets/img/nodata/reportLoad.png") center center no-repeat;
  padding-top: 235px;
  animation: turn 1s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
