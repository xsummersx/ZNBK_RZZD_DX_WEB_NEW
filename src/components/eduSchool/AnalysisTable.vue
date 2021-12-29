<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:29:29
 * @LastEditTime: 2021-12-28 11:21:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 学校校长=》认知情况详情，图1
-->
<template>
  <div class="anaBox">
    <div class="title"><span class="titText">班级认知情况对比分析</span></div>
    <div id="tableCharts" v-if="true"></div>
    <EduNoData v-if="false" noDataType="4" style="margin-top: 170px; margin-bottom: 170px"></EduNoData>
    <div class="title">
      <span class="titText">认知情况详情</span>
      <template v-if="true">
        <div class="exportScore float-r" style="margin-right: 0px">
          <span class="exportIcon"></span>
          导出成绩单
        </div>
        <div class="btnline"></div>
        <div class="inputBox">
          <input class="float-r stuInput" type="text" placeholder="请输入班级名称搜索..." v-model="ClassSearchText" v-on:keyup.enter="searchStu()" />
          <span class="searchIcon" style="right: 146px" @click="searchStu()"></span>
        </div>
        <div class="inputBox">
          <input class="float-r stuInput" type="text" placeholder="请输入学生姓名搜索..." v-model="ClassSearchText" v-on:keyup.enter="searchStu()" />
          <span class="searchIcon" style="right: 146px" @click="searchStu()"></span>
        </div>
      </template>
    </div>
    <div class="cont" v-if="true">
      <el-table :empty-text="emptyText" :data="showList" height="280" style="width: 100%; height: 305px" class="bueatyScroll">
        <el-table-column prop="Index" label="序号" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="班级" width="115">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="累计作答试卷" sortable width="115">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="平均得分率" sortable width="100">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="认知平均分" sortable width="100">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="预估平均分" sortable width="100">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="A+" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="B+" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="C+" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="D+" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Index" label="E+" width="53">
          <template slot-scope="scope">
            <span class="gray">
              {{ scope.row.Index }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="查看详情" width="70">
          <template>
            <!-- slot-scope="scope" -->
            <span class="checkDetail"></span>
          </template>
        </el-table-column>
        <template slot="empty" v-if="emptyText == '加载中...'">
          <div class="table-loading-block">加载中...</div>
        </template>
        <template slot="empty" v-else>
          <div class="table-empty-block">暂无认知情况详情数据噢~</div>
        </template>
      </el-table>
      <div class="paginationBox" v-if="StuCount > 5">
        <el-pagination
          class="pagination"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout=" prev, pager, next,total,  jumper"
          :total="StuCount"
        >
        </el-pagination>
      </div>
    </div>
    <EduNoData v-if="false" noDataType="3" style="margin-top: 100px"></EduNoData>
  </div>
</template>
<script>
import EduNoData from "./eduNoData";
export default {
  name: "AnalysisTable",
  data() {
    return {
      emptyText: "暂无数据",
      showList: [
        {
          Index: "高三",
        },
        {
          Index: "3",
        },
        {
          Index: "2",
        },
        {
          Index: "5",
        },
        {
          Index: "2",
        },
      ],
      //总数
      StuCount: 7,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
    };
  },
  components: {
    EduNoData,
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    //echarts统计图
    drawBar() {
      let xDate = ["高三(2)班", "高三(2)班", "高三(2)班", "高三(2)班", "高三(2)班"];
      let paper = [100, 111, 240, 50, 60];
      let score = [88, 64, 66, 70, 90];
      let score2 = [8888, 4444, 6666, 7421, 1111];
      let score3 = [100, 85, 66, 44, 15];
      var echarts = require("echarts");
      var barCharts = echarts.init(document.getElementById("tableCharts"));
      barCharts.setOption(this.$optionObj.compareOption);
      barCharts.setOption({
        legend: {
          itemWidth: 11,
          itemHeight: 11,
          align: "left",
          orient: "horizontal",
          itemGap: 20,
          textStyle: {
            color: "#a2afcc",
            fontSize: 12,
          },
          data: [
            {
              name: "作答试卷分数",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00f0ff",
                  },
                  {
                    offset: 1,
                    color: "#0036ff",
                  },
                ]),
              },
            },
            {
              name: "平均得分率",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#37eed6",
                  },
                  {
                    offset: 1,
                    color: "#009880",
                  },
                ]),
              },
            },
            {
              name: "认知分",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#ffbb39",
                  },
                  {
                    offset: 1,
                    color: "#cf5c00",
                  },
                ]),
              },
            },
            {
              name: "预估成绩",
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#61e400",
                  },
                  {
                    offset: 1,
                    color: "#389500",
                  },
                ]),
              },
            },
          ],
        },
        tooltip: {
          backgroundColor: "rgba(0,32,92,0)",
          borderColor: "rgba(0,242,255,0)",
          borderWidth: 0,
          textStyle: {
            color: "#a2afcc",
          },
          extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0);",
          padding: [20, 20, 20, 20],
          formatter: function (param) {
            var resultTooltip =
              "<div class='toolImg clearfix' style=''>" +
              "<div class='float-l' style='line-height:25px'>" +
              "<div style=''> " +
              param[0].seriesName +
              "</div>" +
              "<div style=''> " +
              param[1].seriesName +
              "</div>" +
              "<div style=''> " +
              param[2].seriesName +
              "</div>" +
              "<div style=''> " +
              param[3].seriesName +
              "</div>" +
              "</div>" +
              "<div  class='float-r' style='text-align:right;line-height:23px''>" +
              "<div style='color: #00ccff;font-family: ArialMT;font-size: 18px;'> " +
              param[0].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>份</span>" +
              "</div>" +
              "<div style='color: #00ffd8;font-family: ArialMT;font-size: 18px;'> " +
              param[1].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>%</span>" +
              "</div>" +
              "<div style='color: #ff8900;font-family: ArialMT;font-size: 18px;'> " +
              param[2].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
              "</div>" +
              "<div style='color: #3fff3f;font-family: ArialMT;font-size: 18px;'> " +
              param[3].value +
              "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
              "</div>" +
              "</div>" +
              "</div>";
            return resultTooltip;
          },
        },
        xAxis: {
          data: xDate,
        },
        series: [
          {
            name: "作答试卷分数",
            cursor: "default",
            data: paper,
          },

          {
            name: "平均得分率",
            data: score,
            cursor: "default",
            yAxisIndex: 1,
          },
          {
            name: "认知分",
            data: score2,
            cursor: "default",
            yAxisIndex: 2,
          },
          {
            name: "预估成绩",
            data: score3,
            cursor: "default",
            yAxisIndex: 3,
          },
        ],
      });
    },
    //搜索内容
    searchStu() {
      this.emptyText = "加载中...";
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";
    },
  },
};
</script>
<style lang="scss" scoped>
.anaBox {
  padding-top: 28px;
}
.title {
  height: 40px;
  width: 920px;
  margin: 0 auto;
  background: url(~@/assets/img/eduSchool/title0.png) left center no-repeat;
  .titText {
    font-size: 16px;
    color: #fff;
    line-height: 28px;
    display: inline-block;
    font-weight: bold;
    padding-left: 40px;
  }
}
.title:last-child {
  background: url(~@/assets/img/eduSchool/title1.png) left center no-repeat;
}
#tableCharts {
  width: 950px;
  height: 500px;
}
.cont {
  width: 920px;
  margin: 0 auto;
}
//表格样式穿透重写
.el-table ::v-deep th.el-table__cell > .cell {
  padding: 0 2px;
}
.el-table ::v-deep .cell .gray {
  font-size: 12px;
}
.el-table ::v-deep th.el-table__cell {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.el-table ::v-deep th.el-table__cell:nth-child(12) {
  border-right: none;
}
.el-table ::v-deep .caret-wrapper {
  width: 14px;
}
.el-table ::v-deep .sort-caret {
  left: 2px;
}
.el-table ::v-deep td {
  height: 46px;
}
.el-table ::v-deep th.is-leaf {
  height: 48px;
}
//===>结束
.paginationBox {
  margin-top: 15px;
}
.checkDetail {
  display: block;
  margin: 0 auto;
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url(~@/assets/img/eduSchool/查看_默认.png) no-repeat center center;
}
.checkDetail:hover {
  background: url(~@/assets/img/eduSchool/查看_悬停.png) no-repeat center center;
}
.inputBox {
  float: right;
  margin-right: 10px;
  position: relative;
  .searchIcon {
    left: 215px;
  }
  .stuInput::-webkit-input-placeholder {
    color: #6994f0;
  }
}
.inputBox:hover {
  .stuInput::-webkit-input-placeholder {
    color: #fff;
  }
}
.btnline {
  width: 1px;
  height: 19px;
  float: right;
  background: url(~@/assets/img/eduSchool/分界线.png) no-repeat center center;
  margin-left: 2px;
  margin-right: 12px;
  margin-top: 4px;
}

//滚动条样式
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background-color: #04238d;
}
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 4px;
}
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 100px;
}
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
//==》滚动条样式，结束
</style>
<style>
.toolImg {
  width: 200px;
  height: 120px;
  padding-left: 20px;
  padding-right: 25px;
  background: url("../../assets/img/grade/柱状图弹窗BG.png") center center no-repeat;
}
</style>
