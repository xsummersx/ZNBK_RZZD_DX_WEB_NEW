<!--
 * @Author: 柳欢
 * @Date: 2021-12-10 15:21:45
 * @LastEditTime: 2021-12-28 11:25:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\components\gradeTeacher\PaperReport.vue
-->
<template>
  <div class="schoolReport">
    <ArrowTitle titleStr="学生认知成绩单">
      <div class="rightOption float-r">
        <div
          class="exportScore float-r"
          style="margin-right: 0px"
          @click="GetScoreReport()"
        >
          <span class="exportIcon"></span>
          导出成绩单
        </div>
        <div class="float-r splitLine"></div>
        <input
          class="float-r stuInput"
          type="text"
          placeholder="请输入学生名称搜索..."
          v-model="SearchText"
          v-on:keyup.enter="searchStu()"
        />
        <span class="searchIcon" style="right: 146px" @click="searchStu()"></span>
      </div>
    </ArrowTitle>

    <el-table :empty-text="emptyText" :data="showList" style="width: 100%; height: 330px">
      <el-table-column prop="Index" label="序号" width="80">
        <template slot-scope="scope">
          <span class="gray">
            {{ scope.row.Index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="StuName" label="姓名" width="120">
        <template slot-scope="scope">
          <div>
            <img class="stuPhoto" :src="scope.row.PhotoPath" alt="" />
            <span class="stuname" :title="scope.row.StuName">{{
              scope.row.StuName
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="PaperCount" label="累计作答试卷" width="70">
        <template slot-scope="scope">
          <span class="blueText">
            {{ scope.row.PaperCount == "--" ? "--" : scope.row.PaperCount + "份" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="PaperScoreRate" label="试卷平均得分率" width="80">
        <template slot-scope="scope">
          <span class="orangeText">
            {{
              scope.row.PaperScoreRate == "--"
                ? "--"
                : (scope.row.PaperScoreRate * 100).toFixed(0) + "%"
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="PredictedScore" label="预估成绩" width="80">
        <template slot-scope="scope">
          <span class="greenText">
            {{ scope.row.PredictedScore }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="ClassRank" label="班级排名" width="80">
        <template slot-scope="scope">
          <span
            class="stu-rank"
            :class="
              scope.row.ClassRank == 1
                ? 'rank1'
                : scope.row.ClassRank == 2
                ? 'rank2'
                : scope.row.ClassRank == 3
                ? 'rank3'
                : ''
            "
          >
            {{ scope.row.ClassRank > 3 ? scope.row.ClassRank : "--" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="GradeRank" label="年级排名" width="80">
        <template slot-scope="scope">
          <span
            class="stu-rank"
            :class="
              scope.row.ClassRank == 1
                ? 'rank1'
                : scope.row.ClassRank == 2
                ? 'rank2'
                : scope.row.ClassRank == 3
                ? 'rank3'
                : ''
            "
          >
            {{ scope.row.ClassRank > 3 ? scope.row.ClassRank : "--" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="认知分">
        <el-table-column
          prop="VocabularyScore"
          :render-header="renderHeader"
          :label="'词汇认知分 (满分' + resInfo.VocalFullIndex + '分)'"
          width="100"
        >
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.VocabularyScore }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="GrammerScore"
          :render-header="renderHeader"
          :label="'语法认知分 (满分' + resInfo.GrammerFullIndex + '分)'"
          width="100"
        >
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.GrammerScore }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="CurrentIndex"
          :render-header="renderHeader"
          :label="'综合认知分 (满分' + resInfo.FullIndex + '分)'"
          width="110"
        >
          <template slot-scope="scope">
            <span class="yellow">
              {{ scope.row.CurrentIndex }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="语言能力">
        <el-table-column prop="TL" label="听力" width="55">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.TL == '较好'
                      ? 'goodWord'
                      : scope.row.TL == '一般'
                      ? 'generalWord'
                      : scope.row.TL == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.TL }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="YD" label="阅读" width="55">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.YD == '较好'
                      ? 'goodWord'
                      : scope.row.YD == '一般'
                      ? 'generalWord'
                      : scope.row.YD == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.YD }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="XZ" label="写作" width="55">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.XZ == '较好'
                      ? 'goodWord'
                      : scope.row.XZ == '一般'
                      ? 'generalWord'
                      : scope.row.XZ == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.XZ }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="KY" label="口语" width="55">
          <template slot-scope="scope">
            <span class="gray">
              <!-- <span
                  :class="
                    scope.row.KY == '较好'
                      ? 'goodWord'
                      : scope.row.KY == '一般'
                      ? 'generalWord'
                      : scope.row.KY == '较差'
                      ? 'badWord'
                      : 'noWord'
                  "
                > -->
              {{ scope.row.KY }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ZH" label="综合" width="55">
          <template slot-scope="scope">
            <!-- <span class="gray"> -->
            <span
              :class="
                scope.row.ZH == '较好'
                  ? 'goodWord'
                  : scope.row.ZH == '一般'
                  ? 'generalWord'
                  : scope.row.ZH == '较差'
                  ? 'badWord'
                  : 'noWord'
              "
            >
              {{ scope.row.ZH }}
            </span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="查看详情" width="92">
        <template slot-scope="scope">
          <span
            class="checkDetail"
            @click="
              toStudentRZZD(scope.row.StuID, scope.row.StuName, scope.row.CourseClassID)
            "
          >
            {{ scope.row.GenreName || scope.row.TypeName }}
          </span>
        </template>
      </el-table-column>
      <template slot="empty" v-if="emptyText == '加载中...'">
        <div class="table-loading-block">加载中...</div>
      </template>
      <template slot="empty" v-else>
        <div class="table-empty-block">暂无学生认知成绩单数据噢</div>
      </template>
    </el-table>
    <div class="paginationBox">
      <el-pagination
        v-show="StuCount > 5"
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
import { GetClassScoreReport_V3 } from "@/api/gradeTeacher/right";
import { GetExportClassScoreReport_V3 } from "@/api/gradeTeacher/right";
export default {
  data() {
    return {
      emptyText: "加载中...",
      resInfo: {
        VocalFullIndex: 1000,
        GrammerFullIndex: 1000,
        FullIndex: 1000,
        FullScore: 1000,
      },
      StuCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      SearchText: "",
      stuList: [],
      showList: [],
    };
  },
  created() {
    this.GetClassScoreReport_V3();
  },
  methods: {
    // 班级下学生认知成绩单
    GetClassScoreReport_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        StageNo: this.$store.state.StageNo,
        SchoolID: this.$store.state.SchoolID,
        CourseClassID: this.$store.state.CourseClassID,
        ZsdArea: this.$store.state.ZsdArea,
        PageNum: this.currentPage,
        PageSize: this.PageSize,
        SearchText: this.SearchText,
      };
      GetClassScoreReport_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.stuList = this.resInfo.StuReportDetailInfoList;
        this.showList = this.stuList;
        this.StuCount = this.resInfo.PageStuCount;
        if (this.showList.length == 0) {
          this.emptyText = "暂无数据";
        }
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";

      this.GetClassScoreReport_V3();
    },
    GetScoreReport() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        StageNo: this.$store.state.StageNo,
        SchoolID: this.$store.state.SchoolID,
        CourseClassID: this.$store.state.CourseClassID,
        ZsdArea: this.$store.state.ZsdArea,
      };
      GetExportClassScoreReport_V3(params).then((res) => {
        window.open(res.Data, "_self");
      });
    },
    // 搜索学生
    searchStu() {
      this.emptyText = "加载中...";
      this.currentPage = 1;
      this.GetClassScoreReport_V3();
    },
    renderHeader(h, { column }) {
      let header = column.label.split(" ");
      return [h("p", [h("p", {}, header[0]), h("span", {}, header[1])])];
    }, // 文本分别添加到p,span标签中
    toStudentRZZD(StuID) {
      console.log(window);
      let url =
        window.location.origin +
        window.location.pathname +
        "#/home/studentRZZD?token=" +
        this.$route.query.token +
        "&SchoolID=" +
        this.$store.state.SchoolID +
        "&CourseClassID=" +
        this.$store.state.CourseClassID +
        "&TID=" +
        this.$store.state.TID +
        "&StuID=" +
        StuID +
        "&StageNo=" +
        this.$store.state.StageNo +
        "&GlobalGrade=" +
        this.$store.state.GlobalGrade +
        "&ZsdArea=" +
        this.$store.state.ZsdArea +
        "&CountyID=" +
        this.$store.state.CountyID;
      window.open(url, "_blank");
      // let url = window.
      console.log(1);
    },
  },
  components: {
    ArrowTitle: () => import("../common/ArrowTitle.vue"),
  },
};
</script>

<style>
.rightOption {
  position: relative;
}
.stuPhoto {
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 100%;
  margin-right: 5px;
  vertical-align: middle;
}
.stuname {
  /*  文本强制不换行； */
  display: inline-block;
  width: 60px;
  text-align: left;
  white-space: nowrap;
  /*  文本溢出显示省略号； */
  text-overflow: ellipsis;
  /* 溢出的部分隐藏； */
  overflow: hidden;
  vertical-align: middle;
}
.blueText {
  color: #51f0ff;
}
.orangeText {
  color: #fff600;
}
.greenText {
  color: #60ff60;
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
.checkDetail {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 18px;
  height: 18px;
  background: url("../../assets/img/teacher/查看_默认.png") center center no-repeat;
}
.checkDetail:hover {
  background: url("../../assets/img/teacher/查看_悬停.png") center center no-repeat;
}
.table-loading-block {
  background: url("../../assets/img/nodata/reportLoad.png") center center no-repeat;
  padding-top: 130px;
}
.table-empty-block {
  background: url("../../assets/img/nodata/tableNoData.png") center center no-repeat;
  padding-top: 130px;
}
.paginationBox {
  margin: 10px 0 0;
  height: 28px;
}
</style>
<style>
.schoolReport .el-table__row {
  height: 48px;
}
</style>
