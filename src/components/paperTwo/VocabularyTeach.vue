<!--
 * @Author: 汤宇昕
 * @Date: 2021-11-30 14:58:43
 * @LastEditTime: 2021-12-09 11:01:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: 教师，词汇
-->
<template>
  <div class="right-small-box">
    <div class="box-title clearfix">
      <span class="float-l title">词汇认知</span>
      <span class="float-r check-icon"><i></i>薄弱词汇诊断</span>
    </div>
    <div class="main">
      <div class="left">
        <div class="masteredCount">
          <span>词汇平均掌握量</span>
          <br />
          <span class="count"> <span class="number">8500</span>个 </span>
        </div>
        <div class="scoreRate">
          <span>词汇平均答对率</span>
          <span class="rate"><span class="number">96</span>%</span>
        </div>
      </div>
      <div class="right">
        <div class="pieChart"></div>

        <span>词汇掌握程度</span>
      </div>
    </div>
    <!-- <highcharts :options="option"></highcharts> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 60,
            beta: 0,
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 70,
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "浏览器占比",
            data: [
              ["Firefox", 50],
              {
                name: "Chrome",
                y: 20,
                // sliced: true,
                // selected: true,
              },
              ["Safari", 30],
            ],
          },
        ],
        credits: [{ enabled: false }],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.right-small-box {
  margin-right: 30px;
}
.main {
  height: 80%;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  .number {
    font-family: Oswald;
    font-size: 28px;
    color: #4bf3f9;
  }
  .left {
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-around;
    .masteredCount {
      width: 201px;
      height: 74px;
      background: url(~@/assets/img/teacher/词汇平均掌握量.png) 0px center no-repeat;
      padding-left: 90px;
      .count {
        display: block;
        margin-top: 8px;
        color: #4bf3f9;
      }
    }
    .scoreRate {
      width: 201px;
      height: 74px;
      background: url(~@/assets/img/teacher/平均答对率.png) 0px center no-repeat;
      padding-left: 90px;
      .rate {
        display: block;
        margin-top: 8px;
        color: #4bf3f9;
      }
    }
  }
  .right {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .pieChart {
      width: 188px;
      height: 80px;
      background: url(~@/assets/img/teacher/底座.png) center center no-repeat;
      margin-bottom: 10px;
    }
  }
}
</style>
