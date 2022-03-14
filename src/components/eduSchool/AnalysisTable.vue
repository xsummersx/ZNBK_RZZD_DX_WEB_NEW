<!--
 * @Author: 吴涛
 * @Date: 2021-11-30 14:29:29
 * @LastEditTime: 2022-03-14 09:33:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 学校校长=》认知情况详情，图1
-->
<template>
  <div class="anaBox">
    <div v-show="!loading">
      <div class="title"><span class="titText">班级认知情况对比分析</span></div>
      <div id="tableCharts" v-if="true"></div>
      <EduNoData
        v-if="false"
        noDataType="4"
        style="margin-top: 170px; margin-bottom: 170px"
      ></EduNoData>
      <div class="title">
        <span class="titText">认知情况详情</span>
        <template>
          <div class="exportScore float-r" @click="exoprtExcel" style="margin-right: 0px">
            <span class="exportIcon"></span>
            导出成绩单
          </div>
          <div class="btnline"></div>
          <div class="inputBox">
            <input
              class="float-r stuInput"
              type="text"
              placeholder="请输入班级名称搜索..."
              v-model="ClassSearchText"
              v-on:keyup.enter="searchStu()"
              v-on:input="SearChange"
            />
            <span
              v-show="ClassSearchText != ''"
              class="searchIconClear"
              style="left: 195px"
              @click="clearInput()"
            ></span>
            <span class="searchIcon" style="right: 146px" @click="searchStu()"></span>
          </div>
          <!-- <div class="inputBox">
          <input class="float-r stuInput" type="text" placeholder="请输入学生姓名搜索..." v-model="ClassSearchText1" v-on:keyup.enter="searchStu()" />
          <span class="searchIcon" style="right: 146px" @click="searchStu()"></span>
        </div> -->
        </template>
      </div>
      <div class="cont" v-if="true">
        <el-table
          :empty-text="emptyText"
          :data="showList"
          height="280"
          style="width: 100%; height: 305px"
          class="bueatyScroll"
        >
          <el-table-column prop="Index" label="序号" width="53">
            <template slot-scope="scope">
              <span class="gray">
                {{ scope.row.Index }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="CourseClassName" label="班级" width="115">
            <template slot-scope="scope">
              <span class="gray">
                {{ scope.row.CourseClassName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="PaperNum" label="累计作答试卷" sortable width="115">
            <template slot-scope="scope">
              <span class="gray" style="color: #51f0ff">
                {{ scope.row.PaperNum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="ScoreRate" label="平均得分率" sortable width="100">
            <template slot-scope="scope">
              <span class="gray" style="color: #fff600">
                {{ scope.row.ScoreRate | toPercent(0) }}%
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="CognitiveScore" label="认知平均分" sortable width="100">
            <template slot-scope="scope">
              <span class="gray" style="color: #60ff60">
                {{ scope.row.CognitiveScore }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="EstimateScore" label="预估平均分" sortable width="100">
            <template slot-scope="scope">
              <span class="gray">
                {{ scope.row.EstimateScore }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="FirstRate" label="A+" width="53">
            <template slot-scope="scope">
              <span class="gray"> {{ scope.row.FirstRate | toPercent(0) }}% </span>
            </template>
          </el-table-column>
          <el-table-column prop="SecondRate" label="B+" width="53">
            <template slot-scope="scope">
              <span class="gray"> {{ scope.row.SecondRate | toPercent(0) }}% </span>
            </template>
          </el-table-column>
          <el-table-column prop="ThirdRate" label="C+" width="53">
            <template slot-scope="scope">
              <span class="gray"> {{ scope.row.ThirdRate | toPercent(0) }}% </span>
            </template>
          </el-table-column>
          <el-table-column prop="FourthRate" label="D+" width="53">
            <template slot-scope="scope">
              <span class="gray"> {{ scope.row.FourthRate | toPercent(0) }}% </span>
            </template>
          </el-table-column>
          <el-table-column prop="FifthRate" label="E+" width="53">
            <template slot-scope="scope">
              <span class="gray"> {{ scope.row.FifthRate | toPercent(0) }}% </span>
            </template>
          </el-table-column>
          <el-table-column label="查看详情" width="70">
            <template slot-scope="scope">
              <span class="checkDetail" @click="openClass(scope.row.CourseClassID)"></span>
            </template>
          </el-table-column>
          <template slot="empty" v-if="emptyText == '加载中...'">
            <div class="table-loading-block">加载中...</div>
          </template>
          <template slot="empty" v-else>
            <div class="table-empty-block">没有找到符合条件的结果噢~</div>
          </template>
        </el-table>
        <div class="paginationBox">
          <!--v-if="StuCount > 5"-->
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
    </div>
    <Loading v-show="loading" style="margin-top: 340px"></Loading>
  </div>
</template>
<script>
import { GetAnaChart, GetAnaTable, ExportExcel } from "@/api/eduSchool/right.js";
//import { useDebounce } from "@/utils/debounce.js";
import EduNoData from "./eduNoData";
import Loading from "../common/Loading";
let timers = null;
export default {
  name: "AnalysisTable",
  data() {
    return {
      emptyText: "暂无数据",
      showList: [],
      //总数
      StuCount: 0,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      ClassSearchText: "", //班级名称
      loading: true, //是否加载中
      timer: null,
    };
  },
  components: {
    EduNoData,
    Loading,
  },
  mounted() {
    console.log(this.$store.state);
    let params = {
      Token: this.$store.state.token,
      TID: this.$store.state.TID,
      SchoolID: this.$store.state.SchoolID,
      GlobalGrade: this.$store.state.GlobalGrade,
      ProvinceID: this.$store.state.ProvinceID,
      CityID: this.$store.state.CityID,
      CountyID: this.$store.state.CountyID,
      ZsdArea: this.$store.state.ZsdArea,
    };
    GetAnaChart(params).then((res) => {
      if (res.Code == 1) {
        this.drawBar(res.Data);
      }
      this.loading = false;
    });
    //加载表格
    this.getTable(1, 5, "");
  },
  methods: {
    //echarts统计图
    drawBar(classList) {
      let xDate = [];
      let paper = [];
      let score = [];
      let score2 = [];
      let score3 = [];
      classList.map((item) => {
        xDate.push(item.CourseClassName);
        paper.push(item.FinishedPaperNum);
        score.push((item.AvgRate * 100).toFixed(0));
        score2.push(item.AvgIndex);
        score3.push(item.AvgScore);
      });
      let pointerImg0 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU5QzIyNzMyNTdGQzExRUNBQUZCRTZEQzFDQzIzNUM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5QzIyNzMzNTdGQzExRUNBQUZCRTZEQzFDQzIzNUM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTlDMjI3MzA1N0ZDMTFFQ0FBRkJFNkRDMUNDMjM1QzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTlDMjI3MzE1N0ZDMTFFQ0FBRkJFNkRDMUNDMjM1QzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zQm2cAAAAb0lEQVR42mJk+PDfk4GBYS4QSzKAACMQ/2dABs+BOJmR4en/Z2BFMElMhWDFjAxX/iOEkRUjA6A4C8MbBqIAC8MrNBHsVgMVviTWxJfkWo1T4VtgOP2HhiE2AHHzCxaG9wwp0ACXwKH0KRCnAQQYACC1HauS/NgNAAAAAElFTkSuQmCC";
      let pointerImg1 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEQjJDNUEzNTdGQzExRUM5NDFCREJFNkJCNjhDMDc1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEQjJDNUE0NTdGQzExRUM5NDFCREJFNkJCNjhDMDc1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NURCMkM1QTE1N0ZDMTFFQzk0MUJEQkU2QkI2OEMwNzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NURCMkM1QTI1N0ZDMTFFQzk0MUJEQkU2QkI2OEMwNzUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz46dAnCAAAArUlEQVR42mxQ2w3CMAz0SRmC7IHEDMwBYqvuxBcbQOCHvwRaPg6bOmkqkYfjxOc7O9g9L3sRGUQYpQ3opp+S1D9g+zjfSIn2Bs7hBofdzTCFz3uMbGHobExdEmOYXqWTckHOSQQ9AgljUSCVCXSZjgtVgwrMWRlQ1RzHpb6fNcZcKkb4ryFPDpNJr8bSTO9bM0mpowhdZNVt5bzb9xzVH/S6qTXZwlLKVe3pK8AAiDNV79zKRRwAAAAASUVORK5CYII=";
      let pointerImg2 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMzg4QjBDNTdGQzExRUNCQUI1ODQyNjdFNTNCQzVGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyMzg4QjBENTdGQzExRUNCQUI1ODQyNjdFNTNCQzVGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjIzODhCMEE1N0ZDMTFFQ0JBQjU4NDI2N0U1M0JDNUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjIzODhCMEI1N0ZDMTFFQ0JBQjU4NDI2N0U1M0JDNUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4adSxSAAAAo0lEQVR42mRQwQ3CMAz0SR6CDMKDEZgDxFZdgw/zQBigUHAiGadpSdI4j8jn0/nO0NvhSEQDgRylUtqWt9kJ8bp/2NBZU+pPXkCo5zgFlwGdB2oPnSgch7d0cKKikQaxjF/7TUnnr1mvyDsaYjNdlSqc5bUQtY9bAiXiKNkVVlfapkemcpjEm5pD5VM3d7JoT46fcLZ+MHBXTof6mHfzffkJMAAwlkcDcRbvKwAAAABJRU5ErkJggg==";
      let pointerImg3 =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY1Q0JFQTFDNTdGQzExRUM5RkRGRUVENzI3NTNDRkQzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY1Q0JFQTFENTdGQzExRUM5RkRGRUVENzI3NTNDRkQzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjVDQkVBMUE1N0ZDMTFFQzlGREZFRUQ3Mjc1M0NGRDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjVDQkVBMUI1N0ZDMTFFQzlGREZFRUQ3Mjc1M0NGRDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6xrMHAAAAAkElEQVR42mxQUQqDMAx9gRxiPZK3EDZ2K2+n6L9sTO1aU5UmVQPte+Glr0moblER0ABwUS7hOeIOvZwnB78X4SgKB0bFpDX8n+HIKtZOc8dhKZ9v9GQZBdlP2kwSCCpad/Y/zakcoohcSOZrXAcCLx8hNxZ0cuZp3PbkblWNgecvXmnhoj9sC3lDhE7IexVgAEcsOS6hIDj+AAAAAElFTkSuQmCC";
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
              name: "作答试卷份数",
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
          selectedMode: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: "rgba(0,0,0,0.1)",
            },
          },
          formatter: function (params) {
            console.log(params);
            let name = params[0].axisValueLabel + "<br />";
            let zhu0 =
              "<img class='imgWi' src=" +
              pointerImg0 +
              "><p style='float:left'>" +
              params[0].seriesName +
              "</p><b style='margin-left:25px;float:left'>" +
              params[0].data +
              "</b><br />";
            let zhu1 =
              "<img class='imgWi' src=" +
              pointerImg1 +
              "><p style='float:left'>" +
              params[1].seriesName +
              "</p><b style='margin-left:39px;float:left'>" +
              params[1].data +
              "</b><br />";
            let zhu2 =
              "<img class='imgWi' src=" +
              pointerImg2 +
              "><p style='float:left'>" +
              params[2].seriesName +
              "</p><b style='margin-left:67px;float:left'>" +
              params[2].data +
              "</b><br />";
            let zhu3 =
              "<img class='imgWi' src=" +
              pointerImg3 +
              "><p style='float:left'>" +
              params[3].seriesName +
              "</p><b style='margin-left:52px;float:left'>" +
              params[3].data +
              "</b>";
            return name + zhu0 + zhu1 + zhu2 + zhu3;
          },
          // backgroundColor: "rgba(0,32,92,0)",
          // borderColor: "rgba(0,242,255,0)",
          // borderWidth: 0,
          // textStyle: {
          //   color: "#a2afcc",
          // },
          // extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0);",
          // padding: [20, 20, 20, 20],
          // formatter: function (param) {
          //   var resultTooltip =
          //     "<div class='toolImg clearfix' style=''>" +
          //     "<div class='float-l' style='line-height:24px'>" +
          //     "<div style=''> " +
          //     param[0].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[1].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[2].seriesName +
          //     "</div>" +
          //     "<div style=''> " +
          //     param[3].seriesName +
          //     "</div>" +
          //     "</div>" +
          //     "<div  class='float-r' style='text-align:right;line-height:23px''>" +
          //     "<div style='color: #00ccff;font-family: ArialMT;font-size: 18px;'> " +
          //     param[0].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>份</span>" +
          //     "</div>" +
          //     "<div style='color: #00ffd8;font-family: ArialMT;font-size: 18px;'> " +
          //     param[1].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>%</span>" +
          //     "</div>" +
          //     "<div style='color: #ff8900;font-family: ArialMT;font-size: 18px;'> " +
          //     param[2].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
          //     "</div>" +
          //     "<div style='color: #3fff3f;font-family: ArialMT;font-size: 18px;'> " +
          //     param[3].value +
          //     "<span style='font-family: MicrosoftYaHei;font-size: 12px;'>分</span>" +
          //     "</div>" +
          //     "</div>" +
          //     "</div>";
          //   return resultTooltip;
          // },
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: (4 / xDate.length) * 100,
            zoomOnMouseWheel: false,
          },
        ],
        xAxis: {
          data: xDate,
          axisLabel: {
            interval: 0, //强制显示文字
          },
        },
        series: [
          {
            name: "作答试卷份数",
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
    getTable(pageNum, pageSize, searchText) {
      //pageNum页码，pageSize本页显示数量，searchText文本搜索
      let data = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
        PageNum: pageNum,
        PageSize: pageSize,
        SearchText: searchText,
      };
      GetAnaTable(data).then((res) => {
        this.showList = res.Data.ClassReportDetailInfoList;
        this.StuCount = res.Data.PageCount;
        this.emptyText = "暂无数据"; //表格提示内容
      });
    },
    //搜索内容
    searchStu() {
      this.emptyText = "加载中...";
      this.currentPage = 1;
      this.getTable(1, 5, this.ClassSearchText);
    },
    //清空内容
    clearInput() {
      this.ClassSearchText = "";
      this.getTable(1, 5, this.ClassSearchText);
    },
    //搜索内容，发生变化监听，如果变为空则重新获取
    SearChange() {
      // console.log(this.timer);
      // useDebounce(
      //   this.timer,
      //   () => {
      //     // if (this.ClassSearchText == "") {
      //     //   this.emptyText = "加载中...";
      //     //   this.currentPage = 1;
      //     //   this.getTable(1, 5, this.ClassSearchText);
      //     // }
      //     this.getTable(1, 5, this.ClassSearchText);
      //   },
      //   800,
      // )();
      if (timers) {
        clearTimeout(timers);
      }
      timers = setTimeout(() => {
        if (this.ClassSearchText == "") {
          this.emptyText = "加载中...";
          this.currentPage = 1;
          this.getTable(1, 5, this.ClassSearchText);
        }
      }, 800);
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.emptyText = "加载中...";
      this.getTable(val, 5, "");
    },
    //导出excel
    exoprtExcel() {
      let params = {
        Token: this.$store.state.token,
        TID: this.$store.state.TID,
        SchoolID: this.$store.state.SchoolID,
        GlobalGrade: this.$store.state.GlobalGrade,
        ZsdArea: this.$store.state.ZsdArea,
        StageNo: this.$store.state.StageNo,
      };
      ExportExcel(params).then((res) => {
        window.open(res.Data, "_self");
      });
    },
    //跳转到教师页面
    openClass(CourseClassID) {
      //写入当前打开的班级ID
      this.$store.commit("updateCourseClassID", CourseClassID);
      window.open(
        window.location.origin +
          "/Web/index.html#/home/teacherRZZD?token=" +
          this.$store.state.token +
          "&SchoolID=" +
          this.$store.state.SchoolID +
          "&TID=" +
          this.$store.state.TID +
          "&CourseClassID=" +
          CourseClassID +
          "&StageNo=" +
          this.$store.state.StageNo +
          "&GlobalGrade=" +
          this.$store.state.GlobalGrade +
          "&ZsdArea=" +
          this.$store.state.ZsdArea +
          "&CountyID=" +
          this.$store.state.CountyID,
      );
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
.bueatyScroll ::v-deep .el-table__body-wrapper {
  overflow-x: hidden;
}
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track-piece {
  background-color: #04238d;
}
.bueatyScroll ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 4px;
  height: 4px;
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
  height: 124px;
  padding-left: 20px;
  padding-right: 25px;
  padding-top: 5px;
  background: url("../../assets/img/grade/柱状图弹窗BG.png") center center no-repeat;
}
#tableCharts > div > canvas:hover {
  cursor: default;
}
.imgWi {
  margin-top: 6px;
  float: left;
}
th .cell span {
  opacity: 1 !important;
}
.el-table .sort-caret.ascending {
  opacity: 0.5 !important;
}
.el-table .sort-caret.descending {
  opacity: 0.5 !important;
}
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: #fff !important;
  opacity: 1 !important;
}
.el-table .descending .sort-caret.descending {
  border-top-color: #fff !important;
  opacity: 1 !important;
}
</style>
