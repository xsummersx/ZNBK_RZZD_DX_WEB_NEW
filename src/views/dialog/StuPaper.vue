<!--
 * @Author: your name
 * @Date: 2022-01-07 11:24:08
 * @LastEditTime: 2022-01-07 11:24:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \znbk_rzzd_zx_web_new\src\views\dialog\StuPaper.vue
-->
<template>
  <div class="bottom-box">
    <div
      style="width: 965px; overflow-y: hidden"
      :style="{
        'overflow-x': resInfo.QuesList.length > 10 ? 'scroll' : 'auto',
      }"
    >
      <table
        v-if="resInfo.QuesList.length != 0"
        class="customTable"
        :style="{
          width: resInfo.QuesList.length > 9 ? 'max-content' : '100%',
        }"
      >
        <thead>
          <tr>
            <th
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
            >
              <span>试题</span>
            </th>
            <th
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
              v-for="(item, index) in resInfo.QuesList"
              :key="index"
            >
              <span>第{{ item.QuesIndex }}题</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              class="TDHead"
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
            >
              <span>得分率</span>
            </td>
            <td
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
              class="ScoreTD ScoreTD2"
              :class="
                item.PerAvgRate >= 0.9
                  ? 'BlueScoreTD'
                  : item.PerAvgRate >= 0.8
                  ? 'GreenScoreTD'
                  : item.PerAvgRate >= 0.7
                  ? 'OrangeScoreTD'
                  : 'RedScoreTD'
              "
              v-for="(item, index) in resInfo.QuesList"
              :key="index"
            >
              <!-- @click="
                      openPopUp(item.TypeNo, item.GenreName,item.TypeName, item.GenreID, 1)
                    " -->
              <span>
                {{
                  item.PerAvgRate == -1 ? "/" : (item.PerAvgRate * 100).toFixed() + "%"
                }}
              </span>
            </td>
          </tr>
          <tr>
            <td
              class="TDHead"
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
            >
              <span> 班级排名 </span>
            </td>
            <td
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
              v-for="(item, index) in resInfo.QuesList"
              :key="index"
            >
              <span
                class="IndexRank"
                :class="
                  item.ClassRank == 1
                    ? 'FirstRank'
                    : item.ClassRank == 2
                    ? 'SecondRank'
                    : item.ClassRank == 3
                    ? 'ThirdRank'
                    : ''
                "
                >{{
                  item.ClassRank > 3 ? item.ClassRank : item.ClassRank > 0 ? "" : "/"
                }}</span
              >
            </td>
          </tr>
          <tr>
            <td
              class="TDHead"
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
            >
              <span> 年级排名 </span>
            </td>
            <td
              :style="{
                width:
                  resInfo.QuesList.length > 9
                    ? '100px'
                    : 100 / (resInfo.QuesList.length + 1) + '%',
              }"
              v-for="(item, index) in resInfo.QuesList"
              :key="index"
            >
              <span
                class="IndexRank"
                :class="
                  item.GradeRank == 1
                    ? 'FirstRank'
                    : item.GradeRank == 2
                    ? 'SecondRank'
                    : item.GradeRank == 3
                    ? 'ThirdRank'
                    : ''
                "
                >{{
                  item.GradeRank > 3 ? item.GradeRank : item.GradeRank > 0 ? "" : "/"
                }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div style="width: 1120px" class="tableNoData" v-else></div>
    </div>
  </div>
</template>

<script>
import { GetStuPaperQTypeReport_V3 } from "@/api/student/right";
export default {
  props: {
    PaperName: String,
    PaperID: String,
  },
  data() {
    return {
      resInfo: {
        QuesList: [],
      },
    };
  },
  methods: {
    // 学生查看试卷作答详情
    GetStuPaperQTypeReport_V3() {
      let params = {
        token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        CourseClassID: this.$store.state.CourseClassID,
        StuID: this.$store.state.StuID,
        PaperID: this.PaperID,
      };
      GetStuPaperQTypeReport_V3(params).then((res) => {
        this.resInfo = res.Data;
      });
    },
  },
  mounted() {
    this.GetStuPaperQTypeReport_V3();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/scroll.scss";
.bottom-box {
  padding: 10px 20px;
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
  .TDHead {
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
    color: rgba(255, 255, 255, 0.7);
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
