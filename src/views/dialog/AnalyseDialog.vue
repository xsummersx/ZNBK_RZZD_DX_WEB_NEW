<!--
 * @Author: your name
 * @Date: 2021-12-14 09:39:57
 * @LastEditTime: 2022-03-14 11:02:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\AnalyseDialog.vue
-->
<template>
  <div class="bottom-box">
    <div class="clearfix">
      <div @click="GetExportGradePaperQTypeReport_V3()" class="exportBtn float-r">
        <span class="exportIcon"></span>
        导出试卷题型得分分析
      </div>
    </div>

    <div class="table" v-if="StuCount != 0">
      <div style="height: 100%; display: inline-block; margin: 0; vertical-align: top">
        <table
          style="
            width: 359px;
            display: inline-block;
            border: 0;
            border-left: solid 1px rgba(225, 225, 225, 0.2);
          "
        >
          <thead>
            <tr style="height: 65px">
              <th style="border-left-width: 0">序号</th>
              <th>题型名称</th>
              <th style="border: 0">平均得分率</th>
            </tr>
          </thead>
          <tbody style="border-bottom: solid 1px rgba(225, 225, 225, 0.2)">
            <tr v-for="(item, index) in showList" :key="index">
              <td>{{ item.Index }}</td>
              <td>{{ item.QTypeName }}</td>
              <td>{{ (item.PaperScoreRate * 100).toFixed() + "%" }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <vuescroll :ops="ops" style="width: 600px; display: inline-block">
        <table style="border: 0; border-bottom: solid 1px rgba(225, 225, 225, 0.2)">
          <thead>
            <tr style="height: 65px">
              <!-- <th>序号</th>
              <th>题型名称</th>
              <th>平均得分率</th> -->
              <th
                class="oneTH"
                :style="{
                  width:
                    QTypeClassList.length == 1
                      ? '598px'
                      : QTypeClassList.length == 2
                      ? '300px'
                      : '250px',
                }"
                v-for="(item, index) in QTypeClassList"
                :key="index"
              >
                <div class="oneTH1">{{ item.CourseClassName }}</div>
                <div class="oneTH2">
                  <span class="oneSpan1">得分率</span><span class="oneSpan2">排名</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in showList" :key="index">
              <!-- <td>{{ item.Index }}</td>
              <td>{{ item.QTypeName }}</td>
              <td>{{ (item.PaperScoreRate * 100).toFixed() + "%" }}</td> -->
              <td class="borderTD" v-for="(item2, index2) in item.QTypeClassList" :key="index2">
                <span class="oneSpan1">{{ (item2.PaperScoreRate * 100).toFixed() + "%" }}</span>
                <span class="oneSpan2">{{ item2.GradeRank }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </vuescroll>
    </div>
    <div class="paginationBox" v-if="StuCount > 8">
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
import { GetGradePaperQTypeReport_V3 } from "@/api/diolog/stuReportDiolog";
import { GetExportGradePaperQTypeReport_V3 } from "@/api/diolog/stuReportDiolog";
import vuescroll from "vuescroll";
export default {
  props: {
    PaperName: String,
    PaperID: String,
  },
  data() {
    return {
      StuCount: 0,
      PageNum: 1,
      PageSize: 8,
      currentPage: 1,
      SearchText: "",
      showList: [],
      QTypeClassList: [],
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
    this.GetGradePaperQTypeReport_V3();
  },
  methods: {
    // // 获取年级试卷题型对比分析
    GetGradePaperQTypeReport_V3() {
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
      GetGradePaperQTypeReport_V3(params).then((res) => {
        console.log(res);
        this.StuCount = res.Data.PageCount;
        this.showList = res.Data.QTypeList;
        if (this.StuCount != 0) {
          this.QTypeClassList = this.showList[0].QTypeClassList;
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
      this.PageNum = val;
      this.emptyText = "加载中...";
      // this.showList = [];
      this.GetGradePaperQTypeReport_V3();
    },
    GetExportGradePaperQTypeReport_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        PaperID: this.PaperID,
        PaperName: this.PaperName,
      };
      GetExportGradePaperQTypeReport_V3(params).then((res) => {
        window.open(res.Data, "_self");
      });
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
    margin-bottom: 10px;
    background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -28px no-repeat;
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
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -0px no-repeat;
    }
    &:hover {
      background: url("../../assets/img/viewImg/导出试卷题型得分分析.png") -0px -56px no-repeat;
    }
  }
}
.table {
  height: 474px;
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
      width: 130px;
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
        width: 50%;
        color: #fff600;
      }
      .oneSpan2 {
        width: 50%;
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
      box-sizing: border-box;
    }
    .oneSpan1 {
      width: 50%;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }
    .oneSpan2 {
      width: 50%;
    }
  }
}
.paginationBox {
  margin: 0 0 10px;
}
</style>
