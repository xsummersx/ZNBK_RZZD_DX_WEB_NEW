<!--
 * @Author: your name
 * @Date: 2021-12-27 13:55:30
 * @LastEditTime: 2022-03-14 16:17:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\gradeQuesDia.vue
-->
<template>
  <div class="DioContent">
    <div class="clearfix">
      <div @click="Export()" class="exportBtn float-r">
        <span class="exportIcon"></span>
        导出{{ $route.name == "gradeRZZD" ? "班级" : "学生" }}做题特点对比分析
      </div>
    </div>
    <div class="table" :style="{ height: getHeight(showList.length) }">
      <table class="ttable" style="border: 0; vertical-align: top">
        <thead style="height: 61px">
          <tr>
            <th class="firstTH">
              {{ $route.name == "gradeRZZD" ? "班级" : "学生" }}
            </th>
          </tr>
        </thead>
        <tbody
          style="
            border-left: solid 1px rgba(225, 225, 225, 0.2);
            border-bottom: solid 1px rgba(225, 225, 225, 0.2);
            border-right: solid 1px rgba(225, 225, 225, 0.2);
          "
        >
          <tr v-for="(item, index) in showList" :key="index" style="height: 48px; border-top: 0; line-height: 46px;">
            <td>
              {{ $route.name == "gradeRZZD" ? item.CourseClassName : item.StuName }}
            </td>
          </tr>
        </tbody>
      </table>
      <vuescroll
        :ops="ops"
        class="v-scroll"
        style="display: inline-block; width: calc(100% - 104px)"
      >
        <table style="border-left: 0;">
          <thead >
            <tr>
              <!-- <th class="firstTH">
                {{ $route.name == "gradeRZZD" ? "班级" : "学生" }}
              </th> -->
              <th v-for="(item, index) in questionList" :key="index">
                <div class="twoTH twoTH1" :style="{ width: calcWidth(questionList.length) }">
                  {{ item.QTypeName }}
                </div>
                <div class="twoTH" :style="{ width: calcWidth(questionList.length) }">
                  <div><span class="oneSpan">得分率</span><span>年级排名</span></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in showList" :key="index">
              <!-- <td>
                {{
                  $route.name == "gradeRZZD"
                    ? item.CourseClassName
                    : item.StuName
                }}
              </td> -->
              <td class="TD" v-for="(item2, index2) in item.QTypeList" :key="index2">
                <div class="twoTH" :style="{ width: calcWidth(item.QTypeList.length) }">
                  <span>{{
                    item2.PaperScoreRate == "/" ? "/" : (item2.PaperScoreRate * 100).toFixed() + "%"
                  }}</span>
                  <span>{{ item2.QTypeGradeRank }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </vuescroll>
    </div>
    <div class="paginationBox" v-if="StuCount > 3">
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
import { GetGradeQtypeRateRank_V3 } from "../../api/diolog/questionDiolog";
import { GetClassQtypeRateRank_V3 } from "../../api/diolog/questionDiolog";
import { GetExportGradeQtypeRateRank_V3 } from "../../api/diolog/questionDiolog";
import { GetExportClassQtypeRateRank_V3 } from "../../api/diolog/questionDiolog";
import vuescroll from "vuescroll";
export default {
  data() {
    return {
      currentPage: 1,
      PageNum: 1,
      PageSize: 5,
      SearchText: "",
      emptyText: "",
      showList: [],
      StuCount: "",
      questionList: [],
      resInfo: {},
      ops: {
        rail: {
          background: "#98c8ff",
          opacity: 0.5,
        },
        bar: {
          keepShow: true,
          background: "#98c8ff",
        },
      },
    };
  },
  components: {
    vuescroll,
  },

  mounted() {
    if (this.$route.name == "gradeRZZD") {
      this.GetGradeQtypeRateRank_V3();
    } else if (this.$route.name == "teacherRZZD") {
      this.GetClassQtypeRateRank_V3();
    }
  },
  methods: {
    getHeight(n) {
			switch (n) {
				case 1:
					return "136px";
				case 2:
					return "184px";
				case 3:
					return "232px";
				case 4:
					return "280px";
				default:
					return "328px";
			}
		},
    //需要传值的计算
    calcWidth(listNum) {
      if (listNum == 1) {
        return "854px";
      } else if (listNum == 2) {
        return "426px";
      } else {
        return "200px";
      }
    },
    // 获取年级做题特点的各班级对比分析
    GetGradeQtypeRateRank_V3() {
      //
      let params = {
        token: this.$route.query.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        PageNum: this.PageNum,
        PageSize: this.PageSize,
        SearchText: this.SearchText,
      };

      GetGradeQtypeRateRank_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.StuCount = this.resInfo.PageClassCount;
        this.showList = this.resInfo.ClassQtypeRateRankList;
        this.questionList = this.resInfo.ClassQtypeRateRankList[0].QTypeList;
      });
    },
    // 获取班级下学生做题特点对比分析
    GetClassQtypeRateRank_V3() {
      //
      let params = {
        token: this.$route.query.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        CourseClassID: this.$store.state.CourseClassID,
        PageNum: this.PageNum,
        PageSize: this.PageSize,
        SearchText: this.SearchText,
      };

      GetClassQtypeRateRank_V3(params).then((res) => {
        this.resInfo = res.Data;
        this.StuCount = this.resInfo.PageStuCount;
        this.showList = this.resInfo.StuQtypeRateRankList;
        this.questionList = this.resInfo.StuQtypeRateRankList[0].QTypeList;
      });
    },
    // 导出
    Export() {
      if (this.$route.name == "gradeRZZD") {
        let params = {
          token: this.$route.query.token,
          TID: this.$store.state.TID,
          SchoolID: this.$store.state.SchoolID,
          GlobalGrade: this.$store.state.GlobalGrade,
        };
        GetExportGradeQtypeRateRank_V3(params).then((res) => {
          window.open(res.Data, "_self");
        });
      } else {
        let params = {
          token: this.$route.query.token,
          TID: this.$store.state.TID,
          SchoolID: this.$store.state.SchoolID,
          GlobalGrade: this.$store.state.GlobalGrade,
          CourseClassID: this.$store.state.CourseClassID,
        };
        GetExportClassQtypeRateRank_V3(params).then((res) => {
          window.open(res.Data, "_self");
        });
      }
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
      this.PageNum = val;
      this.emptyText = "加载中...";
      if (this.$route.name == "gradeRZZD") {
        this.GetGradeQtypeRateRank_V3();
      } else if (this.$route.name == "teacherRZZD") {
        this.GetClassQtypeRateRank_V3();
      }
      // this.showList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";

.DioContent {
  padding: 10px 20px 20px 20px;
}
.table {
  height: 322px;
  margin-top: 10px;
  .v-scroll {
    th:nth-child(1) {
      width: 130px;
    }
    th:nth-child(2) {
      width: 80px;
    }
    th:nth-child(3) {
      width: 100px;
    }
    td:nth-child(4) {
      border-left: solid 1px rgba(255, 255, 255, 0.1);
    }
    td:nth-child(2) {
      color: #51f0ff;
    }
    td:nth-child(3) {
      color: #fff600;
    }
  }
  table {
    border-collapse: collapse;
    border: solid 1px rgba(255, 255, 255, 0.2);
    width: max-content;
    tr {
      height: 48px;
      line-height: 48px;
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

    td {
      width: 100px;
      color: rgba(255, 255, 255, 0.6);
    }
    td:nth-child(1) {
      color: rgba(255, 255, 255, 1);
    }
  }
}
.ttable {
  display: inline-block;
  table {
    th:nth-child(1) {
      width: 90px;
    }
    td {
      height: 48px;
    }
  }
}
.TD {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}
.twoTH1 {
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
}
.twoTH {
  height: 30px;
  width: 200px;
  line-height: 30px;
  span {
    display: inline-block;
    width: 49%;
  }
  .oneSpan {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  //   span:nth-child(1) {
  //     border-right: 1px solid rgba(255, 255, 255, 0.1);
  //   }
}
.exportBtn {
  width: 210px;
  height: 28px;
  line-height: 28px;
  background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -210px -0px no-repeat;
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
    background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -0px -0px no-repeat;
  }
  &:hover {
    background: url("../../assets/img/viewImg/导出班级做题特点对比分析.png") -420px -0px no-repeat;
  }
}
.paginationBox {
  margin: 20px 0 0;
}
</style>
